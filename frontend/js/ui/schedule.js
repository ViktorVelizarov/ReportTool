/**
 * The dialog in which the schedule of a report is set up: when it is made (in OpenRemote's scheduler), who is reminded
 * to check it, who gets it, with which subject and message, and as which files. Only the design is real; saving keeps
 * the schedule with the saved report, and nothing is made or sent.
 */

import { INTUITIVE_NOT_APPLICABLE } from '../../vendor/or-vaadin.js';
import { objectsEqual } from '../data/util.js';
import { h, replaceChildren } from '../dom.js';
import '../kit/i18n.js';
import '../kit/inputs.js';
import '../kit/or-icon.js';
import { formatDateTime, formatRange } from '../model/format.js';
import { resolvePeriod } from '../model/periods.js';
import {
  addRecipients, availableFormats, chosenEvent, defaultEvent, describeDelivery, describeSchedule, fillPlaceholders,
  FORMATS, isEmail, MESSAGE_MAX_LENGTH, newSchedule, nextRuns, PLACEHOLDERS, scheduleProblem, SUBJECT_MAX_LENGTH,
  TIME_ZONE,
} from '../model/schedule.js';
import { jsonCopy, saveReport, setSchedule } from '../state.js';
import { icon } from './icons.js';
import { showToast } from './toast.js';

const DEMO_NOTE = 'Demo only: nothing is made or sent.';

/** A report is made every day, week, month or year, not every hour or minute, and the rules stay simple. */
const DISABLED_FREQUENCIES = ['HOURLY', 'MINUTELY'];
const DISABLED_RRULE_PARTS = ['bymonth', 'byweekno', 'byyearday', 'byhour', 'byminute', 'bysecond'];

/** A card of the dialog: a section with its own title. */
const card = (title, ...content) => h('section', { class: 'dialog-card' }, h('h4', null, title), content);

