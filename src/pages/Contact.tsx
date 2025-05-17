
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: t('messageSent'),
        description: t('messageResponse'),
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }, 1000);
  };

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

      <main className="container mx-auto px-4 py-12 max-w-2xl flex-grow">
        <Card className="bg-white/95 shadow-xl border-leaf-light/20">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-leaf-primary text-center">{t('contactTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 font-lato text-center mb-6">{t('contactDescription')}</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-lato text-gray-700 block">{t('name')}</label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-leaf-light/20 focus:border-leaf-primary focus:ring-leaf-primary/20"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="font-lato text-gray-700 block">{t('email')}</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-leaf-light/20 focus:border-leaf-primary focus:ring-leaf-primary/20"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="font-lato text-gray-700 block">{t('message')}</label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border-leaf-light/20 focus:border-leaf-primary focus:ring-leaf-primary/20 min-h-32"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-leaf-primary hover:bg-leaf-dark transition-colors"
                >
                  {t('submit')}
                </Button>
              </form>
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

export default Contact;
