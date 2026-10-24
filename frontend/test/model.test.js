import assert from 'node:assert/strict';
import { before, test } from 'node:test';

import { WIDGET_SPECS } from '../js/builder/service/widget-specs.js';
import { loadAssetModel } from '../js/data/asset-model.js';
import { AssetService } from '../js/data/asset-service.js';
import { ReportContext } from '../js/data/report-context.js';
import { getTimeSelectionDates } from '../js/data/time-window.js';
import { generateText } from '../js/model/ai.js';
import { exportFileName } from '../js/model/exports.js';
import { formatNumber, formatRange, formatValue, listNames } from '../js/model/format.js';
import { instructionsComplete, newInstructions, QUESTIONS } from '../js/model/instructions.js';
import { PERIODS, previousRange, resolvePeriod } from '../js/model/periods.js';
import { craftPrompt, SOURCES } from '../js/model/prompt.js';
import { buildReport, readingOrder } from '../js/model/report.js';
import { percentChange, summarize } from '../js/model/stats.js';
import { DAY, HOUR } from '../js/model/time.js';
import { REPORT } from './helpers/report.js';
import { IDS, installFakeService, NOW, REALM } from './helpers/service.js';
import { buildTemplate, ref } from './helpers/templates.js';

process.env.TZ = 'UTC';

/** The moment and time frame a report is made for, as the widgets read them. */
const contextFor = periodId =>
  ({ asOf: NOW, period: resolvePeriod(periodId, new Date(NOW)), now: () => new Date(NOW) });

before(async () => {
  installFakeService();
  ReportContext.asOf = NOW; // the moment of the current values of the assets
  ReportContext.realm = REALM;
  await loadAssetModel();
});

// --- periods ---

test('rolling periods end at the last full hour', () => {
  const now = new Date(NOW);

  const last7 = resolvePeriod('last7', now);
  assert.equal(last7.label, 'Last 7 days');
  assert.equal(last7.end.toISOString(), '2026-10-04T15:00:00.000Z');
  assert.equal(last7.start.toISOString(), '2026-09-27T15:00:00.000Z');
  assert.equal(resolvePeriod('last90', now).start.toISOString(), '2026-07-06T15:00:00.000Z');
});

test('calendar periods cover whole months and quarters', () => {
  const now = new Date(NOW);

  const month = resolvePeriod('lastMonth', now);
  assert.equal(month.start.toISOString(), '2026-09-01T00:00:00.000Z');
  assert.equal(month.end.toISOString(), '2026-09-30T23:59:59.999Z');

  const quarter = resolvePeriod('lastQuarter', now);
  assert.equal(quarter.start.toISOString(), '2026-07-01T00:00:00.000Z');
  assert.equal(quarter.end.toISOString(), '2026-09-30T23:59:59.999Z');
});

test('calendar periods reach back across the new year', () => {
  const january = resolvePeriod('lastMonth', new Date('2026-01-15T12:00:00Z'));
  assert.equal(january.start.toISOString(), '2025-12-01T00:00:00.000Z');
  assert.equal(january.end.toISOString(), '2025-12-31T23:59:59.999Z');

  const february = resolvePeriod('lastQuarter', new Date('2026-02-10T12:00:00Z'));
  assert.equal(february.start.toISOString(), '2025-10-01T00:00:00.000Z');
  assert.equal(february.end.toISOString(), '2025-12-31T23:59:59.999Z');
});

test('the previous range is as long and ends right before the range starts', () => {
  for (const { id } of PERIODS) {
    const { start, end } = resolvePeriod(id, new Date(NOW));
    const [from, to] = previousRange([start.getTime(), end.getTime()]);

    assert.equal(to, start.getTime() - 1, id);
    assert.equal(to - from, end.getTime() - start.getTime(), id);
  }
});

test('an unknown period is rejected', () => {
  assert.throws(() => resolvePeriod('last1000'), /Unknown period/);
});

// --- stats ---

