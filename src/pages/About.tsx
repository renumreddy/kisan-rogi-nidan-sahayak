
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

const About: React.FC = () => {
  const { t, language } = useLanguage();

  // Multilingual content for About page sections
  const aboutContent = {
    mission: {
      en: 'LeafDoctor is dedicated to helping farmers and plant enthusiasts quickly identify plant diseases and implement effective treatment strategies. Our mission is to make agricultural expertise accessible to everyone, particularly in regions where agricultural extension services may be limited.',
      hi: 'लीफडॉक्टर किसानों और पौधों के शौकीनों को पौधों के रोगों की त्वरित पहचान करने और प्रभावी उपचार रणनीतियों को लागू करने में मदद करने के लिए समर्पित है। हमारा मिशन कृषि विशेषज्ञता को सभी के लिए सुलभ बनाना है, विशेष रूप से उन क्षेत्रों में जहां कृषि विस्तार सेवाएं सीमित हो सकती हैं।',
      kn: 'ರೈತರು ಮತ್ತು ಸಸ್ಯ ಪ್ರೇಮಿಗಳು ಸಸ್ಯ ರೋಗಗಳನ್ನು ತ್ವರಿತವಾಗಿ ಗುರುತಿಸಲು ಮತ್ತು ಪರಿಣಾಮಕಾರಿ ಚಿಕಿತ್ಸಾ ತಂತ್ರಗಳನ್ನು ಅಳವಡಿಸಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡುವ ಜವಾಬ್ದಾರಿಯನ್ನು ಲೀಫ್ಡಾಕ್ಟರ್ ಹೊಂದಿದೆ. ನಮ್ಮ ಧ್ಯೇಯವು ಕೃಷಿ ತಜ್ಞತೆಯನ್ನು ಎಲ್ಲರಿಗೂ ಲಭ್ಯವಾಗುವಂತೆ ಮಾಡುವುದು, ವಿಶೇಷವಾಗಿ ಕೃಷಿ ವಿಸ್ತರಣಾ ಸೇವೆಗಳು ಸೀಮಿತವಾಗಿರಬಹುದಾದ ಪ್ರದೇಶಗಳಲ್ಲಿ.'
    },
    howItWorks: {
      en: 'Our application uses advanced machine learning algorithms trained on thousands of images of plant diseases. When you upload a photo of an affected leaf, our model analyzes visual patterns, discolorations, and lesions to identify the specific disease. We then provide you with tailored treatment recommendations based on the diagnosis.',
      hi: 'हमारा एप्लिकेशन पौधों के रोगों के हजारों चित्रों पर प्रशिक्षित उन्नत मशीन लर्निंग एल्गोरिदम का उपयोग करता है। जब आप प्रभावित पत्ती की एक तस्वीर अपलोड करते हैं, तो हमारा मॉडल विशिष्ट बीमारी की पहचान करने के लिए दृश्य पैटर्न, रंग परिवर्तन और घावों का विश्लेषण करता है। फिर हम आपको निदान के आधार पर अनुकूलित उपचार सिफारिशें प्रदान करते हैं।',
      kn: 'ನಮ್ಮ ಅಪ್ಲಿಕೇಶನ್ ಸಸ್ಯ ರೋಗಗಳ ಸಾವಿರಾರು ಚಿತ್ರಗಳ ಮೇಲೆ ತರಬೇತಿ ಪಡೆದ ಸುಧಾರಿತ ಯಂತ್ರ ಕಲಿಕೆ ಅಲ್ಗಾರಿದಮ್‌ಗಳನ್ನು ಬಳಸುತ್ತದೆ. ನೀವು ಪ್ರಭಾವಿತ ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದಾಗ, ನಮ್ಮ ಮಾದರಿಯು ನಿರ್ದಿಷ್ಟ ರೋಗವನ್ನು ಗುರುತಿಸಲು ದೃಶ್ಯ ಮಾದರಿಗಳು, ನಿರ್ವರ್ಣೀಕರಣಗಳು ಮತ್ತು ಗಾಯಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ. ನಂತರ ನಾವು ನಿಮಗೆ ರೋಗನಿರ್ಣಯದ ಆಧಾರದ ಮೇಲೆ ಕಸ್ಟಮೈಸ್ ಮಾಡಿದ ಚಿಕಿತ್ಸಾ ಶಿಫಾರಸುಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ.'
    },
    crops: {
      en: ['Rice', 'Wheat', 'Cotton', 'Tomato', 'Potato', 'Apple', 'Grape', 'Corn', 'Soybean', 'Citrus', 'Cassava', 'Coffee'],
      hi: ['चावल', 'गेहूँ', 'कपास', 'टमाटर', 'आलू', 'सेब', 'अंगूर', 'मक्का', 'सोयाबीन', 'नींबू प्रजाति', 'कसावा', 'कॉफी'],
      kn: ['ಭತ್ತ', 'ಗೋಧಿ', 'ಹತ್ತಿ', 'ಟೊಮೇಟೊ', 'ಆಲೂಗಡ್ಡೆ', 'ಸೇಬು', 'ದ್ರಾಕ್ಷಿ', 'ಜೋಳ', 'ಸೋಯಾಬೀನ್', 'ಸಿಟ್ರಸ್', 'ಕಸಾವಾ', 'ಕಾಫಿ']
    },
    cropsSupportText: {
      en: 'Currently, LeafDoctor supports disease detection for the following crops:',
      hi: 'वर्तमान में, लीफडॉक्टर निम्नलिखित फसलों के लिए रोग पहचान का समर्थन करता है:',
      kn: 'ಪ್ರಸ್ತುತ, ಲೀಫ್ಡಾಕ್ಟರ್ ಈ ಕೆಳಗಿನ ಬೆಳೆಗಳಿಗೆ ರೋಗ ಪತ್ತೆಯ ಬೆಂಬಲವನ್ನು ಒದಗಿಸುತ್ತದೆ:'
    },
    cropsExpansionText: {
      en: 'We are constantly working to expand our database and improve our detection capabilities.',
      hi: 'हम अपने डेटाबेस का विस्तार करने और हमारी पहचान क्षमताओं को बेहतर बनाने के लिए लगातार काम कर रहे हैं।',
      kn: 'ನಾವು ನಮ್ಮ ಡೇಟಾಬೇಸ್ ಅನ್ನು ವಿಸ್ತರಿಸಲು ಮತ್ತು ನಮ್ಮ ಪತ್ತೆ ಸಾಮರ್ಥ್ಯಗಳನ್ನು ಸುಧಾರಿಸಲು ನಿರಂತರವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದೇವೆ.'
    },
    privacy: {
      en: 'We value your privacy. Images uploaded to LeafDoctor are used solely for disease detection and are not stored permanently on our servers. We may use anonymized data to improve our disease detection algorithms. No personal information is collected unless explicitly provided through our contact form.',
      hi: 'हम आपकी गोपनीयता को महत्व देते हैं। लीफडॉक्टर पर अपलोड की गई छवियों का उपयोग केवल रोग का पता लगाने के लिए किया जाता है और इन्हें हमारे सर्वरों पर स्थायी रूप से संग्रहीत नहीं किया जाता है। हम अपने रोग पहचान एल्गोरिदम को बेहतर बनाने के लिए अनामित डेटा का उपयोग कर सकते हैं। हमारे संपर्क फॉर्म के माध्यम से स्पष्ट रूप से प्रदान किए जाने तक कोई व्यक्तिगत जानकारी एकत्र नहीं की जाती है।',
      kn: 'ನಾವು ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ಮೌಲ್ಯಯುತವಾಗಿ ಪರಿಗಣಿಸುತ್ತೇವೆ. ಲೀಫ್ಡಾಕ್ಟರ್‌ಗೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಚಿತ್ರಗಳನ್ನು ರೋಗ ಪತ್ತೆಗೆ ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ ಮತ್ತು ನಮ್ಮ ಸರ್ವರ್‌ಗಳಲ್ಲಿ ಶಾಶ್ವತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ. ನಮ್ಮ ರೋಗ ಪತ್ತೆಹಚ್ಚುವ ಅಲ್ಗಾರಿದಮ್‌ಗಳನ್ನು ಸುಧಾರಿಸಲು ನಾವು ಅನಾಮಧೇಯಗೊಳಿಸಿದ ಡೇಟಾವನ್ನು ಬಳಸಬಹುದು. ನಮ್ಮ ಸಂಪರ್ಕ ಫಾರ್ಮ್ ಮೂಲಕ ಸ್ಪಷ್ಟವಾಗಿ ಒದಗಿಸದ ಹೊರತು ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.'
    }
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

      <main className="container mx-auto px-4 py-12 max-w-5xl flex-grow">
        <Card className="bg-white/95 shadow-xl border-leaf-light/20">
          <CardHeader>
            <CardTitle className="text-2xl font-playfair text-leaf-primary text-center">{t('aboutTitle')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 font-lato text-gray-700">
              <div>
                <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-3">{t('aboutMission')}</h3>
                <p className="leading-relaxed">
                  {aboutContent.mission[language]}
                </p>
              </div>

              <div>
                <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-3">{t('howItWorks')}</h3>
                <p className="leading-relaxed">
                  {aboutContent.howItWorks[language]}
                </p>
              </div>
              
              <div>
                <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-3">{t('supportedCrops')}</h3>
                <p className="leading-relaxed mb-4">
                  {aboutContent.cropsSupportText[language]}
                </p>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-disc pl-5">
                  {aboutContent.crops[language].map((crop, index) => (
                    <li key={index}>{crop}</li>
                  ))}
                </ul>
                <p className="mt-4 leading-relaxed">
                  {aboutContent.cropsExpansionText[language]}
                </p>
              </div>

              <div>
                <h3 className="font-playfair font-semibold text-xl text-leaf-primary mb-3">{t('privacyPolicy')}</h3>
                <p className="leading-relaxed">
                  {aboutContent.privacy[language]}
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

export default About;
