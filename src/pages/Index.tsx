
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from '@/components/ImageUploader';
import ResultsDisplay from '@/components/ResultsDisplay';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import { predictLeafDisease, initializeModel } from '@/services/predictionService';
import { Link } from 'react-router-dom';
import { HelpCircle, MessageCircle, Info } from 'lucide-react';

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
    <div className="min-h-screen natural-leaf-bg">
      <header className="bg-gradient-to-r from-leaf-light to-leaf-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-playfair font-bold">{t('appTitle')}</h1>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="hidden md:flex items-center gap-3">
              <Link to="/suggestions" className="text-white hover:text-leaf-highlight transition-colors flex items-center gap-1">
                <HelpCircle size={18} />
                <span>{t('suggestions')}</span>
              </Link>
              <Link to="/contact" className="text-white hover:text-leaf-highlight transition-colors flex items-center gap-1">
                <MessageCircle size={18} />
                <span>{t('contact')}</span>
              </Link>
              <Link to="/about" className="text-white hover:text-leaf-highlight transition-colors flex items-center gap-1">
                <Info size={18} />
                <span>{t('about')}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        {!selectedImage ? (
          <Card className="bg-white/95 shadow-xl border-leaf-light/20">
            <CardContent className="pt-8 pb-10 px-6">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-playfair font-bold text-leaf-primary mb-4">{t('tagline')}</h1>
                <p className="text-gray-600 max-w-2xl mx-auto font-lato">{t('uploadInstructions')}</p>
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
                    <div className="animate-pulse-light w-16 h-16 rounded-full bg-leaf-light opacity-75"></div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-playfair font-semibold text-leaf-primary">{t('analyzing')}</h3>
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

      <footer className="bg-gradient-to-r from-leaf-primary to-leaf-dark text-white p-5 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm font-lato">© {new Date().getFullYear()} LeafDoctor - {t('tagline')}</p>
            <div className="flex gap-5 mt-3 md:mt-0">
              <Link to="/suggestions" className="text-white hover:text-leaf-highlight text-sm transition-colors">{t('suggestions')}</Link>
              <Link to="/contact" className="text-white hover:text-leaf-highlight text-sm transition-colors">{t('contact')}</Link>
              <Link to="/about" className="text-white hover:text-leaf-highlight text-sm transition-colors">{t('about')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
