/**
 * The figures behind a report, for the generated text. They come from the same service as the data of the widgets and
 * cover the same time, so the text always agrees with what the widgets show: the bars of a bar chart are fetched as the
 * chart fetches them, and a gauge has its scale. They also have what the widgets do not show: the figures of every
 * attribute over the time just before, and over the time frame of the report for an attribute that a gauge or an image
 * shows at this moment. Which of those the AI is given is for the author to choose (see prompt.js). Pure apart from
 * those calls: the same template and context always give the same figures.
 */

import { configRange } from '../builder/util/widget-time.js';
import { NUMERIC_VALUE_TYPES } from '../data/asset-model.js';
import { AssetService } from '../data/asset-service.js';
import { ReportContext } from '../data/report-context.js';
import { getAttributeLabel, getAttributeValueAsString, resolveUnits } from '../data/util.js';
import { previousRange } from './periods.js';
import { barFormulas, barInterval, gaugeScale, placeOnScale } from './shown.js';
import { analyze, cardChange, summarize } from './stats.js';
import { HOUR } from './time.js';

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

/**
 * The figures of an attribute over a time [from, to]: { range, stats, analysis }, with what else its data points say
 * as analysis (see analyze in stats.js). Both are null without data points.
 */
async function figuresOver({ id, name }, range) {
  const [from, to] = range;
  const points = await AssetService.getDatapoints(id, name, { fromTimestamp: from, toTimestamp: to });
  return { range, stats: summarize(points), analysis: analyze(points, range) };
}

/**
 * An attribute over a time and over the time just before it, which is as long: { ...attribute, range, stats,
 * analysis, previous }, with previous the figures of the time before ({ range, stats, analysis }). An attribute that is
 * not a number has no figures, and no previous.
 */
async function seriesEntry({ ref, asset, attribute }, range) {
  const described = describeAttribute(asset, attribute);
  if (!described.numeric) return { ...described, range, stats: null, analysis: null, previous: null };
  const [current, previous] = await Promise.all([figuresOver(ref, range), figuresOver(ref, previousRange(range))]);
  return { ...described, ...current, previous };
}

/**
 * An attribute of a bar chart: its figures (see seriesEntry) and its bars as the chart draws them, [{ formula, points:
 * [{ x: the start of the interval, y: its value, or null for an interval without data points }] }], one set for each
 * method of the attribute. They are fetched as the chart fetches them: per interval of the chart (see barInterval),
 * from the start of the time frame to just before its end, with the intervals without data points.
 */
async function barEntry(item, range, config, interval) {
  const entry = await seriesEntry(item, range);
  if (!entry.numeric) return { ...entry, bars: [] };
  const [from, to] = range;
  const query = {
    type: 'interval', fromTimestamp: from, toTimestamp: to - 1, interval: `${interval.steps} ${interval.unit}`,
    gapFill: true,
  };
  const bars = await Promise.all(barFormulas(config.attributeSettings, item.ref).map(async formula => ({
    formula, points: await AssetService.getDatapoints(item.ref.id, item.ref.name, { ...query, formula }),
  })));
  return { ...entry, bars };
}

/**
 * The current value of an attribute as the widget shows it, with its unit: the gauge and the KPI round it to their
 * decimals, the image shows it as OpenRemote does. Undefined when the attribute has no value.
 */
function shownValue(type, config, attribute) {
  const { value } = attribute;
  if (value == null) return undefined;
  if ((type === 'gauge' || type === 'kpi') && typeof value === 'number') {
    const unit = resolveUnits(attribute.meta?.units);
    return `${Number(value.toFixed(config.decimals))}${unit ? ` ${unit}` : ''}`;
  }
  return getAttributeValueAsString(attribute, undefined, true);
}

/**
 * Whether an attribute got its value after the time [from, to] had ended, so that the value is not of that time: more
 * than an hour after its end. The last 7, 30 and 90 days end on the whole hour before the report moment, so a value of
 * the hour after that still counts as the value at the end. A value that the attribute had before the end was still
 * its value at the end. An attribute without a value has none that came after.
 */
