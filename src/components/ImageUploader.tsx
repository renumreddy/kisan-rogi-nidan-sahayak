
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Camera } from 'lucide-react';
import ImageCapture from './ImageCapture';
import { useLanguage } from '@/context/LanguageContext';

interface ImageUploaderProps {
  onImageSelected: (imageData: string) => void;
  isProcessing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isProcessing }) => {
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelected(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    setShowCamera(true);
  };

  const handleImageCaptured = (imageData: string) => {
    onImageSelected(imageData);
    setShowCamera(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-3 justify-center">
        <Button
          onClick={handleUploadClick}
          disabled={isProcessing}
          className="bg-leaf-primary hover:bg-leaf-dark flex items-center gap-2"
        >
          <Upload size={18} />
          {t('uploadButton')}
        </Button>
        <Button
          onClick={handleCameraClick}
          disabled={isProcessing}
          className="bg-leaf-accent hover:bg-leaf-accent/80 flex items-center gap-2"
        >
          <Camera size={18} />
          {t('cameraButton')}
        </Button>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      
      {showCamera && (
        <ImageCapture 
          onImageCaptured={handleImageCaptured}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
};

export default ImageUploader;
