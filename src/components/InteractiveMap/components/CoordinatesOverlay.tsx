import React from 'react';
import { CoordinatesOverlayProps } from '../types';

const CoordinatesOverlay: React.FC<CoordinatesOverlayProps> = ({ mousePosition, currentPosition }) => {
	return (
		<div className="absolute bottom-4 left-4 z-[1000] bg-white/90 rounded-md shadow p-2 text-xs">
			{(mousePosition || currentPosition) ? (
				<div>
					<span className="font-medium">Coordinates:</span>{' '}
					{(mousePosition || currentPosition) && (
						<span>
							{(mousePosition || currentPosition)!.lat.toFixed(6)}, {(mousePosition || currentPosition)!.lng.toFixed(6)}
						</span>
					)}
				</div>
			) : (
				<div className="text-gray-500">Move mouse over map</div>
			)}
		</div>
	);
};

export default CoordinatesOverlay;
