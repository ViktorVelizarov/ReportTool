/**
 * The figures behind a report, for the generated text. They come from the same service as the data of the widgets and
 * cover the same time, so the text always agrees with what the widgets show. Pure apart from those calls: the same
 * template and context always give the same figures.
 */

import { configRange } from '../builder/util/widget-time.js';
import { NUMERIC_VALUE_TYPES } from '../data/asset-model.js';
import { AssetService } from '../data/asset-service.js';
import { ReportContext } from '../data/report-context.js';
import { getAttributeLabel, getAttributeValueAsString, resolveUnits } from '../data/util.js';
import { previousRange } from './periods.js';
import { summarize } from './stats.js';

/** What the text needs to know about an attribute of an asset. */
function describeAttribute(asset, attribute) {
  return {
    asset,
    name: attribute.name,
    label: getAttributeLabel(attribute, undefined, false),
    unit: resolveUnits(attribute.meta?.units),
    numeric: NUMERIC_VALUE_TYPES.includes(attribute.type),
  };
}

/** The assets and attributes that attribute references point to: [{ ref, asset, attribute }], those that exist. */
async function resolveRefs(refs = []) {
  const assets = await AssetService.queryAssets({
    ids: [...new Set(refs.map(ref => ref.id))],
    select: { attributes: refs.map(ref => ref.name) },
  });
  return refs.flatMap(ref => {
    const asset = assets.find(item => item.id === ref.id);
    const attribute = asset?.attributes[ref.name];
    return attribute ? [{ ref, asset, attribute }] : [];
  });
}

/** An attribute over the time of a widget and the time just before it: { ...attribute, range, stats, previous }. */
async function seriesEntry({ ref, asset, attribute }, range) {
  const described = describeAttribute(asset, attribute);
  if (!described.numeric) return { ...described, range, stats: null, previous: null };
  const [[from, to], [previousFrom, previousTo]] = [range, previousRange(range)];
  const [points, before] = await Promise.all([
    AssetService.getDatapoints(ref.id, ref.name, { fromTimestamp: from, toTimestamp: to }),
    AssetService.getDatapoints(ref.id, ref.name, { fromTimestamp: previousFrom, toTimestamp: previousTo }),
  ]);
  return { ...described, range, stats: summarize(points), previous: summarize(before) };
}

/**
 * The current value of an attribute as the widget shows it, with its unit: the gauge rounds it to its decimals, the
 * image shows it as OpenRemote does. Undefined when the attribute has no value.
 */
function shownValue(type, config, attribute) {
  const { value } = attribute;
  if (value == null) return undefined;
  if (type === 'gauge' && typeof value === 'number') {
    const unit = resolveUnits(attribute.meta?.units);
    return `${Number(value.toFixed(config.decimals))}${unit ? ` ${unit}` : ''}`;
  }
  return getAttributeValueAsString(attribute, undefined, true);
}

/** The assets that a table or map widget lists, with the labels of the attributes it shows. */
async function listedAssets({ assetType, allOfType, assetIds, attributeNames, attributeName }) {
  const names = attributeNames ?? [attributeName].filter(Boolean);
  if (!assetType || (!allOfType && !assetIds?.length)) return { assets: [], attributes: [] };
  const assets = await AssetService.queryAssets({
    types: [assetType], ids: allOfType ? undefined : assetIds, select: { attributes: names },
  });
  const attributes = names.flatMap(name => {
    const attribute = assets.find(asset => asset.attributes[name])?.attributes[name];
    return attribute ? [getAttributeLabel(attribute, undefined, false)] : [];
  });
  return { assets: assets.map(asset => asset.name), attributes };
}

/**
 * The figures of a widget: { id, name, type } and, by type, the entries of the attributes it shows over time (barchart,
 * kpi, linechart: with range, stats and previous), or at this moment (gauge, image: with value, as the widget shows
 * it), or the assets and attribute labels it lists (map, table).
 */
async function figuresOf({ id, displayName, widgetTypeId: type, widgetConfig: config }, context) {
  const widget = { id, name: displayName, type };
  switch (type) {
    case 'barchart':
    case 'kpi':
    case 'linechart': {
      const range = configRange(type, config, context);
      const found = await resolveRefs(config.attributeRefs);
      const entries = await Promise.all(found.map(item => seriesEntry(item, range)));
      return { ...widget, range, entries };
    }
    case 'gauge':
    case 'image': {
      const entries = (await resolveRefs(config.attributeRefs)).map(({ asset, attribute }) =>
        ({ ...describeAttribute(asset, attribute), value: shownValue(type, config, attribute) }));
      return { ...widget, entries };
    }
    case 'map':
    case 'table':
      return { ...widget, ...await listedAssets(config) };
    default:
      throw new Error(`Unknown widget type: ${type}`);
  }
}

/** The widgets of a template in the order the report is read: from top to bottom, and from left to right. */
export const readingOrder = widgets =>
  [...widgets].sort((a, b) => a.gridItem.y - b.gridItem.y || a.gridItem.x - b.gridItem.x);

/**
 * The report of a template, with the figures of its widgets in reading order, for the time frame of the context:
 * { name, period, generatedAt, widgets }.
 */
export async function buildReport({ name, template }, context = ReportContext) {
  const widgets = await Promise.all(readingOrder(template.widgets).map(widget => figuresOf(widget, context)));
  return { name, period: context.period, generatedAt: context.now(), widgets };
}
