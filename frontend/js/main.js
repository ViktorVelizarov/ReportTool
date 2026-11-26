import { registerWidgetTypes } from './builder/index.js';
import { loadAssetModel } from './data/asset-model.js';
import { realmOf } from './data/realm.js';
import { ReportContext } from './data/report-context.js';
import { createStore, initialState } from './state.js';
import { mountBuilder } from './ui/builder.js';
import { mountHeader, saveCurrent } from './ui/header.js';
import { mountPaper } from './ui/paper.js';
import { showStartupError } from './ui/startup-error.js';
import { mountToolbar } from './ui/toolbar.js';
import { widgetTools } from './ui/widget-tools.js';

/** The moment the report is made for. Normally now; ?asOf=2026-10-04T12:00:00Z fixes it, for repeatable screenshots. */
function reportMoment() {
  const raw = new URLSearchParams(location.search).get('asOf');
  const moment = raw && (Date.parse(raw) || Number(raw));
  return Number.isFinite(moment) && moment > 0 ? moment : Date.now();
}

async function start() {
  try {
    // The builder asks for the asset types without waiting, so the model is read before the report is shown
    await loadAssetModel();
  } catch (error) {
    console.error(error);
    showStartupError(document.querySelector('main'), error.message);
    return;
  }

  const store = createStore(initialState(reportMoment()));

  mountHeader(document.getElementById('header'), store);
  mountToolbar(document.getElementById('toolbar'), store);
  mountPaper(document.getElementById('paper'), store);
  mountBuilder({
    store,
    preview: document.getElementById('preview'),
    sidebar: document.getElementById('sidebar'),
    toolsFor: widgetTools(store),
    onSave: () => saveCurrent(store),
  });
}

ReportContext.realm = realmOf(location);

// Before the builder elements draw for the first time: the widget browser lists the types that are registered then
registerWidgetTypes();

start();
