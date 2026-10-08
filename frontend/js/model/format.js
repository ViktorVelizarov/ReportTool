/** Number and date formatting of the page and the generated text. */

const LOCALE = 'en-GB';

export function formatNumber(value) {
  if (value == null || !Number.isFinite(value)) return '–';
  const abs = Math.abs(value);
  const digits = abs >= 100 ? 0 : abs >= 10 ? 1 : 2;
  return value.toLocaleString(LOCALE, { maximumFractionDigits: digits });
}

export function formatValue(value, unit) {
  const number = formatNumber(value);
  if (!unit) return number;
  return unit === '%' ? `${number}%` : `${number} ${unit}`;
}

/** "1 widget", "2 widgets". */
export const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

export function formatDate(date) {
  return date.toLocaleDateString(LOCALE, { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatShortDate(date) {
  return date.toLocaleDateString(LOCALE, { day: 'numeric', month: 'short' });
}

export function formatDateTime(date) {
  return date.toLocaleString(LOCALE, {
    weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
}

/** "28 Sep – 4 Oct 2026"; both years are shown when the range crosses a year. */
export function formatRange(start, end) {
  const from = start.getFullYear() === end.getFullYear() ? formatShortDate(start) : formatDate(start);
  return `${from} – ${formatDate(end)}`;
}