test('summarize finds the mean, the extremes and the latest value', () => {
  const stats = summarize([{ x: 1, y: 4 }, { x: 2, y: 10 }, { x: 3, y: 1 }, { x: 4, y: 5 }]);

  assert.deepEqual(stats, { count: 4, mean: 5, min: 1, minAt: 3, max: 10, maxAt: 2, latest: 5, latestAt: 4 });
  assert.equal(summarize([]), null);
});

test('percent change compares with the previous value', () => {
  assert.equal(percentChange(110, 100), 10);
  assert.equal(percentChange(90, 100), -10);
  assert.equal(percentChange(5, -10), 150);
  assert.equal(percentChange(5, 0), null);
  assert.equal(percentChange(5, undefined), null);
});

// --- format ---

test('numbers get fewer decimals the larger they are', () => {
  assert.equal(formatNumber(1234.56), '1,235');
  assert.equal(formatNumber(41.84), '41.8');
  assert.equal(formatNumber(0.957), '0.96');
  assert.equal(formatNumber(null), '–');
});

test('values are shown with their unit', () => {
  assert.equal(formatValue(41.84, 'MW'), '41.8 MW');
  assert.equal(formatValue(94, '%'), '94%');
  assert.equal(formatValue(72, ''), '72');
});

test('names are listed in full up to three, and then counted', () => {
  assert.equal(listNames(['A']), 'A');
  assert.equal(listNames(['A', 'B']), 'A and B');
  assert.equal(listNames(['A', 'B', 'C']), 'A, B and C');
  assert.equal(listNames(['A', 'B', 'C', 'D', 'E']), 'A, B, C and 2 more');
});

test('a range shows the year once, or twice when it spans two years', () => {
  const range = (from, to) => formatRange(new Date(`${from}T00:00:00Z`), new Date(`${to}T00:00:00Z`));

  assert.equal(range('2026-09-28', '2026-10-04'), '28 Sept – 4 Oct 2026');
  assert.equal(range('2025-12-01', '2026-01-31'), '1 Dec 2025 – 31 Jan 2026');
});

// --- export names ---

test('file names are made of the report name, the date and what is in the file', () => {
  assert.equal(exportFileName('Weekly grid report', NOW, 'pdf'), 'weekly-grid-report_2026-10-04.pdf');
  assert.equal(exportFileName('Weekly grid report', NOW, 'zip', 'charts'), 'weekly-grid-report_2026-10-04_charts.zip');
  assert.equal(exportFileName('  ', NOW, 'csv', 'data'), 'report_2026-10-04_data.csv');
});

test('names lose accents and anything that is not safe in a file name', () => {
  assert.equal(exportFileName('Café – Q3 / "Netherlands"!', NOW, 'pdf'), 'cafe-q3-netherlands_2026-10-04.pdf');
  assert.equal(exportFileName('../../etc/passwd', NOW, 'csv'), 'etc-passwd_2026-10-04.csv');
});

// --- templates ---

test('a template is made from a short description, with the default config of each widget type', () => {
  const description = [{ type: 'kpi', name: 'Load', box: [1, 2, 3, 4], config: { attributeRefs: [ref('a', 'b')] } }];
  const template = buildTemplate('t', description);

  assert.equal(template.id, 't');
  assert.equal(template.columns, 12);
  assert.equal(template.screenPresets[0].scalingPreset, 'WRAP_TO_SINGLE_COLUMN');
  const [widget] = template.widgets;
  assert.equal(widget.id, 't-1');
  assert.equal(widget.displayName, 'Load');
  assert.equal(widget.widgetTypeId, 'kpi');
  assert.deepEqual(widget.gridItem, {
    id: 't-1', x: 1, y: 2, w: 3, h: 4, minW: 1, minH: 1, noResize: false, noMove: false, locked: false,
  });
  assert.deepEqual(widget.widgetConfig,
    { ...WIDGET_SPECS.kpi.getDefaultConfig(), attributeRefs: [{ id: 'a', name: 'b' }] });

  widget.widgetConfig.attributeRefs[0].id = 'changed';
  assert.equal(description[0].config.attributeRefs[0].id, 'a', 'the template has its own copy of the config');
  assert.deepEqual(buildTemplate('t', description).widgets[0].widgetConfig.attributeRefs, [{ id: 'a', name: 'b' }]);
});

