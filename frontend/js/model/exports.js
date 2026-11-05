/**
 * What a report is exported as: the names of the files, and the request that has the service make the PDF. The service
 * hands the request to a browser that opens this page again (see ui/render.js), which turns it back into the state of
 * the report.
 */

import { initialState } from '../state.js';
import { PERIODS } from './periods.js';

function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "weekly-grid-report_2026-10-04.pdf", or with a suffix: "weekly-grid-report_2026-10-04_charts.zip". */
export function exportFileName(reportName, asOf, extension, suffix = '') {
  const date = new Date(asOf).toISOString().slice(0, 10);
  const parts = [slugify(reportName) || 'report', date, suffix].filter(Boolean);
  return `${parts.join('_')}.${extension}`;
}

/**
 * The request for the PDF of a report: the report as it is on the page, for the realm that it is about (undefined when
 * the page names none), and the width in pixels that the report has in Preview, so that the PDF is laid out as the
 * author sees it. The generated text goes with it as { block id: text } and only when it is approved, so that text
 * nobody has read never leaves the page.
 */
export function pdfRequest(state, realm, width) {
  const blocks = state.ai?.status === 'ready' ? Object.entries(state.ai.blocks) : [];
  const text = Object.fromEntries(blocks.filter(([, block]) => block.state === 'approved')
    .map(([id, block]) => [id, block.text]));
  return { realm, width, name: state.name, periodId: state.periodId, asOf: state.asOf, template: state.template, text };
}

/** The state of the page that makes the PDF: the report of the request, as in Preview. Throws without a valid one. */
export function stateOfPdfRequest(request) {
  if (!Array.isArray(request?.template?.widgets) || !PERIODS.some(period => period.id === request.periodId)
    || !Number.isFinite(request.asOf)) {
    throw new Error('The request holds no valid report');
  }
  const blocks = Object.fromEntries(Object.entries(request.text ?? {})
    .map(([id, text]) => [id, { text, state: 'approved' }]));
  return {
    ...initialState(request.asOf),
    name: String(request.name ?? ''),
    periodId: request.periodId,
    template: request.template,
    ai: Object.keys(blocks).length > 0 ? { status: 'ready', blocks } : null,
    editMode: false,
  };
}
