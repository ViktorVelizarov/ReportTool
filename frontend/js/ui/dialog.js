/** A modal question, in OpenRemote's confirm dialog. */

import { h } from '../dom.js';
import '../kit/inputs.js';

/**
 * Asks the question. Resolves with 'confirm' or 'reject' when the user chooses the button with the text confirm or
 * reject, and with null when the dialog is cancelled, by its Cancel button or with Escape. Without a reject text there
 * is no third button.
 */
export function ask({ title, text, confirm, reject }) {
  return new Promise(resolve => {
    const dialog = h('or-vaadin-confirm-dialog', {
      'cancel-button-visible': true,
      'reject-button-visible': Boolean(reject),
    });
    dialog.header = title;
    dialog.message = text;
    dialog.confirmText = confirm;
    dialog.rejectText = reject;
    dialog.cancelTheme = 'tertiary';
    dialog.rejectTheme = 'tertiary';
    let answer = null;
    dialog.addEventListener('confirm', () => { answer = 'confirm'; });
    dialog.addEventListener('reject', () => { answer = 'reject'; });
    dialog.addEventListener('closed', () => {
      dialog.remove();
      resolve(answer);
    });
    document.body.append(dialog);
    dialog.open();
  });
}
