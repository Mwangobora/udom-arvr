import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Coordinates {
  lat: number | null;
  lng: number | null;
}

interface CoordinatesDisplayProps {
  coordinates: Coordinates;
}

const CoordinatesDisplay: React.FC<CoordinatesDisplayProps> = ({ 
  coordinates = { lat: null, lng: null } 
}) => {
  const formatCoordinate = (value: number | null): string => {
    return value !== null ? value.toFixed(6) : '-';
  };

  const getCoordinateText = (): string => {
    const lat = formatCoordinate(coordinates.lat);
    const lng = formatCoordinate(coordinates.lng);
    
    return `Latitude: ${lat}, Longitude: ${lng}`;
  };

  const hasCoordinates = coordinates.lat !== null && coordinates.lng !== null;

  return (
    <Card className={`mt-6 transition-all duration-300 ${
      hasCoordinates ? 'border-primary bg-primary/5' : 'border-border'
    }`}>
      <CardContent className="p-6 text-center">
        <div className="font-mono text-lg font-semibold text-foreground">
          {getCoordinateText()}
        </div>
        
        {hasCoordinates && (
          <div className="mt-3 text-sm text-muted-foreground">
            📍 Click anywhere on the map or search for a location to update coordinates
          </div>
        )}
        
        {!hasCoordinates && (
          <div className="mt-3 text-sm text-muted-foreground">
            🗺️ Click on the map or use the search function to select a location
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoordinatesDisplay;