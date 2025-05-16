
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen natural-leaf-bg">
      <header className="bg-gradient-to-r from-leaf-light to-leaf-primary text-white p-4 shadow-md">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-leaf-highlight transition-colors w-fit">
            <ArrowLeft size={20} />
            <span className="font-playfair font-bold">{t('backToHome')}</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <Card className="bg-white/95 shadow-xl border-leaf-light/20">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-leaf-primary text-center">{t('aboutTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 font-lato text-gray-700">
              <div>
                <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-3">{t('aboutMission')}</h3>
                <p className="leading-relaxed">
                  LeafDoctor is dedicated to helping farmers and plant enthusiasts quickly identify plant diseases 
                  and implement effective treatment strategies. Our mission is to make agricultural expertise 
                  accessible to everyone, particularly in regions where agricultural extension services may be limited.
                </p>
              </div>

              <div>
                <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-3">{t('howItWorks')}</h3>
                <p className="leading-relaxed">
                  Our application uses advanced machine learning algorithms trained on thousands of images of 
                  plant diseases. When you upload a photo of an affected leaf, our model analyzes visual patterns, 
                  discolorations, and lesions to identify the specific disease. We then provide you with tailored 
                  treatment recommendations based on the diagnosis.
                </p>
              </div>
              
              <div>
                <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-3">{t('supportedCrops')}</h3>
                <p className="leading-relaxed mb-4">
                  Currently, LeafDoctor supports disease detection for the following crops:
                </p>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-disc pl-5">
                  <li>Rice</li>
                  <li>Wheat</li>
                  <li>Cotton</li>
                  <li>Tomato</li>
                  <li>Potato</li>
                  <li>Apple</li>
                  <li>Grape</li>
                  <li>Corn</li>
                  <li>Soybean</li>
                  <li>Citrus</li>
                  <li>Cassava</li>
                  <li>Coffee</li>
                </ul>
                <p className="mt-4 leading-relaxed">
                  We are constantly working to expand our database and improve our detection capabilities.
                </p>
              </div>

              <div>
                <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-3">{t('privacyPolicy')}</h3>
                <p className="leading-relaxed">
                  We value your privacy. Images uploaded to LeafDoctor are used solely for disease detection 
                  and are not stored permanently on our servers. We may use anonymized data to improve our 
                  disease detection algorithms. No personal information is collected unless explicitly provided 
                  through our contact form.
                </p>
              </div>
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

export default About;
