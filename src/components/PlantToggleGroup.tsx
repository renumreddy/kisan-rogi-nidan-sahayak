
import React from 'react';
import {
  ToggleGroup,
  ToggleGroupItem
} from '@/components/ui/toggle-group';

type PlantInfoType = 'basic' | 'advanced' | 'issues';

interface PlantToggleGroupProps {
  selectedInfoType: PlantInfoType;
  onInfoTypeChange: (type: PlantInfoType) => void;
  language: 'en' | 'hi' | 'kn';
  size?: 'xs' | 'sm';
}

export const PlantToggleGroup: React.FC<PlantToggleGroupProps> = ({
  selectedInfoType,
  onInfoTypeChange,
  language,
  size = 'xs'
}) => {
  const getLabels = () => {
    switch (language) {
      case 'hi':
        return {
          basic: 'बुनियादी देखभाल',
          advanced: 'उन्नत',
          issues: 'समस्याएं'
        };
      case 'kn':
        return {
          basic: 'ಮೂಲ ಆರೈಕೆ',
          advanced: 'ಮುಂದುವರಿದ',
          issues: 'ಸಮಸ್ಯೆಗಳು'
        };
      default:
        return {
          basic: 'Basic Care',
          advanced: 'Advanced',
          issues: 'Issues'
        };
    }
  };

  const labels = getLabels();
  const textSize = size === 'xs' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-2';

  return (
    <ToggleGroup 
      type="single" 
      value={selectedInfoType}
      className="justify-start mb-4"
      onValueChange={(value) => {
        if (value) onInfoTypeChange(value as PlantInfoType);
      }}
    >
      <ToggleGroupItem 
        value="basic"
        className={`${textSize} data-[state=on]:bg-leaf-light data-[state=on]:text-white`}
      >
        {labels.basic}
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="advanced"
        className={`${textSize} data-[state=on]:bg-leaf-light data-[state=on]:text-white`}
      >
        {labels.advanced}
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="issues"
        className={`${textSize} data-[state=on]:bg-leaf-light data-[state=on]:text-white`}
      >
        {labels.issues}
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
