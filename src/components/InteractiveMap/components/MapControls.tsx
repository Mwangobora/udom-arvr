import React from 'react';
import { MapControlsProps } from '../types';

const MapControls: React.FC<MapControlsProps> = ({ 
	isAddingMode, 
	hotspots, 
	onToggleAddingMode, 
	onEditHotspot, 
	onDeleteHotspot 
}) => {
	return (
		<div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
			<h3 className="font-semibold text-lg mb-3">Map Controls</h3>
			<div className="space-y-2">
				<button
					onClick={onToggleAddingMode}
					className={`w-full px-4 py-2 rounded-md font-medium transition-colors ${
						isAddingMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'
					}`}
				>
					{isAddingMode ? '✕ Cancel Adding' : '+ Add Hotspot'}
				</button>
				{isAddingMode && <div className="text-sm text-gray-600 bg-blue-50 p-2 rounded">Click anywhere on the map to add a hotspot</div>}
			</div>

			<div className="mt-4 max-h-64 overflow-y-auto">
				<h4 className="font-medium text-sm text-gray-700 mb-2">Hotspots ({hotspots.length})</h4>
				{hotspots.map((hotspot) => (
					<div key={hotspot.id} className="text-xs bg-gray-50 p-2 rounded mb-2">
						<div className="font-medium">{hotspot.title}</div>
						<div className="text-gray-600">{hotspot.hotspot_type}</div>
						<div className="flex gap-1 mt-1">
							<button onClick={() => onEditHotspot(hotspot)} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
								Edit
							</button>
							<button onClick={() => onDeleteHotspot(hotspot.id)} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MapControls;
