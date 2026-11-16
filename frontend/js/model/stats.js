/** Figures computed from data points: [{ x: timestamp, y: value }], oldest first. */

export function summarize(points) {
  if (!points.length) return null;
  let min = points[0];
  let max = points[0];
  let sum = 0;
  for (const point of points) {
    sum += point.y;
    if (point.y < min.y) min = point;
    if (point.y > max.y) max = point;
  }
  const latest = points.at(-1);
  return {
    count: points.length,
    mean: sum / points.length,
    min: min.y, minAt: min.x,
    max: max.y, maxAt: max.x,
    first: points[0].y,
    latest: latest.y, latestAt: latest.x,
  };
}

/** Change from previous to current in percent, or null when there is nothing to compare with. */
export function percentChange(current, previous) {
  if (previous == null || previous === 0) return null;
  return (current - previous) / Math.abs(previous) * 100;
}

/** The number with a plus sign when it is above zero; a zero is never negative. */
const signed = number => `${number > 0 ? '+' : ''}${number || 0}`;

/**
 * The change from the first to the latest data point as OpenRemote's KPI card (or-attribute-card) shows it under its
 * value: the difference as a whole number ("+3", "-2", "0"), or with asPercentage as a whole percentage of the first
 * value ("+12%"). The card shows 0% when one of the two values is 0, and so does this.
 */
export function cardChange({ first, latest }, asPercentage) {
  if (!asPercentage) return signed(Math.round(latest - first));
  return `${signed(first && latest ? Math.round((latest - first) / first * 100) : 0)}%`;
}
