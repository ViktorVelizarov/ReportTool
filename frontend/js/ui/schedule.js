/**
 * The dialog in which the schedule of a report is set up: when it is made, what covers it, who gets it and as which
 * files. Only the design is real; saving keeps the schedule with the saved report, and nothing is made or sent.
 */

import { h, replaceChildren } from '../dom.js';
import { formatDateTime, formatRange } from '../model/format.js';
import { resolvePeriod } from '../model/periods.js';
import {
  addRecipients, availableFormats, describeDelivery, describeSchedule, FORMATS, FREQUENCIES, MONTH_DAYS, monthDayLabel,
  newSchedule, nextRuns, scheduleProblem, TIME_ZONE, WEEKDAYS,
} from '../model/schedule.js';
import { jsonCopy, saveReport, setSchedule } from '../state.js';
import { icon } from './icons.js';
import { showToast } from './toast.js';

const TITLE_ID = 'schedule-title';

const DEMO_NOTE = 'Demo only: nothing is made or sent.';

/** A labelled row of the form. */
function field(label, ...controls) {
  return h('div', { class: 'field', role: 'group', 'aria-label': label },
    h('span', { class: 'field-label' }, label),
    h('div', { class: 'field-body' }, controls));
}

/** Opens the dialog for the schedule of the report that is open. */
export function openSchedule(store) {
  const state = store.get();
  const reportName = state.name.trim() || 'Untitled report';
  const available = availableFormats(state.template.widgets);
  const draft = jsonCopy(state.schedule ?? newSchedule());
  draft.formats = draft.formats.filter(id => available.includes(id)); // the report may have lost its table since

  const change = apply => {
    apply();
    refresh();
  };

  // --- Automatic reports on or off ---
  const switchState = h('span', { class: 'switch-state' });
  const enabled = h('input', {
    type: 'checkbox',
    role: 'switch',
    class: 'switch',
    checked: draft.enabled,
    onchange: event => change(() => { draft.enabled = event.target.checked; }),
  });

  // --- When ---
  const frequencies = FREQUENCIES.map(({ id, label }) => h('button', {
    type: 'button',
    class: 'segment',
    'aria-pressed': 'false',
    onclick: () => change(() => { draft.frequency = id; }),
  }, label));
  const weekdays = WEEKDAYS.map(({ day, short, name }) => h('button', {
    type: 'button',
    class: 'day-toggle',
    'aria-pressed': 'false',
    'aria-label': name,
    title: name,
    onclick: () => change(() => {
      draft.weekdays = draft.weekdays.includes(day)
        ? draft.weekdays.filter(item => item !== day)
        : [...draft.weekdays, day];
    }),
  }, short));
  const monthDay = h('select', {
    class: 'select',
    'aria-label': 'Day of the month',
    onchange: event => change(() => {
      draft.dayOfMonth = event.target.value === 'last' ? 'last' : Number(event.target.value);
    }),
  }, MONTH_DAYS.map(day => h('option', { value: day }, monthDayLabel(day))));
  const time = h('input', {
    type: 'time',
    class: 'input',
    'aria-label': 'Time of day',
    value: draft.time,
    oninput: event => change(() => { draft.time = event.target.value; }),
  });
  const weekdayField = field('Days', h('div', { class: 'day-toggles' }, weekdays));
  const monthDayField = field('Day', monthDay);

  // --- Recipients ---
  const chips = h('span', { class: 'chips-list' });
  const recipientError = h('p', { class: 'field-error', role: 'alert', hidden: true });
  const recipientInput = h('input', {
    type: 'text',
    class: 'chips-input',
    placeholder: 'name@company.com',
    autocomplete: 'off',
    'aria-label': 'Add a recipient',
    oninput: () => showRejected([]),
    onkeydown: event => {
      if (['Enter', ',', ';'].includes(event.key)) {
        event.preventDefault();
        commitRecipients();
      }
    },
    onblur: commitRecipients,
  });
  const recipientBox = h('div', { class: 'chips', onclick: () => recipientInput.focus() }, chips, recipientInput);

  function showRejected(rejected) {
    recipientError.textContent = rejected.length
      ? `${rejected.join(', ')} ${rejected.length === 1 ? 'is not a valid email address' : 'are not valid addresses'}.`
      : '';
    recipientError.hidden = rejected.length === 0;
    recipientBox.classList.toggle('invalid', rejected.length > 0);
  }

  /** Turns the text that was typed into recipients; what is not an address stays in the field. */
  function commitRecipients() {
    if (!recipientInput.value.trim()) return;
    const { recipients, rejected } = addRecipients(draft.recipients, recipientInput.value);
    draft.recipients = recipients;
    recipientInput.value = rejected.join(' ');
    showRejected(rejected);
    refresh();
  }

  const removeRecipient = address => {
    change(() => { draft.recipients = draft.recipients.filter(item => item !== address); });
    recipientInput.focus();
  };

  // --- Files ---
  const formats = FORMATS.map(({ id, label, needs }) => h('label', { class: 'check' },
    h('input', {
      type: 'checkbox',
      checked: draft.formats.includes(id),
      disabled: !available.includes(id),
      onchange: event => change(() => {
        draft.formats = event.target.checked ? [...draft.formats, id] : draft.formats.filter(item => item !== id);
      }),
    }),
    h('span', null, label, !available.includes(id) && h('small', null, needs))));

  // --- What the schedule will do ---
  const preview = h('div', { class: 'schedule-preview', 'aria-live': 'polite' });

  function drawPreview() {
    const problem = scheduleProblem(draft);
    if (problem) {
      preview.dataset.tone = 'problem';
      replaceChildren(preview, h('p', { class: 'preview-title' }, icon('alert-outline'), problem));
    } else if (!draft.enabled) {
      preview.dataset.tone = 'paused';
      replaceChildren(preview,
        h('p', { class: 'preview-title' }, icon('information-outline'), 'Paused'),
        h('p', { class: 'preview-text' }, 'No report is made or sent until automatic reports are switched on.'));
    } else {
      preview.dataset.tone = 'ok';
      replaceChildren(preview,
        h('p', { class: 'preview-title' }, icon('calendar-clock'),
          h('span', null, describeSchedule(draft), ' ', h('small', null, TIME_ZONE))),
        h('p', { class: 'preview-text' }, `Sends ${describeDelivery(draft)}.`),
        h('p', { class: 'preview-kicker' }, 'Next reports'),
        h('ol', { class: 'runs' }, nextRuns(draft, new Date(state.asOf)).map(run => {
          const { start, end } = resolvePeriod(state.periodId, run);
          return h('li', null,
            h('span', { class: 'run-when' }, formatDateTime(run)),
            h('span', { class: 'run-covers' }, `covers ${formatRange(start, end)}`));
        })));
    }
  }

  // --- The dialog ---
  const save = h('button', { type: 'button', class: 'btn primary', onclick: saveSchedule }, 'Save schedule');
  const dialog = h('dialog', { class: 'dialog schedule-dialog', 'aria-labelledby': TITLE_ID },
    h('div', { class: 'schedule-head' },
      icon('calendar-clock', 24),
      h('div', null,
        h('h2', { id: TITLE_ID }, 'Schedule report'),
        h('p', null, `“${reportName}” is made and emailed automatically.`))),
    h('label', { class: 'switch-row' }, enabled, h('span', { class: 'switch-text' }, 'Automatic reports', switchState)),
    field('Repeat', h('div', { class: 'segmented', role: 'group', 'aria-label': 'Repeat' }, frequencies)),
    weekdayField,
    monthDayField,
    field('At', time, h('span', { class: 'hint' }, `Time zone: ${TIME_ZONE}`)),
    field('Data covers', h('span', { class: 'static' }, resolvePeriod(state.periodId).label),
      h('span', { class: 'hint' }, 'The time frame of the report')),
    field('Send to', recipientBox, recipientError),
    field('Files', h('div', { class: 'checks' }, formats)),
    preview,
    h('p', { class: 'dialog-note' }, `Saving also saves the report. ${DEMO_NOTE}`),
    h('div', { class: 'dialog-actions' },
      state.schedule && h('button', { type: 'button', class: 'btn ghost remove', onclick: removeSchedule },
        icon('delete'), 'Remove schedule'),
      h('button', { type: 'button', class: 'btn', onclick: () => dialog.close() }, 'Cancel'),
      save));

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
    switchState.textContent = draft.enabled ? 'On' : 'Paused';
    frequencies.forEach((button, index) =>
      button.setAttribute('aria-pressed', String(draft.frequency === FREQUENCIES[index].id)));
    weekdayField.hidden = draft.frequency !== 'weekly';
    monthDayField.hidden = draft.frequency !== 'monthly';
    weekdays.forEach((button, index) =>
      button.setAttribute('aria-pressed', String(draft.weekdays.includes(WEEKDAYS[index].day))));
    monthDay.value = String(draft.dayOfMonth);
    replaceChildren(chips, draft.recipients.map(address => h('span', { class: 'chip' },
      address,
      h('button', {
        type: 'button',
        class: 'chip-remove',
        'aria-label': `Remove ${address}`,
        onclick: event => {
          event.stopPropagation();
          removeRecipient(address);
        },
      }, icon('close', 14)))));
    drawPreview();
    save.disabled = scheduleProblem(draft) !== null;
  }

  dialog.addEventListener('close', () => dialog.remove());
  refresh();
  document.body.append(dialog);
  dialog.showModal();
}
