// utils.ts
import L from 'leaflet';
import { ICON_COLORS } from './constants';

// Fix for default marker icons in React-Leaflet
export const fixLeafletIcons = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	delete (L.Icon.Default.prototype as any)._getIconUrl;
	L.Icon.Default.mergeOptions({
		iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
		iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
		shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
	});
};

// Create custom hotspot icon
export const createHotspotIcon = (type = 'default') => {
	const color = ICON_COLORS[type] || ICON_COLORS.default;

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