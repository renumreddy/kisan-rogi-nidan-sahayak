
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the available languages
export type Language = 'en' | 'hi' | 'kn';

// Translation dictionary type
type TranslationDict = {
  [key: string]: {
    [lang in Language]: string;
  };
};

// All translations used in the app
const translations: TranslationDict = {
  appTitle: {
    en: 'LeafDoctor',
    hi: 'लीफडॉक्टर',
    kn: 'ಎಲೆ ಡಾಕ್ಟರ್',
  },
  tagline: {
    en: 'Plant Disease Detection & Treatment',
    hi: 'पौधों के रोग का पता लगाने और उपचार',
    kn: 'ಸಸ್ಯ ರೋಗ ಪತ್ತೆ ಮತ್ತು ಚಿಕಿತ್ಸೆ',
  },
  uploadInstructions: {
    en: 'Upload or take a photo of a plant leaf to identify diseases',
    hi: 'रोगों की पहचान के लिए पौधे की पत्ती की फोटो अपलोड करें या लें',
    kn: 'ರೋಗಗಳನ್ನು ಗುರುತಿಸಲು ಸಸ್ಯದ ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ತೆಗೆದುಕೊಳ್ಳಿ',
  },
  uploadButton: {
    en: 'Upload Image',
    hi: 'छवि अपलोड करें',
    kn: 'ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
  },
  cameraButton: {
    en: 'Take Photo',
    hi: 'फोटो लें',
    kn: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
  },
  analyzing: {
    en: 'Analyzing leaf...',
    hi: 'पत्ती का विश्लेषण किया जा रहा है...',
    kn: 'ಎಲೆಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
  },
  results: {
    en: 'Results',
    hi: 'परिणाम',
    kn: 'ಫಲಿತಾಂಶಗಳು',
  },
  disease: {
    en: 'Disease',
    hi: 'रोग',
    kn: 'ರೋಗ',
  },
  confidence: {
    en: 'Confidence',
    hi: 'विश्वास स्तर',
    kn: 'ವಿಶ್ವಾಸ',
  },
  treatment: {
    en: 'Recommended Treatment',
    hi: 'अनुशंसित उपचार',
    kn: 'ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆ',
  },
  pesticides: {
    en: 'Recommended Pesticides',
    hi: 'अनुशंसित कीटनाशक',
    kn: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟನಾಶಕಗಳು',
  },
  tryAnother: {
    en: 'Try Another Image',
    hi: 'अन्य छवि आज़माएँ',
    kn: 'ಮತ್ತೊಂದು ಚಿತ್ರವನ್ನು ಪ್ರಯತ್ನಿಸಿ',
  },
  languageSelector: {
    en: 'Language',
    hi: 'भाषा',
    kn: 'ಭಾಷೆ',
  },
  english: {
    en: 'English',
    hi: 'अंग्रेज़ी',
    kn: 'ಆಂಗ್ಲ',
  },
  hindi: {
    en: 'Hindi',
    hi: 'हिंदी',
    kn: 'ಹಿಂದಿ',
  },
  kannada: {
    en: 'Kannada',
    hi: 'कन्नड़',
    kn: 'ಕನ್ನಡ',
  },
  errorMessage: {
    en: 'Error processing image. Please try another.',
    hi: 'छवि संसाधित करने में त्रुटि। कृपया कोई अन्य आज़माएँ।',
    kn: 'ಚಿತ್ರವನ್ನು ಸಂಸ್ಕರಿಸುವಲ್ಲಿ ದೋಷ. ದಯವಿಟ್ಟು ಮತ್ತೊಂದು ಪ್ರಯತ್ನಿಸಿ.',
  },
  noImageSelected: {
    en: 'No image selected. Please upload or capture an image.',
    hi: 'कोई छवि चयनित नहीं। कृपया एक छवि अपलोड करें या कैप्चर करें।',
    kn: 'ಯಾವುದೇ ಚಿತ್ರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿಲ್ಲ. ದಯವಿಟ್ಟು ಚಿತ್ರವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಸೆರೆಹಿಡಿಯಿರಿ.',
  },
  cameraAccessDenied: {
    en: 'Camera access was denied. Please enable camera access to use this feature.',
    hi: 'कैमरा एक्सेस अस्वीकृत किया गया। कृपया इस सुविधा का उपयोग करने के लिए कैमरा एक्सेस सक्षम करें।',
    kn: 'ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶವನ್ನು ನಿರಾಕರಿಸಲಾಗಿದೆ. ಈ ವೈಶಿಷ್ಟ್ಯವನ್ನು ಬಳಸಲು ದಯವಿಟ್ಟು ಕ್ಯಾಮೆರಾ ಪ್ರವೇಶವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ.',
  },
  cameraNotFound: {
    en: 'No camera found on your device.',
    hi: 'आपके डिवाइस पर कोई कैमरा नहीं मिला।',
    kn: 'ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಯಾವುದೇ ಕ್ಯಾಮೆರಾ ಕಂಡುಬಂದಿಲ್ಲ.',
  },
  cancel: {
    en: 'Cancel',
    hi: 'रद्द करें',
    kn: 'ರದ್ದುಮಾಡಿ',
  },
  capture: {
    en: 'Capture',
    hi: 'कैप्चर करें',
    kn: 'ಸೆರೆಹಿಡಿಯಿರಿ',
  },
  retake: {
    en: 'Retake',
    hi: 'फिर से लें',
    kn: 'ಮರುತೆಗೆಯಿರಿ',
  },
  confirm: {
    en: 'Confirm',
    hi: 'पुष्टि करें',
    kn: 'ದೃಢೀಕರಿಸಿ',
  },
  // About page translations
  aboutTitle: {
    en: 'About LeafDoctor',
    hi: 'लीफडॉक्टर के बारे में',
    kn: 'ಎಲೆ ಡಾಕ್ಟರ್ ಬಗ್ಗೆ',
  },
  aboutMission: {
    en: 'Our Mission',
    hi: 'हमारा मिशन',
    kn: 'ನಮ್ಮ ಮಿಷನ್',
  },
  howItWorks: {
    en: 'How It Works',
    hi: 'यह कैसे काम करता है',
    kn: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
  },
  supportedCrops: {
    en: 'Supported Crops',
    hi: 'समर्थित फसलें',
    kn: 'ಬೆಂಬಲಿತ ಬೆಳೆಗಳು',
  },
  privacyPolicy: {
    en: 'Privacy Policy',
    hi: 'गोपनीयता नीति',
    kn: 'ಗೌಪ್ಯತಾ ನೀತಿ',
  },
  // Contact page translations
  contactTitle: {
    en: 'Contact Us',
    hi: 'हमसे संपर्क करें',
    kn: 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
  },
  contactDescription: {
    en: 'Have questions or feedback? We would love to hear from you.',
    hi: 'कोई प्रश्न या प्रतिक्रिया है? हम आपसे सुनना पसंद करेंगे।',
    kn: 'ಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಪ್ರತಿಕ್ರಿಯೆಗಳಿವೆಯೇ? ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ.',
  },
  name: {
    en: 'Name',
    hi: 'नाम',
    kn: 'ಹೆಸರು',
  },
  email: {
    en: 'Email',
    hi: 'ईमेल',
    kn: 'ಇಮೇಲ್',
  },
  message: {
    en: 'Message',
    hi: 'संदेश',
    kn: 'ಸಂದೇಶ',
  },
  submit: {
    en: 'Submit',
    hi: 'जमा करें',
    kn: 'ಸಲ್ಲಿಸಿ',
  },
  messageSent: {
    en: 'Message Sent',
    hi: 'संदेश भेजा गया',
    kn: 'ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ',
  },
  messageResponse: {
    en: 'Thank you for your message. We will get back to you soon.',
    hi: 'आपके संदेश के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।',
    kn: 'ನಿಮ್ಮ ಸಂದೇಶಕ್ಕೆ ಧನ್ಯವಾದಗಳು. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
  },
  // Suggestions page translations
  suggestionTitle: {
    en: 'Plant Care Suggestions',
    hi: 'पौधों की देखभाल के सुझाव',
    kn: 'ಸಸ್ಯ ಆರೈಕೆ ಸಲಹೆಗಳು',
  },
  suggestionDescription: {
    en: 'Common plant diseases and recommended treatments to keep your plants healthy.',
    hi: 'आपके पौधों को स्वस्थ रखने के लिए सामान्य पौधों के रोग और अनुशंसित उपचार।',
    kn: 'ನಿಮ್ಮ ಸಸ್ಯಗಳನ್ನು ಆರೋಗ್ಯಕರವಾಗಿ ಇರಿಸಲು ಸಾಮಾನ್ಯ ಸಸ್ಯ ರೋಗಗಳು ಮತ್ತು ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆಗಳು.',
  },
  commonDiseases: {
    en: 'Common Diseases',
    hi: 'सामान्य रोग',
    kn: 'ಸಾಮಾನ್ಯ ರೋಗಗಳು',
  },
  recommendedPesticides: {
    en: 'Recommended Pesticides',
    hi: 'अनुशंसित कीटनाशक',
    kn: 'ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟನಾಶಕಗಳು',
  },
  description: {
    en: 'Description',
    hi: 'विवरण',
    kn: 'ವಿವರಣೆ',
  },
  prevention: {
    en: 'Prevention',
    hi: 'रोकथाम',
    kn: 'ತಡೆಗಟ್ಟುವಿಕೆ',
  },
  organicOptions: {
    en: 'Organic Options',
    hi: 'जैविक विकल्प',
    kn: 'ಸಾವಯವ ಆಯ್ಕೆಗಳು',
  },
  chemicalOptions: {
    en: 'Chemical Options',
    hi: 'रासायनिक विकल्प',
    kn: 'ರಾಸಾಯನಿಕ ಆಯ್ಕೆಗಳು',
  },
  neemDescription: {
    en: 'Natural insecticide effective against many pests while relatively safe for beneficial insects.',
    hi: 'कई कीटों के खिलाफ प्रभावी प्राकृतिक कीटनाशक जो लाभकारी कीड़ों के लिए अपेक्षाकृत सुरक्षित है।',
    kn: 'ಅನೇಕ ಕೀಟಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿಯಾದ ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕ, ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳಿಗೆ ತುಲನಾತ್ಮಕವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.',
  },
  btDescription: {
    en: 'Natural soil-dwelling bacterium that controls caterpillars, beetles, and fly larvae.',
    hi: 'प्राकृतिक मिट्टी में रहने वाले जीवाणु जो कैटरपिलर, बीटल और मक्खी लार्वा को नियंत्रित करते हैं।',
    kn: 'ಕ್ಯಾಟರ್‌ಪಿಲ್ಲರ್‌ಗಳು, ಬೀಟಲ್‌ಗಳು ಮತ್ತು ನೊಣದ ಲಾರ್ವಾಗಳನ್ನು ನಿಯಂತ್ರಿಸುವ ನೈಸರ್ಗಿಕ ಮಣ್ಣಿನಲ್ಲಿ ವಾಸಿಸುವ ಬ್ಯಾಕ್ಟೀರಿಯಾ.',
  },
  hortOilDescription: {
    en: 'Refined mineral oils that control insects and mites by smothering them.',
    hi: 'परिष्कृत खनिज तेल जो कीड़ों और माइट्स को दम घुटाकर नियंत्रित करते हैं।',
    kn: 'ಕೀಟಗಳು ಮತ್ತು ಮೈಟ್‌ಗಳನ್ನು ಉಸಿರುಕಟ್ಟಿಸುವ ಮೂಲಕ ನಿಯಂತ್ರಿಸುವ ಸಂಸ್ಕರಿಸಿದ ಖನಿಜ ಎಣ್ಣೆಗಳು.',
  },
  soapDescription: {
    en: 'Potassium salt-based products that disrupt insect cell membranes and dehydrate soft-bodied pests.',
    hi: 'पोटैशियम लवण-आधारित उत्पाद जो कीड़ों की कोशिका झिल्ली को बाधित करते हैं और नरम शरीर वाले कीड़ों को निर्जलित करते हैं।',
    kn: 'ಕೀಟದ ಕೋಶ ಪದರಗಳನ್ನು ಅಡ್ಡಿಪಡಿಸುವ ಮತ್ತು ಮೃದು-ದೇಹದ ಕೀಟಗಳನ್ನು ನಿರ್ಜಲೀಕರಣಗೊಳಿಸುವ ಪೊಟಾಷಿಯಂ ಲವಣ-ಆಧಾರಿತ ಉತ್ಪನ್ನಗಳು.',
  },
  copperDescription: {
    en: 'Broad-spectrum fungicide that prevents spore germination. Effective against many fungal and bacterial diseases.',
    hi: 'व्यापक स्पेक्ट्रम वाला कवकनाशी जो बीजाणु अंकुरण को रोकता है। कई कवक और जीवाणु रोगों के खिलाफ प्रभावी।',
    kn: 'ಬೀಜಾಣು ಮೊಳಕೆಯೊಡೆಯುವಿಕೆಯನ್ನು ತಡೆಯುವ ವ್ಯಾಪಕ ವ್ಯಾಪ್ತಿಯ ಫಂಗಿಸೈಡ್. ಅನೇಕ ಶಿಲೀಂಧ್ರ ಮತ್ತು ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ರೋಗಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿ.',
  },
  sulfurDescription: {
    en: 'Controls powdery mildew, rusts, and other fungal diseases. Also effective against some mites.',
    hi: 'पाउडरी मिल्ड्यू, रस्ट और अन्य कवक रोगों को नियंत्रित करता है। कुछ माइट्स के खिलाफ भी प्रभावी।',
    kn: 'ಪುಡಿ ಮಿಲ್ಡ್ಯೂ, ರಸ್ಟ್‌ಗಳು ಮತ್ತು ಇತರ ಶಿಲೀಂಧ್ರ ರೋಗಗಳನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಕೆಲವು ಮೈಟ್‌ಗಳ ವಿರುದ್ಧವೂ ಪರಿಣಾಮಕಾರಿಯಾಗಿದೆ.',
  },
  pyrethrinDescription: {
    en: 'Natural insecticide derived from chrysanthemum flowers, effective against a wide range of pests.',
    hi: 'गुलदाउदी के फूलों से प्राप्त प्राकृतिक कीटनाशक, विभिन्न प्रकार के कीटों के खिलाफ प्रभावी।',
    kn: 'ಕ್ರಿಸಾಂತಿಮಮ್ ಹೂವುಗಳಿಂದ ಪಡೆದ ನೈಸರ್ಗಿಕ ಕೀಟನಾಶಕ, ವ್ಯಾಪಕ ಶ್ರೇಣಿಯ ಕೀಟಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿಯಾಗಿದೆ.',
  },
  spinosadDescription: {
    en: 'Derived from soil bacteria, controls caterpillars, thrips, and other pests while being less harmful to beneficial insects.',
    hi: 'मिट्टी के बैक्टीरिया से प्राप्त, कैटरपिलर, थ्रिप्स और अन्य कीटों को नियंत्रित करता है, जबकि लाभकारी कीड़ों के लिए कम हानिकारक होता है।',
    kn: 'ಮಣ್ಣಿನ ಬ್ಯಾಕ್ಟೀರಿಯಾದಿಂದ ಪಡೆದುಕೊಳ್ಳಲಾಗಿದೆ, ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳಿಗೆ ಕಡಿಮೆ ಹಾನಿಕಾರಕವಾಗಿರುವಾಗ ಕ್ಯಾಟರ್‌ಪಿಲ್ಲರ್‌ಗಳು, ತ್ರಿಪ್ಸ್‌ಗಳು ಮತ್ತು ಇತರ ಕೀಟಗಳನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ.',
  },
  azadirachtinDescription: {
    en: 'Extracted from neem seeds, disrupts insect growth and feeding. Effective against many pests while preserving beneficial insects.',
    hi: 'नीम के बीजों से निकाला गया, कीड़ों के विकास और भोजन को बाधित करता है। लाभकारी कीड़ों को संरक्षित करते हुए कई कीटों के खिलाफ प्रभावी।',
    kn: 'ಬೇವಿನ ಬೀಜಗಳಿಂದ ಹೊರತೆಗೆಯಲಾಗಿದೆ, ಕೀಟಗಳ ಬೆಳವಣಿಗೆ ಮತ್ತು ಆಹಾರ ಸೇವನೆಯನ್ನು ಅಡ್ಡಿಪಡಿಸುತ್ತದೆ. ಪ್ರಯೋಜನಕಾರಿ ಕೀಟಗಳನ್ನು ಸಂರಕ್ಷಿಸುತ್ತಿರುವಾಗಲೂ ಅನೇಕ ಕೀಟಗಳ ವಿರುದ್ಧ ಪರಿಣಾಮಕಾರಿಯಾಗಿದೆ.',
  },
  diatomaceousEarthDescription: {
    en: 'Fine powder made from fossilized algae that damages insect exoskeletons causing dehydration.',
    hi: 'जीवाश्म शैवाल से बना महीन पाउडर जो कीड़ों के बाहरी कंकाल को नुकसान पहुंचाकर निर्जलीकरण का कारण बनता है।',
    kn: 'ಜೀವಾಶ್ಮ ಪಾಚಿಗಳಿಂದ ಮಾಡಿದ ಸೂಕ್ಷ್ಮ ಪುಡಿ, ಕೀಟಗಳ ಬಾಹ್ಯ ಕಂಕಾಲದ ಕವಚಕ್ಕೆ ಹಾನಿ ಮಾಡುವುದರಿಂದ ನಿರ್ಜಲೀಕರಣವನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.',
  },
  backToHome: {
    en: 'Back to Home',
    hi: 'होम पेज पर वापस जाएं',
    kn: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',
  },
  about: {
    en: 'About',
    hi: 'परिचय',
    kn: 'ಬಗ್ಗೆ',
  },
  contact: {
    en: 'Contact',
    hi: 'संपर्क',
    kn: 'ಸಂಪರ್ಕಿಸಿ',
  },
  suggestions: {
    en: 'Suggestions',
    hi: 'सुझाव',
    kn: 'ಸಲಹೆಗಳು',
  },
};

