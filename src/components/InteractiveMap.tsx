import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
	iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
	iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Types
export type HotspotType = 'panoramic' | 'info' | 'external_link';

export interface Hotspot {
	id: string;
	title: string;
	description?: string;
	latitude: number;
	longitude: number;
	hotspot_type: HotspotType;
	icon_type: string;
	is_active: boolean;
	created_at?: string;
}

interface TempMarker {
	latitude: number;
	longitude: number;
	isEditing: boolean;
}

interface MapClickHandlerProps {
	onMapClick: (latlng: { lat: number; lng: number }) => void;
	isAddingMode: boolean;
}

function MapClickHandler({ onMapClick, isAddingMode }: MapClickHandlerProps) {
	useMapEvents({
		click: (e) => {
			if (isAddingMode) {
				onMapClick(e.latlng);
			}
		},
	});
	return null;
}

interface HotspotModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (hotspot: Hotspot) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	initialData?: any | null;
	position: { lat: number; lng: number } | null;
}

function HotspotModal({ isOpen, onClose, onSave, initialData = null, position }: HotspotModalProps) {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		hotspot_type: 'panoramic' as HotspotType,
		icon_type: 'default',
	});

	useEffect(() => {
		if (initialData) {
			setFormData({
				title: initialData.title || '',
				description: initialData.description || '',
				hotspot_type: (initialData.hotspot_type || 'panoramic') as HotspotType,
				icon_type: initialData.icon_type || 'default',
			});
		} else {
			setFormData({ title: '', description: '', hotspot_type: 'panoramic', icon_type: 'default' });
		}
	}, [initialData, isOpen]);

	if (!isOpen || !position) return null;

	const handleSubmit = (e?: React.FormEvent) => {
		if (e && e.preventDefault) e.preventDefault();
		if (!formData.title.trim()) {
			alert('Please enter a title for the hotspot');
			return;
		}

		const hotspotData: Hotspot = {
			...formData,
			latitude: position.lat,
			longitude: position.lng,
			is_active: true,
			id: initialData?.id || Date.now().toString(),
		};

		onSave(hotspotData);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
			<div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold">{initialData ? 'Edit Hotspot' : 'Add New Hotspot'}</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
						×
					</button>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
						<input
							type="text"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							placeholder="Enter hotspot title..."
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
						<textarea
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							rows={3}
							placeholder="Enter description..."
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Hotspot Type</label>
						<select
							value={formData.hotspot_type}
							onChange={(e) => setFormData({ ...formData, hotspot_type: e.target.value as HotspotType })}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="panoramic">360° Panoramic View</option>
							<option value="info">Information Point</option>
							<option value="external_link">External Link</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Icon Type</label>
						<select
							value={formData.icon_type}
							onChange={(e) => setFormData({ ...formData, icon_type: e.target.value })}
							className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						>
							<option value="default">Default</option>
							<option value="building">Building</option>
							<option value="facility">Facility</option>
							<option value="landmark">Landmark</option>
						</select>
					</div>

					<div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
						<strong>Position:</strong>
						<br />
						Latitude: {position?.lat.toFixed(6)}
						<br />
						Longitude: {position?.lng.toFixed(6)}
					</div>

					<div className="flex gap-3 pt-4">
						<button type="button" onClick={onClose} className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">
							Cancel
						</button>
						<button type="button" onClick={handleSubmit} className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
							{initialData ? 'Update' : 'Add'} Hotspot
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

const createHotspotIcon = (type = 'default') => {
	const iconColors: Record<string, string> = {
		default: '#3b82f6',
		building: '#ef4444',
		facility: '#10b981',
		landmark: '#f59e0b',
	};

	const color = iconColors[type] || iconColors.default;

	return L.divIcon({
		className: 'custom-hotspot-marker',
		html: `
			<div style="
				width: 24px;
				height: 24px;
				background-color: ${color};
				border: 3px solid white;
				border-radius: 50%;
				box-shadow: 0 2px 8px rgba(0,0,0,0.3);
				cursor: pointer;
				position: relative;
			">
				<div style="
					position: absolute;
					bottom: -8px;
					left: 50%;
					transform: translateX(-50%);
					width: 0;
					height: 0;
					border-left: 6px solid transparent;
					border-right: 6px solid transparent;
					border-top: 8px solid ${color};
				"></div>
			</div>
		`,
		iconSize: [24, 32],
		iconAnchor: [12, 32],
		popupAnchor: [0, -32],
	});
};

export default function InteractiveMap() {
	const [hotspots, setHotspots] = useState<Hotspot[]>([]);
	const [isAddingMode, setIsAddingMode] = useState(false);
	const [tempMarker, setTempMarker] = useState<TempMarker | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [editingHotspot, setEditingHotspot] = useState<Hotspot | null>(null);
	const [currentPosition, setCurrentPosition] = useState<{ lat: number; lng: number } | null>(null);
	const [mousePosition, setMousePosition] = useState<{ lat: number; lng: number } | null>(null);

	// UDOM coordinates (Dodoma, Tanzania)
	const center: [number, number] = [-6.1630, 35.7516];

	const handleMapClick = (latlng: { lat: number; lng: number }) => {
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

	useEffect(() => {
		const mockHotspots: Hotspot[] = [
			{
				id: '1',
				title: 'Main Library',
				description: 'UDOM Central Library with 360° view',
				latitude: -6.1620,
				longitude: 35.7520,
				hotspot_type: 'panoramic',
				icon_type: 'building',
				is_active: true,
			},
			{
				id: '2',
				title: 'Student Center',
				description: 'Main student activities center',
				latitude: -6.1640,
				longitude: 35.7510,
				hotspot_type: 'info',
				icon_type: 'facility',
				is_active: true,
			},
		];
		setHotspots(mockHotspots);
	}, []);

	return (
		<div className="w-full h-screen relative">
			{/* Live coordinates overlay (mouse position, falls back to last selected) */}
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
			<div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4">
				<h3 className="font-semibold text-lg mb-3">Map Controls</h3>
				<div className="space-y-2">
					<button
						onClick={toggleAddingMode}
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
								<button onClick={() => handleEditHotspot(hotspot)} className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
									Edit
								</button>
								<button onClick={() => handleDeleteHotspot(hotspot.id)} className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			</div>

			<MapContainer center={center} zoom={16} className="w-full h-full" style={{ cursor: isAddingMode ? 'crosshair' : 'grab' }}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
				<MapClickHandler onMapClick={handleMapClick} isAddingMode={isAddingMode} />
				{/* Track mouse to display live coordinates */}
				{/** Using a tiny component to hook into map mousemove events */}
				{(() => {
					function MouseTracker() {
						useMapEvents({
							mousemove: (e) => setMousePosition({ lat: e.latlng.lat, lng: e.latlng.lng }),
						});
						return null;
					}
					return <MouseTracker />;
				})()}

				{hotspots.map((hotspot) => (
					<Marker
						key={hotspot.id}
						position={[hotspot.latitude, hotspot.longitude]}
						icon={createHotspotIcon(hotspot.icon_type)}
						eventHandlers={{
							click: () => {
								if (!isAddingMode) {
									// Handle hotspot click - could open 360° view or info
									// eslint-disable-next-line no-console
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
				onClose={() => {
					setShowModal(false);
					setTempMarker(null);
					setEditingHotspot(null);
					setIsAddingMode(false);
				}}
				onSave={handleSaveHotspot}
				initialData={editingHotspot}
				position={currentPosition}
			/>
		</div>
	);
}
