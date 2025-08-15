import React from 'react';
import { useMapEvents } from 'react-leaflet';
import { MouseTrackerProps } from '../types';

const MouseTracker: React.FC<MouseTrackerProps> = ({ setMousePosition }) => {
	useMapEvents({
		mousemove: (e) => setMousePosition({ lat: e.latlng.lat, lng: e.latlng.lng }),
	});
	return null;
};

export default MouseTracker;
