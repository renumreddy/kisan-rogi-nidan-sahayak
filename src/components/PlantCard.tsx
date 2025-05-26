
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlantToggleGroup } from './PlantToggleGroup';

export interface Plant {
  id: string;
  name: {
    en: string;
    hi: string;
    kn: string;
  };
  image: string;
  basicCare: {
    en: string;
    hi: string;
    kn: string;
  };
  advancedCare: {
    en: string;
    hi: string;
    kn: string;
  };
  commonIssues: {
    en: string;
    hi: string;
    kn: string;
  };
}

type PlantInfoType = 'basic' | 'advanced' | 'issues';

interface PlantCardProps {
  plant: Plant;
  language: 'en' | 'hi' | 'kn';
  selectedInfoType: PlantInfoType;
  onInfoTypeChange: (type: PlantInfoType) => void;
  isListView?: boolean;
}

export const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  language,
  selectedInfoType,
  onInfoTypeChange,
  isListView = false
}) => {
  const getDisplayContent = (plant: Plant, type: PlantInfoType) => {
    switch(type) {
      case 'basic':
        return plant.basicCare[language];
      case 'advanced':
        return plant.advancedCare[language];
      case 'issues':
        return plant.commonIssues[language];
      default:
        return plant.basicCare[language];
    }
  };

  if (isListView) {
    return (
      <Card className="bg-white/95 shadow-md border-leaf-light/20">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
            <img 
              src={plant.image} 
              alt={plant.name[language]} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-2xl font-playfair text-leaf-primary">{plant.name[language]}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <PlantToggleGroup
                selectedInfoType={selectedInfoType}
                onInfoTypeChange={onInfoTypeChange}
                language={language}
                size="sm"
              />
              <p className="text-gray-600 leading-relaxed">
                {getDisplayContent(plant, selectedInfoType)}
              </p>
            </CardContent>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 shadow-md border-leaf-light/20 overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img 
          src={plant.image} 
          alt={plant.name[language]} 
          className="w-full h-full object-cover transition-transform hover:scale-105"
          loading="lazy"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-playfair text-leaf-primary">{plant.name[language]}</CardTitle>
      </CardHeader>
      <CardContent>
        <PlantToggleGroup
          selectedInfoType={selectedInfoType}
          onInfoTypeChange={onInfoTypeChange}
          language={language}
          size="xs"
        />
        <p className="text-sm text-gray-600">
          {getDisplayContent(plant, selectedInfoType)}
        </p>
      </CardContent>
    </Card>
  );
};
