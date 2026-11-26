/**
 * Mock of the AI text layer: it writes the text from templates, using the same figures the widgets show, so every
 * number in it matches the report. A real version would send the prompt of prompt.js to an LLM instead. Until then the
 * text does not depend on what the author told the AI.
 */

import { formatDate, formatDateTime, formatNumber, formatRange, formatValue, listNames } from './format.js';
import { previousRange } from './periods.js';
import { percentChange } from './stats.js';

const MAX_FINDINGS = 3;
const NOTHING_CONNECTED = 'No data is connected to this widget yet.';

const entriesOf = widget => widget.entries ?? [];

function summaryText({ period, widgets }) {
  const assets = [...new Set(widgets.flatMap(widget =>
    [...entriesOf(widget).map(entry => entry.asset.name), ...(widget.assets ?? [])]))];
  const count = widgets.length;
  return `This report covers ${formatRange(period.start, period.end)} (${period.label.toLowerCase()}) and presents `
    + `${count} widget${count === 1 ? '' : 's'}${assets.length ? ` for ${listNames(assets)}` : ''}.`;
}

function changeText(percent, range) {
  const [from, to] = previousRange(range);
  const period = `the previous period (${formatRange(new Date(from), new Date(to))})`;
  if (percent == null) return `There is no earlier data to compare with ${period}.`;
  if (Math.abs(percent) < 0.5) return `Compared with ${period} the average was essentially unchanged.`;
  return `Compared with ${period} the average ${percent > 0 ? 'rose' : 'fell'} by ${formatNumber(Math.abs(percent))}%.`;
}

/** The attributes with the largest change since the previous period; an attribute in several widgets counts once. */
function findingsText(report) {
  const entries = new Map(report.widgets
    .flatMap(entriesOf)
    .filter(entry => entry.stats)
    .map(entry => [`${entry.asset.id}.${entry.name}`, entry]));
  const ranked = [...entries.values()]
    .map(entry => ({ entry, change: percentChange(entry.stats.mean, entry.previous?.mean) }))
    .sort((a, b) => Math.abs(b.change ?? 0) - Math.abs(a.change ?? 0))
    .slice(0, MAX_FINDINGS);
  if (!ranked.length) return 'No numeric attributes are part of this report, so there are no findings to report.';

  return ranked.map(({ entry: { stats, label, unit, asset, range }, change }, index) => {
    if (index === 0) {
      return `${label} at ${asset.name} averaged ${formatValue(stats.mean, unit)} and peaked at `
        + `${formatValue(stats.max, unit)} on ${formatDateTime(new Date(stats.maxAt))}. `
        + changeText(change, range);
    }
    return `${label} at ${asset.name} averaged ${formatValue(stats.mean, unit)}, with a low of `
      + `${formatValue(stats.min, unit)} (${formatDate(new Date(stats.minAt))}) and a high of `
      + `${formatValue(stats.max, unit)} (${formatDate(new Date(stats.maxAt))}).`;
  }).join(' ');
}

function describeSeries({ asset, label, unit, numeric, stats }) {
  if (!numeric) return `${label} of ${asset.name} over time.`;
  if (!stats) return `${label} at ${asset.name} has no data points in this time frame.`;
  const text = `${label} at ${asset.name} averaged ${formatValue(stats.mean, unit)}, ranging from `
    + `${formatValue(stats.min, unit)} to ${formatValue(stats.max, unit)}.`;
  return unit
    ? text
    : `${text} OpenRemote has no unit configured for this attribute, so the values are not interpreted.`;
}

function describeValue({ asset, label, value }) {
  return value === undefined
    ? `${label} at ${asset.name} has no value yet.`
    : `${label} at ${asset.name} is currently ${value}.`;
}

function describeListed({ type, assets, attributes }) {
  if (!assets.length || !attributes.length) return NOTHING_CONNECTED;
  return type === 'table'
    ? `Lists ${listNames(assets)} with ${listNames(attributes)}.`
    : `Marks ${listNames(assets)} on the map, coloured by ${listNames(attributes)}.`;
}

function describe(widget) {
  switch (widget.type) {
    case 'barchart':
    case 'kpi':
    case 'linechart':
      return entriesOf(widget).map(describeSeries).join(' ') || NOTHING_CONNECTED;
    case 'gauge':
    case 'image':
      return entriesOf(widget).map(describeValue).join(' ') || NOTHING_CONNECTED;
    default:
      return describeListed(widget);
  }
}

/** The text blocks for a report: a summary, a findings paragraph and a description per widget (by widget id). */
export function generateText(report) {
  return {
    summary: summaryText(report),
    findings: findingsText(report),
    descriptions: Object.fromEntries(report.widgets.map(widget => [widget.id, describe(widget)])),
  };
}
