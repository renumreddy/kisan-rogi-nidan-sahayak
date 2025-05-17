
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, Camera } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';
import axios from 'axios';
import ImageUploader from '@/components/ImageUploader';

interface PredictionResult {
  class: string;
  confidence: number;
}

const Index: React.FC = () => {
  const { t, language } = useLanguage();
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelected = async (imageData: string) => {
    setSelectedImage(imageData);
    setPrediction(null);
    setShowResults(false);

    // For file uploads from the file picker, convert to blob
    const fetchResponse = await fetch(imageData);
    const blob = await fetchResponse.blob();

    const formData = new FormData();
    formData.append("image", blob, "image.jpg");

    setLoading(true);
    try {
      const response = await axios.post(
        "https://leafdoctor.azurewebsites.net/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPrediction(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: t('uploadFailed') || 'Upload Failed',
        description: t('tryAgainLater') || 'There was an issue uploading the image. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen natural-leaf-bg flex flex-col">
      <header className="bg-gradient-to-r from-leaf-light to-leaf-primary text-white p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-8 w-8" />
              <h1 className="text-2xl font-playfair font-bold">{t('appName')}</h1>
            </div>
            <div className="flex items-center gap-4">
              <NavigationMenu className="hidden md:block">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link 
                      to="/suggestions" 
                      className="px-3 py-1.5 rounded-md bg-leaf-primary/20 hover:bg-leaf-primary/40 text-white hover:text-white transition-colors"
                    >
                      {t('suggestions')}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="ml-4">
                    <Link 
                      to="/about" 
                      className="px-3 py-1.5 rounded-md bg-leaf-primary/20 hover:bg-leaf-primary/40 text-white hover:text-white transition-colors"
                    >
                      {t('about')}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="ml-4">
                    <Link 
                      to="/contact" 
                      className="px-3 py-1.5 rounded-md bg-leaf-primary/20 hover:bg-leaf-primary/40 text-white hover:text-white transition-colors"
                    >
                      {t('contact')}
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem className="ml-4">
                    <Link 
                      to="/plants" 
                      className="px-3 py-1.5 rounded-md bg-leaf-primary/20 hover:bg-leaf-primary/40 text-white hover:text-white transition-colors"
                    >
                      {language === 'en' ? 'Plants' : language === 'hi' ? 'पौधे' : 'ಸಸ್ಯಗಳು'}
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <LanguageSwitcher />
              {isMobile && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white">
                      <Menu />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/suggestions">{t('suggestions')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/about">{t('about')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/contact">{t('contact')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/plants">{language === 'en' ? 'Plants' : language === 'hi' ? 'पौधे' : 'ಸಸ್ಯಗಳು'}</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 flex-grow">
        <section className="mb-8 text-center">
          <h2 className="text-3xl font-playfair text-leaf-primary font-bold mb-4">
            {t('identifyPlantDisease')}
          </h2>
          <p className="text-lg font-lato text-gray-700">
            {t('uploadLeafImage')}
          </p>
        </section>

        <section className="flex flex-col items-center justify-center mb-8">
          <div className="flex flex-col items-center">
            {selectedImage ? (
              <div className="relative w-64 h-64 rounded-full overflow-hidden mb-4">
                <img
                  src={selectedImage}
                  alt="Uploaded"
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <Leaf className="h-24 w-24 text-leaf-primary mb-4" />
            )}
            
            <ImageUploader 
              onImageSelected={handleImageSelected}
              isProcessing={loading}
            />
          </div>
        </section>

        {showResults && prediction && (
          <section className="mt-8 p-6 bg-white rounded-md shadow-md border border-gray-200">
            <h3 className="text-2xl font-playfair text-leaf-primary font-bold mb-4 text-center">
              {t('predictionResults')}
            </h3>
            <div className="mb-4">
              <p className="font-lato">
                <span className="font-bold text-gray-800">{t('disease')}:</span>{' '}
                {prediction.class}
              </p>
            </div>
            <div>
              <p className="font-lato">
                <span className="font-bold text-gray-800">{t('confidence')}:</span>{' '}
                {(prediction.confidence * 100).toFixed(2)}%
              </p>
            </div>
          </section>
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
              <Link to="/plants" className="text-white hover:text-leaf-highlight text-sm transition-colors">
                {language === 'en' ? 'Plants' : language === 'hi' ? 'पौधे' : 'ಸಸ್ಯಗಳು'}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