// Translations for specific diseases
export const diseaseTranslations: TranslationDict = {
  'Healthy': {
    en: 'Healthy',
    hi: 'स्वस्थ',
    kn: 'ಆರೋಗ್ಯಕರ',
  },
  'Apple Scab': {
    en: 'Apple Scab',
    hi: 'सेब का खुरचन',
    kn: 'ಆಪಲ್ ಸ್ಕ್ಯಾಬ್',
  },
  'Black Rot': {
    en: 'Black Rot',
    hi: 'काला सड़ांध',
    kn: 'ಕಪ್ಪು ಕೊಳೆತ',
  },
  'Cedar Apple Rust': {
    en: 'Cedar Apple Rust',
    hi: 'सीडर एप्पल रस्ट',
    kn: 'ಸೀಡರ್ ಆಪಲ್ ತುಕ್ಕು',
  },
  'Early Blight': {
    en: 'Early Blight',
    hi: 'अगेती झुलसा',
    kn: 'ಮುಂಚಿನ ಅಗ್ನಿ',
  },
  'Late Blight': {
    en: 'Late Blight',
    hi: 'पिछेती झुलसा',
    kn: 'ತಡವಾದ ಅಗ್ನಿ',
  },
  'Leaf Spot': {
    en: 'Leaf Spot',
    hi: 'पत्ती धब्बा',
    kn: 'ಎಲೆ ಕಲೆ',
  },
  'Powdery Mildew': {
    en: 'Powdery Mildew',
    hi: 'चूर्णिल आसिता',
    kn: 'ಪುಡಿ ಮಿಲ್ಡ್ಯೂ',
  },
};

