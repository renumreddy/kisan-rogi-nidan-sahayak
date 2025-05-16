
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

interface ImageCaptureProps {
  onImageCaptured: (imageData: string) => void;
  onClose: () => void;
}

const ImageCapture: React.FC<ImageCaptureProps> = ({ onImageCaptured, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setStream(mediaStream);
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        if ((error as Error).name === 'NotAllowedError') {
          toast({
            title: t('cameraAccessDenied'),
            variant: 'destructive'
          });
        } else if ((error as Error).name === 'NotFoundError') {
          toast({
            title: t('cameraNotFound'),
            variant: 'destructive'
          });
        } else {
          toast({
            title: (error as Error).message,
            variant: 'destructive'
          });
        }
        onClose();
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onClose, toast, t]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to data URL
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
      }
    }
  };

  const confirmImage = () => {
    if (capturedImage) {
      onImageCaptured(capturedImage);
      // Stop the camera stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const retakeImage = () => {
    setCapturedImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg overflow-hidden max-w-lg w-full">
        <div className="p-4 bg-leaf-primary text-white">
          <h3 className="text-lg font-semibold">{capturedImage ? t('confirm') : t('capture')}</h3>
        </div>
        
        <div className="p-4">
          {!capturedImage ? (
            <>
              <div className="relative bg-black rounded-lg overflow-hidden aspect-square mb-4">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex justify-between gap-2">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  {t('cancel')}
                </Button>
                <Button 
                  onClick={captureImage} 
                  className="flex-1 bg-leaf-primary hover:bg-leaf-dark"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  {t('capture')}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="relative bg-black rounded-lg overflow-hidden aspect-square mb-4">
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex justify-between gap-2">
                <Button variant="outline" onClick={retakeImage} className="flex-1">
                  {t('retake')}
                </Button>
                <Button 
                  onClick={confirmImage} 
                  className="flex-1 bg-leaf-primary hover:bg-leaf-dark"
                >
                  {t('confirm')}
                </Button>
              </div>
            </>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default ImageCapture;
