/**
 * Saving the report that is open to the report service, and opening a report that was saved, so that an author finds
 * their reports again later. The service keeps them for the realm; this module says what happened. It also warns the
 * author about changes that are not saved before they are lost, when another report is opened and when the page is
 * left.
 */

import { SavedReports } from '../data/saved-reports.js';
import { hasUnsavedChanges, loadReport, newReport, reportOf, reportSaved, setSavedReports } from '../state.js';
import { ask } from './dialog.js';
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
      store.update(current => reportSaved(current, saved.id, report));
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

/** The values of the select of saved reports that are not a saved report: starting a new one, and asking again. */
const NEW_REPORT = 'new-report';
const READ_AGAIN = 'read-again';

/**
 * The items of the select of the saved reports: a new report, and the saved ones. When the service could not say which
 * there are, the select offers to ask again.
 */
export function savedReportItems(saved) {
  const reports = saved === null
    ? [{ label: 'Saved reports could not be read. Try again', value: READ_AGAIN }]
    : saved.map(report => ({ label: report.name, value: report.id }));
  return [
    { label: 'New report', value: NEW_REPORT },
    ...(reports.length > 0 ? [{ component: 'hr' }, ...reports] : []),
  ];
}

/**
 * Asks the author what to do with the changes of the report that are not saved, before another report takes its place.
 * Gives true when the report may be replaced: it has no such changes, or the author saved them or chose to discard
 * them. Gives false when the author cancelled, or the changes could not be saved (the author has been told why).
 */
async function settleUnsavedChanges(store) {
  if (!hasUnsavedChanges(store.get())) return true;
  const choice = await ask({
    title: 'Unsaved changes',
    text: `“${reportOf(store.get()).name}” has changes that are not saved. If you go on without saving them, `
      + 'they are lost.',
    confirm: 'Save and continue',
    reject: 'Discard changes',
  });
  if (choice === 'reject') return true;
  return choice === 'confirm' && (await persistReport(store)) !== null;
}

/**
 * Does what the author chose in the select of the saved reports. The report that is open is only replaced, by a saved
 * report or a new one, after the author dealt with its unsaved changes; it gives null when that was not done.
 */
export async function chooseSavedReport(store, value, moment) {
  if (value === READ_AGAIN) return readSaved(store);
  if (!(await settleUnsavedChanges(store))) return null;
  if (value === NEW_REPORT) return exclusively(async () => store.update(newReport));
  return openSaved(store, value, moment);
}

/**
 * Has the browser ask before the page is closed, reloaded or left in another way, while the report has changes that are
 * not saved. The question is the browser's own, which a page cannot change: it offers to stay, so that the author can
 * save, or to leave, which discards the changes.
 */
export function warnBeforeLeaving(store) {
  window.addEventListener('beforeunload', event => {
    if (!hasUnsavedChanges(store.get())) return;
    event.preventDefault();
    event.returnValue = ''; // browsers that do not act on the cancelled event ask for this
  });
}
