/**
 * The page that the report service opens in a browser to make a PDF (see report-service, package export): the report as
 * in Preview, without the toolbar and the sidebar. Before the page starts, that browser sets
 *
 *   window.reportRenderRequest = { width, report }
 *
 * where report is the request for the PDF (see model/exports.js) and width is the width in pixels that the report has
 * in Preview, which is also the width of the window. When the report is drawn the page sets
 *
 *   window.reportRenderResult = { scale } or { error }
 *
 * and the browser prints at that scale, which makes the layout as wide as the paper. The report is printed as it is in
 * Preview, one part after the other; only where a page break would cut a part, the page moves that part to the next
 * page (see model/pages.js).
 */

import { registerWidgetTypes } from './builder/index.js';
import { loadAssetModel } from './data/asset-model.js';
import { loadBranding } from './data/branding.js';
import { realmOf } from './data/realm.js';
import { ReportContext } from './data/report-context.js';
import { ServiceClient } from './data/service-client.js';
import { h } from './dom.js';
import { stateOfPdfRequest } from './model/exports.js';
import {
  cutBoxes, MAX_LAYOUT_WIDTH_PX, MIN_LAYOUT_WIDTH_PX, PAGE_HEIGHT_PX, PAGE_WIDTH_PX, placeOnPages, reserveAtEnd,
} from './model/pages.js';
import { createStore } from './state.js';
import { mountBuilder } from './ui/builder.js';
import { mountPaper } from './ui/paper.js';
import { showStartupError } from './ui/startup-error.js';

const POLL_MS = 50;

/** How long nothing may be loading or drawing before the report counts as drawn. */
const QUIET_MS = 300;

const TIMEOUT_MS = 40_000;

/** What a part leaves free at the bottom of a page, so that the rounding of the browser cannot cut it. */
const PAGE_END_MARGIN_PX = 4;

/** A part that has to move less than this stays where it is. */
const MIN_GAP_PX = 0.5;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/** Counts the calls to the service that are on their way; the function it returns says how many. */
function countRequests() {
  let pending = 0;
  const { fetch } = ServiceClient;
  ServiceClient.fetch = async (...args) => {
    pending += 1;
    try {
      return await fetch(...args);
    } finally {
      pending -= 1;
    }
  };
  return () => pending;
}

/** The elements that match the selector, also inside the shadow roots of the page. */
function selectDeep(root, selector) {
  const found = [...root.querySelectorAll(selector)];
  for (const element of root.querySelectorAll('*')) {
    if (element.shadowRoot) found.push(...selectDeep(element.shadowRoot, selector));
  }
  return found;
}

function isBusy(preview, widgetCount, pending) {
  const drawn = preview.shadowRoot?.querySelectorAll('.grid-stack-item').length ?? 0;
  return pending() > 0
    || !preview.grid || preview.isLoading || preview.rerenderActive || drawn < widgetCount
    || document.fonts.status === 'loading'
    || selectDeep(document, 'or-loading-indicator').length > 0
    || selectDeep(document, 'img').some(image => !image.complete);
}

/** Waits until the widgets have their data and are drawn: nothing was loading for a while. */
async function whenDrawn(preview, widgetCount, pending) {
  const deadline = Date.now() + TIMEOUT_MS;
  let quietSince = Date.now();
  while (Date.now() - quietSince < QUIET_MS) {
    if (Date.now() > deadline) throw new Error('The report did not finish loading');
    await sleep(POLL_MS);
    if (isBusy(preview, widgetCount, pending)) quietSince = Date.now();
  }
}

/**
 * Puts the report on the pages of the given height in pixels of the layout. The paper starts at the top of the first
 * page and has these parts, one after the other: the cover and the blocks of text, the widgets of the grid, and the
 * descriptions of the widgets (the heading goes with the first one), then the line at the end. A part that a page break
 * would cut gets an empty space before it, or for a widget a place lower in the grid, that reaches to the top of the
 * next page. The line at the end is not a part of its own: the lowest parts keep room for it, so that it is not left
 * alone on a page.
 */
