/**
 * The dialog in which the author instructs the AI before it writes: what the report shows and what to look out for.
 * Only the design is real; the answers are not sent anywhere, and the text is still written from templates
 * (model/ai.js).
 */

import { h } from '../dom.js';
import '../kit/inputs.js';
import { instructionsComplete, MAX_LENGTH, QUESTIONS } from '../model/instructions.js';
import { buildReport } from '../model/report.js';
import { icon } from './icons.js';

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

  // --- The questions, each in a card ---
  const answers = QUESTIONS.map(({ id, label, hint, placeholder }) => h('div', { class: 'dialog-card' },
    h('or-vaadin-text-area', {
      label,
      'helper-text': hint,
      placeholder,
      maxlength: MAX_LENGTH,
      'min-rows': 5,
      value: draft[id],
      oninput: event => {
        draft[id] = event.target.value;
        refresh();
      },
      onkeydown: event => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) generate();
      },
    })));

  // --- Shown when the figures of the report cannot be read ---
  const failure = h('p', { class: 'dialog-error', role: 'alert', hidden: true },
    'The figures of the report could not be read. Close this window and try again.');

  // --- The dialog ---
  // A disabled button does not react to the pointer, so why it is disabled is the title of the element around it
  const generateButton = h('or-vaadin-button', { theme: 'primary', onclick: generate },
    replaces ? 'Regenerate text' : 'Generate text');
  const generateTip = h('span', { class: 'tip' }, generateButton);
  const dialog = h('or-vaadin-dialog', { 'header-title': 'Instruct the AI', 'no-close-on-outside-click': true },
    h('div', { slot: 'header-content' }, h('or-vaadin-button', {
      theme: 'icon tertiary',
      'aria-label': 'Close',
      onclick: () => dialog.close(),
    }, icon('close'))),
    h('div', { class: 'dialog-body' },
      h('p', { class: 'dialog-text' }, 'Say what this report shows and what matters in the results. The AI suggests '
        + 'text from that, and you decide what goes into the report.'),
      answers,
      failure,
      h('p', { class: 'dialog-text' },
        replaces && 'Generating again replaces the text on the page, with your edits and approvals. ', DEMO_NOTE)),
    h('div', { slot: 'footer', class: 'dialog-footer' },
      h('or-vaadin-button', { theme: 'tertiary', onclick: () => dialog.close() }, 'Cancel'),
      generateTip));

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
    generateTip.title = blocked ?? '';
  }

  function generate() {
    if (problem() !== null) return;
    dialog.close();
    onGenerate({ instructions: draft, report });
  }

  dialog.addEventListener('closed', () => dialog.remove());
  refresh();
  document.body.append(dialog);
  dialog.open();

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
