/**
 * Saving the report that is open to the report service, and opening a report that was saved, so that an author finds
 * their reports again later. The service keeps them for the realm; this module says what happened.
 */

import { SavedReports } from '../data/saved-reports.js';
import { loadReport, newReport, reportOf, reportSaved, setSavedReports } from '../state.js';
import { showToast } from './toast.js';

const ERROR_MS = 8000;

/**
 * Whether a report is being saved or opened. That is done one at a time: the answer to a save belongs to the report
 * that was saved, and it must not land on a report that the author has started or opened in the meantime.
 */
let busy = false;

/** Does the work, and gives what it gives; gives null without doing it when a report is being saved or opened. */
async function exclusively(work) {
  if (busy) return null;
  busy = true;
  try {
    return await work();
  } finally {
    busy = false;
  }
}

function fail(message) {
  showToast(message, { tone: 'error', durationMs: ERROR_MS });
}

/** Reads the saved reports of the realm into the state, where they stay null when the service cannot say. */
export async function readSaved(store) {
  let saved = null;
  try {
    saved = await SavedReports.list();
  } catch (error) {
    console.error(error);
    fail(`The saved reports could not be read: ${error.message}`);
  }
  store.update(state => setSavedReports(state, saved));
}

/**
 * Saves the report over the saved report that is open, or as a new saved report when it is not one, or when the service
 * has no such report any more because it was removed.
 */
async function saveAsOpen(state, report) {
  if (!state.reportId) return SavedReports.add(report);
  try {
    return await SavedReports.replace(state.reportId, report);
  } catch (error) {
    if (error.status !== 404) throw error;
    return SavedReports.add(report);
  }
}

/**
 * Saves the report that is open: the saved report it was opened from or saved as before is replaced, and any other
 * report is added to the saved reports. Gives the { id, name, updatedAt } of the saved report; if it could not be saved
 * it gives null and the author has been told why.
 */
export function persistReport(store) {
  return exclusively(async () => {
    const state = store.get();
    const report = reportOf(state);
    try {
      const saved = await saveAsOpen(state, report);
      store.update(current => reportSaved(current, saved.id));
      await readSaved(store);
      return saved;
    } catch (error) {
      console.error(error);
      fail(error.status === 409
        ? `A saved report is named “${report.name}” already. Give this report another name.`
        : `“${report.name}” could not be saved: ${error.message}`);
      return null;
    }
  });
}

/** Saves the report that is open, and says so. */
export async function saveCurrent(store) {
  if (!store.get().template.widgets.length) return;
  const openId = store.get().reportId;
  const saved = await persistReport(store);
  if (saved) showToast(`${saved.id === openId ? 'Updated' : 'Saved'} “${saved.name}”`, { tone: 'success' });
}

/** Opens the saved report with the id, made for the moment that moment() gives. */
function openSaved(store, id, moment) {
  return exclusively(async () => {
    try {
      const report = await SavedReports.open(id);
      store.update(state => loadReport(state, report, moment()));
      showToast(`Opened “${report.name}”`);
    } catch (error) {
      console.error(error);
      fail(`The report could not be opened: ${error.message}`);
    }
  });
}

/**
 * The menu of the saved reports: a new report, and the saved ones, with a tick at the one that is open. When the
 * service could not say which there are, the menu offers to ask again.
 */
export function savedReportItems(store, moment) {
  const { saved, reportId } = store.get();
  const reports = saved === null
    ? [{ label: 'Saved reports could not be read. Try again', disabled: busy, onSelect: () => readSaved(store) }]
    : saved.map(report => ({
      label: report.name,
      checked: report.id === reportId,
      disabled: busy,
      onSelect: () => openSaved(store, report.id, moment),
    }));
  return [
    { label: 'New report', disabled: busy, onSelect: () => exclusively(async () => store.update(newReport)) },
    ...(reports.length > 0 ? [{ separator: true }, ...reports] : []),
  ];
}