/** Opens the dialog for the schedule of the report that is open. */
export function openSchedule(store) {
  const state = store.get();
  const now = new Date(state.asOf);
  const reportName = state.name.trim() || 'Untitled report';
  const available = availableFormats(state.template.widgets);
  const draft = jsonCopy(state.schedule ?? newSchedule(now));
  draft.formats = draft.formats.filter(id => available.includes(id)); // the report may have lost its table since

  const change = apply => {
    apply();
    refresh();
  };

  // --- When: the scheduler of OpenRemote, which has its own dialog, and the switch for automatic reports ---
  const enabled = h('or-vaadin-toggle', {
    label: 'Automatic reports',
    checked: draft.enabled,
    onchange: event => change(() => { draft.enabled = event.target.checked; }),
  });
  const whenCard = card('When', enabled, h('p', { class: 'dialog-text' },
    `The report is made at the start time of the schedule, in the time zone ${TIME_ZONE}, and covers the time frame of `
    + `the report: ${resolvePeriod(state.periodId).label}.`));
  let scheduler;

  /** What the scheduler shows: the event of the schedule, or the one that stands for "not scheduled". */
  const shown = () => draft.event ?? defaultEvent(now);

  function mountScheduler() {
    const next = h('or-scheduler', { disableNegativeByPartValues: true });
    Object.assign(next, {
      header: 'report.scheduleTitle',
      defaultEventTypeLabel: 'report.notScheduled',
      defaultSchedule: defaultEvent(now),
      schedule: jsonCopy(shown()),
      disabledFrequencies: DISABLED_FREQUENCIES,
      disabledRRuleParts: DISABLED_RRULE_PARTS,
      disabledByPartCombinations: INTUITIVE_NOT_APPLICABLE,
    });
    next.addEventListener('or-scheduler-changed', event => change(() => {
      draft.event = chosenEvent(jsonCopy(event.detail.value), now);
    }));
    if (scheduler) scheduler.replaceWith(next);
    else enabled.after(next);
    scheduler = next;
    next.updateComplete.then(() => {
      // The scheduler keeps what was chosen in its dialog when the dialog is closed without saving: it is made again
      next.shadowRoot.getElementById('scheduler').addEventListener('closed', () => {
        if (!objectsEqual(next.schedule, shown())) mountScheduler();
      });
    });
  }

  // --- The report admin, who is reminded to check every report that is made ---
  const admin = h('or-vaadin-text-field', {
    label: 'Report admin',
    required: true,
    placeholder: 'name@company.com',
    autocomplete: 'off',
    'helper-text': 'Gets a reminder email on every day the report is made, to check it first',
    value: draft.admin,
    oninput: event => change(() => { draft.admin = event.currentTarget.value.trim(); }),
  });

  // --- Recipients: an address that is typed becomes a chip, when Enter is pressed or the field is left ---
  let typed = ''; // the field forgets what was typed when it is left, so it is kept here
  const recipients = h('or-vaadin-multi-select-combo-box', {
    label: 'Send to',
    placeholder: 'name@company.com',
    'allow-custom-value': true,
    'auto-expand-vertically': true,
    'helper-text': 'Press Enter after an address',
    oninput: event => { typed = event.target.value; },
    onblur: () => addTyped(typed),
    'oncustom-value-set': event => addTyped(event.detail),
    'onselected-items-changed': event => {
      if (!objectsEqual(event.detail.value, draft.recipients)) change(() => { draft.recipients = event.detail.value; });
    },
  });
  recipients.items = [];
  recipients.selectedItems = draft.recipients;

  /** Makes recipients of the addresses in the text; the field says which parts are not an address. */
  function addTyped(text) {
    typed = '';
    if (!text.trim()) return;
    const { recipients: added, rejected } = addRecipients(draft.recipients, text);
    recipients.invalid = rejected.length > 0;
    if (rejected.length > 0) {
      recipients.errorMessage = `${rejected.join(', ')} ${rejected.length === 1 ? 'is not a valid email address'
        : 'are not valid addresses'}`;
    }
    change(() => { draft.recipients = added; });
    recipients.selectedItems = added;
  }

  // --- The email: its subject and message, with placeholders that are filled in for every report ---
  let lastField = 'message'; // where an inserted placeholder goes: the field that was used last
  const subject = h('or-vaadin-text-field', {
    label: 'Subject',
    maxlength: SUBJECT_MAX_LENGTH,
    value: draft.subject,
    oninput: event => change(() => { draft.subject = event.currentTarget.value; }),
    onfocusin: () => { lastField = 'subject'; },
  });
  const message = h('or-vaadin-text-area', {
    label: 'Message',
    maxlength: MESSAGE_MAX_LENGTH,
    'min-rows': 5,
    value: draft.message,
    oninput: event => change(() => { draft.message = event.currentTarget.value; }),
    onfocusin: () => { lastField = 'message'; },
  });
  const emailFields = { subject, message };

  /** The subject of the email that the report made at run is sent with. */
  const subjectFor = run =>
    fillPlaceholders(draft.subject, { name: reportName, period: resolvePeriod(state.periodId, run), run });

  function insertPlaceholder(id) {
    const field = emailFields[lastField];
    const input = field.inputElement;
    input.setRangeText(`{${id}}`, input.selectionStart, input.selectionEnd, 'end');
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.focus();
  }

  const placeholders = h('div', { class: 'insert-row' },
    h('span', { class: 'dialog-text' }, 'Insert'),
    PLACEHOLDERS.map(({ id, label }) => h('or-vaadin-button', {
      theme: 'tertiary small',
      title: `Puts {${id}} where you last typed; it is filled in for every email`,
      onclick: () => insertPlaceholder(id),
    }, label)));

  // --- Files ---
  const formats = h('or-vaadin-checkbox-group', {
    'accessible-name': 'Files',
    theme: 'vertical',
    'onvalue-changed': event => {
      if (!objectsEqual(event.detail.value, draft.formats)) change(() => { draft.formats = event.detail.value; });
    },
  }, FORMATS.map(({ id, label, needs }) => h('or-vaadin-checkbox', {
    value: id,
    label: available.includes(id) ? label : `${label}: ${needs.toLowerCase()}`,
    disabled: !available.includes(id),
  })));
  formats.value = draft.formats;

  // --- What the schedule will do ---
  const preview = h('div', { class: 'schedule-preview', 'aria-live': 'polite' });

  function drawPreview(problem) {
    if (problem) {
      replaceChildren(preview, h('p', { class: 'dialog-error', role: 'alert' }, problem));
    } else if (!draft.enabled) {
      replaceChildren(preview,
        h('p', { class: 'dialog-text' }, 'Paused: no report is made or sent until automatic reports are switched on.'));
    } else {
      const runs = nextRuns(draft, now);
      replaceChildren(preview,
        h('p', null, describeSchedule(draft)),
        h('p', { class: 'dialog-text' }, `Sends ${describeDelivery(draft)}.`),
        h('p', { class: 'dialog-text' }, `Reminds ${draft.admin} to check each report before it is sent.`),
        h('p', { class: 'dialog-text' }, `Subject of the next email: ${subjectFor(runs[0])}`),
        h('ol', { class: 'runs' }, runs.map(run => {
          const { start, end } = resolvePeriod(state.periodId, run);
          return h('li', null,
            h('span', { class: 'run-when' }, formatDateTime(run)),
            h('span', { class: 'dialog-text' }, ` covers ${formatRange(start, end)}`));
        })));
    }
  }

  // --- The dialog ---
  // A disabled button does not react to the pointer, so why it is disabled is the title of the element around it
  const save = h('or-vaadin-button', { theme: 'primary', onclick: saveSchedule }, 'Save');
  const saveTip = h('span', { class: 'tip' }, save);
  const dialog = h('or-vaadin-dialog', { 'header-title': 'Schedule report', 'no-close-on-outside-click': true },
    h('div', { slot: 'header-content' }, h('or-vaadin-button', {
      theme: 'icon tertiary',
      'aria-label': 'Close',
      onclick: () => dialog.close(),
    }, icon('close'))),
    h('div', { class: 'dialog-body schedule-body' },
      h('p', { class: 'dialog-text' },
        `“${reportName}” is made and emailed automatically. Saving also saves the report. ${DEMO_NOTE}`),
      h('div', { class: 'schedule-columns' },
        h('div', { class: 'dialog-column' },
          whenCard,
          card('Recipients', admin, recipients),
          card('Files', formats)),
        h('div', { class: 'dialog-column' },
          card('Email', subject, message, placeholders),
          card('Next reports', preview)))),
    h('div', { slot: 'footer', class: 'dialog-footer' },
      h('or-vaadin-button', { theme: 'tertiary', onclick: () => dialog.close() }, 'Cancel'),
      h('div', { class: 'dialog-footer-end' },
        state.schedule && h('or-vaadin-button', { theme: 'error tertiary', onclick: removeSchedule },
          h('or-icon', { slot: 'prefix', icon: 'or:trash' }), 'Remove schedule'),
        saveTip)));

  function saveSchedule() {
    store.update(current => saveReport(setSchedule(current, draft)));
    dialog.close();
    showToast(draft.enabled
      ? `Scheduled “${reportName}”: ${describeSchedule(draft)}. ${DEMO_NOTE}`
      : `Saved the paused schedule of “${reportName}”. ${DEMO_NOTE}`, { tone: 'success', durationMs: 6000 });
  }

  function removeSchedule() {
    store.update(current => saveReport(setSchedule(current, null)));
    dialog.close();
    showToast(`Removed the schedule of “${reportName}”.`);
  }

  function refresh() {
    admin.invalid = draft.admin !== '' && !isEmail(draft.admin);
    // a required field that is left empty is marked by the field itself, so it needs a message for that case as well
    admin.errorMessage = draft.admin === '' ? 'Enter the email address of the report admin'
      : 'This is not a valid email address';
    const problem = scheduleProblem(draft, now);
    drawPreview(problem);
    save.disabled = problem !== null;
    saveTip.title = problem ?? '';
  }

  mountScheduler();
  dialog.addEventListener('closed', () => dialog.remove());
  refresh();
  document.body.append(dialog);
  dialog.open();
}