// --- report figures ---

test('a report has the figures of its widgets in reading order', async () => {
  const report = await buildReport(REPORT, contextFor('last7'));

  assert.equal(report.name, 'Irrigation report');
  assert.equal(report.period.id, 'last7');
  assert.equal(report.generatedAt.getTime(), NOW);
  assert.deepEqual(report.widgets.map(widget => widget.name), [
    'Water flow', 'Tank level', 'Nutrients', 'Salinity', 'Soil temperature', 'Irrigation', 'Irrigation map',
    'Site plan',
  ]);
  assert.deepEqual(readingOrder(REPORT.template.widgets).map(widget => widget.displayName),
    report.widgets.map(widget => widget.name));
});

test('charts and KPIs sum up the data points of the time frame and of the time before it', async () => {
  const context = contextFor('last7');
  const { widgets } = await buildReport(REPORT, context);
  const line = widgets.find(widget => widget.type === 'linechart');
  const range = [context.period.start.getTime(), context.period.end.getTime()];

  assert.deepEqual(line.range, range);
  assert.deepEqual(line.entries.map(entry => [entry.asset.name, entry.label, entry.unit]), [
    ['Soil drip 1', 'Flow water', 'l/h'],
    ['Soil drip 2', 'Flow water', 'l/h'],
  ]);
  const [from, to] = range;
  const points = await AssetService.getDatapoints(IDS.drip1, 'flowWater', { fromTimestamp: from, toTimestamp: to });
  assert.equal(points.length, 7 * 24 + 1);
  assert.deepEqual(line.entries[0].stats, summarize(points));
  const [previousFrom, previousTo] = previousRange(range);
  const before = await AssetService.getDatapoints(IDS.drip1, 'flowWater',
    { fromTimestamp: previousFrom, toTimestamp: previousTo });
  assert.deepEqual(line.entries[0].previous, summarize(before));
});

test('an attribute without data points, or a value that is not a number, has nothing to sum up', async () => {
  const { widgets } = await buildReport(REPORT, contextFor('last7'));

  const temperature = widgets.find(widget => widget.name === 'Soil temperature').entries[0];
  assert.equal(temperature.numeric, true);
  assert.equal(temperature.stats, null);
  assert.equal(temperature.previous, null);
  assert.equal(temperature.unit, '\u00b0F', 'the units of the attribute are those that count');
});

test('a widget with a time window of its own is summed up over that window', async () => {
  const template = buildTemplate('own', [{
    type: 'linechart', name: 'Day', box: [0, 0, 6, 4],
    config: {
      attributeRefs: [ref(IDS.drip1, 'flowWater')], followReportPeriod: false, defaultTimePresetKey: 'last24Hours',
    },
  }]);

  const [widget] = (await buildReport({ name: 'Own', template }, contextFor('last90'))).widgets;

  const range = getTimeSelectionDates('last', '24Hours', new Date(NOW)).map(date => date.getTime());
  assert.deepEqual(widget.range, range);
  const [from, to] = range;
  const points = await AssetService.getDatapoints(IDS.drip1, 'flowWater', { fromTimestamp: from, toTimestamp: to });
  assert.deepEqual(widget.entries[0].stats, summarize(points));
});

test('gauges and images give the current value as the widget shows it', async () => {
  const { widgets } = await buildReport(REPORT, contextFor('last7'));

  const gauge = widgets.find(widget => widget.type === 'gauge');
  assert.equal(gauge.entries[0].value, '936 l');

  const image = widgets.find(widget => widget.type === 'image');
  assert.equal(image.entries.length, 3);
  assert.equal(image.entries[0].value, '9.6 l/h');
  assert.equal(image.entries[1].value, '936 l');
  assert.equal(image.entries[2].value, undefined, 'an attribute that has no value yet has nothing to show');
});

