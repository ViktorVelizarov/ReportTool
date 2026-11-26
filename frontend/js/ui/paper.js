/**
 * The report as it will be exported: the cover and the generated text around the grid of the dashboard builder, which
 * is already on the page (root holds it), and below the grid the descriptions of the widgets.
 */

import { WIDGET_SPECS } from '../builder/service/widget-specs.js';
import { Branding } from '../data/branding.js';
import { ReportContext } from '../data/report-context.js';
import { h, onChange, replaceChildren } from '../dom.js';
import '../kit/inputs.js';
import { formatDate, formatRange, plural } from '../model/format.js';
import { MAX_LAYOUT_WIDTH_PX, MIN_LAYOUT_WIDTH_PX, PAGE_WIDTH_PX } from '../model/pages.js';
import { resolvePeriod } from '../model/periods.js';
import { readingOrder } from '../model/report.js';
import { approveAllBlocks, countDrafts, removeAllBlocks } from '../state.js';
import { createBlockView } from './blocks.js';
import { icon } from './icons.js';

const coverKey = state => [state.name, state.periodId, state.asOf, state.template.widgets.length].join('|');

const hasDescriptions = ai =>
  ai?.status === 'loading' || Object.keys(ai?.blocks ?? {}).some(id => id.startsWith('desc:'));

export function mountPaper(root, store) {
  const cover = h('header', { class: 'cover' });
  const banner = h('div', { class: 'ai-banner', hidden: true });
  const summary = createBlockView(store, 'summary', 'Summary');
  const findings = createBlockView(store, 'findings', 'Key findings');
  const descriptionList = h('div', { class: 'description-list' });
  const descriptions = h('section', { class: 'descriptions', hidden: true },
    h('h2', null, 'Widget descriptions'), descriptionList);
  root.prepend(cover, banner, summary.element, findings.element);
  const source = ReportContext.realm ? `OpenRemote, realm ${ReportContext.realm}` : 'OpenRemote';
  root.append(descriptions, h('footer', { class: 'paper-foot' }, `Data from ${source} · Prepared with Report Studio`));

  const views = new Map(); // the description views by widget id and title; a renamed widget gets a new view
  let shownViews = [];
  let lastAi;

  /** The views of the descriptions of the widgets, in reading order. */
  function descriptionViews(widgets) {
    return readingOrder(widgets).map(widget => {
      const title = widget.displayName || WIDGET_SPECS[widget.widgetTypeId].displayName;
      const key = `${widget.id}|${title}`;
      if (!views.has(key)) views.set(key, createBlockView(store, `desc:${widget.id}`, title, 3));
      return views.get(key);
    });
  }

  const drawCover = onChange(coverKey, state => {
    const period = resolvePeriod(state.periodId, new Date(state.asOf));
    replaceChildren(cover,
      Branding.logo && h('img', {
        class: 'cover-logo', src: Branding.logo, alt: 'Logo', onerror: event => event.target.remove(),
      }),
      h('p', { class: 'cover-kicker' }, 'Report'),
      h('h1', null, state.name.trim() || 'Untitled report'),
      h('p', { class: 'cover-period' },
        h('strong', null, period.label), ` · ${formatRange(period.start, period.end)}`),
      h('p', { class: 'cover-meta' },
        `Generated ${formatDate(new Date(state.asOf))} · ${plural(state.template.widgets.length, 'widget')}`));
  });

  const button = (text, theme, change) =>
    h('or-vaadin-button', { theme, onclick: () => store.update(change) }, text);

  function drawBanner(ai) {
    banner.hidden = ai?.status !== 'ready';
    if (banner.hidden) return;
    const drafts = countDrafts(ai);
    banner.dataset.tone = drafts ? 'warning' : 'ok';
    replaceChildren(banner,
      icon(drafts ? 'alert-outline' : 'check', 18),
      h('p', null, drafts
        ? [
          h('strong', null, `${plural(drafts, 'text block')} to approve.`),
          ' Text that is not approved is left out of the PDF.',
        ]
        : 'All generated text is approved and will be included in the PDF.'),
      h('div', { class: 'ai-banner-actions' },
        drafts > 0 && button('Approve all', 'primary small', approveAllBlocks),
        button('Discard text', 'tertiary error small', removeAllBlocks)));
  }

  function render(state) {
    root.dataset.mode = state.editMode ? 'edit' : 'preview';
    drawCover(state);
    const ordered = descriptionViews(state.template.widgets);
    const reordered = ordered.length !== shownViews.length || ordered.some((view, index) => view !== shownViews[index]);
    if (reordered) {
      shownViews = ordered;
      replaceChildren(descriptionList, ordered.map(view => view.element));
    }
    if (reordered || state.ai !== lastAi) {
      lastAi = state.ai;
      drawBanner(state.ai);
      [summary, findings, ...shownViews].forEach(view => view.update(state.ai));
      descriptions.hidden = !hasDescriptions(state.ai);
    }
  }

  render(store.get());
  store.subscribe(render);
}

/**
 * Has the browser print the report scaled to the width of the page, when the user prints it with Ctrl+P: the widgets
 * are drawn for the width of the screen. (The PDF of the service is printed at a scale of its own, see render.js.)
 */
export function fitPrintToPage(root) {
  window.addEventListener('beforeprint', () => {
    root.style.removeProperty('zoom');
    const { width } = root.querySelector('or-dashboard-preview').getBoundingClientRect();
    root.style.zoom = String(PAGE_WIDTH_PX / width);
  });
  window.addEventListener('afterprint', () => root.style.removeProperty('zoom'));
}

/**
 * The width in pixels that the report has in Preview: the inside of the paper, which in Preview has all the room there
 * is. While the report is edited the sidebar takes room beside the paper, which is counted back, so that the PDF is
 * laid out in the same width whichever mode it is made in.
 */
export function previewWidth() {
  const paper = document.getElementById('paper');
  const sidebar = document.getElementById('sidebar');
  const paperStyle = getComputedStyle(paper);
  const layout = getComputedStyle(paper.closest('.layout'));
  const inside = paper.clientWidth - parseFloat(paperStyle.paddingLeft) - parseFloat(paperStyle.paddingRight);
  const beside = !sidebar.hidden && layout.flexDirection === 'row'
    ? sidebar.offsetWidth + parseFloat(layout.columnGap)
    : 0;
  return Math.min(MAX_LAYOUT_WIDTH_PX, Math.max(MIN_LAYOUT_WIDTH_PX, Math.round(inside + beside)));
}
