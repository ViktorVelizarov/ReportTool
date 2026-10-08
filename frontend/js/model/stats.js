/** Figures computed from data points: [{ x: timestamp, y: value }]. */

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
    latest: latest.y, latestAt: latest.x,
  };
}

/** Change from previous to current in percent, or null when there is nothing to compare with. */
export function percentChange(current, previous) {
  if (previous == null || previous === 0) return null;
  return (current - previous) / Math.abs(previous) * 100;
}
