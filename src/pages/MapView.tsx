import React, { useState } from 'react';
const InteractiveMap = React.lazy(() => import('@/components/InteractiveMap'));
import Image360Viewer from '@/components/Image360Viewer';
import ThemeToggle from '@/components/ThemeToggle';

interface Coordinates {
  lat: number | null;
  lng: number | null;
}

const MapView: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    lat: null,
    lng: null
  });
  const [viewerVisible, setViewerVisible] = useState(false);

  const handleCoordinatesUpdate = (lat: number, lng: number) => {
    console.log('Coordinates updated:', lat, lng);
    setCoordinates({ lat, lng });
  };

  const handleShow360Image = (lat: number, lng: number) => {
    console.log('Show 360 image called:', lat, lng);
    setCoordinates({ lat, lng });
    setViewerVisible(true);
  };

  const handleCloseViewer = () => {
    console.log('Closing viewer');
    setViewerVisible(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-between mb-4">
          <div></div>
          <ThemeToggle />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Campus Location Explorer
        </h1>
        <p className="text-muted-foreground">
          Click on the map to get coordinates and explore 360° views
        </p>
      </div>
      


      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Interactive Map (Add/Edit Hotspots)</h2>
        <React.Suspense fallback={<div>Loading map...</div>}>
          <InteractiveMap />
        </React.Suspense>
      </div>

      
      {/* <Image360Viewer 
        lat={coordinates.lat} 
        lng={coordinates.lng} 
        visible={viewerVisible} 
        onClose={handleCloseViewer} 
      /> */}
    </div>
  );
};

export default MapView;