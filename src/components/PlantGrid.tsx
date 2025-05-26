
import React from 'react';
import { PlantCard, Plant } from './PlantCard';

type PlantInfoType = 'basic' | 'advanced' | 'issues';

interface PlantGridProps {
  plants: Plant[];
  language: 'en' | 'hi' | 'kn';
  selectedInfoType: PlantInfoType;
  onInfoTypeChange: (type: PlantInfoType) => void;
}

export const PlantGrid: React.FC<PlantGridProps> = ({
  plants,
  language,
  selectedInfoType,
  onInfoTypeChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          language={language}
          selectedInfoType={selectedInfoType}
          onInfoTypeChange={onInfoTypeChange}
        />
      ))}
    </div>
  );
};