test('tables and maps list their assets and the attributes they show', async () => {
  const { widgets } = await buildReport(REPORT, contextFor('last7'));

  const table = widgets.find(widget => widget.type === 'table');
  assert.deepEqual(table.assets, ['Soil drip 1', 'Soil drip 2']);
  assert.deepEqual(table.attributes, ['Flow water', 'Tank level']);

  const map = widgets.find(widget => widget.type === 'map');
  assert.deepEqual(map.assets, ['Soil drip 1', 'Soil drip 2']);
  assert.deepEqual(map.attributes, ['Tank level']);
});

test('a widget without data has nothing to sum up', async () => {
  const template = buildTemplate('empty', ['linechart', 'gauge', 'table', 'map'].map((type, index) =>
    ({ type, name: type, box: [0, index * 5, 6, 5], config: {} })));

  const { widgets } = await buildReport({ name: 'Empty', template }, contextFor('last7'));

  assert.deepEqual(widgets.map(widget => widget.entries ?? widget.assets), [[], [], [], []]);
});

test('a reference to an asset that the realm does not have is left out', async () => {
  const template = buildTemplate('gone', [{
    type: 'kpi',
    name: 'Gone',
    box: [0, 0, 3, 2],
    config: { attributeRefs: [ref('7Uk4RzSdTnqF0dkLfM2Wqx', 'flowWater')] },
  }]);

  const { widgets } = await buildReport({ name: 'Gone', template }, contextFor('last7'));

  assert.deepEqual(widgets[0].entries, []);
});

// --- generated text ---

const PERIOD = resolvePeriod('last7', new Date(NOW));
const RANGE = [PERIOD.start.getTime(), PERIOD.end.getTime()];
const asset = (id, name) => ({ id, name });
const stats = (mean, min = mean - 1, max = mean + 1) =>
  ({ count: 3, mean, min, minAt: RANGE[0] + HOUR, max, maxAt: RANGE[0] + DAY, latest: mean, latestAt: RANGE[1] });
const entry = (id, name, label, unit, current, previous) => ({
  asset: asset(id, name), name: label.toLowerCase(), label, unit, numeric: true, range: RANGE,
  stats: current, previous,
});

test('the summary names the time frame, the number of widgets and the assets', async () => {
  const text = generateText(await buildReport(REPORT, contextFor('last7')));

  assert.equal(text.summary, 'This report covers 27 Sept – 4 Oct 2026 (last 7 days) and presents 8 widgets for '
    + 'Soil drip 1, Soil drip 2 and Soil sensor.');
  assert.equal(Object.keys(text.descriptions).length, 8);
});

test('a report of real attributes is described with what they have: no value, no data points, no units', async () => {
  const { descriptions } = generateText(await buildReport(REPORT, contextFor('last7')));

  assert.match(descriptions['irrigation-1'], /^Flow water at Soil drip 1 averaged [\d.]+ l\/h, ranging from /);
  assert.equal(descriptions['irrigation-2'], 'Tank level at Soil drip 1 is currently 936 l.');
  assert.match(descriptions['irrigation-4'],
    /^Salinity at Soil sensor averaged [\d.]+, ranging from [\d.]+ to [\d.]+\. /);
  assert.match(descriptions['irrigation-4'], /OpenRemote has no unit configured for this attribute/);
  assert.equal(descriptions['irrigation-5'], 'Temperature at Soil sensor has no data points in this time frame.');
  assert.equal(descriptions['irrigation-6'], 'Lists Soil drip 1 and Soil drip 2 with Flow water and Tank level.');
  assert.equal(descriptions['irrigation-8'],
    'Flow water at Soil drip 1 is currently 9.6 l/h. Tank level at Soil drip 1 is currently 936 l. '
    + 'Temperature at Soil sensor has no value yet.');
});

