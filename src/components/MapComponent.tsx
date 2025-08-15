import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    L: any;
  }
}

interface MapComponentProps {
  onCoordinatesUpdate: (lat: number, lng: number) => void;
  onShow360Image?: (lat: number, lng: number) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ onCoordinatesUpdate, onShow360Image }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.L) {
      initializeMap();
    } else {
      loadLeafletLibraries().then(() => {
        initializeMap();
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const loadLeafletLibraries = async () => {
    if (!document.querySelector('link[href*="leaflet.css"]')) {
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
      document.head.appendChild(leafletCSS);
    }

    if (!document.querySelector('link[href*="Control.Geocoder.css"]')) {
      const geocoderCSS = document.createElement('link');
      geocoderCSS.rel = 'stylesheet';
      geocoderCSS.href = 'https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css';
      document.head.appendChild(geocoderCSS);
    }

    if (!window.L) {
      await loadScript('https://unpkg.com/leaflet/dist/leaflet.js');
    }

    if (!window.L.Control.Geocoder) {
      await loadScript('https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js');
    }
  };

  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const initializeMap = () => {
    if (!mapRef.current) return;
    
    const center = [-6.8285, 39.2815];
    const map = window.L.map(mapRef.current).setView(center, 18);
    mapInstanceRef.current = map;

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    setupMapClickHandler(map);
    setupSearchControl(map);
    drawCollegeBoundary(map);
  };

  const setupMapClickHandler = (map: any) => {
    map.on('click', function(e: any) {
      const lat = parseFloat(e.latlng.lat.toFixed(6));
      const lng = parseFloat(e.latlng.lng.toFixed(6));
      
      onCoordinatesUpdate(lat, lng);
      
      if (onShow360Image) {
        console.log('Triggering 360 image viewer for:', lat, lng);
        onShow360Image(lat, lng);
      }
      
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      
      markerRef.current = window.L.marker([lat, lng]).addTo(map)
        .bindPopup(`Lat: ${lat}<br>Lng: ${lng}<br>Click to view 360°`)
        .openPopup();
    });
  };

  const setupSearchControl = (map: any) => {
    window.L.Control.geocoder({
      defaultMarkGeocode: false
    })
    .on('markgeocode', function(e: any) {
      const latlng = e.geocode.center;
      map.setView(latlng, 18);
      
      if (markerRef.current) {
        map.removeLayer(markerRef.current);
      }
      
      markerRef.current = window.L.marker(latlng).addTo(map)
        .bindPopup(e.geocode.name)
        .openPopup();
      
      const lat = parseFloat(latlng.lat.toFixed(6));
      const lng = parseFloat(latlng.lng.toFixed(6));
      onCoordinatesUpdate(lat, lng);
      
      if (onShow360Image) {
        onShow360Image(lat, lng);
      }
    })
    .addTo(map);
  };

  const drawCollegeBoundary = (map: any) => {
    const bounds = [
      [-6.8295, 39.2805],
      [-6.8275, 39.2825]
    ];
    
    window.L.rectangle(bounds, {
      color: "#2563eb",
      weight: 2,
      fillOpacity: 0.1
    }).addTo(map);
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-2xl font-semibold text-foreground mb-4">Interactive Campus Map</h3>
      <div
        ref={mapRef}
        className="w-full h-[600px] rounded-lg border border-border"
      />
    </div>
  );
};

export default MapComponent;