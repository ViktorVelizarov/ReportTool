/**
 * The exports. The PDF is made by the report service and saved by the browser. The CSV and PNG buttons only pretend:
 * they say that a file is being prepared, and which file would have been created.
 */

import { ServiceClient } from '../data/service-client.js';
import { h } from '../dom.js';
import { showToast } from './toast.js';

const WORK_MS = 1400;

/** The browser needs the address of a file for as long as it takes to start the download. */
const KEEP_FILE_MS = 10_000;

const ERROR_MS = 8000;

export function mockExport(fileName, detail = '') {
  const toast = showToast(`Preparing ${fileName}…`, { durationMs: 0 });
  setTimeout(() => {
    toast.update(`${fileName} is ready${detail}. Demo only: no file is created.`,
      { tone: 'success', durationMs: 6000 });
  }, WORK_MS);
}

/** Has the browser save the file under the name, as it does for a link to a download. */
function saveFile(file, fileName) {
  const address = URL.createObjectURL(file);
  const link = h('a', { href: address, download: fileName });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(address), KEEP_FILE_MS);
}

/**
 * Has the service make the PDF of the request (see model/exports.js) and saves it; messages say how far it is, and
 * detail says what is in the file.
 */
export async function downloadPdf(fileName, request, detail = '') {
  const toast = showToast(`Preparing ${fileName}…`, { durationMs: 0 });
  try {
    saveFile(await ServiceClient.postForFile('/export/pdf', request), fileName);
    toast.update(`${fileName} is ready${detail}`, { tone: 'success', durationMs: 6000 });
  } catch (error) {
    console.error(error);
    toast.update(`The PDF could not be made: ${error.message}`, { tone: 'error', durationMs: ERROR_MS });
  }
}
