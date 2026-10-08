/**
 * The map of the map widget: a drawing of the Netherlands in which assets are marked at their position. OpenRemote's
 * map widget uses MapLibre with map tiles from the manager; this one needs nothing but the page, so it works offline.
 * The functions here are about positions and colours; the widget draws.
 */

/** A rough outline of the country as [longitude, latitude], clockwise from Den Helder. */
const OUTLINE = [
  [4.75, 52.96], [5.04, 52.94], [5.34, 53.07], [5.42, 53.17], [5.6, 53.28], [5.9, 53.38], [6.2, 53.41], [6.5, 53.44],
  [6.85, 53.45], [6.95, 53.33], [7.2, 53.2], [7.2, 53.0], [7.07, 52.88], [7.04, 52.64], [7.2, 52.5], [7.0, 52.4],
  [7.07, 52.22], [6.85, 52.12], [6.8, 51.96], [6.4, 51.85], [6.05, 51.86], [5.97, 51.68], [6.15, 51.6], [6.2, 51.35],
  [6.05, 51.15], [6.05, 50.85], [6.02, 50.75], [5.7, 50.76], [5.7, 50.9], [5.8, 51.05], [5.75, 51.2], [5.5, 51.28],
  [5.1, 51.43], [4.75, 51.43], [4.4, 51.42], [4.25, 51.35], [3.85, 51.21], [3.6, 51.28], [3.37, 51.37], [3.45, 51.52],
  [3.55, 51.7], [3.85, 51.8], [4.0, 51.88], [4.12, 51.98], [4.27, 52.1], [4.4, 52.2], [4.52, 52.37], [4.57, 52.47],
  [4.62, 52.62], [4.69, 52.85],
];

const WEST = 3.2;
const NORTH = 53.6;
const SOUTH = 50.6;
const EAST = 7.4;
const SCALE = 100; // map units per degree of latitude
const LONGITUDE_FACTOR = Math.cos((52.2 * Math.PI) / 180); // a degree of longitude is shorter than one of latitude

const MAP_WIDTH = Math.round((EAST - WEST) * LONGITUDE_FACTOR * SCALE);
const MAP_HEIGHT = Math.round((NORTH - SOUTH) * SCALE);
const DEFAULT_ZOOM = 7;
const DEFAULT_CENTER = { lng: 5.3, lat: 52.1 };

const round = number => Math.round(number * 10) / 10;

/** [x, y] in map units of a position. */
export function project({ lng, lat }) {
  return [round((lng - WEST) * LONGITUDE_FACTOR * SCALE), round((NORTH - lat) * SCALE)];
}

/** The points of the outline, for the points attribute of an SVG polygon. */
export function outlinePoints() {
  return OUTLINE.map(([lng, lat]) => project({ lng, lat }).join(',')).join(' ');
}

/** The part of the map to show for a zoom level (each level doubles the scale) around a centre. */
export function mapViewBox({ zoom = DEFAULT_ZOOM, center = DEFAULT_CENTER } = {}) {
  const scale = 2 ** (Math.min(Math.max(zoom, 3), 16) - DEFAULT_ZOOM);
  const width = MAP_WIDTH / scale;
  const height = MAP_HEIGHT / scale;
  const [x, y] = project(center);
  return { x: round(x - width / 2), y: round(y - height / 2), width: round(width), height: round(height) };
}

/** The first threshold at or below the value, highest first; the colour of the lowest when the value is below all. */
function thresholdColor(value, thresholds) {
  const sorted = [...thresholds].sort((a, b) => b[0] - a[0]);
  return (sorted.find(([min]) => value >= min) ?? sorted.at(-1))?.[1];
}

const NO_VALUE_COLOR = '#9aa5b1';

/**
 * The colour of a marker for the value of its attribute: from the thresholds for a number, from boolColors
 * ({ true, false }) for a boolean and from textColors ([[text, colour]]) for a text. Colours may have a leading #.
 */
export function markerColor({ valueType, value, thresholds = [], boolColors, textColors = [] }) {
  if (value === undefined || value === null) return NO_VALUE_COLOR;
  let colour;
  if (valueType === 'boolean') colour = boolColors?.[value ? 'true' : 'false'];
  else if (valueType === 'text') colour = textColors.find(([text]) => text === value)?.[1];
  else colour = thresholdColor(Number(value), thresholds);
  if (!colour) return NO_VALUE_COLOR;
  return colour.startsWith('#') ? colour : `#${colour}`;
}
