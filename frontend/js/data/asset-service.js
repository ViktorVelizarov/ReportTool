/**
 * What the OpenRemote widgets of the report builder ask the manager: the assets of a realm (query assets) and the
 * stored data points of an attribute. The report service answers, for the realm of the report (ReportContext.realm;
 * without a realm it reads the realm of its own service user). The answers have the shape of OpenRemote's.
 */

import { DAY, HOUR } from '../model/time.js';
import { AssetModelUtil } from './asset-model.js';
import { ReportContext } from './report-context.js';
import { ServiceClient } from './service-client.js';

const MINUTE = 60_000;
const INTERVAL_UNITS = { minute: MINUTE, hour: HOUR, day: DAY, week: 7 * DAY, month: 30 * DAY, year: 365 * DAY };

const round = value => Math.round(value * 1000) / 1000;
const encode = encodeURIComponent;

/**
 * An asset as the widgets read it: with only the attributes that were asked for, and with the units of the model on
 * the attributes that have none of their own, because that is where the widgets look for them.
 */
function shaped(asset, names) {
  const attributes = {};
  for (const [name, attribute] of Object.entries(asset.attributes ?? {})) {
    if (names && !names.includes(name)) continue;
    const units = AssetModelUtil.getAttributeDescriptor(name, asset.type)?.meta?.units;
    attributes[name] = units && !attribute.meta?.units
      ? { ...attribute, meta: { ...attribute.meta, units } }
      : attribute;
  }
  return { ...asset, attributes };
}

/** The assets of a type (of every type if there is none) in the realm, with the named attributes (all if no names). */
async function listAssets(type, names, realm) {
  const attributes = names ? names.join(',') || undefined : '*';
  const { assets } = await ServiceClient.getJson('/assets', { realm, type, attributes });
  return assets;
}

/** An asset with all its attributes, or undefined if the realm has no such asset. */
async function getAsset(id, realm) {
  try {
    return await ServiceClient.getJson(`/assets/${encode(id)}`, { realm });
  } catch (error) {
    if (error.status === 404) return undefined;
    throw error;
  }
}

/** The value of a data point as the number of a chart: a flag is 1 or 0, and what is not a number is undefined. */
function numeric(value) {
  if (typeof value === 'boolean') return Number(value);
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

/** Largest-Triangle-Three-Buckets downsampling: keeps the shape of the line with the given number of points. */
export function lttb(points, amountOfPoints) {
  if (amountOfPoints >= points.length || amountOfPoints < 3) return points;
  const sampled = [points[0]];
  const bucketSize = (points.length - 2) / (amountOfPoints - 2);
  let previous = 0;
  for (let i = 0; i < amountOfPoints - 2; i++) {
    const nextStart = Math.floor((i + 1) * bucketSize) + 1;
    const nextEnd = Math.min(Math.floor((i + 2) * bucketSize) + 1, points.length);
    let averageX = 0;
    let averageY = 0;
    for (let j = nextStart; j < nextEnd; j++) {
      averageX += points[j].x;
      averageY += points[j].y;
    }
    averageX /= nextEnd - nextStart;
    averageY /= nextEnd - nextStart;

    let best = -1;
    let bestIndex = Math.floor(i * bucketSize) + 1;
    for (let j = Math.floor(i * bucketSize) + 1; j < nextStart; j++) {
      const area = Math.abs(
        (points[previous].x - averageX) * (points[j].y - points[previous].y)
        - (points[previous].x - points[j].x) * (averageY - points[previous].y));
      if (area > best) {
        best = area;
        bestIndex = j;
      }
    }
    sampled.push(points[bestIndex]);
    previous = bestIndex;
  }
  sampled.push(points.at(-1));
  return sampled;
}

/** The length in milliseconds of an interval such as "1 hour" or "5 minute"; undefined when it cannot be read. */
function intervalToMillis(interval) {
  const [amount, unit] = String(interval ?? '').trim().split(/\s+/);
  const length = INTERVAL_UNITS[unit?.replace(/s$/, '')];
  return length && Number(amount) > 0 ? Number(amount) * length : undefined;
}

/** One point per interval, on multiples of the interval, holding the average, minimum or maximum of its points. */
function aggregate(points, intervalMs, formula = 'AVG') {
  const buckets = new Map();
  for (const { x, y } of points) {
    const start = Math.floor(x / intervalMs) * intervalMs;
    (buckets.get(start) ?? buckets.set(start, []).get(start)).push(y);
  }
  const reduce = {
    AVG: values => values.reduce((a, b) => a + b, 0) / values.length,
    MIN: values => Math.min(...values),
    MAX: values => Math.max(...values),
  }[formula] ?? (values => values.reduce((a, b) => a + b, 0) / values.length);
  return [...buckets].map(([x, values]) => ({ x, y: round(reduce(values)) }));
}

export const AssetService = {
  /**
   * Assets by query: { ids?, types?, select?: { attributes?: string[] } }. Without select.attributes all attributes
   * come with the assets, and with an empty list none. The assets that the realm does not have are left out.
   */
  async queryAssets({ ids, types, select } = {}) {
    const names = select?.attributes;
    const { realm } = ReportContext;
    if (ids?.length === 0) return [];

    let assets;
    if (ids && !types?.length) {
      // the service has an endpoint for one asset, so a list of ids is read asset by asset
      assets = (await Promise.all([...new Set(ids)].map(id => getAsset(id, realm)))).filter(Boolean);
    } else {
      const kinds = types?.length ? types : [undefined]; // no type: the assets of every type
      const lists = await Promise.all(kinds.map(type => listAssets(type, names, realm)));
      assets = [...new Map(lists.flat().map(asset => [asset.id, asset])).values()];
      if (ids) assets = assets.filter(asset => ids.includes(asset.id));
    }
    return assets.map(asset => shaped(asset, names));
  },

  /**
   * The stored data points of an attribute in the range, oldest first, as the manager's data point query returns them:
   * [{ x: timestamp, y: value }]. The query has fromTimestamp and toTimestamp (the report moment by default), and a
   * type: "lttb" with amountOfPoints keeps the shape of the line in fewer points, and "interval" with an interval such
   * as "1 hour" and a formula (AVG, MIN or MAX) gives one point per interval. The service gives all points, so the
   * downsampling is done here. An attribute without stored data points has none.
   */
  async getDatapoints(assetId, attributeName, query = {}) {
    const to = Math.round(query.toTimestamp ?? ReportContext.asOf);
    const from = Math.round(query.fromTimestamp ?? to - DAY);
    if (from > to) return [];

    let stored;
    try {
      stored = await ServiceClient.getJson(
        `/assets/${encode(assetId)}/attributes/${encode(attributeName)}/datapoints`,
        { realm: ReportContext.realm, from, to });
    } catch (error) {
      if (error.status === 404) return [];
      throw error;
    }
    const points = stored.toReversed() // the service gives the newest first
      .map(({ timestamp, value }) => ({ x: timestamp, y: numeric(value) }))
      .filter(point => point.y !== undefined);

    switch (query.type) {
      case 'lttb':
        return lttb(points, query.amountOfPoints ?? 100);
      case 'interval': {
        const intervalMs = intervalToMillis(query.interval);
        return intervalMs ? aggregate(points, intervalMs, query.formula) : points;
      }
      default:
        return points;
    }
  },
};
