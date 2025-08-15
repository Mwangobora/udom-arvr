// HotspotModal.tsx
import React, { useState, useEffect } from 'react';
import { HotspotModalProps, Hotspot, HotspotType } from './types';

export function HotspotModal({ isOpen, onClose, onSave, initialData = null, position }: HotspotModalProps) {
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