
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Suggestions: React.FC = () => {
  const { t } = useLanguage();

  const commonDiseases = [
    {
      name: 'Leaf Spot',
      description: 'Fungal infection causing brown or black spots on leaves.',
      treatment: 'Apply copper-based fungicide. Remove and destroy infected leaves.',
      prevention: 'Avoid overhead watering. Ensure good air circulation around plants.'
    },
    {
      name: 'Powdery Mildew',
      description: 'White powdery substance on leaf surfaces.',
      treatment: 'Apply sulfur-based fungicides or neem oil.',
      prevention: 'Plant resistant varieties. Avoid high humidity conditions.'
    },
    {
      name: 'Bacterial Blight',
      description: 'Water-soaked lesions that turn brown with yellow halos.',
      treatment: 'Copper-based bactericides. Remove and destroy infected parts.',
      prevention: 'Use disease-free seeds and plants. Avoid working with wet plants.'
    },
    {
      name: 'Viral Infection',
      description: 'Mottled, distorted leaves with stunted growth.',
      treatment: 'No cure. Remove and destroy infected plants to prevent spread.',
      prevention: 'Control insect vectors. Use virus-free planting material.'
    },
    {
      name: 'Nutrient Deficiency',
      description: 'Yellowing leaves, stunted growth, or interveinal chlorosis.',
      treatment: 'Apply appropriate fertilizer based on deficient nutrient.',
      prevention: 'Regular soil testing and balanced fertilization program.'
    }
  ];
  
  return (
    <div className="min-h-screen natural-leaf-bg flex flex-col">
      <header className="bg-gradient-to-r from-leaf-light to-leaf-primary text-white p-4 shadow-md">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-leaf-highlight transition-colors w-fit">
            <ArrowLeft size={20} />
            <span className="font-playfair font-bold">{t('backToHome')}</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl flex-grow">
        <Card className="bg-white/95 shadow-xl border-leaf-light/20">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-leaf-primary text-center">{t('suggestionTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <p className="text-gray-600 font-lato mb-6">{t('suggestionDescription')}</p>
              
              <Tabs defaultValue="diseases" className="w-full">
                <TabsList className="w-full mb-6 bg-leaf-light/10">
                  <TabsTrigger 
                    value="diseases" 
                    className="flex-1 data-[state=active]:bg-leaf-primary data-[state=active]:text-white"
                  >
                    {t('commonDiseases')}
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pesticides" 
                    className="flex-1 data-[state=active]:bg-leaf-primary data-[state=active]:text-white"
                  >
                    {t('recommendedPesticides')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="diseases" className="space-y-6">
                  {commonDiseases.map((disease, index) => (
                    <div key={index} className="border-b border-leaf-light/20 pb-4 last:border-0">
                      <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-2">{disease.name}</h3>
                      <p className="font-lato text-gray-700 mb-2"><strong>{t('description')}:</strong> {disease.description}</p>
                      <p className="font-lato text-gray-700 mb-2"><strong>{t('treatment')}:</strong> {disease.treatment}</p>
                      <p className="font-lato text-gray-700"><strong>{t('prevention')}:</strong> {disease.prevention}</p>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="pesticides" className="space-y-6">
                  <div className="space-y-6">
                    <div className="border-b border-leaf-light/20 pb-4">
                      <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-2">{t('organicOptions')}</h3>
                      <ul className="list-disc pl-5 space-y-2 font-lato text-gray-700">
                        <li><strong>Neem Oil:</strong> {t('neemDescription')}</li>
                        <li><strong>Bacillus thuringiensis (Bt):</strong> {t('btDescription')}</li>
                        <li><strong>Horticultural Oil:</strong> {t('hortOilDescription')}</li>
                        <li><strong>Insecticidal Soap:</strong> {t('soapDescription')}</li>
                        <li><strong>Azadirachtin:</strong> {t('azadirachtinDescription')}</li>
                        <li><strong>Diatomaceous Earth:</strong> {t('diatomaceousEarthDescription')}</li>
                      </ul>
                    </div>
                    
                    <div className="border-b border-leaf-light/20 pb-4">
                      <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-2">{t('chemicalOptions')}</h3>
                      <ul className="list-disc pl-5 space-y-2 font-lato text-gray-700">
                        <li><strong>Copper Fungicides:</strong> {t('copperDescription')}</li>
                        <li><strong>Sulfur:</strong> {t('sulfurDescription')}</li>
                        <li><strong>Pyrethrin:</strong> {t('pyrethrinDescription')}</li>
                        <li><strong>Spinosad:</strong> {t('spinosadDescription')}</li>
                        <li><strong>Chlorothalonil:</strong> Broad-spectrum fungicide that prevents disease by protecting plant tissue.</li>
                        <li><strong>Mancozeb:</strong> Protective fungicide effective against a wide range of fungi.</li>
                        <li><strong>Propiconazole:</strong> Systemic fungicide that moves through the plant to control various diseases.</li>
                        <li><strong>Azoxystrobin:</strong> Strobilurin fungicide with preventative and curative action against many fungal diseases.</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
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

export default Suggestions;
