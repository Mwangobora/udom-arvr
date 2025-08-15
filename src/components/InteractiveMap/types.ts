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

export interface Position {
	lat: number;
	lng: number;
}

export interface MapClickHandlerProps {
	onMapClick: (latlng: Position) => void;
	isAddingMode: boolean;
}

export interface HotspotModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (hotspot: Hotspot) => void;
	initialData?: Hotspot | null;
	position: Position | null;
}

export interface MapControlsProps {
	isAddingMode: boolean;
	hotspots: Hotspot[];
	onToggleAddingMode: () => void;
	onEditHotspot: (hotspot: Hotspot) => void;
	onDeleteHotspot: (hotspotId: string) => void;
}

export interface CoordinatesOverlayProps {
	mousePosition: Position | null;
	currentPosition: Position | null;
}

export interface MouseTrackerProps {
	setMousePosition: (position: Position | null) => void;
}
