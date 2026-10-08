/** A modal question with a few answers. */

import { h } from '../dom.js';

let counter = 0;

/**
 * Asks the question and resolves with the value of the chosen action, or null when the dialog is dismissed with
 * Escape. actions: [{ label, value, primary? }]
 */
export function ask({ title, text, actions }) {
  return new Promise(resolve => {
    const titleId = `dialog-title-${++counter}`;
    const dialog = h('dialog', { class: 'dialog', 'aria-labelledby': titleId },
      h('h2', { id: titleId }, title),
      h('p', null, text),
      h('div', { class: 'dialog-actions' }, actions.map(action => h('button', {
        type: 'button',
        class: action.primary ? 'btn primary' : 'btn',
        onclick: () => dialog.close(action.value),
      }, action.label))));
    dialog.addEventListener('close', () => {
      dialog.remove();
      resolve(dialog.returnValue || null);
    });
    document.body.append(dialog);
    dialog.showModal();
  });
}