// Translations for treatment recommendations
export const treatmentTranslations: TranslationDict = {
  'Healthy': {
    en: 'No treatment needed. Continue regular care and monitoring.',
    hi: 'कोई उपचार की आवश्यकता नहीं। नियमित देखभाल और निगरानी जारी रखें।',
    kn: 'ಯಾವುದೇ ಚಿಕಿತ್ಸೆ ಅಗತ್ಯವಿಲ್ಲ. ನಿಯಮಿತ ಆರೈಕೆ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣೆಯನ್ನು ಮುಂದುವರೆಸಿ.',
  },
  'Apple Scab': {
    en: 'Remove infected leaves and fruit. Apply fungicide spray on a regular schedule starting at bud break until rainy season ends.',
    hi: 'संक्रमित पत्तियों और फलों को हटा दें। कली खिलने से लेकर बरसात के मौसम के अंत तक नियमित अंतराल पर कवकनाशी स्प्रे लगाएं।',
    kn: 'ಸೋಂಕಿತ ಎಲೆಗಳು ಮತ್ತು ಹಣ್ಣುಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. ಮೊಗ್ಗು ಒಡೆಯುವುದರಿಂದ ಆರಂಭಿಸಿ ಮಳೆಗಾಲ ಕೊನೆಯಾಗುವವರೆಗೆ ನಿಯಮಿತ ವೇಳಾಪಟ್ಟಿಯಲ್ಲಿ ಫಂಗಿಸೈಡ್ ಸ್ಪ್ರೇ ಅನ್ವಯಿಸಿ.',
  },
  'Black Rot': {
    en: 'Prune out diseased wood and remove mummified fruits. Apply fungicides during the growing season at 10-14 day intervals.',
    hi: 'रोगग्रस्त लकड़ी को काट दें और मम्मीकृत फलों को हटा दें। बढ़ते मौसम के दौरान 10-14 दिनों के अंतराल पर कवकनाशी का छिड़काव करें।',
    kn: 'ರೋಗಗ್ರಸ್ತ ಮರವನ್ನು ಕತ್ತರಿಸಿ ಮತ್ತು ಮಮ್ಮಿಫೈಡ್ ಫಲಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. ಬೆಳೆಯುವ ಋತುವಿನಲ್ಲಿ 10-14 ದಿನಗಳ ಅಂತರದಲ್ಲಿ ಫಂಗಿಸೈಡ್‌ಗಳನ್ನು ಅನ್ವಯಿಸಿ.',
  },
  'Cedar Apple Rust': {
    en: 'Remove nearby cedar trees when possible. Apply protective fungicides beginning at bud break and continuing until early summer.',
    hi: 'जहां संभव हो वहां पास के सीडार के पेड़ों को हटा दें। कली टूटने से लेकर गर्मी के शुरुआती दिनों तक सुरक्षात्मक कवकनाशी का छिड़काव करें।',
    kn: 'ಸಾಧ್ಯವಾದಾಗ ಹತ್ತಿರದ ಸೀಡರ್ ಮರಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. ಮೊಗ್ಗು ಒಡೆಯುವುದರಿಂದ ಆರಂಭಿಸಿ ಮುಂಚಿನ ಬೇಸಿಗೆಯವರೆಗೆ ಸಂರಕ್ಷಣಾತ್ಮಕ ಫಂಗಿಸೈಡ್‌ಗಳನ್ನು ಅನ್ವಯಿಸಿ.',
  },
  'Early Blight': {
    en: 'Remove infected leaves. Improve air circulation around plants. Apply fungicides every 7-10 days from early in the season.',
    hi: 'संक्रमित पत्तियों को हटा दें। पौधों के आसपास वायु संचार में सुधार करें। मौसम की शुरुआत से हर 7-10 दिनों में कवकनाशी का छिड़काव करें।',
    kn: 'ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. ಸಸ್ಯಗಳ ಸುತ್ತ ವಾಯು ಸಂಚಾರವನ್ನು ಸುಧಾರಿಸಿ. ಋತುವಿನ ಆರಂಭದಿಂದ ಪ್ರತಿ 7-10 ದಿನಗಳಿಗೊಮ್ಮೆ ಫಂಗಿಸೈಡ್‌ಗಳನ್ನು ಅನ್ವಯಿಸಿ.',
  },
  'Late Blight': {
    en: 'Remove and destroy all infected plant parts. Apply protective fungicide before symptoms appear when weather conditions favor disease.',
    hi: 'सभी संक्रमित पौधे के हिस्सों को हटा दें और नष्ट कर दें। जब मौसम की स्थिति रोग के अनुकूल हो तो लक्षण दिखाई देने से पहले सुरक्षात्मक कवकनाशी का छिड़काव करें।',
    kn: 'ಎಲ್ಲಾ ಸೋಂಕಿತ ಸಸ್ಯ ಭಾಗಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ನಾಶಪಡಿಸಿ. ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು ರೋಗಕ್ಕೆ ಅನುಕೂಲವಾಗಿದ್ದಾಗ ಲಕ್ಷಣಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುವ ಮೊದಲು ರಕ್ಷಣಾತ್ಮಕ ಫಂಗಿಸೈಡ್ ಅನ್ವಯಿಸಿ.',
  },
  'Leaf Spot': {
    en: 'Remove infected leaves. Avoid overhead watering. Apply fungicide at first sign of disease and repeat as directed on product label.',
    hi: 'संक्रमित पत्तियों को हटा दें। ऊपरी सिंचाई से बचें। रोग के पहले संकेत पर कवकनाशी का छिड़काव करें और उत्पाद लेबल पर निर्देशित अनुसार दोहराएं।',
    kn: 'ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ. ಮೇಲಿನಿಂದ ನೀರು ಹಾಯಿಸುವುದನ್ನು ತಪ್ಪಿಸಿ. ರೋಗದ ಮೊದಲ ಸಂಕೇತದಲ್ಲಿ ಫಂಗಿಸೈಡ್ ಅನ್ವಯಿಸಿ ಮತ್ತು ಉತ್ಪನ್ನ ಲೇಬಲ್‌ನಲ್ಲಿ ನಿರ್ದೇಶಿಸಿದಂತೆ ಪುನರಾವರ್ತಿಸಿ.',
  },
  'Powdery Mildew': {
    en: 'Improve air circulation around plants. Apply fungicides at first sign of infection. Use resistant varieties when available.',
    hi: 'पौधों के आसपास हवा के संचालन में सुधार करें। संक्रमण के पहले संकेत पर कवकनाशी का छिड़काव करें। जब उपलब्ध हों तो प्रतिरोधी किस्मों का उपयोग करें।',
    kn: 'ಸಸ್ಯಗಳ ಸುತ್ತ ವಾಯು ಸಂಚಾರವನ್ನು ಸುಧಾರಿಸಿ. ಸೋಂಕಿನ ಮೊದಲ ಸಂಕೇತದಲ್ಲಿ ಫಂಗಿಸೈಡ್‌ಗಳನ್ನು ಅನ್ವಯಿಸಿ. ಲಭ್ಯವಿದ್ದಾಗ ನಿರೋಧಕ ವಿಧಗಳನ್ನು ಬಳಸಿ.',
  },
};

