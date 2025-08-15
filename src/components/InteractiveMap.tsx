// InteractiveMap.tsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Hotspot, TempMarker, Position } from './InteractiveMap/types';
import { UDOM_BOUNDARY, MAP_BOUNDS, MOCK_HOTSPOTS } from './InteractiveMap/constants';
import { fixLeafletIcons, createHotspotIcon } from './InteractiveMap/utils';
import { MapClickHandler, MouseTracker, CoordinatesOverlay, MapControls } from './InteractiveMap/components';
import { HotspotModal } from './InteractiveMap/hotspots';

// Initialize Leaflet icons
fixLeafletIcons();

export default function InteractiveMap() {
	const [hotspots, setHotspots] = useState<Hotspot[]>([]);
	const [isAddingMode, setIsAddingMode] = useState(false);
	const [tempMarker, setTempMarker] = useState<TempMarker | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [editingHotspot, setEditingHotspot] = useState<Hotspot | null>(null);
	const [currentPosition, setCurrentPosition] = useState<Position | null>(null);
	const [mousePosition, setMousePosition] = useState<Position | null>(null);

	// Load mock data on component mount
	useEffect(() => {
		setHotspots(MOCK_HOTSPOTS);
	}, []);

	const handleMapClick = (latlng: Position) => {
		setCurrentPosition(latlng);
		setTempMarker({ latitude: latlng.lat, longitude: latlng.lng, isEditing: true });
		setEditingHotspot(null);
		setShowModal(true);
	};

	const handleSaveHotspot = async (hotspotData: Hotspot) => {
		try {
			if (editingHotspot) {
				setHotspots((prev) => prev.map((h) => (h.id === editingHotspot.id ? { ...hotspotData, id: editingHotspot.id } : h)));
			} else {
				setHotspots((prev) => [...prev, hotspotData]);
			}
			setTempMarker(null);
			setIsAddingMode(false);
		} catch (error) {
			console.error('Error saving hotspot:', error);
			alert('Failed to save hotspot');
		}
	};

	const handleEditHotspot = (hotspot: Hotspot) => {
		setEditingHotspot(hotspot);
		setCurrentPosition({ lat: hotspot.latitude, lng: hotspot.longitude });
		setShowModal(true);
	};

	const handleDeleteHotspot = async (hotspotId: string) => {
		// eslint-disable-next-line no-alert
		if (!confirm('Are you sure you want to delete this hotspot?')) return;
		try {
			setHotspots((prev) => prev.filter((h) => h.id !== hotspotId));
		} catch (error) {
			console.error('Error deleting hotspot:', error);
			alert('Failed to delete hotspot');
		}
	};

	const toggleAddingMode = () => {
		setIsAddingMode((v) => !v);
		setTempMarker(null);
		if (showModal) setShowModal(false);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setTempMarker(null);
		setEditingHotspot(null);
		setIsAddingMode(false);
	};

	return (
		<div className="w-full h-screen relative">
			<CoordinatesOverlay mousePosition={mousePosition} currentPosition={currentPosition} />
			
			<MapControls
				isAddingMode={isAddingMode}
				hotspots={hotspots}
				onToggleAddingMode={toggleAddingMode}
				onEditHotspot={handleEditHotspot}
				onDeleteHotspot={handleDeleteHotspot}
			/>

			<MapContainer 
				bounds={MAP_BOUNDS}
				className="w-full h-full" 
				style={{ cursor: isAddingMode ? 'crosshair' : 'grab' }}
				zoomControl={true}
				scrollWheelZoom={true}
				doubleClickZoom={true}
				touchZoom={true}
				boxZoom={true}
				keyboard={true}
				dragging={true}
			>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
				<MapClickHandler onMapClick={handleMapClick} isAddingMode={isAddingMode} />
				<MouseTracker setMousePosition={setMousePosition} />
				
				{/* UDOM Boundary Polygon */}
				<Polygon
					positions={UDOM_BOUNDARY}
					pathOptions={{
						color: '#fbc02d',
						weight: 4,
						fillColor: '#ffffff',
						fillOpacity: 0.25,
					}}
				>
					<Tooltip permanent direction="center">
						UDOM Campus Boundary
					</Tooltip>
				</Polygon>

				{/* Render existing hotspots */}
				{hotspots.map((hotspot) => (
					<Marker
						key={hotspot.id}
						position={[hotspot.latitude, hotspot.longitude]}
						icon={createHotspotIcon(hotspot.icon_type)}
						eventHandlers={{
							click: () => {
								if (!isAddingMode) {
									console.log('Hotspot clicked:', hotspot);
								}
							},
						}}
					>
						<Tooltip permanent direction="top" offset={[0, -24]}>{hotspot.title}</Tooltip>
						<Popup>
							<div className="min-w-[200px]">
								<h3 className="font-semibold text-base">{hotspot.title}</h3>
								{hotspot.description && <p className="text-sm text-gray-600 mt-1">{hotspot.description}</p>}
								<div className="text-xs text-gray-500 mt-2">
									Type: {hotspot.hotspot_type}
									<br />
									Coordinates: {hotspot.latitude.toFixed(6)}, {hotspot.longitude.toFixed(6)}
								</div>
								<div className="flex gap-2 mt-3">
									<button onClick={() => handleEditHotspot(hotspot)} className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
										Edit
									</button>
									{hotspot.hotspot_type === 'panoramic' && (
										<button
											className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
											onClick={() => {
												alert('360° viewer would open here');
											}}
										>
											View 360°
										</button>
									)}
								</div>
							</div>
						</Popup>
					</Marker>
				))}

				{/* Temporary marker for new hotspot */}
				{tempMarker && (
					<Marker position={[tempMarker.latitude, tempMarker.longitude]} icon={createHotspotIcon('default')}>
						<Tooltip permanent direction="top" offset={[0, -24]}>
							New hotspot: {tempMarker.latitude.toFixed(6)}, {tempMarker.longitude.toFixed(6)}
						</Tooltip>
						<Popup>
							<div>Adding new hotspot...</div>
						</Popup>
					</Marker>
				)}
			</MapContainer>

			<HotspotModal
				isOpen={showModal}
				onClose={handleCloseModal}
				onSave={handleSaveHotspot}
				initialData={editingHotspot}
				position={currentPosition}
			/>
		</div>
	);
}