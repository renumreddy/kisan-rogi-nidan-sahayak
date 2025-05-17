
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Suggestions: React.FC = () => {
  const { t, language } = useLanguage();

  const commonDiseases = [
    {
      name: {
        en: 'Leaf Spot',
        hi: 'पत्ती धब्बा',
        kn: 'ಎಲೆ ಕಲೆ'
      },
      description: {
        en: 'Fungal infection causing brown or black spots on leaves.',
        hi: 'कवक संक्रमण जो पत्तियों पर भूरे या काले धब्बे का कारण बनता है।',
        kn: 'ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಅಥವಾ ಕಪ್ಪು ಕಲೆಗಳನ್ನು ಉಂಟುಮಾಡುವ ಶಿಲೀಂಧ್ರ ಸೋಂಕು.'
      },
      treatment: {
        en: 'Apply copper-based fungicide. Remove and destroy infected leaves.',
        hi: 'कॉपर-आधारित फफूंदीनाशक लगाएं। संक्रमित पत्तियों को हटा दें और नष्ट कर दें।',
        kn: 'ತಾಮ್ರ-ಆಧಾರಿತ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಹಾಕಿ. ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ನಾಶಪಡಿಸಿ.'
      },
      prevention: {
        en: 'Avoid overhead watering. Ensure good air circulation around plants.',
        hi: 'ऊपर से पानी देने से बचें। पौधों के चारों ओर अच्छे वायु संचार को सुनिश्चित करें।',
        kn: 'ಮೇಲಿನಿಂದ ನೀರು ಹಾಯಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ. ಸಸ್ಯಗಳ ಸುತ್ತ ಒಳ್ಳೆಯ ಗಾಳಿ ಸಂಚಾರವನ್ನು ಖಚಿತಪಡಿಸಿ.'
      }
    },
    {
      name: {
        en: 'Powdery Mildew',
        hi: 'चूर्णिल फफूंदी',
        kn: 'ಪುಡಿ ಮಿಲ್ಡ್ಯೂ'
      },
      description: {
        en: 'White powdery substance on leaf surfaces.',
        hi: 'पत्ती की सतहों पर सफेद पाउडर जैसा पदार्थ।',
        kn: 'ಎಲೆ ಮೇಲ್ಮೈಗಳ ಮೇಲೆ ಬಿಳಿ ಪುಡಿಯಂತಹ ಪದಾರ್ಥ.'
      },
      treatment: {
        en: 'Apply sulfur-based fungicides or neem oil.',
        hi: 'सल्फर-आधारित फफूंदीनाशक या नीम का तेल लगाएं।',
        kn: 'ಗಂಧಕ-ಆಧಾರಿತ ಶಿಲೀಂಧ್ರನಾಶಕಗಳು ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆಯನ್ನು ಹಾಕಿ.'
      },
      prevention: {
        en: 'Plant resistant varieties. Avoid high humidity conditions.',
        hi: 'प्रतिरोधी किस्में लगाएं। उच्च आर्द्रता वाली स्थितियों से बचें।',
        kn: 'ಪ್ರತಿರೋಧಕ ತಳಿಗಳನ್ನು ನೆಡಿ. ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆಯ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ತಪ್ಪಿಸಿ.'
      }
    },
    {
      name: {
        en: 'Bacterial Blight',
        hi: 'जीवाणु अंगमारी',
        kn: 'ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಬ್ಲೈಟ್'
      },
      description: {
        en: 'Water-soaked lesions that turn brown with yellow halos.',
        hi: 'पानी से भीगे घाव जो पीले प्रभामंडल के साथ भूरे हो जाते हैं।',
        kn: 'ನೀರಿನಲ್ಲಿ ನೆನೆದ ಹಾನಿಗಳು ಹಳದಿ ಪ್ರಭಾವಲಯಗಳೊಂದಿಗೆ ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ.'
      },
      treatment: {
        en: 'Copper-based bactericides. Remove and destroy infected parts.',
        hi: 'कॉपर-आधारित बैक्टीरिसाइड्स। संक्रमित भागों को हटाएं और नष्ट करें।',
        kn: 'ತಾಮ್ರ-ಆಧಾರಿತ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕಗಳು. ಸೋಂಕಿತ ಭಾಗಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ನಾಶಪಡಿಸಿ.'
      },
      prevention: {
        en: 'Use disease-free seeds and plants. Avoid working with wet plants.',
        hi: 'रोग-मुक्त बीज और पौधों का उपयोग करें। गीले पौधों के साथ काम करने से बचें।',
        kn: 'ರೋಗ-ಮುಕ್ತ ಬೀಜಗಳು ಮತ್ತು ಸಸ್ಯಗಳನ್ನು ಬಳಸಿ. ಒದ್ದೆಯಾದ ಸಸ್ಯಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವುದನ್ನು ತಪ್ಪಿಸಿ.'
      }
    },
    {
      name: {
        en: 'Viral Infection',
        hi: 'वायरल संक्रमण',
        kn: 'ವೈರಲ್ ಸೋಂಕು'
      },
      description: {
        en: 'Mottled, distorted leaves with stunted growth.',
        hi: 'धब्बेदार, विकृत पत्तियां जिनकी वृद्धि रुकी हुई है।',
        kn: 'ಚುಕ್ಕೆಗಳಿರುವ, ವಿಕೃತ ಎಲೆಗಳು ಕುಬ್ಜ ಬೆಳವಣಿಗೆಯೊಂದಿಗೆ.'
      },
      treatment: {
        en: 'No cure. Remove and destroy infected plants to prevent spread.',
        hi: 'कोई इलाज नहीं। फैलने से रोकने के लिए संक्रमित पौधों को हटाएं और नष्ट करें।',
        kn: 'ಯಾವುದೇ ಚಿಕಿತ್ಸೆಯಿಲ್ಲ. ಹರಡುವುದನ್ನು ತಡೆಯಲು ಸೋಂಕಿತ ಸಸ್ಯಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ನಾಶಪಡಿಸಿ.'
      },
      prevention: {
        en: 'Control insect vectors. Use virus-free planting material.',
        hi: 'कीट वाहकों को नियंत्रित करें। वायरस-मुक्त रोपण सामग्री का उपयोग करें।',
        kn: 'ಕೀಟ ವಾಹಕಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ. ವೈರಸ್-ಮುಕ್ತ ನೆಡುವ ವಸ್ತುಗಳನ್ನು ಬಳಸಿ.'
      }
    },
    {
      name: {
        en: 'Nutrient Deficiency',
        hi: 'पोषक तत्वों की कमी',
        kn: 'ಪೋಷಕಾಂಶ ಕೊರತೆ'
      },
      description: {
        en: 'Yellowing leaves, stunted growth, or interveinal chlorosis.',
        hi: 'पीली पत्तियां, रुकी हुई वृद्धि, या अंतःशिरा क्लोरोसिस।',
        kn: 'ಹಳದಿಯಾಗುವ ಎಲೆಗಳು, ಕುಬ್ಜ ಬೆಳವಣಿಗೆ, ಅಥವಾ ಅಂತರ-ನರ ಕ್ಲೋರೋಸಿಸ್.'
      },
      treatment: {
        en: 'Apply appropriate fertilizer based on deficient nutrient.',
        hi: 'अपर्याप्त पोषक तत्व के आधार पर उपयुक्त उर्वरक लगाएं।',
        kn: 'ಕೊರತೆಯುಳ್ಳ ಪೋಷಕಾಂಶದ ಆಧಾರದ ಮೇಲೆ ಸೂಕ್ತವಾದ ರಸಗೊಬ್ಬರವನ್ನು ಹಾಕಿ.'
      },
      prevention: {
        en: 'Regular soil testing and balanced fertilization program.',
        hi: 'नियमित मिट्टी परीक्षण और संतुलित उर्वरक कार्यक्रम।',
        kn: 'ನಿಯಮಿತ ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮತ್ತು ಸಮತೋಲಿತ ಗೊಬ್ಬರ ಕಾರ್ಯಕ್ರಮ.'
      }
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
                      <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-2">{disease.name[language]}</h3>
                      <p className="font-lato text-gray-700 mb-2"><strong>{t('description')}:</strong> {disease.description[language]}</p>
                      <p className="font-lato text-gray-700 mb-2"><strong>{t('treatment')}:</strong> {disease.treatment[language]}</p>
                      <p className="font-lato text-gray-700"><strong>{t('prevention')}:</strong> {disease.prevention[language]}</p>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="pesticides" className="space-y-6">
                  <div className="space-y-6">
                    <div className="border-b border-leaf-light/20 pb-4">
                      <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-2">{t('organicOptions')}</h3>
                      <ul className="list-disc pl-5 space-y-2 font-lato text-gray-700">
                        <li><strong>
                          {language === 'en' ? 'Neem Oil:' : 
                           language === 'hi' ? 'नीम का तेल:' : 
                           'ಬೇವಿನ ಎಣ್ಣೆ:'}
                        </strong> {t('neemDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Bacillus thuringiensis (Bt):' : 
                           language === 'hi' ? 'बैसिलस थुरिंजिएंसिस (बीटी):' : 
                           'ಬ್ಯಾಸಿಲಸ್ ಥುರಿಂಜಿಯೆನ್ಸಿಸ್ (ಬಿಟಿ):'}
                        </strong> {t('btDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Horticultural Oil:' : 
                           language === 'hi' ? 'बागवानी तेल:' : 
                           'ತೋಟಗಾರಿಕೆ ಎಣ್ಣೆ:'}
                        </strong> {t('hortOilDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Insecticidal Soap:' : 
                           language === 'hi' ? 'कीटनाशक साबुन:' : 
                           'ಕೀಟನಾಶಕ ಸಾಬೂನು:'}
                        </strong> {t('soapDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Azadirachtin:' : 
                           language === 'hi' ? 'अज़ाडिराक्टिन:' : 
                           'ಅಜಾಡಿರ್ಯಾಕ್ಟಿನ್:'}
                        </strong> {t('azadirachtinDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Diatomaceous Earth:' : 
                           language === 'hi' ? 'डायटोमेशियस अर्थ:' : 
                           'ಡಯಾಟೊಮೇಶಿಯಸ್ ಅರ್ಥ್:'}
                        </strong> {t('diatomaceousEarthDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Garlic Spray:' : 
                           language === 'hi' ? 'लहसुन स्प्रे:' : 
                           'ಬೆಳ್ಳುಳ್ಳಿ ಸ್ಪ್ರೇ:'}
                        </strong> 
                          {language === 'en' ? 'Natural insecticide made from garlic extract, effective against many small pests.' : 
                           language === 'hi' ? 'लहसुन के अर्क से बना प्राकृतिक कीटनाशक, कई छोटे कीड़ों के खिलाफ प्रभावी।' : 
                           'ಬೆಳ್ಳುಳ್ಳಿ ಸತ್ತಿನಿಂದ ತಯಾರಿಸಲಾದ ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕ, ಅನೇಕ ಸಣ್ಣ ಕೀಟಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿಯಾಗಿದೆ.'}
                        </li>
                        <li><strong>
                          {language === 'en' ? 'Beneficial Nematodes:' : 
                           language === 'hi' ? 'लाभकारी नेमेटोड्स:' : 
                           'ಪ್ರಯೋಜನಕಾರಿ ನೆಮಟೋಡ್‌ಗಳು:'}
                        </strong> 
                          {language === 'en' ? 'Microscopic organisms that target and kill soil-dwelling pests but leave plants unharmed.' : 
                           language === 'hi' ? 'सूक्ष्म जीव जो मिट्टी में रहने वाले कीटों को लक्षित करते हैं और मारते हैं लेकिन पौधों को नुकसान नहीं पहुंचाते।' : 
                           'ಮಣ್ಣಿನಲ್ಲಿ ವಾಸಿಸುವ ಕೀಟಗಳನ್ನು ಗುರಿಯಾಗಿಸಿ ಕೊಲ್ಲುವ ಸೂಕ್ಷ್ಮ ಜೀವಿಗಳು ಆದರೆ ಸಸ್ಯಗಳನ್ನು ಹಾನಿಗೊಳಿಸುವುದಿಲ್ಲ.'}
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border-b border-leaf-light/20 pb-4">
                      <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-2">{t('chemicalOptions')}</h3>
                      <ul className="list-disc pl-5 space-y-2 font-lato text-gray-700">
                        <li><strong>
                          {language === 'en' ? 'Copper Fungicides:' : 
                           language === 'hi' ? 'कॉपर फफूंदीनाशक:' : 
                           'ತಾಮ್ರದ ಶಿಲೀಂಧ್ರನಾಶಕಗಳು:'}
                        </strong> {t('copperDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Sulfur:' : 
                           language === 'hi' ? 'सल्फर:' : 
                           'ಗಂಧಕ:'}
                        </strong> {t('sulfurDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Pyrethrin:' : 
                           language === 'hi' ? 'पाइरेथ्रिन:' : 
                           'ಪೈರೆಥ್ರಿನ್:'}
                        </strong> {t('pyrethrinDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Spinosad:' : 
                           language === 'hi' ? 'स्पिनोसैड:' : 
                           'ಸ್ಪಿನೋಸಾಡ್:'}
                        </strong> {t('spinosadDescription')}</li>
                        <li><strong>
                          {language === 'en' ? 'Chlorothalonil:' : 
                           language === 'hi' ? 'क्लोरोथैलोनिल:' : 
                           'ಕ್ಲೋರೋಥಾಲೊನಿಲ್:'}
                        </strong> 
                          {language === 'en' ? 'Broad-spectrum fungicide that prevents disease by protecting plant tissue.' : 
                           language === 'hi' ? 'व्यापक स्पेक्ट्रम वाला फफूंदीनाशक जो पौधे के ऊतकों की रक्षा करके रोग को रोकता है।' : 
                           'ಸಸ್ಯ ಅಂಗಾಂಶವನ್ನು ರಕ್ಷಿಸುವ ಮೂಲಕ ರೋಗವನ್ನು ತಡೆಯುವ ವ್ಯಾಪಕ ವ್ಯಾಪ್ತಿಯ ಶಿಲೀಂಧ್ರನಾಶಕ.'}
                        </li>
                        <li><strong>
                          {language === 'en' ? 'Mancozeb:' : 
                           language === 'hi' ? 'मैनकोज़ेब:' : 
                           'ಮ್ಯಾಂಕೋಜೆಬ್:'}
                        </strong> 
                          {language === 'en' ? 'Protective fungicide effective against a wide range of fungi.' : 
                           language === 'hi' ? 'सुरक्षात्मक फफूंदीनाशक जो कवक की विस्तृत श्रेणी के खिलाफ प्रभावी है।' : 
                           'ವ್ಯಾಪಕ ಶ್ರೇಣಿಯ ಶಿಲೀಂಧ್ರಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿಯಾದ ರಕ್ಷಣಾತ್ಮಕ ಶಿಲೀಂಧ್ರನಾಶಕ.'}
                        </li>
                        <li><strong>
                          {language === 'en' ? 'Propiconazole:' : 
                           language === 'hi' ? 'प्रोपिकोनाज़ोल:' : 
                           'ಪ್ರೊಪಿಕೊನಾಜೋಲ್:'}
                        </strong> 
                          {language === 'en' ? 'Systemic fungicide that moves through the plant to control various diseases.' : 
                           language === 'hi' ? 'सिस्टेमिक फफूंदीनाशक जो विभिन्न रोगों को नियंत्रित करने के लिए पौधे के माध्यम से चलता है।' : 
                           'ವಿವಿಧ ರೋಗಗಳನ್ನು ನಿಯಂತ್ರಿಸಲು ಸಸ್ಯದ ಮೂಲಕ ಚಲಿಸುವ ಸಿಸ್ಟಮಿಕ್ ಶಿಲೀಂಧ್ರನಾಶಕ.'}
                        </li>
                        <li><strong>
                          {language === 'en' ? 'Azoxystrobin:' : 
                           language === 'hi' ? 'एज़ोक्सिस्ट्रोबिन:' : 
                           'ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್:'}
                        </strong> 
                          {language === 'en' ? 'Strobilurin fungicide with preventative and curative action against many fungal diseases.' : 
                           language === 'hi' ? 'स्ट्रोबिलुरिन फफूंदीनाशक जिसमें कई कवक रोगों के खिलाफ निवारक और उपचारात्मक कार्रवाई होती है।' : 
                           'ಅನೇಕ ಶಿಲೀಂಧ್ರ ರೋಗಗಳ ವಿರುದ್ಧ ತಡೆಗಟ್ಟುವ ಮತ್ತು ಚಿಕಿತ್ಸಾತ್ಮಕ ಕ್ರಿಯೆಯನ್ನು ಹೊಂದಿರುವ ಸ್ಟ್ರೋಬಿಲುರಿನ್ ಶಿಲೀಂಧ್ರನಾಶಕ.'}
                        </li>
                        <li><strong>
                          {language === 'en' ? 'Thiophanate-methyl:' : 
                           language === 'hi' ? 'थायोफैनेट-मिथाइल:' : 
                           'ಥಯೋಫಾನೇಟ್-ಮೆಥೈಲ್:'}
                        </strong> 
                          {language === 'en' ? 'Systemic fungicide that controls a broad spectrum of diseases in ornamentals and crops.' : 
                           language === 'hi' ? 'सिस्टेमिक फफूंदीनाशक जो सजावटी पौधों और फसलों में रोगों के व्यापक स्पेक्ट्रम को नियंत्रित करता है।' : 
                           'ಅಲಂಕಾರಿಕ ಮತ್ತು ಬೆಳೆಗಳಲ್ಲಿ ವ್ಯಾಪಕ ವ್ಯಾಪ್ತಿಯ ರೋಗಗಳನ್ನು ನಿಯಂತ್ರಿಸುವ ಸಿಸ್ಟಮಿಕ್ ಶಿಲೀಂಧ್ರನಾಶಕ.'}
                        </li>
                        <li><strong>
                          {language === 'en' ? 'Metalaxyl:' : 
                           language === 'hi' ? 'मेटालैक्सिल:' : 
                           'ಮೆಟಲಾಕ್ಸಿಲ್:'}
                        </strong> 
                          {language === 'en' ? 'Systemic fungicide especially effective against water molds like Pythium and Phytophthora.' : 
                           language === 'hi' ? 'सिस्टेमिक फफूंदीनाशक जो पिथियम और फाइटोफ्थोरा जैसे जल फफूंद के खिलाफ विशेष रूप से प्रभावी है।' : 
                           'ಪಿಥಿಯಮ್ ಮತ್ತು ಫೈಟೋಫ್ಥೋರಾ ಎಂಬ ನೀರಿನ ಶಿಲೀಂಧ್ರಗಳ ವಿರುದ್ಧ ವಿಶೇಷವಾಗಿ ಪರಿಣಾಮಕಾರಿಯಾದ ಸಿಸ್ಟಮಿಕ್ ಶಿಲೀಂಧ್ರನಾಶಕ.'}
                        </li>
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

export default Suggestions;