// Translations for pesticide recommendations
export const pesticideTranslations: TranslationDict = {
  'Healthy': {
    en: 'No pesticides needed.',
    hi: 'कीटनाशकों की आवश्यकता नहीं है।',
    kn: 'ಕೀಟನಾಶಕಗಳ ಅಗತ್ಯವಿಲ್ಲ.',
  },
  'Apple Scab': {
    en: 'Captan, Myclobutanil (Rally), Propiconazole, Chlorothalonil, or organic options like Neem oil or Sulfur spray. For severe cases, consider Azoxystrobin or Trifloxystrobin.',
    hi: 'कैप्टन, माइक्लोबुटानिल (रैली), प्रोपिकोनाज़ोल, क्लोरोथैलोनिल, या नीम का तेल या सल्फर स्प्रे जैसे जैविक विकल्प। गंभीर मामलों के लिए, एज़ोक्सिस्ट्रोबिन या ट्राइफ्लोक्सिस्ट्रोबिन पर विचार करें।',
    kn: 'ಕ್ಯಾಪ್ಟನ್, ಮೈಕ್ಲೋಬುಟಾನಿಲ್ (ರ್ಯಾಲಿ), ಪ್ರೊಪಿಕೊನಾಜೊಲ್, ಕ್ಲೋರೊಥಾಲೊನಿಲ್, ಅಥವಾ ಸಾವಯವ ಆಯ್ಕೆಗಳಾದ ಬೇವಿನ ಎಣ್ಣೆ ಅಥವಾ ಗಂಧಕ ಸ್ಪ್ರೇ. ತೀವ್ರ ಪ್ರಕರಣಗಳಿಗೆ, ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ ಅಥವಾ ಟ್ರೈಫ್ಲೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ ಅನ್ನು ಪರಿಗಣಿಸಿ.',
  },
  'Black Rot': {
    en: 'Mancozeb, Captan, Myclobutanil, or organic Bacillus subtilis products. For prevention, consider copper-based fungicides or potassium bicarbonate sprays.',
    hi: 'मैंकोज़ेब, कैप्टन, माइक्लोबुटानिल, या जैविक बैसिलस सबटिलिस उत्पाद। रोकथाम के लिए, कॉपर-आधारित कवकनाशी या पोटैशियम बाइकार्बोनेट स्प्रे पर विचार करें।',
    kn: 'ಮ್ಯಾಂಕೋಜೆಬ್, ಕ್ಯಾಪ್ಟನ್, ಮೈಕ್ಲೋಬುಟಾನಿಲ್, ಅಥವಾ ಸಾವಯವ ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ ಉತ್ಪನ್ನಗಳು. ತಡೆಗಟ್ಟಲು, ತಾಮ್ರ-ಆಧಾರಿತ ಫಂಗಿಸೈಡ್‌ಗಳು ಅಥವಾ ಪೊಟ್ಯಾಷಿಯಂ ಬೈಕಾರ್ಬೊನೇಟ್ ಸ್ಪ್ರೇಗಳನ್ನು ಪರಿಗಣಿಸಿ.',
  },
  'Cedar Apple Rust': {
    en: 'Propiconazole, Myclobutanil, Mancozeb, or organic sulfur-based sprays. Additional options include Fenarimol and Triadimefon for severe infections.',
    hi: 'प्रोपिकोनाज़ोल, माइक्लोबुटानिल, मैंकोज़ेब, या जैविक सल्फर-आधारित स्प्रे। गंभीर संक्रमणों के लिए अतिरिक्त विकल्पों में फेनारिमोल और ट्रायडिमेफॉन शामिल हैं।',
    kn: 'ಪ್ರೊಪಿಕೊನಾಜೊಲ್, ಮೈಕ್ಲೋಬುಟಾನಿಲ್, ಮ್ಯಾಂಕೋಜೆಬ್, ಅಥವಾ ಸಾವಯವ ಗಂಧಕ-ಆಧಾರಿತ ಸ್ಪ್ರೇಗಳು. ಹೆಚ್ಚುವರಿ ಆಯ್ಕೆಗಳಲ್ಲಿ ತೀವ್ರ ಸೋಂಕುಗಳಿಗೆ ಫೆನಾರಿಮೋಲ್ ಮತ್ತು ಟ್ರಯಾಡಿಮೆಫಾನ್ ಸೇರಿವೆ.',
  },
  'Early Blight': {
    en: 'Chlorothalonil, Mancozeb, Azoxystrobin, Copper fungicides, or organic copper-based products. Boscalid and Pyraclostrobin mixtures are also effective for severe cases.',
    hi: 'क्लोरोथैलोनिल, मैंकोज़ेब, अज़ोक्सिस्ट्रोबिन, कॉपर कवकनाशी, या जैविक कॉपर-आधारित उत्पाद। गंभीर मामलों के लिए बोस्कालिड और पाइराक्लोस्ट्रोबिन मिश्रण भी प्रभावी हैं।',
    kn: 'ಕ್ಲೋರೊಥಾಲೊನಿಲ್, ಮ್ಯಾಂಕೋಜೆಬ್, ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್, ತಾಮ್ರದ ಫಂಗಿಸೈಡ್‌ಗಳು, ಅಥವಾ ಸಾವಯವ ತಾಮ್ರ-ಆಧಾರಿತ ಉತ್ಪನ್ನಗಳು. ಬೋಸ್ಕಾಲಿಡ್ ಮತ್ತು ಪೈರಾಕ್ಲೋಸ್ಟ್ರೋಬಿನ್ ಮಿಶ್ರಣಗಳು ಸಹ ತೀವ್ರ ಪ್ರಕರಣಗಳಿಗೆ ಪರಿಣಾಮಕಾರಿಯಾಗಿದೆ.',
  },
  'Late Blight': {
    en: 'Chlorothalonil, Mancozeb, Copper fungicides, or organic options like copper hydroxide or copper oxychloride. For severe outbreaks, consider Cymoxanil, Dimethomorph, or Fluopicolide.',
    hi: 'क्लोरोथैलोनिल, मैंकोज़ेब, कॉपर कवकनाशी, या कॉपर हाइड्रॉक्साइड या कॉपर ऑक्सीक्लोराइड जैसे जैविक विकल्प। गंभीर प्रकोपों के लिए, साइमोक्सानिल, डाइमेथोमोर्फ, या फ्लुओपिकोलाइड पर विचार करें।',
    kn: 'ಕ್ಲೋರೊಥಾಲೊನಿಲ್, ಮ್ಯಾಂಕೋಜೆಬ್, ತಾಮ್ರದ ಫಂಗಿಸೈಡ್‌ಗಳು, ಅಥವಾ ಸಾವಯವ ಆಯ್ಕೆಗಳಾದ ತಾಮ್ರದ ಹೈಡ್ರಾಕ್ಸೈಡ್ ಅಥವಾ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್. ತೀವ್ರ ಒಡೆತಗಳಿಗೆ, ಸೈಮೋಕ್ಸಾನಿಲ್, ಡೈಮೆಥೊಮೋರ್ಫ್, ಅಥವಾ ಫ್ಲುಓಪಿಕೊಲೈಡ್ ಅನ್ನು ಪರಿಗಣಿಸಿ.',
  },
  'Leaf Spot': {
    en: 'Mancozeb, Chlorothalonil, Thiophanate-methyl, or organic alternatives like neem oil or copper-based fungicides. For persistent infections, try Tebuconazole or Iprodione.',
    hi: 'मैंकोज़ेब, क्लोरोथैलोनिल, थायोफैनेट-मिथाइल, या नीम का तेल या कॉपर-आधारित कवकनाशी जैसे जैविक विकल्प। लगातार संक्रमणों के लिए, टेबुकोनाज़ोल या इप्रोडायोन का प्रयास करें।',
    kn: 'ಮ್ಯಾಂಕೋಜೆಬ್, ಕ್ಲೋರೊಥಾಲೊನಿಲ್, ಥಯೋಫಾನೇಟ್-ಮೆಥೈಲ್, ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ ಅಥವಾ ತಾಮ್ರ-ಆಧಾರಿತ ಫಂಗಿಸೈಡ್‌ಗಳಂತಹ ಸಾವಯವ ಪರ್ಯಾಯಗಳು. ನಿರಂತರ ಸೋಂಕುಗಳಿಗೆ, ಟೆಬುಕೊನಾಜೋಲ್ ಅಥವಾ ಇಪ್ರೊಡಿಯೋನ್ ಅನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
  },
  'Powdery Mildew': {
    en: 'Sulfur, Potassium bicarbonate, Neem oil, Myclobutanil, or Triadimefon. Additional effective options include Azoxystrobin, Penconazole, and biocontrol agents like Bacillus subtilis.',
    hi: 'सल्फर, पोटैशियम बाइकार्बोनेट, नीम का तेल, माइक्लोबुटानिल, या ट्रायडिमेफॉन। अतिरिक्त प्रभावी विकल्पों में एज़ोक्सिस्ट्रोबिन, पेनकोनाज़ोल, और बैसिलस सबटिलिस जैसे जैव नियंत्रण एजेंट शामिल हैं।',
    kn: 'ಗಂಧಕ, ಪೊಟ್ಯಾಷಿಯಂ ಬೈಕಾರ್ಬೊನೇಟ್, ಬೇವಿನ ಎಣ್ಣೆ, ಮೈಕ್ಲೋಬುಟಾನಿಲ್, ಅಥವಾ ಟ್ರಯಾಡಿಮೆಫಾನ್. ಹೆಚ್ಚುವರಿ ಪರಿಣಾಮಕಾರಿ ಆಯ್ಕೆಗಳಲ್ಲಿ ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್, ಪೆನ್ಕೊನಾಜೋಲ್ ಮತ್ತು ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ ನಂತಹ ಜೈವಿಕ ನಿಯಂತ್ರಣ ಏಜೆಂಟ್‌ಗಳು ಸೇರಿವೆ.',
  },
};

// Define the language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// LanguageProvider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string) => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key; // fallback to key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Helper function to translate disease names
export const translateDisease = (disease: string, language: Language): string => {
  if (diseaseTranslations[disease] && diseaseTranslations[disease][language]) {
    return diseaseTranslations[disease][language];
  }
  return disease;
};

// Helper function to get treatment recommendations
export const getTranslatedTreatment = (disease: string, language: Language): string => {
  if (treatmentTranslations[disease] && treatmentTranslations[disease][language]) {
    return treatmentTranslations[disease][language];
  }
  return treatmentTranslations['Leaf Spot'][language]; // default fallback
};

// Helper function to get pesticide recommendations
export const getTranslatedPesticides = (disease: string, language: Language): string => {
  if (pesticideTranslations[disease] && pesticideTranslations[disease][language]) {
    return pesticideTranslations[disease][language];
  }
  return pesticideTranslations['Leaf Spot'][language]; // default fallback
};