const valueAfter = ({ value, timestamp }, [, to]) => value != null && timestamp > to + HOUR;

/**
 * An attribute of a KPI: its figures over the period of the KPI, and the two figures that the card itself shows, which
 * are the current value and the change from the first to the last data point of the period. The change is null without
 * data points, where the card shows a 0. afterTimeFrame says whether the current value came after the period, which
 * ends at the report moment: when the report is made for an earlier moment, or the page has been open for a while.
 */
async function kpiEntry(item, range, config) {
  const entry = await seriesEntry(item, range);
  return {
    ...entry,
    value: shownValue('kpi', config, item.attribute),
    afterTimeFrame: valueAfter(item.attribute, range),
    change: entry.stats ? cardChange(entry.stats, config.deltaFormat === 'percentage') : null,
  };
}

/** The assets that a table widget lists, with the labels of the attributes it shows. */
async function listedAssets({ assetType, allOfType, assetIds, attributeNames = [] }) {
  const names = attributeNames;
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
 * An attribute of a gauge or an image: the value that the widget shows, whether it came after the time frame of the
 * report (afterTimeFrame, as when the time frame is last month), and the figures of the attribute over the time frame
 * and the time before it, which the widget does not show.
 */
async function currentEntry(type, item, range, config) {
  return {
    ...await seriesEntry(item, range),
    value: shownValue(type, config, item.attribute),
    afterTimeFrame: valueAfter(item.attribute, range),
  };
}

/**
 * An attribute of a gauge: as currentEntry, and where its value lies on the scale of the gauge (place, see placeOnScale
 * in shown.js), or null when the gauge shows no number of this time frame.
 */
async function gaugeEntry(item, range, config, scale) {
  const entry = await currentEntry('gauge', item, range, config);
  const { value } = item.attribute;
  return { ...entry, place: typeof value === 'number' && !entry.afterTimeFrame ? placeOnScale(value, scale) : null };
}

/**
 * The figures of a widget: { id, name, type } and, by type, the entries of the attributes it shows over time (barchart,
 * kpi, linechart: with range, stats, analysis and previous; a bar chart also with the interval of its bars and its
 * entries with their bars; kpi also with value, afterTimeFrame and change, as the card shows them), or at this moment
 * (gauge, image: with value, as the widget shows it, afterTimeFrame, and with the figures over the time frame of the
 * report; a gauge also with its scale and its entries with their place on it), or the assets and attribute labels it
 * lists (table).
 */
async function figuresOf({ id, displayName, widgetTypeId: type, widgetConfig: config }, context) {
  const widget = { id, name: displayName, type };
  switch (type) {
    case 'kpi':
    case 'linechart': {
      const range = configRange(type, config, context);
      const found = await resolveRefs(config.attributeRefs);
      const entries = await Promise.all(found.map(item =>
        (type === 'kpi' ? kpiEntry(item, range, config) : seriesEntry(item, range))));
      return { ...widget, range, entries };
    }
    case 'barchart': {
      const range = configRange(type, config, context);
      const interval = barInterval(range, config.defaultInterval);
      const found = await resolveRefs(config.attributeRefs);
      return { ...widget, range, interval, entries: await Promise.all(found.map(item =>
        barEntry(item, range, config, interval))) };
    }
    case 'gauge': {
      const range = [context.period.start.getTime(), context.period.end.getTime()];
      const scale = gaugeScale(config);
      const found = await resolveRefs(config.attributeRefs);
      const entries = await Promise.all(found.map(item => gaugeEntry(item, range, config, scale)));
      return { ...widget, scale, entries };
    }
    case 'image': {
      const range = [context.period.start.getTime(), context.period.end.getTime()];
      const found = await resolveRefs(config.attributeRefs);
      return { ...widget, entries: await Promise.all(found.map(item => currentEntry(type, item, range, config))) };
    }
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
