
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/ImageUploader';
import ResultsDisplay from '@/components/ResultsDisplay';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { predictLeafDisease, initializeModel } from '@/services/predictionService';

interface PredictionResult {
  disease: string;
  confidence: number;
}

const Index: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const loadModel = async () => {
      try {
        await initializeModel();
        setIsModelLoading(false);
      } catch (error) {
        console.error('Failed to load model:', error);
        toast({
          variant: 'destructive',
          title: 'Error loading model',
          description: 'Please refresh the page to try again.'
        });
      }
    };

    loadModel();
  }, [toast]);

  const handleImageSelected = async (imageData: string) => {
    setSelectedImage(imageData);
    setIsProcessing(true);
    setPrediction(null);

    try {
      const result = await predictLeafDisease(imageData);
      setPrediction(result);
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        variant: 'destructive',
        title: t('errorMessage'),
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setPrediction(null);
  };

  return (
    <div className="min-h-screen leaf-pattern-bg">
      <header className="bg-leaf-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('appTitle')}</h1>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {!selectedImage ? (
          <Card className="bg-white/95 shadow-xl">
            <CardContent className="pt-6 pb-8 px-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-leaf-primary mb-3">{t('tagline')}</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">{t('uploadInstructions')}</p>
              </div>

              <div className="max-w-md mx-auto">
                <ImageUploader 
                  onImageSelected={handleImageSelected}
                  isProcessing={isProcessing || isModelLoading}
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div>
            {isProcessing ? (
              <div className="flex flex-col items-center space-y-6 p-8 bg-white/90 rounded-lg shadow">
                <div className="relative w-32 h-32 overflow-hidden rounded-lg">
                  <img 
                    src={selectedImage} 
                    alt="Uploaded leaf" 
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse-light w-16 h-16 rounded-full bg-leaf-primary opacity-75"></div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-leaf-primary">{t('analyzing')}</h3>
                  <div className="space-y-2 max-w-sm mx-auto">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4 mx-auto" />
                  </div>
                </div>
              </div>
            ) : (
              prediction && (
                <ResultsDisplay 
                  prediction={prediction}
                  imageData={selectedImage}
                  onReset={handleReset}
                />
              )
            )}
          </div>
        )}
      </main>

      <footer className="bg-leaf-dark text-white p-4 mt-auto">
        <div className="container mx-auto text-center text-sm">
          <p>© {new Date().getFullYear()} LeafDoctor - {t('tagline')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