test('the findings start with the largest change and name an attribute once', () => {
  const load = entry('s1', 'Substation A', 'Load', 'MW', stats(30), stats(20));
  const report = {
    period: PERIOD,
    widgets: [
      {
        id: 'w1', type: 'linechart', entries: [entry('s2', 'Substation B', 'Load', 'MW', stats(90), stats(100)), load],
      },
      { id: 'w2', type: 'kpi', entries: [load] },
      { id: 'w3', type: 'kpi', entries: [entry('s3', 'Station C', 'Wind', 'm/s', stats(5), null)] },
      { id: 'w4', type: 'kpi', entries: [entry('s4', 'Station D', 'Rain', 'mm', stats(2), stats(2))] },
    ],
  };

  const { findings } = generateText(report);

  assert.match(findings, /^Load at Substation A averaged 30 MW and peaked at 31 MW on Mon 28 Sept, 15:00\. /);
  assert.match(findings, /the average rose by 50%\./);
  assert.match(findings, /Compared with the previous period \(20 Sept – 27 Sept 2026\)/);
  assert.match(findings, / Load at Substation B averaged 90 MW, with a low of 89 MW \(27 Sept 2026\)/);
  assert.equal(findings.match(/Substation A/g).length, 1);
  assert.equal(findings.split('. ').filter(sentence => sentence.includes('averaged')).length, 3);
});

test('the findings say when nothing changed, when there is no earlier data, or when there are no numbers', () => {
  const findingsOf = (...entries) =>
    generateText({ period: PERIOD, widgets: [{ id: 'w', type: 'kpi', entries }] }).findings;

  assert.match(findingsOf(entry('a', 'A', 'Load', 'MW', stats(10), stats(10))),
    /the average was essentially unchanged\.$/);
  assert.match(findingsOf(entry('a', 'A', 'Load', 'MW', stats(10), null)), /There is no earlier data to compare with/);
  assert.equal(generateText({ period: PERIOD, widgets: [{ id: 't', type: 'table', assets: ['A'], attributes: ['B'] }] })
    .findings, 'No numeric attributes are part of this report, so there are no findings to report.');
});

test('every widget gets a description, also when nothing is connected to it', () => {
  const report = {
    period: PERIOD,
    widgets: [
      { id: 'line', type: 'linechart', entries: [entry('a', 'Site A', 'Load', 'MW', stats(40, 25, 55), stats(40))] },
      { id: 'raw', type: 'barchart', entries: [entry('b', 'Logger', 'Signal quality', '', stats(70, 50, 90), null)] },
      { id: 'flag', type: 'linechart', entries: [{ ...entry('c', 'Site C', 'Alarm', '', null, null), numeric: false }],
      },
      { id: 'gap', type: 'kpi', entries: [entry('d', 'Site D', 'Load', 'MW', null, null)] },
      { id: 'gauge', type: 'gauge', entries: [{ asset: asset('e', 'Site E'), label: 'Oil temp', value: '61 °C' }] },
      { id: 'none', type: 'gauge', entries: [{ asset: asset('f', 'Site F'), label: 'Oil temp', value: undefined }] },
      { id: 'table', type: 'table', assets: ['A', 'B', 'C', 'D'], attributes: ['Load', 'Oil temperature'] },
      { id: 'map', type: 'map', assets: ['Hub'], attributes: ['Status'] },
      { id: 'empty', type: 'image', entries: [] },
      { id: 'unset', type: 'map', assets: [], attributes: [] },
    ],
  };

  assert.deepEqual(generateText(report).descriptions, {
    line: 'Load at Site A averaged 40 MW, ranging from 25 MW to 55 MW.',
    raw: 'Signal quality at Logger averaged 70, ranging from 50 to 90. OpenRemote has no unit configured for this '
      + 'attribute, so the values are not interpreted.',
    flag: 'Alarm of Site C over time.',
    gap: 'Load at Site D has no data points in this time frame.',
    gauge: 'Oil temp at Site E is currently 61 °C.',
    none: 'Oil temp at Site F has no value yet.',
    table: 'Lists A, B, C and 1 more with Load and Oil temperature.',
    map: 'Marks Hub on the map, coloured by Status.',
    empty: 'No data is connected to this widget yet.',
    unset: 'No data is connected to this widget yet.',
  });
});

