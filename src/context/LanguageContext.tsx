
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'kn';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    kn: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Define all translations here
const translations: Translations = {
  appName: {
    en: 'LeafDoctor',
    hi: 'लीफ डॉक्टर',
    kn: 'ಲೀಫ್ ಡಾಕ್ಟರ್'
  },
  identifyPlantDisease: {
    en: 'Identify Plant Disease',
    hi: 'पौधों की बीमारी की पहचान करें',
    kn: 'ಸಸ್ಯ ರೋಗವನ್ನು ಗುರುತಿಸಿ'
  },
  uploadLeafImage: {
    en: 'Upload a Photo of a Plant Leaf to Detect Diseases',
    hi: 'रोगों का पता लगाने के लिए पौधे के पत्ते की तस्वीर अपलोड करें',
    kn: 'ರೋಗಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಸ್ಯದ ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ'
  },
  uploadButton: {
    en: 'Upload Image',
    hi: 'छवि अपलोड करें',
    kn: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ'
  },
  cameraButton: {
    en: 'Take Photo',
    hi: 'फोटो लें',
    kn: 'ಫೋಟೋ ತೆಗೆಯಿರಿ'
  },
  predictionResults: {
    en: 'Analysis Results',
    hi: 'विश्लेषण परिणाम',
    kn: 'ವಿಶ್ಲೇಷಣೆ ಫಲಿತಾಂಶಗಳು'
  },
  disease: {
    en: 'Disease',
    hi: 'रोग',
    kn: 'ರೋಗ'
  },
  confidence: {
    en: 'Confidence',
    hi: 'विश्वास',
    kn: 'ವಿಶ್ವಾಸ'
  },
  uploadFailed: {
    en: 'Upload Failed',
    hi: 'अपलोड विफल',
    kn: 'ಅಪ್‌ಲೋಡ್ ವಿಫಲವಾಗಿದೆ'
  },
  tryAgainLater: {
    en: 'There was an issue uploading the image. Please try again later.',
    hi: 'छवि अपलोड करने में समस्या हुई। कृपया बाद में पुनः प्रयास करें।',
    kn: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ಸಮಸ್ಯೆ ಇದೆ. ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
  },
  cameraAccessDenied: {
    en: 'Camera Access Denied',
    hi: 'कैमरा एक्सेस अस्वीकृत',
    kn: 'ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ'
  },
  cameraNotFound: {
    en: 'Camera Not Found',
    hi: 'कैमरा नहीं मिला',
    kn: 'ಕ್ಯಾಮೆರಾ ಕಂಡುಬಂದಿಲ್ಲ'
  },
  capture: {
    en: 'Capture',
    hi: 'कैप्चर',
    kn: 'ಸೆರೆಹಿಡಿಯಿರಿ'
  },
  confirm: {
    en: 'Confirm',
    hi: 'पुष्टि करें',
    kn: 'ದೃಢೀಕರಿಸಿ'
  },
  cancel: {
    en: 'Cancel',
    hi: 'रद्द करें',
    kn: 'ರದ್ದುಮಾಡಿ'
  },
  retake: {
    en: 'Retake',
    hi: 'फिर से लें',
    kn: 'ಮತ್ತೆ ತೆಗೆಯಿರಿ'
  },
  languageSelector: {
    en: 'Language',
    hi: 'भाषा',
    kn: 'ಭಾಷೆ'
  },
  english: {
    en: 'English',
    hi: 'अंग्रेज़ी',
    kn: 'ಇಂಗ್ಲಿಷ್'
  },
  hindi: {
    en: 'Hindi',
    hi: 'हिन्दी',
    kn: 'ಹಿಂದಿ'
  },
  kannada: {
    en: 'Kannada',
    hi: 'कन्नड़',
    kn: 'ಕನ್ನಡ'
  },
  suggestions: {
    en: 'Suggestions',
    hi: 'सुझाव',
    kn: 'ಸಲಹೆಗಳು'
  },
  about: {
    en: 'About',
    hi: 'परिचय',
    kn: 'ಬಗ್ಗೆ'
  },
  contact: {
    en: 'Contact',
    hi: 'संपर्क',
    kn: 'ಸಂಪರ್ಕ'
  },
  tagline: {
    en: 'Your Plant Health Partner',
    hi: 'आपका पौधा स्वास्थ्य साथी',
    kn: 'ನಿಮ್ಮ ಸಸ್ಯ ಆರೋಗ್ಯ ಪಾಲುದಾರ'
  },
  treatment: {
    en: 'Treatment',
    hi: 'उपचार',
    kn: 'ಚಿಕಿತ್ಸೆ'
  },
  pesticides: {
    en: 'Recommended Pesticides',
    hi: 'अनुशंसित कीटनाशक',
    kn: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟನಾಶಕಗಳು'
  },
  tryAnother: {
    en: 'Try Another Image',
    hi: 'दूसरी छवि आज़माएँ',
    kn: 'ಮತ್ತೊಂದು ಚಿತ್ರವನ್ನು ಪ್ರಯತ್ನಿಸಿ'
  },
  results: {
    en: 'Results',
    hi: 'परिणाम',
    kn: 'ಫಲಿತಾಂಶಗಳು'
  },
  allPlants: {
    en: 'All Plants',
    hi: 'सभी पौधे',
    kn: 'ಎಲ್ಲಾ ಸಸ್ಯಗಳು'
  },
  popularPlants: {
    en: 'Popular Plants',
    hi: 'लोकप्रिय पौधे',
    kn: 'ಜನಪ್ರಿಯ ಸಸ್ಯಗಳು'
  },
  searchPlants: {
    en: 'Search plants...',
    hi: 'पौधे खोजें...',
    kn: 'ಸಸ್ಯಗಳನ್ನು ಹುಡುಕಿ...'
  },
  back: {
    en: 'Back',
    hi: 'वापस',
    kn: 'ಹಿಂದೆ'
  },
  basicCare: {
    en: 'Basic Care',
    hi: 'बुनियादी देखभाल',
    kn: 'ಮೂಲ ಆರೈಕೆ'
  },
  commonProblems: {
    en: 'Common Problems',
    hi: 'सामान्य समस्याएं',
    kn: 'ಸಾಮಾನ್ಯ ಸಮಸ್ಯೆಗಳು'
  },
  idealConditions: {
    en: 'Ideal Growth Conditions',
    hi: 'आदर्श विकास स्थिति',
    kn: 'ಸೂಕ್ತ ಬೆಳವಣಿಗೆ ಪರಿಸ್ಥಿತಿಗಳು'
  },
  wateringTips: {
    en: 'Watering Tips',
    hi: 'पानी देने के टिप्स',
    kn: 'ನೀರು ಹಾಕುವ ಸಲಹೆಗಳು'
  },
  fertilizing: {
    en: 'Fertilizing',
    hi: 'उर्वरक',
    kn: 'ರಸಗೊಬ್ಬರ ಹಾಕುವುದು'
  }
};

