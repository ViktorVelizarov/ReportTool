import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { pdfRequest, stateOfPdfRequest } from '../js/model/exports.js';
import {
  approveBlock, countApproved, countDrafts, finishGenerating, initialState, jsonCopy, setTemplate, startGenerating,
} from '../js/state.js';
import { REPORT } from './helpers/report.js';

const NOW = Date.parse('2026-10-04T15:30:00Z');

const TEXT = {
  summary: 'Summary.',
  findings: 'Findings.',
  descriptions: { 'irrigation-1': 'About the flow.' },
};

const withReport = () =>
  setTemplate({ ...initialState(NOW), name: REPORT.name, periodId: REPORT.periodId }, REPORT.template);

/** The report with generated text, of which only the summary is approved. */
const withApprovedSummary = () =>
  approveBlock(finishGenerating(startGenerating(withReport()), TEXT), 'summary');

test('the request for a PDF has the report and the realm it is about', () => {
  const request = pdfRequest(withReport(), 'manufacturer', 1798);

  assert.equal(request.realm, 'manufacturer');
  assert.equal(request.width, 1798, 'the width that the report has in Preview');
  assert.equal(request.name, REPORT.name);
  assert.equal(request.periodId, 'last7');
  assert.equal(request.asOf, NOW);
  assert.deepEqual(request.template, jsonCopy(REPORT.template));
  assert.deepEqual(request.text, {});
});

test('only generated text that is approved goes into the request', () => {
  const request = pdfRequest(withApprovedSummary(), undefined, 1280);

  assert.deepEqual(request.text, { summary: 'Summary.' });
  assert.deepEqual(pdfRequest(startGenerating(withReport()), undefined, 1280).text, {}, 'text that is being written');
});

test('the page that makes the PDF opens the report of the request as in Preview, with the approved text', () => {
  const sent = JSON.parse(JSON.stringify(pdfRequest(withApprovedSummary(), 'manufacturer', 1280)));

  const state = stateOfPdfRequest(sent);

  assert.equal(state.name, REPORT.name);
  assert.equal(state.periodId, 'last7');
  assert.equal(state.asOf, NOW);
  assert.deepEqual(state.template, jsonCopy(REPORT.template));
  assert.equal(state.editMode, false);
  assert.equal(state.ai.status, 'ready');
  assert.equal(countApproved(state.ai), 1);
  assert.equal(countDrafts(state.ai), 0);
  assert.equal(state.ai.blocks.summary.text, 'Summary.');
});

test('a request without approved text has no generated text', () => {
  assert.equal(stateOfPdfRequest(pdfRequest(withReport(), undefined, 1280)).ai, null);
});

test('a request without a valid report is refused', () => {
  const valid = pdfRequest(withReport(), undefined, 1280);

  for (const request of [undefined, null, {}, { ...valid, template: {} }, { ...valid, template: undefined },
    { ...valid, periodId: 'last-week' }, { ...valid, asOf: 'yesterday' }, { ...valid, asOf: undefined }]) {
    assert.throws(() => stateOfPdfRequest(request), /no valid report/);
  }
});

test('the page that is printed loads the same scripts and styles as the page of the author', () => {
  const read = file => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
  const assets = html => [...html.matchAll(/<(?:script|link)\b[^>]*\b(?:src|href)="([^"]+)"/g)]
    .map(match => match[1]).filter(address => address !== 'data:,' && !address.startsWith('js/'));
  const importMap = html => html.match(/<script type="importmap">(.*?)<\/script>/)?.[1];

  assert.ok(assets(read('index.html')).length >= 5);
  assert.deepEqual(assets(read('render.html')), assets(read('index.html')));
  assert.equal(importMap(read('render.html')), importMap(read('index.html')));
  assert.match(read('index.html'), /<script type="module" src="js\/main\.js">/);
  assert.match(read('render.html'), /<script type="module" src="js\/render\.js">/);
});