// --- instructions and the prompt ---

const ANSWERS = { subject: '  The irrigation of the greenhouse.  ', focus: 'A tank level below 200 l.' };

/** The sections of the prompt for a report, by id. */
const sectionsById = (report, instructions = ANSWERS) =>
  Object.fromEntries(craftPrompt(report, instructions).map(section => [section.id, section]));

test('the AI is asked only when both questions are answered', () => {
  assert.equal(instructionsComplete({ subject: 'It shows the flow.', focus: 'Drops.' }), true);
  assert.equal(instructionsComplete({ subject: 'It shows the flow.', focus: ' \n' }), false);
  assert.equal(instructionsComplete({ subject: '', focus: 'Drops.' }), false);
  assert.equal(instructionsComplete(newInstructions()), false);
  assert.deepEqual(QUESTIONS.map(question => question.id), Object.keys(newInstructions()));
});

test('the prompt has the answers of the author between the rules and the figures', async () => {
  const report = await buildReport(REPORT, contextFor('last7'));

  const sections = craftPrompt(report, ANSWERS);

  assert.deepEqual(sections.map(({ id, source }) => [id, source]), [
    ['rules', 'studio'], ['subject', 'author'], ['focus', 'author'], ['report', 'report'], ['figures', 'report'],
    ['task', 'studio'],
  ]);
  assert.ok(sections.every(({ source, title, text }) => source in SOURCES && title && text !== undefined));
  assert.equal(sections[1].text, 'The irrigation of the greenhouse.');
  assert.equal(sections[2].text, 'A tank level below 200 l.');
  assert.deepEqual(craftPrompt(report, newInstructions()).slice(1, 3).map(section => section.text), ['', '']);
});

test('only the answers of the author change when the instructions do', async () => {
  const report = await buildReport(REPORT, contextFor('last7'));

  const before = craftPrompt(report, newInstructions());
  const after = craftPrompt(report, ANSWERS);

  assert.deepEqual(after.filter(section => section.source !== 'author'), before.filter(section =>
    section.source !== 'author'));
  assert.notDeepEqual(after, before);
});

test('the prompt names the report, its time frame and the time before it', async () => {
  const { report } = sectionsById(await buildReport(REPORT, contextFor('last7')));

  assert.equal(report.text, 'Name: Irrigation report\n'
    + 'Time frame: Last 7 days, 27 Sept – 4 Oct 2026\n'
    + 'Previous period, for comparison: 20 Sept – 27 Sept 2026');
  assert.match(sectionsById({ name: '  ', period: PERIOD, widgets: [] }).report.text, /^Name: Untitled report\n/);
});

test('the figures list the widgets in reading order, each with what it shows', async () => {
  const { figures } = sectionsById(await buildReport(REPORT, contextFor('last7')));

  const groups = figures.text.split('\n\n');
  assert.deepEqual(groups.map(group => group.split('\n')[0]), [
    '1. Water flow (Line Chart)', '2. Tank level (Gauge)', '3. Nutrients (Bar Chart)', '4. Salinity (KPI)',
    '5. Soil temperature (KPI)', '6. Irrigation (Table)', '7. Irrigation map (Map)', '8. Site plan (Image)',
  ]);
  const flow = 'Flow water, Soil drip \\d: average [\\d.]+ l\\/h, lowest [\\d.]+ l\\/h, highest [\\d.]+ l\\/h; '
    + 'the previous period averaged [\\d.]+ l\\/h \\([+-]?[\\d.]+%\\)';
  assert.match(groups[0], new RegExp(`^1\\. Water flow \\(Line Chart\\)\\n- ${flow}\\n- ${flow}$`));
  assert.equal(groups[1], '2. Tank level (Gauge)\n- Tank level, Soil drip 1: currently 936 l');
  assert.match(groups[3],
    /^4\. Salinity \(KPI\)\n- Salinity, Soil sensor: average [\d.]+, lowest [\d.]+, highest [\d.]+; /);
  assert.equal(groups[4], '5. Soil temperature (KPI)\n- Temperature, Soil sensor: no data points in this time frame');
  assert.equal(groups[5],
    '6. Irrigation (Table)\n- assets Soil drip 1 and Soil drip 2; attributes Flow water and Tank level');
  assert.equal(groups[6], '7. Irrigation map (Map)\n- assets Soil drip 1 and Soil drip 2; coloured by Tank level');
  assert.equal(groups[7], '8. Site plan (Image)\n- Flow water, Soil drip 1: currently 9.6 l/h\n'
    + '- Tank level, Soil drip 1: currently 936 l\n- Temperature, Soil sensor: no value yet');
});

