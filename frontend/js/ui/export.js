/** The export buttons only pretend: they say that a file is being prepared, and which file would have been created. */

import { showToast } from './toast.js';

const WORK_MS = 1400;

export function mockExport(fileName, detail = '') {
  const toast = showToast(`Preparing ${fileName}…`, { durationMs: 0 });
  setTimeout(() => {
    toast.update(`${fileName} is ready${detail}. Demo only: no file is created.`,
      { tone: 'success', durationMs: 6000 });
  }, WORK_MS);
}
