
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
    en: 'Captan, Myclobutanil (Rally), Propiconazole, Chlorothalonil, or organic options like Neem oil or Sulfur spray.',
    hi: 'कैप्टन, माइक्लोबुटानिल (रैली), प्रोपिकोनाज़ोल, क्लोरोथैलोनिल, या नीम का तेल या सल्फर स्प्रे जैसे जैविक विकल्प।',
    kn: 'ಕ್ಯಾಪ್ಟನ್, ಮೈಕ್ಲೋಬುಟಾನಿಲ್ (ರ್ಯಾಲಿ), ಪ್ರೊಪಿಕೊನಾಜೊಲ್, ಕ್ಲೋರೊಥಾಲೊನಿಲ್, ಅಥವಾ ಸಾವಯವ ಆಯ್ಕೆಗಳಾದ ಬೇವಿನ ಎಣ್ಣೆ ಅಥವಾ ಗಂಧಕ ಸ್ಪ್ರೇ.',
  },
  'Black Rot': {
    en: 'Mancozeb, Captan, Myclobutanil, or organic Bacillus subtilis products.',
    hi: 'मैंकोज़ेब, कैप्टन, माइक्लोबुटानिल, या जैविक बैसिलस सबटिलिस उत्पाद।',
    kn: 'ಮ್ಯಾಂಕೋಜೆಬ್, ಕ್ಯಾಪ್ಟನ್, ಮೈಕ್ಲೋಬುಟಾನಿಲ್, ಅಥವಾ ಸಾವಯವ ಬ್ಯಾಸಿಲಸ್ ಸಬ್ಟಿಲಿಸ್ ಉತ್ಪನ್ನಗಳು.',
  },
  'Cedar Apple Rust': {
    en: 'Propiconazole, Myclobutanil, Mancozeb, or organic sulfur-based sprays.',
    hi: 'प्रोपिकोनाज़ोल, माइक्लोबुटानिल, मैंकोज़ेब, या जैविक सल्फर-आधारित स्प्रे।',
    kn: 'ಪ್ರೊಪಿಕೊನಾಜೊಲ್, ಮೈಕ್ಲೋಬುಟಾನಿಲ್, ಮ್ಯಾಂಕೋಜೆಬ್, ಅಥವಾ ಸಾವಯವ ಗಂಧಕ-ಆಧಾರಿತ ಸ್ಪ್ರೇಗಳು.',
  },
  'Early Blight': {
    en: 'Chlorothalonil, Mancozeb, Azoxystrobin, Copper fungicides, or organic copper-based products.',
    hi: 'क्लोरोथैलोनिल, मैंकोज़ेब, अज़ोक्सिस्ट्रोबिन, कॉपर कवकनाशी, या जैविक कॉपर-आधारित उत्पाद।',
    kn: 'ಕ್ಲೋರೊಥಾಲೊನಿಲ್, ಮ್ಯಾಂಕೋಜೆಬ್, ಅಜೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್, ತಾಮ್ರದ ಫಂಗಿಸೈಡ್‌ಗಳು, ಅಥವಾ ಸಾವಯವ ತಾಮ್ರ-ಆಧಾರಿತ ಉತ್ಪನ್ನಗಳು.',
  },
  'Late Blight': {
    en: 'Chlorothalonil, Mancozeb, Copper fungicides, or organic options like copper hydroxide or copper oxychloride.',
    hi: 'क्लोरोथैलोनिल, मैंकोज़ेब, कॉपर कवकनाशी, या कॉपर हाइड्रॉक्साइड या कॉपर ऑक्सीक्लोराइड जैसे जैविक विकल्प।',
    kn: 'ಕ್ಲೋರೊಥಾಲೊನಿಲ್, ಮ್ಯಾಂಕೋಜೆಬ್, ತಾಮ್ರದ ಫಂಗಿಸೈಡ್‌ಗಳು, ಅಥವಾ ಸಾವಯವ ಆಯ್ಕೆಗಳಾದ ತಾಮ್ರದ ಹೈಡ್ರಾಕ್ಸೈಡ್ ಅಥವಾ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್.',
  },
  'Leaf Spot': {
    en: 'Mancozeb, Chlorothalonil, Thiophanate-methyl, or organic alternatives like neem oil or copper-based fungicides.',
    hi: 'मैंकोज़ेब, क्लोरोथैलोनिल, थायोफैनेट-मिथाइल, या नीम का तेल या कॉपर-आधारित कवकनाशी जैसे जैविक विकल्प।',
    kn: 'ಮ್ಯಾಂಕೋಜೆಬ್, ಕ್ಲೋರೊಥಾಲೊನಿಲ್, ಥಯೋಫಾನೇಟ್-ಮೆಥೈಲ್, ಅಥವಾ ಬೇವಿನ ಎಣ್ಣೆ ಅಥವಾ ತಾಮ್ರ-ಆಧಾರಿತ ಫಂಗಿಸೈಡ್‌ಗಳಂತಹ ಸಾವಯವ ಪರ್ಯಾಯಗಳು.',
  },
  'Powdery Mildew': {
    en: 'Sulfur, Potassium bicarbonate, Neem oil, Myclobutanil, or Triadimefon.',
    hi: 'सल्फर, पोटैशियम बाइकार्बोनेट, नीम का तेल, माइक्लोबुटानिल, या ट्रायडिमेफॉन।',
    kn: 'ಗಂಧಕ, ಪೊಟ್ಯಾಷಿಯಂ ಬೈಕಾರ್ಬೊನೇಟ್, ಬೇವಿನ ಎಣ್ಣೆ, ಮೈಕ್ಲೋಬುಟಾನಿಲ್, ಅಥವಾ ಟ್ರಯಾಡಿಮೆಫಾನ್.',
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
