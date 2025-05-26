
import React from 'react';
import { PlantCard, Plant } from './PlantCard';

type PlantInfoType = 'basic' | 'advanced' | 'issues';

interface PlantListProps {
  plants: Plant[];
  language: 'en' | 'hi' | 'kn';
  selectedInfoType: PlantInfoType;
  onInfoTypeChange: (type: PlantInfoType) => void;
}

export const PlantList: React.FC<PlantListProps> = ({
  plants,
  language,
  selectedInfoType,
  onInfoTypeChange
}) => {
  return (
    <div className="space-y-6">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          language={language}
          selectedInfoType={selectedInfoType}
          onInfoTypeChange={onInfoTypeChange}
          isListView={true}
        />
      ))}
    </div>
  );
};
