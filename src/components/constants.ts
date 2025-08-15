// constants.ts
import { Hotspot } from './types';

// UDOM boundary coordinates from the provided GeoJSON
export const UDOM_BOUNDARY = [
	[35.7975410728652, -6.20090417070779],
	[35.7781599111729, -6.21677760122096],
	[35.7767283642189, -6.22748654524647],
	[35.7818652351625, -6.24019861127618],
	[35.795861180294, -6.24495193485808],
	[35.8108609455188, -6.23909950477922],
	[35.8235501880477, -6.23389926142849],
	[35.8345726304341, -6.23634041090643],
	[35.861804042003, -6.24172825379429],
	[35.8696797656318, -6.24063826958702],
	[35.8762655427536, -6.23327918838493],
	[35.8777339243838, -6.22595986412155],
	[35.8756476924342, -6.21750886781465],
	[35.8695009518606, -6.21391844467653],
	[35.8636655096174, -6.21170243814371],
	[35.8481260367564, -6.20945250973651],
	[35.8316771055597, -6.21080247772339],
	[35.8244733970126, -6.20974527600823],
	[35.8162864173207, -6.20989625322183],
	[35.8137967198937, -6.20571224468418],
	[35.8087134224351, -6.20283443354531],
	[35.7975410728652, -6.20090417070779],
];

// Calculate center point of UDOM boundary
export const MAP_CENTER: [number, number] = [
	(Math.min(...UDOM_BOUNDARY.map(coord => coord[1])) + Math.max(...UDOM_BOUNDARY.map(coord => coord[1]))) / 2,
	(Math.min(...UDOM_BOUNDARY.map(coord => coord[0])) + Math.max(...UDOM_BOUNDARY.map(coord => coord[0]))) / 2,
];

// Calculate bounds for the map
export const MAP_BOUNDS: [[number, number], [number, number]] = [
	[Math.min(...UDOM_BOUNDARY.map(coord => coord[1])), Math.min(...UDOM_BOUNDARY.map(coord => coord[0]))],
	[Math.max(...UDOM_BOUNDARY.map(coord => coord[1])), Math.max(...UDOM_BOUNDARY.map(coord => coord[0]))],
];

// Mock hotspots data
export const MOCK_HOTSPOTS: Hotspot[] = [
	{
		id: '1',
		title: 'Main Library',
		description: 'UDOM Central Library with 360° view',
		latitude: -6.2095,
		longitude: 35.8250,
		hotspot_type: 'panoramic',
		icon_type: 'building',
		is_active: true,
	},
	{
		id: '2',
		title: 'Student Center',
		description: 'Main student activities center',
		latitude: -6.2150,
		longitude: 35.8100,
		hotspot_type: 'info',
		icon_type: 'facility',
		is_active: true,
	},
	{
		id: '3',
		title: 'Administration Block',
		description: 'Main administrative offices',
		latitude: -6.2200,
		longitude: 35.8300,
		hotspot_type: 'info',
		icon_type: 'landmark',
		is_active: true,
	},
	{
		id: '4',
		title: 'Science Complex',
		description: 'Science and technology buildings',
		latitude: -6.2250,
		longitude: 35.8450,
		hotspot_type: 'panoramic',
		icon_type: 'building',
		is_active: true,
	},
];

// Icon colors mapping
export const ICON_COLORS: Record<string, string> = {
	default: '#3b82f6',
	building: '#ef4444',
	facility: '#10b981',
	landmark: '#f59e0b',
};