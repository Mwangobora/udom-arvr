import React from 'react';
import { useMapEvents } from 'react-leaflet';
import { MapClickHandlerProps } from '../types';

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick, isAddingMode }) => {
	useMapEvents({
		click: (e) => {
			if (isAddingMode) {
				onMapClick(e.latlng);
			}
		},
	});
	return null;
};

export default MapClickHandler;
