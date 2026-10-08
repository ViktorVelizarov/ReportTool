/** showSnackbar(undefined, "errorOccurred") shows the text of a key for a while, as OpenRemote's snackbar does. */

import { showToast } from '../ui/toast.js';
import { i18next } from './i18n.js';

export function showSnackbar(timeout, textKey) {
  showToast(i18next.t(textKey), { durationMs: timeout ?? 4000 });
}
