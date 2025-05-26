import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { PlantGrid } from '@/components/PlantGrid';
import { PlantList } from '@/components/PlantList';
import { Plant } from '@/components/PlantCard';

// Import local images
import AloeVeraImg from '../Aloe Vera.jpg';
import BasilImg from '../BASALI.jpg';
import LavenderImg from '../Lavender.jpeg';
import MonsteraImg from '../Monstera.jpeg';
import PeaceLilyImg from '../Peace Lily.jpeg';
import SucculentImg from '../Succulent.jpg';

type PlantInfoType = 'basic' | 'advanced' | 'issues';

const Plants: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedInfoType, setSelectedInfoType] = useState<PlantInfoType>('basic');
  
  const plants: Plant[] = [
    {
      id: 'tomato',
      name: {
        en: 'Tomato',
        hi: 'टमाटर',
        kn: 'ಟೊಮೇಟೊ'
      },
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=600',
      basicCare: {
        en: 'Water consistently, provide 6-8 hours of sunlight daily. Plant in well-draining soil rich in organic matter.',
        hi: 'नियमित रूप से पानी दें, दैनिक 6-8 घंटे धूप प्रदान करें। जैविक पदार्थों से भरपूर अच्छी जल निकासी वाली मिट्टी में लगाएं।',
        kn: 'ನಿಯಮಿತವಾಗಿ ನೀರು ಹಾಕಿ, ದೈನಿಕ 6-8 ಗಂಟೆಗಳ ಸೂರ್ಯನ ಬೆಳಕು ಒದಗಿಸಿ. ಸಾವಯವ ವಸ್ತುಗಳಿಂದ ಸಮೃದ್ಧವಾದ ಒಳ್ಳೆಯ ನೀರು ಬಸಿಯುವ ಮಣ್ಣಿನಲ್ಲಿ ನೆಡಿ.'
      },
      advancedCare: {
        en: 'Prune suckers for indeterminate varieties, stake or cage plants. Use balanced fertilizer (10-10-10) every 4-6 weeks.',
        hi: 'अनिश्चित किस्मों के लिए अंकुरों को छंटनी करें, पौधों को खूंटी या पिंजरे से सहारा दें। हर 4-6 सप्ताह में संतुलित उर्वरक (10-10-10) का उपयोग करें।',
        kn: 'ಅನಿರ್ಧರಿತ ತಳಿಗಳಿಗೆ ಚಿಗುರುಗಳನ್ನು ಕತ್ತರಿಸಿ, ಸಸ್ಯಗಳಿಗೆ ಮೊಳೆ ಅಥವಾ ಪಂಜರ ಹಾಕಿರಿ. ಪ್ರತಿ 4-6 ವಾರಗಳಿಗೊಮ್ಮೆ ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರವನ್ನು (10-10-10) ಬಳಸಿ.'
      },
      commonIssues: {
        en: 'Blight, blossom end rot, cracking. Prevent with proper watering, crop rotation, and adequate calcium.',
        hi: 'अंगमारी, फूल के अंत का सड़ना, दरारें। उचित जल, फसल चक्र और पर्याप्त कैल्शियम के साथ रोकें।',
        kn: 'ಬ್ಲೈಟ್, ಹೂವಿನ ಕೊನೆಯ ಕೊಳೆತ, ಬಿರುಕುಗಳು. ಸರಿಯಾದ ನೀರಾವರಿ, ಬೆಳೆ ತಿರುಗುವಿಕೆ ಮತ್ತು ಸಾಕಷ್ಟು ಕ್ಯಾಲ್ಸಿಯಂನೊಂದಿಗೆ ತಡೆಯಿರಿ.'
      }
    },
    {
      id: 'basil',
      name: {
        en: 'Basil',
        hi: 'तुलसी',
        kn: 'ತುಳಸಿ'
      },
      image: BasilImg,
      basicCare: {
        en: 'Water when soil feels dry, place in bright, indirect light. Keep soil consistently moist but not soggy.',
        hi: 'जब मिट्टी सूखी महसूस हो तो पानी दें, उज्ज्वल, अप्रत्यक्ष प्रकाश में रखें। मिट्टी को लगातार नम रखें लेकिन गीला न होने दें।',
        kn: 'ಮಣ್ಣು ಒಣಗಿದಂತೆ ಅನಿಸಿದಾಗ ನೀರು ಹಾಕಿ, ಪ್ರಕಾಶಮಾನವಾದ, ಪರೋಕ್ಷ ಬೆಳಕಿನಲ್ಲಿ ಇರಿಸಿ. ಮಣ್ಣನ್ನು ನಿರಂತರವಾಗಿ ತೇವವಾಗಿ ಇರಿಸಿ ಆದರೆ ನೆನೆದು ಹೋಗಲು ಬಿಡಬೇಡಿ.'
      },
      advancedCare: {
        en: 'Pinch off flower buds to promote leaf growth. Fertilize with diluted organic fertilizer monthly.',
        hi: 'पत्ती के विकास को बढ़ावा देने के लिए फूल की कलियों को चुटकी से निकालें। मासिक रूप से पतला किए गए जैविक उर्वरक से उर्वरित करें।',
        kn: 'ಎಲೆ ಬೆಳವಣಿಗೆಯನ್ನು ಉತ್ತೇಜಿಸಲು ಹೂವಿನ ಮೊಗ್ಗುಗಳನ್ನು ಚಿವುಟಿ ತೆಗೆಯಿರಿ. ತಿಂಗಳಿಗೊಮ್ಮೆ ತಿಳುವಾದ ಸಾವಯವ ಗೊಬ್ಬರವನ್ನು ಹಾಕಿ.'
      },
      commonIssues: {
        en: 'Downy mildew, aphids, leaf spot. Maintain good air circulation and avoid overcrowding plants.',
        hi: 'डाउनी फफूंदी, एफिड्स, पत्ती के धब्बे। अच्छे वायु संचरण को बनाए रखें और पौधों की भीड़भाड़ से बचें।',
        kn: 'ಡೌನಿ ಮಿಲ್ಡ್ಯೂ, ಸಸ್ಯಹೇನು, ಎಲೆ ಕಲೆ. ಒಳ್ಳೆಯ ಗಾಳಿ ಸಂಚಾರವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಸಸ್ಯಗಳು ಜನಜಂಗುಳಿ ಆಗುವುದನ್ನು ತಪ್ಪಿಸಿ.'
      }
    },
    {
      id: 'rose',
      name: {
        en: 'Rose',
        hi: 'गुलाब',
        kn: 'ಗುಲಾಬಿ'
      },
      image: 'https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=600',
      basicCare: {
        en: 'Water at the base of the plant in the morning, provide 6+ hours of sunlight. Mulch to retain moisture.',
        hi: 'सुबह में पौधे के आधार पर पानी दें, 6+ घंटे धूप प्रदान करें। नमी बनाए रखने के लिए मल्च करें।',
        kn: 'ಬೆಳಿಗ್ಗೆ ಸಸ್ಯದ ಬುಡದಲ್ಲಿ ನೀರು ಹಾಕಿ, 6+ ಗಂಟೆಗಳ ಸೂರ್ಯನ ಬೆಳಕು ಒದಗಿಸಿ. ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ಮಲ್ಚ್ ಮಾಡಿ.'
      },
      advancedCare: {
        en: 'Prune in late winter/early spring. Fertilize with rose-specific fertilizer after first bloom and monthly through growing season.',
        hi: 'देर सर्दियों/वसंत की शुरुआत में छंटाई करें। पहले खिलने के बाद और उगाने के मौसम के दौरान मासिक रूप से गुलाब-विशिष्ट उर्वरक से उर्वरित करें।',
        kn: 'ಚಳಿಗಾಲದ ಕೊನೆಯಲ್ಲಿ/ವಸಂತ ಋತುವಿನ ಆರಂಭದಲ್ಲಿ ಕತ್ತರಿಸಿ. ಮೊದಲ ಹೂವು ಬಿಟ್ಟ ನಂತರ ಮತ್ತು ಬೆಳೆಯುವ ಋತುವಿನುದ್ದಕ್ಕೂ ತಿಂಗಳಿಗೊಮ್ಮೆ ಗುಲಾಬಿಗೆ ನಿರ್ದಿಷ್ಟವಾದ ಗೊಬ್ಬರವನ್ನು ಹಾಕಿ.'
      },
      commonIssues: {
        en: 'Black spot, powdery mildew, aphids. Regular pruning and proper air circulation help prevent fungal diseases.',
        hi: 'काला धब्बा, चूर्णिल फफूंदी, एफिड्स। नियमित छंटाई और उचित वायु संचार कवक रोगों को रोकने में मदद करता है।',
        kn: 'ಕಪ್ಪು ಕಲೆ, ಪುಡಿ ಮಿಲ್ಡ್ಯೂ, ಸಸ್ಯಹೇನು. ನಿಯಮಿತ ಕತ್ತರಿಸುವಿಕೆ ಮತ್ತು ಸರಿಯಾದ ಗಾಳಿ ಸಂಚಾರವು ಶಿಲೀಂಧ್ರ ರೋಗಗಳನ್ನು ತಡೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.'
      }
    },
    {
      id: 'succulent',
      name: {
        en: 'Succulent',
        hi: 'मांसल पौधा',
        kn: 'ಸಕ್ಯುಲೆಂಟ್'
      },
      image: SucculentImg,
      basicCare: {
        en: 'Water only when soil is completely dry, provide bright light. Use well-draining cactus/succulent soil.',
        hi: 'केवल तब पानी दें जब मिट्टी पूरी तरह से सूखी हो, तेज़ रोशनी प्रदान करें। अच्छी जल निकासी वाली कैक्टस/मांसल मिट्टी का उपयोग करें।',
        kn: 'ಮಣ್ಣು ಸಂಪೂರ್ಣವಾಗಿ ಒಣಗಿದಾಗ ಮಾತ್ರ ನೀರು ಹಾಕಿ, ಪ್ರಕಾಶಮಾನವಾದ ಬೆಳಕನ್ನು ಒದಗಿಸಿ. ಒಳ್ಳೆಯ ನೀರು ಬಸಿಯುವ ಕ್ಯಾಕ್ಟಸ್/ಸಕ್ಯುಲೆಂಟ್ ಮಣ್ಣನ್ನು ಬಳಸಿ.'
      },
      advancedCare: {
        en: 'Repot every 2-3 years in slightly larger containers. Fertilize with diluted succulent fertilizer during growing season only.',
        hi: 'हर 2-3 साल में थोड़े बड़े कंटेनर में रीपॉट करें। केवल उगाने के मौसम के दौरान पतले मांसल उर्वरक से उर्वरित करें।',
        kn: 'ಪ್ರತಿ 2-3 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಸ್ವಲ್ಪ ದೊಡ್ಡ ಪಾತ್ರೆಗಳಲ್ಲಿ ಮರುನೆಡಿ. ಬೆಳೆಯುವ ಋತುವಿನಲ್ಲಿ ಮಾತ್ರ ತಿಳುವಾದ ಸಕ್ಯುಲೆಂಟ್ ಗೊಬ್ಬರವನ್ನು ಹಾಕಿ.'
      },
      commonIssues: {
        en: 'Root rot, mealybugs, sunburn. Most issues are caused by overwatering; allow soil to dry completely between waterings.',
        hi: 'रूट रॉट, मीलीबग, सनबर्न। अधिकांश समस्याएं अधिक पानी या खराब जल निकासी से आती हैं; पानी देने के बीच मिट्टी को पूरी तरह से सूखने दें।',
        kn: 'ಬೇರು ಕೊಳೆತ, ಮೀಲಿಬಗ್ಸ್, ಸೂರ್ಯಘಾತ. ಹೆಚ್ಚಿನ ಸಮಸ್ಯೆಗಳು ಅತಿಯಾದ ನೀರು ಹಾಕುವುದರಿಂದ ಉಂಟಾಗುತ್ತವೆ; ನೀರು ಹಾಕುವ ನಡುವೆ ಮಣ್ಣು ಸಂಪೂರ್ಣವಾಗಿ ಒಣಗಲು ಅವಕಾಶ ನೀಡಿ.'
      }
    },
    {
      id: 'monstera',
      name: {
        en: 'Monstera',
        hi: 'मॉन्स्टेरा',
        kn: 'ಮಾನ್ಸ್ಟೆರಾ'
      },
      image: MonsteraImg,
      basicCare: {
        en: 'Water when top inch of soil is dry, provide bright indirect light. High humidity preferred.',
        hi: 'जब मिट्टी की ऊपरी इंच सूखी हो तो पानी दें, उज्ज्वल अप्रत्यक्ष प्रकाश प्रदान करें। उच्च आर्द्रता पसंद की जाती है।',
        kn: 'ಮಣ್ಣಿನ ಮೇಲಿನ ಇಂಚು ಒಣಗಿದಾಗ ನೀರು ಹಾಕಿ, ಪ್ರಕಾಶಮಾನವಾದ ಪರೋಕ್ಷ ಬೆಳಕನ್ನು ಒದಗಿಸಿ. ಹೆಚ್ಚಿನ ಆರ್ದ್ರತೆಯನ್ನು ಇಷ್ಟಪಡುತ್ತದೆ.'
      },
      advancedCare: {
        en: 'Support with moss pole for climbing. Wipe leaves occasionally to remove dust. Fertilize monthly during growing season.',
        hi: 'चढ़ने के लिए मॉस पोल के साथ सहायता करें। धूल हटाने के लिए कभी-कभी पत्तियों को पोंछें। बढ़ते मौसम के दौरान मासिक रूप से उर्वरित करें।',
        kn: 'ಹತ್ತಲು ಮಾಸ್ ಪೋಲ್‌ನೊಂದಿಗೆ ಬೆಂಬಲಿಸಿ. ಧೂಳನ್ನು ತೆಗೆಯಲು ಎಲೆಗಳನ್ನು ಒಮ್ಮೊಮ್ಮೆ ಒರೆಸಿ. ಬೆಳೆಯುವ ಋತುವಿನಲ್ಲಿ ತಿಂಗಳಿಗೊಮ್ಮೆ ಗೊಬ್ಬರ ಹಾಕಿ.'
      },
      commonIssues: {
        en: 'Yellowing leaves, brown spots, root rot. Often due to overwatering or insufficient light. Adjust care accordingly.',
        hi: 'पीली पत्तियां, भूरे धब्बे, रूट रॉट। अक्सर अधिक पानी देने या अपर्याप्त प्रकाश के कारण। तदनुसार देखभाल समायोजित करें।',
        kn: 'ಹಳದಿಯಾಗುವ ಎಲೆಗಳು, ಕಂದು ಕಲೆಗಳು, ಬೇರು ಕೊಳೆತ. ಸಾಮಾನ್ಯವಾಗಿ ಅತಿಯಾದ ನೀರು ಹಾಕುವುದು ಅಥವಾ ಅಪರ್ಯಾಪ್ತ ಬೆಳಕಿನಿಂದಾಗಿ. ಅದಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಆರೈಕೆಯನ್ನು ಸರಿಹೊಂದಿಸಿ.'
      }
    },
    {
      id: 'peaceLily',
      name: {
        en: 'Peace Lily',
        hi: 'पीस लिली',
        kn: 'ಪೀಸ್ ಲಿಲ್ಲಿ'
      },
      image: PeaceLilyImg,
      basicCare: {
        en: 'Keep soil consistently moist but not soggy. Thrives in low to medium indirect light. Loves humidity.',
        hi: 'मिट्टी को लगातार नम रखें लेकिन गीला न होने दें। कम से मध्यम अप्रत्यक्ष प्रकाश में पनपती है। आर्द्रता पसंद करती है।',
        kn: 'ಮಣ್ಣನ್ನು ನಿರಂತರವಾಗಿ ತೇವವಾಗಿ ಇರಿಸಿ ಆದರೆ ನೆನೆದು ಹೋಗಲು ಬಿಡಬೇಡಿ. ಕಡಿಮೆಯಿಂದ ಮಧ್ಯಮ ಪರೋಕ್ಷ ಬೆಳಕಿನಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ. ಆರ್ದ್ರತೆಯನ್ನು ಇಷ್ಟಪಡುತ್ತದೆ.'
      },
      advancedCare: {
        en: 'Fertilize every 6-8 weeks with diluted houseplant fertilizer. Repot every 1-2 years or when rootbound.',
        hi: 'हर 6-8 सप्ताह में पतले घरेलू पौधे के उर्वरक से उर्वरित करें। हर 1-2 साल में या जब जड़ें बाध्य हों तब रीपॉट करें।',
        kn: 'ಪ್ರತಿ 6-8 ವಾರಗಳಿಗೆ ತಿಳುವಾದ ಮನೆ ಸಸ್ಯ ಗೊಬ್ಬರದೊಂದಿಗೆ ಗೊಬ್ಬರ ಹಾಕಿ. ಪ್ರತಿ 1-2 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಅಥವಾ ಬೇರುಗಳು ಸುತ್ತಿಕೊಂಡಾಗ ಮರುನೆಡಿ.'
      },
      commonIssues: {
        en: 'Brown leaf tips, yellow leaves, drooping. Brown tips often indicate low humidity, while drooping signals need for water.',
        hi: 'भूरे पत्ती की नोक, पीली पत्तियां, झुकना। भूरे टिप्स अक्सर कम आर्द्रता का संकेत देते हैं, जबकि झुकना पानी की आवश्यकता का संकेत देता है।',
        kn: 'ಕಂದು ಎಲೆ ತುದಿಗಳು, ಹಳದಿ ಎಲೆಗಳು, ಬಾಗುವುದು. ಕಂದು ತುದಿಗಳು ಸಾಮಾನ್ಯವಾಗಿ ಕಡಿಮೆ ಆರ್ದ್ರತೆಯನ್ನು ಸೂಚಿಸುತ್ತವೆ, ಬಾಗುವುದು ನೀರಿನ ಅಗತ್ಯವನ್ನು ಸೂಚಿಸುತ್ತದೆ.'
      }
    },
    {
      id: 'lavender',
      name: {
        en: 'Lavender',
        hi: 'लैवेंडर',
        kn: 'ಲ್ಯಾವೆಂಡರ್'
      },
      image: LavenderImg,
      basicCare: {
        en: 'Water when soil is dry, provide full sun (6+ hours daily). Requires excellent drainage and sandy soil.',
        hi: 'जब मिट्टी सूखी हो तब पानी दें, पूर्ण धूप प्रदान करें (दैनिक 6+ घंटे)। उत्कृष्ट जल निकासी और रेतीली मिट्टी की आवश्यकता होती है।',
        kn: 'ಮಣ್ಣು ಒಣಗಿದಾಗ ನೀರು ಹಾಕಿ, ಪೂರ್ಣ ಸೂರ್ಯನ ಬೆಳಕನ್ನು ಒದಗಿಸಿ (ದಿನಕ್ಕೆ 6+ ಗಂಟೆಗಳು). ಉತ್ತಮ ಒಳಚರಂಡಿ ಮತ್ತು ಮರಳು ಮಣ್ಣಿನ ಅಗತ್ಯವಿದೆ.'
      },
      advancedCare: {
        en: 'Prune after flowering to maintain shape. Add lime to soil if needed to raise pH. Minimal fertilizer required.',
        hi: 'आकार बनाए रखने के लिए फूल आने के बाद छंटाई करें। यदि आवश्यक हो तो पीएच बढ़ाने के लिए मिट्टी में चूना मिलाएं। न्यूनतम उर्वरक की आवश्यकता होती है।',
        kn: 'ಆಕಾರವನ್ನು ಕಾಯ್ದುಕೊಳ್ಳಲು ಹೂವು ಬಿಟ್ಟ ನಂತರ ಕತ್ತರಿಸಿ. ಪಿಎಚ್ ಅನ್ನು ಹೆಚ್ಚಿಸಲು ಅಗತ್ಯವಿದ್ದರೆ ಮಣ್ಣಿಗೆ ಸುಣ್ಣ ಸೇರಿಸಿ. ಕನಿಷ್ಠ ಗೊಬ್ಬರದ ಅಗತ್ಯವಿದೆ.'
      },
      commonIssues: {
        en: 'Root rot, fungal diseases, woody growth. Most issues come from overwatering or poor drainage. Prefer dry conditions.',
        hi: 'रूट रॉट, कवक रोग, लकड़ी की वृद्धि। अधिकांश समस्याएं अधिक पानी या खराब जल निकासी से आती हैं। सूखी परिस्थितियों को प्राथमिकता दें।',
        kn: 'ಬೇರು ಕೊಳೆತ, ಶಿಲೀಂಧ್ರ ರೋಗಗಳು, ಮರದಂತಹ ಬೆಳವಣಿಗೆ. ಹೆಚ್ಚಿನ ಸಮಸ್ಯೆಗಳು ಅತಿಯಾದ ನೀರು ಹಾಕುವುದರಿಂದ ಅಥವಾ ಕಳಪೆ ಒಳಚರಂಡಿಯಿಂದ ಬರುತ್ತವೆ. ಒಣ ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಇಷ್ಟಪಡುತ್ತದೆ.'
      }
    },
    {
      id: 'aloe',
      name: {
        en: 'Aloe Vera',
        hi: 'एलोवेरा',
        kn: 'ಅಲೋವೇರಾ'
      },
      image: AloeVeraImg,
      basicCare: {
        en: 'Water deeply but infrequently, allowing soil to dry completely between waterings. Bright indirect light.',
        hi: 'गहराई से लेकिन अनियमित रूप से पानी दें, पानी देने के बीच मिट्टी को पूरी तरह से सूखने दें। उज्ज्वल अप्रत्यक्ष प्रकाश।',
        kn: 'ಆಳವಾಗಿ ಆದರೆ ಅಪರೂಪವಾಗಿ ನೀರು ಹಾಕಿ, ನೀರು ಹಾಕುವ ನಡುವೆ ಮಣ್ಣನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ಒಣಗಲು ಅವಕಾಶ ನೀಡಿ. ಪ್ರಕಾಶಮಾನವಾದ ಪರೋಕ್ಷ ಬೆಳಕು.'
      },
      advancedCare: {
        en: 'Repot when plant becomes top-heavy or produces many offsets. Use cactus/succulent soil mix with added perlite.',
        hi: 'जब पौधा ऊपर से भारी हो जाए या कई ऑफसेट उत्पन्न करे तब रीपॉट करें। अतिरिक्त पर्लाइट के साथ कैक्टस/मांसल मिट्टी मिश्रण का उपयोग करें।',
        kn: 'ಸಸ್ಯವು ಮೇಲ್ಭಾಗದಲ್ಲಿ ಭಾರವಾದಾಗ ಅಥವಾ ಹಲವಾರು ಪಕ್ಕದ ಸಸಿಗಳನ್ನು ಉತ್ಪಾದಿಸಿದಾಗ ಮರುನೆಡಿ. ಹೆಚ್ಚುವರಿ ಪರ್ಲೈಟ್‌ನೊಂದಿಗೆ ಕ್ಯಾಕ್ಟಸ್/ಸಕ್ಯುಲೆಂಟ್ ಮಣ್ಣಿನ ಮಿಶ್ರಣವನ್ನು ಬಳಸಿ.'
      },
      commonIssues: {
        en: 'Brown soft spots (overwatering), shriveled leaves (underwatering), stretching (insufficient light). Very sensitive to overwatering.',
        hi: 'भूरे नरम धब्बे (अधिक पानी), सिकुड़ी हुई पत्तियां (कम पानी), खिंचाव (अपर्याप्त प्रकाश)। अधिक पानी देने के प्रति बहुत संवेदनशील।',
        kn: 'ಕಂದು ಮೃದು ಕಲೆಗಳು (ಅತಿಯಾದ ನೀರು), ಸುಕ್ಕುಗಟ್ಟಿದ ಎಲೆಗಳು (ಕಡಿಮೆ ನೀರು), ಹಿಗ್ಗುವಿಕೆ (ಅಪರ್ಯಾಪ್ತ ಬೆಳಕು). ಅತಿಯಾದ ನೀರಿಗೆ ತುಂಬಾ ಸೂಕ್ಷ್ಮವಾಗಿದೆ.'
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

      <main className="container mx-auto px-4 py-12 flex-grow">
        <h1 className="text-3xl font-playfair text-center text-leaf-primary font-bold mb-8">
          {language === 'en' ? 'Plant Care Guide' : 
           language === 'hi' ? 'पौधों की देखभाल गाइड' : 
           'ಸಸ್ಯ ಆರೈಕೆ ಮಾರ್ಗದರ್ಶಿ'}
        </h1>
        
        <Tabs defaultValue="grid" className="mb-8">
          <TabsList className="w-full bg-leaf-light/10 mb-6">
            <TabsTrigger 
              value="grid" 
              className="flex-1 data-[state=active]:bg-leaf-primary data-[state=active]:text-white"
            >
              {language === 'en' ? 'Grid View' : 
               language === 'hi' ? 'ग्रिड व्यू' : 
               'ಗ್ರಿಡ್ ನೋಟ'}
            </TabsTrigger>
            <TabsTrigger 
              value="list" 
              className="flex-1 data-[state=active]:bg-leaf-primary data-[state=active]:text-white"
            >
              {language === 'en' ? 'List View' : 
               language === 'hi' ? 'लिस्ट व्यू' : 
               'ಪಟ್ಟಿ ನೋಟ'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="grid" className="mt-0">
            <PlantGrid
              plants={plants}
              language={language}
              selectedInfoType={selectedInfoType}
              onInfoTypeChange={setSelectedInfoType}
            />
          </TabsContent>
          
          <TabsContent value="list" className="mt-0">
            <PlantList
              plants={plants}
              language={language}
              selectedInfoType={selectedInfoType}
              onInfoTypeChange={setSelectedInfoType}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Plants;
