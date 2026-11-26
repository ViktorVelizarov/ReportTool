/** A modal question, in OpenRemote's confirm dialog. */

import { h } from '../dom.js';
import '../kit/inputs.js';

/**
 * Asks the question. Resolves with 'confirm' or 'reject' when the user chooses the button with the text confirm or
 * reject, and with null when the dialog is cancelled, by its Cancel button or with Escape. Without a reject text there
 * is no third button. The theme, such as 'error' for a question about something that cannot be undone, is the one of
 * the buttons, as OpenRemote's own dialogs give it.
 */
export function ask({ title, text, confirm, reject, theme }) {
  return new Promise(resolve => {
    const dialog = h('or-vaadin-confirm-dialog', {
      'cancel-button-visible': true,
      'reject-button-visible': Boolean(reject),
    });
    dialog.header = title;
    dialog.message = text;
    dialog.confirmText = confirm;
    dialog.rejectText = reject;
    dialog.cancelTheme = theme ? `tertiary ${theme}` : 'tertiary';
    dialog.rejectTheme = theme ? `tertiary ${theme}` : 'tertiary';
    if (theme) dialog.confirmTheme = `${theme} primary`;
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
