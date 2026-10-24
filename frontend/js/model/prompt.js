/**
 * The prompt for the AI: what the author said, the figures of the report and a few fixed rules. It is made in sections,
 * so that the page can show where each part comes from. The prompt is made for real, but nothing sends it yet: the
 * text is still written from templates (ai.js).
 */

import { WIDGET_SPECS } from '../builder/service/widget-specs.js';
import { formatNumber, formatRange, formatValue, listNames } from './format.js';
import { previousRange } from './periods.js';
import { percentChange } from './stats.js';

/** Where the sections of the prompt come from. */
export const SOURCES = {
  author: 'Written by you',
  report: 'From the report',
  studio: 'From Report Studio',
};

const RULES = 'You write text for a report that is made in Report Studio from data of OpenRemote. '
  + 'Use only the figures below. Do not invent figures, causes or events. Write in plain English.';

const TASK = [
  'Write:',
  '1. A summary of two or three sentences.',
  '2. The key findings, starting with what the author asked you to look out for.',
  '3. A short description of each widget, in the order of the figures above.',
].join('\n');

const signed = percent => `${percent > 0 ? '+' : ''}${formatNumber(percent)}%`;

function seriesLine({ asset, label, unit, numeric, stats, previous }) {
  const name = `${label}, ${asset.name}`;
  if (!numeric) return `${name}: not a number, so there are no figures`;
  if (!stats) return `${name}: no data points in this time frame`;
  const figures = `average ${formatValue(stats.mean, unit)}, lowest ${formatValue(stats.min, unit)}, `
    + `highest ${formatValue(stats.max, unit)}`;
  const change = percentChange(stats.mean, previous?.mean);
  return change == null
    ? `${name}: ${figures}; no earlier data to compare with`
    : `${name}: ${figures}; the previous period averaged ${formatValue(previous.mean, unit)} (${signed(change)})`;
}

/** What a widget shows, one line each; none when nothing is connected to it. */
function linesOf(widget) {
  switch (widget.type) {
    case 'barchart':
    case 'kpi':
    case 'linechart':
      return widget.entries.map(seriesLine);
    case 'gauge':
    case 'image':
      return widget.entries.map(({ asset, label, value }) =>
        `${label}, ${asset.name}: ${value === undefined ? 'no value yet' : `currently ${value}`}`);
    default: {
      if (!widget.assets.length || !widget.attributes.length) return [];
      const how = widget.type === 'map' ? 'coloured by' : 'attributes';
      return [`assets ${listNames(widget.assets)}; ${how} ${listNames(widget.attributes)}`];
    }
  }
}

/** The name of a widget and its type; also the time window, when the widget has one of its own. */
function headingOf(widget, period) {
  const kind = WIDGET_SPECS[widget.type].displayName;
  const title = widget.name && widget.name !== kind ? `${widget.name} (${kind})` : kind;
  const own = widget.range
    && (widget.range[0] !== period.start.getTime() || widget.range[1] !== period.end.getTime());
  return own ? `${title}, ${formatRange(new Date(widget.range[0]), new Date(widget.range[1]))}` : title;
}

function figuresText({ period, widgets }) {
  return widgets.map((widget, index) => {
    const lines = linesOf(widget);
    const shown = lines.length ? lines : ['nothing is connected yet'];
    return [`${index + 1}. ${headingOf(widget, period)}`, ...shown.map(line => `- ${line}`)].join('\n');
  }).join('\n\n');
}

function reportText({ name, period }) {
  const [from, to] = previousRange([period.start.getTime(), period.end.getTime()]);
  return [
    `Name: ${name.trim() || 'Untitled report'}`,
    `Time frame: ${period.label}, ${formatRange(period.start, period.end)}`,
    `Previous period, for comparison: ${formatRange(new Date(from), new Date(to))}`,
  ].join('\n');
}

/**
 * The prompt for the report (from buildReport) and the instructions of the author, as sections in the order they are
 * sent: [{ id, source, title, text }]. The source is a key of SOURCES. The text of an answer that is not given yet is
 * empty.
 */
export function craftPrompt(report, instructions) {
  return [
    { id: 'rules', source: 'studio', title: 'Rules', text: RULES },
    { id: 'subject', source: 'author', title: 'What the report shows', text: instructions.subject.trim() },
    { id: 'focus', source: 'author', title: 'What to look out for', text: instructions.focus.trim() },
    { id: 'report', source: 'report', title: 'Report', text: reportText(report) },
    { id: 'figures', source: 'report', title: 'Figures', text: figuresText(report) },
    { id: 'task', source: 'studio', title: 'Task', text: TASK },
  ];
}
