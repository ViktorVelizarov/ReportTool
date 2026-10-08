/**
 * Puts the dashboard builder of builder/ on the page: the grid with the widgets of the report and the sidebar with the
 * widget types to drag onto it and the settings. The report in the store is the only truth. The builder elements get
 * copies of its template, and what the user does in them comes back as events that change the store.
 */

import { DashboardKeyEmitter } from '../builder/or-dashboard-keyhandler.js';
import { ReportContext } from '../data/report-context.js';
import { objectsEqual } from '../data/util.js';
import { resolvePeriod } from '../model/periods.js';
import { addWidget, jsonCopy, removeWidget, selectWidget, setTemplate, updateWidget } from '../state.js';

/**
 * preview is the <or-dashboard-preview> and sidebar the <or-dashboard-sidebar> of the page. toolsFor(widget) gives the
 * buttons of a widget while the report is not edited, and onSave is called when the user presses Ctrl+S.
 */
export function mountBuilder({ store, preview, sidebar, toolsFor, onSave }) {
  let shownId; // the widget that the sidebar shows the settings of
  let shownPeriodId;

  // The settings change the widget they are given, so they get a copy; the change comes back as an event.
  function showSelection(widget) {
    shownId = widget?.id;
    sidebar.selectedWidget = widget && jsonCopy(widget);
    if (preview.selectedWidget?.id !== shownId) preview.selectedWidget = widget && jsonCopy(widget);
  }

  function render(state) {
    // The widgets read the time frame of the report when they fetch their data
    const periodChanged = state.periodId !== shownPeriodId;
    if (periodChanged) {
      shownPeriodId = state.periodId;
      ReportContext.asOf = state.asOf;
      ReportContext.period = resolvePeriod(state.periodId, new Date(state.asOf));
    }
    preview.editMode = state.editMode;
    preview.template = state.template; // the preview ignores a template that is the same as the one it has
    if (periodChanged) preview.refreshWidgets(true);
    if (!objectsEqual(sidebar.template, state.template)) sidebar.template = jsonCopy(state.template);
    sidebar.hidden = !state.editMode;
    const selected = state.template.widgets.find(widget => widget.id === state.selectedId);
    if (selected?.id !== shownId) showSelection(selected);
  }

  preview.toolsFor = toolsFor;
  preview.addEventListener('created', event => store.update(state => addWidget(state, event.detail)));
  preview.addEventListener('changed', event => store.update(state => setTemplate(state, event.detail.template)));
  preview.addEventListener('selected', event => store.update(state => selectWidget(state, event.detail.id)));
  // Moving from one widget to another is a deselection followed by a selection
  preview.addEventListener('deselected', () => {
    if (!preview.selectedWidget) store.update(state => selectWidget(state, undefined));
  });

  sidebar.addEventListener('deselect', () => store.update(state => selectWidget(state, undefined)));
  sidebar.addEventListener('delete-widget', event => store.update(state => removeWidget(state, event.detail.id)));
  sidebar.addEventListener('widget-update', event => store.update(state => updateWidget(state, event.detail)));
  sidebar.addEventListener('board-update', event => {
    store.update(state => setTemplate(state, event.detail.template));
    if (event.detail.force) preview.refreshPreview();
  });

  const keys = new DashboardKeyEmitter();
  keys.addListener('delete', () => store.update(state => removeWidget(state, state.selectedId)));
  keys.addListener('deselect', () => store.update(state => selectWidget(state, undefined)));
  keys.addListener('save', onSave);

  render(store.get());
  store.subscribe(render);
}