// Define disease-specific translations
const diseaseInfo: { [key: string]: { treatment: Translations['treatment'], pesticides: Translations['pesticides'] } } = {
  'Tomato Late Blight': {
    treatment: {
      en: 'Remove and destroy all infected plant parts. Ensure proper spacing between plants for air circulation. Apply copper-based fungicides as a preventative measure.',
      hi: 'सभी संक्रमित पौधों के भागों को हटाएं और नष्ट करें। हवा के संचार के लिए पौधों के बीच उचित दूरी सुनिश्चित करें। निवारक उपाय के रूप में तांबे-आधारित फफूंदनाशक लगाएं।',
      kn: 'ಎಲ್ಲಾ ಸೋಂಕಿತ ಸಸ್ಯ ಭಾಗಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ನಾಶಪಡಿಸಿ. ವಾಯು ಸಂಚಾರಕ್ಕಾಗಿ ಸಸ್ಯಗಳ ನಡುವೆ ಸರಿಯಾದ ಅಂತರವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ. ತಡೆಗಟ್ಟುವ ಕ್ರಮವಾಗಿ ತಾಮ್ರ ಆಧಾರಿತ ಶಿಲೀಂದ್ರನಾಶಕಗಳನ್ನು ಹಾಕಿ.'
    },
    pesticides: {
      en: 'Chlorothalonil, Mancozeb, Copper Oxychloride, Bordeaux mixture',
      hi: 'क्लोरोथालोनिल, मैनकोज़ेब, कॉपर ऑक्सीक्लोराइड, बोर्डो मिश्रण',
      kn: 'ಕ್ಲೋರೋಥಲೊನಿಲ್, ಮ್ಯಾಂಕೋಜೆಬ್, ಕಾಪರ್ ಆಕ್ಸಿಕ್ಲೋರೈಡ್, ಬೋರ್ಡೋ ಮಿಶ್ರಣ'
    }
  },
  'Tomato Early Blight': {
    treatment: {
      en: 'Remove infected leaves immediately. Practice crop rotation. Mulch around plants to prevent soil splash. Apply fungicides at first sign of disease.',
      hi: 'संक्रमित पत्तियों को तुरंत हटा दें। फसल चक्र का अभ्यास करें। मिट्टी के छींटे को रोकने के लिए पौधों के चारों ओर मल्च करें। बीमारी के पहले संकेत पर फफूंदनाशक लगाएं।',
      kn: 'ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತಕ್ಷಣವೇ ತೆಗೆಯಿರಿ. ಬೆಳೆ ತಿರುವಣವನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ. ಮಣ್ಣಿನ ಚಿಮುಕನ್ನು ತಡೆಯಲು ಸಸ್ಯಗಳ ಸುತ್ತ ಮಲ್ಚ್ ಮಾಡಿ. ರೋಗದ ಮೊದಲ ಸಂಕೇತದಲ್ಲಿ ಶಿಲೀಂದ್ರನಾಶಕಗಳನ್ನು ಹಾಕಿ.'
    },
    pesticides: {
      en: 'Azoxystrobin, Chlorothalonil, Copper Fungicides, Mancozeb',
      hi: 'अज़ोक्सिस्ट्रोबिन, क्लोरोथालोनिल, कॉपर फफूंदनाशक, मैनकोज़ेब',
      kn: 'ಅಝೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್, ಕ್ಲೋರೋಥಲೊನಿಲ್, ಕಾಪರ್ ಶಿಲೀಂದ್ರನಾಶಕಗಳು, ಮ್ಯಾಂಕೋಜೆಬ್'
    }
  },
  // Add more diseases as needed
  'Healthy': {
    treatment: {
      en: 'No treatment needed. Continue good agricultural practices.',
      hi: 'कोई उपचार की आवश्यकता नहीं है। अच्छी कृषि प्रथाओं को जारी रखें।',
      kn: 'ಯಾವುದೇ ಚಿಕಿತ್ಸೆಯ ಅಗತ್ಯವಿಲ್ಲ. ಉತ್ತಮ ಕೃಷಿ ಅಭ್ಯಾಸಗಳನ್ನು ಮುಂದುವರಿಸಿ.'
    },
    pesticides: {
      en: 'No pesticides required.',
      hi: 'कीटनाशकों की आवश्यकता नहीं है।',
      kn: 'ಯಾವುದೇ ಕೀಟನಾಶಕಗಳ ಅಗತ್ಯವಿಲ್ಲ.'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language];
    }
    return key; // Return the key as fallback if no translation exists
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return {
    ...context,
    translateDisease: (disease: string, lang: Language): string => {
      // Return disease name as is
      return disease;
    },
    getTranslatedTreatment: (disease: string, lang: Language): string => {
      if (diseaseInfo[disease]?.treatment) {
        return diseaseInfo[disease].treatment[lang];
      }
      // Fallback to generic treatment info
      return diseaseInfo['Healthy'].treatment[lang];
    },
    getTranslatedPesticides: (disease: string, lang: Language): string => {
      if (diseaseInfo[disease]?.pesticides) {
        return diseaseInfo[disease].pesticides[lang];
      }
      // Fallback to generic pesticide info
      return diseaseInfo['Healthy'].pesticides[lang];
    }
  };
};
