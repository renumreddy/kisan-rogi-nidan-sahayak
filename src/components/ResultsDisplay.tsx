
import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage, translateDisease, getTranslatedTreatment, getTranslatedPesticides } from '@/context/LanguageContext';

interface PredictionResult {
  disease: string;
  confidence: number;
}

interface ResultsDisplayProps {
  prediction: PredictionResult;
  imageData: string;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ prediction, imageData, onReset }) => {
  const { t, language } = useLanguage();
  const translatedDiseaseName = translateDisease(prediction.disease, language);
  const treatment = getTranslatedTreatment(prediction.disease, language);
  const pesticides = getTranslatedPesticides(prediction.disease, language);
  
  const confidencePercentage = Math.round(prediction.confidence * 100);
  
  // Determine style based on confidence
  const getConfidenceColorClass = () => {
    if (confidencePercentage >= 80) return 'text-green-600';
    if (confidencePercentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="w-full md:w-1/3">
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
              <img 
                src={imageData} 
                alt="Analyzed leaf" 
                className="w-full h-auto object-cover aspect-square"
              />
            </CardHeader>
          </Card>
        </div>

        <div className="w-full md:w-2/3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('results')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{t('disease')}</span>
                    <span className="text-sm font-bold">{translatedDiseaseName}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{t('confidence')}</span>
                    <span className={`text-sm font-bold ${getConfidenceColorClass()}`}>
                      {confidencePercentage}%
                    </span>
                  </div>
                  <Progress
                    value={confidencePercentage}
                    className="h-2"
                  />
                </div>

                <div>
                  <h4 className="font-medium mb-1">{t('treatment')}</h4>
                  <p className="text-sm text-gray-700">{treatment}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-1">{t('pesticides')}</h4>
                  <p className="text-sm text-gray-700">{pesticides}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button onClick={onReset}>{t('tryAnother')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
