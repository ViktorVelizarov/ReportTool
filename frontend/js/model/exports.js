/** Names of the files a report is exported as. The prototype creates no files; the names are shown in the messages. */

function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** "weekly-grid-report_2026-10-04.pdf", or with a suffix: "weekly-grid-report_2026-10-04_charts.zip". */
export function exportFileName(reportName, asOf, extension, suffix = '') {
  const date = new Date(asOf).toISOString().slice(0, 10);
  const parts = [slugify(reportName) || 'report', date, suffix].filter(Boolean);
  return `${parts.join('_')}.${extension}`;
}
