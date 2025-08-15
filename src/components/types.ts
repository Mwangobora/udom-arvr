// types.ts
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

export interface TempMarker {
	latitude: number;
	longitude: number;
	isEditing: boolean;
}

export interface MapClickHandlerProps {
	onMapClick: (latlng: { lat: number; lng: number }) => void;
	isAddingMode: boolean;
}

export interface HotspotModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (hotspot: Hotspot) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	initialData?: any | null;
	position: { lat: number; lng: number } | null;
}

export interface Position {
	lat: number;
	lng: number;
}