test('the figures say what is missing: a number, data points, earlier data, a value, a connection', () => {
  const report = {
    name: 'Missing',
    period: PERIOD,
    widgets: [
      {
        id: 'line',
        name: 'Load',
        type: 'linechart',
        entries: [
          entry('a', 'Site A', 'Load', 'MW', stats(110), stats(100)),
          entry('b', 'Site B', 'Load', 'MW', stats(90), stats(100)),
          entry('c', 'Site C', 'Load', 'MW', stats(10), null),
          entry('d', 'Site D', 'Load', 'MW', null, null),
          { ...entry('e', 'Site E', 'Alarm', '', null, null), numeric: false },
        ],
      },
      {
        id: 'gauge',
        name: 'Oil',
        type: 'gauge',
        entries: [
          { asset: asset('f', 'Site F'), label: 'Oil temp', value: '61 °C' },
          { asset: asset('g', 'Site G'), label: 'Oil temp', value: undefined },
        ],
      },
      { id: 'table', name: 'Sites', type: 'table', assets: ['A', 'B', 'C', 'D'], attributes: ['Load'] },
      { id: 'map', name: 'Nothing', type: 'map', assets: [], attributes: [] },
      { id: 'image', type: 'image', entries: [] },
      { id: 'same', name: 'Gauge', type: 'gauge', entries: [] },
    ],
  };

  assert.equal(sectionsById(report).figures.text, [
    '1. Load (Line Chart)',
    '- Load, Site A: average 110 MW, lowest 109 MW, highest 111 MW; the previous period averaged 100 MW (+10%)',
    '- Load, Site B: average 90 MW, lowest 89 MW, highest 91 MW; the previous period averaged 100 MW (-10%)',
    '- Load, Site C: average 10 MW, lowest 9 MW, highest 11 MW; no earlier data to compare with',
    '- Load, Site D: no data points in this time frame',
    '- Alarm, Site E: not a number, so there are no figures',
    '',
    '2. Oil (Gauge)',
    '- Oil temp, Site F: currently 61 °C',
    '- Oil temp, Site G: no value yet',
    '',
    '3. Sites (Table)',
    '- assets A, B, C and 1 more; attributes Load',
    '',
    '4. Nothing (Map)',
    '- nothing is connected yet',
    '',
    '5. Image',
    '- nothing is connected yet',
    '',
    '6. Gauge',
    '- nothing is connected yet',
  ].join('\n'));
});

test('a widget with a time window of its own names it, one that follows the report does not', () => {
  const report = {
    name: 'Windows',
    period: PERIOD,
    widgets: [
      { id: 'week', name: 'Week', type: 'kpi', range: RANGE, entries: [] },
      { id: 'day', name: 'Day', type: 'kpi', range: [RANGE[1] - DAY, RANGE[1]], entries: [] },
    ],
  };

  const headings = sectionsById(report).figures.text.split('\n\n').map(group => group.split('\n')[0]);

  assert.deepEqual(headings, ['1. Week (KPI)', '2. Day (KPI), 3 Oct – 4 Oct 2026']);
});
