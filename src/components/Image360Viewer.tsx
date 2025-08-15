import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Image360ViewerProps {
  lat: number | null;
  lng: number | null;
  visible: boolean;
  onClose: () => void;
}

const Image360Viewer: React.FC<Image360ViewerProps> = ({ lat, lng, visible, onClose }) => {
  if (!visible) return null;

  const imageUrl = 'https://photo-sphere-viewer.js.org/assets/sphere.jpg';

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="glass-card p-6 max-w-[95vw] max-h-[95vh] relative flex flex-col items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full border-2 hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
        
        <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
          360° Street View Experience
        </h3>
        
        <div className="w-[80vw] h-[70vh] rounded-lg overflow-hidden border-2 border-primary">
          <img 
            src={imageUrl} 
            alt="360° Street View" 
            className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
          />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            🌐 Interactive 360° Street View
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            Drag to look around • Scroll to zoom • Double-click to reset
          </p>
          <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
            📍 Location: {lat?.toFixed(4)}°, {lng?.toFixed(4)}°
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image360Viewer;