// components.tsx
import React from 'react';
import { useMapEvents } from 'react-leaflet';
import { MapClickHandlerProps, Position } from './types';

// Handle map click events
export function MapClickHandler({ onMapClick, isAddingMode }: MapClickHandlerProps) {
	useMapEvents({
		click: (e) => {
			if (isAddingMode) {
				onMapClick(e.latlng);
			}
		},
	});
	return null;
}

// Track mouse movement for live coordinates
export function MouseTracker({ setMousePosition }: { setMousePosition: (pos: Position) => void }) {
	useMapEvents({
		mousemove: (e) => setMousePosition({ lat: e.latlng.lat, lng: e.latlng.lng }),
	});
	return null;
}

// Display live coordinates overlay
interface CoordinatesOverlayProps {
	mousePosition: Position | null;
	currentPosition: Position | null;
}

export function CoordinatesOverlay({ mousePosition, currentPosition }: CoordinatesOverlayProps) {
	const displayPosition = mousePosition || currentPosition;

	return (
		<div className="absolute bottom-4 left-4 z-[1000] bg-white/90 rounded-md shadow p-2 text-xs">
			{displayPosition ? (
				<div>
					<span className="font-medium">Coordinates:</span>{' '}
					<span>
						{displayPosition.lat.toFixed(6)}, {displayPosition.lng.toFixed(6)}
					</span>
				</div>
			) : (
				<div className="text-gray-500">Move mouse over map</div>
			)}
		</div>
	);
}