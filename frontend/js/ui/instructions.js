/**
 * The dialog in which the author instructs the AI before it writes: what the report shows and what to look out for. Only
 * the design is real; the answers are not sent anywhere, and the text is still written from templates (model/ai.js).
 */

import { h } from '../dom.js';
import { instructionsComplete, MAX_LENGTH, QUESTIONS } from '../model/instructions.js';
import { buildReport } from '../model/report.js';
import { icon } from './icons.js';

const TITLE_ID = 'instructions-title';

const DEMO_NOTE = 'Demo only: no AI is called. The text is written from templates.';

/**
 * Opens the dialog for the report that is open. When the author asks the AI to write, the dialog closes and
 * onGenerate({ instructions, report }) is called, with report having the figures of the report.
 */
export function openInstructions(store, onGenerate) {
  const state = store.get();
  const replaces = state.ai?.status === 'ready';
  const draft = { ...state.instructions };
  let report = null; // the figures of the report, once they are read
  let failed = false;

  // --- The questions ---
  const answers = QUESTIONS.map(({ id, label, hint, placeholder }) => {
    const inputId = `instructions-${id}`;
    return h('div', { class: 'question' },
      h('label', { class: 'question-label', for: inputId }, label),
      h('p', { class: 'question-hint', id: `${inputId}-hint` }, hint),
      h('textarea', {
        id: inputId,
        class: 'textarea',
        rows: 6,
        maxlength: MAX_LENGTH,
        placeholder,
        value: draft[id],
        'aria-describedby': `${inputId}-hint`,
        oninput: event => {
          draft[id] = event.target.value;
          refresh();
        },
        onkeydown: event => {
          if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) generate();
        },
      }));
  });

  // --- Shown when the figures of the report cannot be read ---
  const failure = h('p', { class: 'field-error', role: 'alert', hidden: true },
    'The figures of the report could not be read. Close this window and try again.');

  // --- The dialog ---
  const generateButton = h('button', { type: 'button', class: 'btn primary', onclick: generate },
    icon('creation'), replaces ? 'Regenerate text' : 'Generate text');
  const dialog = h('dialog', { class: 'dialog instruct-dialog', 'aria-labelledby': TITLE_ID },
    h('div', { class: 'instruct-head' },
      icon('creation', 24),
      h('div', null,
        h('h2', { id: TITLE_ID }, 'Instruct the AI'),
        h('p', null, 'Say what this report shows and what matters in the results. The AI suggests text from that, '
          + 'and you decide what goes into the report.'))),
    h('div', { class: 'instruct-form' }, answers),
    failure,
    h('p', { class: 'dialog-note' },
      replaces && 'Generating again replaces the text on the page, with your edits and approvals. ', DEMO_NOTE),
    h('div', { class: 'dialog-actions' },
      h('button', { type: 'button', class: 'btn', onclick: () => dialog.close() }, 'Cancel'),
      generateButton));

  /** Why the AI cannot be asked yet, or null. */
  function problem() {
    if (failed) return 'The figures of the report could not be read.';
    if (!report) return 'The figures of the report are being read.';
    return instructionsComplete(draft) ? null : 'Answer both questions first.';
  }

  function refresh() {
    failure.hidden = !failed;
    const blocked = problem();
    generateButton.disabled = blocked !== null;
    generateButton.title = blocked ?? '';
  }

  function generate() {
    if (problem() !== null) return;
    dialog.close();
    onGenerate({ instructions: draft, report });
  }

  dialog.addEventListener('close', () => dialog.remove());
  refresh();
  document.body.append(dialog);
  dialog.showModal();

  buildReport(state).then(
    figures => {
      report = figures;
      refresh();
    },
    error => {
      console.error(error);
      failed = true;
      refresh();
    });
}