function placeOnPaper(paper, preview, pageHeight) {
  preview.grid.setAnimation(false); // the widgets are put in their place, not slid into it
  const grid = preview.shadowRoot.getElementById('gridElement');
  const items = [...grid.querySelectorAll('.grid-stack-item')];
  const boxOf = element => {
    const origin = paper.getBoundingClientRect().top;
    const { left, right, top, bottom } = element.getBoundingClientRect();
    return { left, right, top: top - origin, bottom: bottom - origin };
  };
  const shown = elements => [...elements].filter(element => element.getBoundingClientRect().height > 0);

  const before = shown(paper.querySelectorAll(':scope > .cover, :scope > .ai-block'));
  const heading = paper.querySelector(':scope > .descriptions > h2');
  const cards = shown(paper.querySelectorAll(':scope > .descriptions .ai-block'));
  const footer = paper.querySelector(':scope > .paper-foot');

  const hostTop = boxOf(preview).top;
  const boxes = [
    ...before.map(boxOf),
    ...items.map(boxOf),
    ...cards.map((card, index) => {
      const box = boxOf(card);
      return index === 0 ? { ...box, top: boxOf(heading).top } : box;
    }),
  ];
  if (boxes.length === 0) return;
  const space = footer ? Math.max(0, boxOf(footer).bottom - Math.max(...boxes.map(box => box.bottom))) : 0;
  const shifts = placeOnPages(reserveAtEnd(boxes, space), pageHeight, PAGE_END_MARGIN_PX);

  // the parts are moved from the top of the paper down, so that what is measured has already moved
  const moveTo = (element, target) => {
    const gap = target - boxOf(element).top;
    if (gap > MIN_GAP_PX) element.before(h('div', { class: 'page-gap', style: `height: ${gap}px` }));
  };
  const startOfItems = before.length;
  const startOfCards = startOfItems + items.length;
  before.forEach((element, index) => moveTo(element, boxes[index].top + shifts[index]));

  if (items.length > 0) {
    const itemShifts = shifts.slice(startOfItems, startOfCards);
    const shared = Math.min(...itemShifts); // what the whole grid moves; the rest is moved inside the grid
    moveTo(preview, hostTop + shared);
    items.forEach((item, index) => {
      item.style.top = `${parseFloat(getComputedStyle(item).top) + itemShifts[index] - shared}px`;
    });
    // the widgets are placed on the grid, so it has to grow with them to hold the pages that they now use
    const lowest = Math.max(...items.map(item => item.getBoundingClientRect().bottom));
    const height = Math.max(grid.getBoundingClientRect().height, lowest - grid.getBoundingClientRect().top);
    grid.style.setProperty('height', `${height}px`, 'important');
  }
  cards.forEach((card, index) =>
    moveTo(index === 0 ? heading : card, boxes[startOfCards + index].top + shifts[startOfCards + index]));

  const placed = [...before, ...items, ...(cards.length > 0 ? [heading] : []), ...cards].map(boxOf);
  const cut = cutBoxes(placed, pageHeight).filter(index => placed[index].bottom - placed[index].top <= pageHeight);
  if (cut.length > 0) console.error(`${cut.length} parts of the report are cut by a page break`);
}

async function render() {
  const requests = countRequests();
  ReportContext.realm = realmOf(location);
  registerWidgetTypes();
  try {
    const { width, report } = window.reportRenderRequest ?? {};
    if (!(width >= MIN_LAYOUT_WIDTH_PX && width <= MAX_LAYOUT_WIDTH_PX)) {
      throw new Error('The request has no valid width');
    }
    await Promise.all([loadAssetModel(), loadBranding()]);

    const state = stateOfPdfRequest(report);
    const scale = PAGE_WIDTH_PX / width;
    const paper = document.getElementById('paper');
    const preview = document.getElementById('preview');
    document.title = state.name.trim() || 'Untitled report'; // the title of the PDF
    const store = createStore(state);
    mountPaper(paper, store);
    mountBuilder({ store, preview, sidebar: document.getElementById('sidebar'), onSave: () => {} });

    await whenDrawn(preview, state.template.widgets.length, requests);
    placeOnPaper(paper, preview, PAGE_HEIGHT_PX / scale);
    await sleep(POLL_MS);
    window.reportRenderResult = { scale };
  } catch (error) {
    console.error(error);
    showStartupError(document.querySelector('main'), error.message);
    window.reportRenderResult = { error: error.message };
  }
}

render();
