/*
 * Helpers ported to plain JavaScript from OpenRemote's @openremote/core (ui/component/core/src/util.ts), the ones the
 * Insights widgets use. Copyright 2026, OpenRemote Inc., AGPL-3.0-or-later (https://github.com/openremote/openremote).
 *
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { UNIT_SYMBOLS } from './units.js';

export function objectsEqual(obj1, obj2, deep = true) {
  if (obj1 === null || obj1 === undefined || obj2 === null || obj2 === undefined) {
    return obj1 === obj2;
  }
  if (obj1.constructor !== obj2.constructor) {
    return false;
  }
  if (obj1 instanceof Function || obj1 instanceof RegExp) {
    return obj1 === obj2;
  }
  if (obj1 === obj2 || obj1.valueOf() === obj2.valueOf()) {
    return true;
  }
  if (Array.isArray(obj1) && obj1.length !== obj2.length) {
    return false;
  }
  if (obj1 instanceof Date || !(obj1 instanceof Object) || !(obj2 instanceof Object)) {
    return false;
  }
  if (!deep) {
    return false;
  }
  if (Array.isArray(obj1)) {
    return obj1.every((item, i) => objectsEqual(item, obj2[i]));
  }
  const keys = Object.keys(obj1);
  return Object.keys(obj2).every(key => keys.includes(key)) && keys.every(key => objectsEqual(obj1[key], obj2[key]));
}

/** Merges b into a (a and b are not changed). With mergeArrays the arrays are joined, otherwise b's array wins. */
export function mergeObjects(a, b, mergeArrays) {
  if (a && !b) return { ...a };
  if (b && !a) return { ...b };
  const merged = { ...a };
  for (const [key, value] of Object.entries(b)) {
    if (!Object.hasOwn(merged, key)) {
      if (value === null || value === undefined) delete merged[key];
      else if (Array.isArray(value)) merged[key] = [...value];
      else if (typeof value === 'object') merged[key] = { ...value };
      else merged[key] = value;
    } else if (value === null || value === undefined) {
      delete merged[key];
    } else if (Array.isArray(merged[key])) {
      merged[key] = mergeArrays ? [...merged[key], ...value] : [...value];
    } else if (typeof value === 'object') {
      merged[key] = mergeObjects({ ...merged[key] }, value, mergeArrays);
    } else {
      merged[key] = value;
    }
  }
  return merged;
}

/** "oilTemp" becomes "Oil temp". */
export function camelCaseToSentenceCase(str) {
  if (str === undefined || str === null) return '';
  let startDone = false;
  return str
    .split(/([A-Z]|\d)/)
    .map((v, i, arr) => {
      if (!v) return v;
      if (!startDone) {
        startDone = true;
        return v.charAt(0).toUpperCase() + v.slice(1);
      }
      if (v === '_') return ' ';
      if (v.length === 1 && v === v.toUpperCase()) {
        const previousCapital = !arr[i - 1] || arr[i - 1] === '_';
        const nextWord = i + 1 < arr.length && arr[i + 1] && arr[i + 1] !== '_';
        const nextTwoCapitalsOrEndOfString = i + 3 > arr.length || (!arr[i + 1] && !arr[i + 3]);
        if (!previousCapital || nextWord) v = ' ' + v;
        if (nextWord || (!previousCapital && !nextTwoCapitalsOrEndOfString)) v = v.toLowerCase();
      }
      return v;
    })
    .join('')
    .trim();
}

export function sortByString(valueExtractor) {
  return (a, b) => {
    const v1 = valueExtractor(a);
    const v2 = valueExtractor(b);
    if (!v1 && !v2) return 0;
    if (v1 && !v2) return 1;
    if (!v1 && v2) return -1;
    return v1.localeCompare(v2);
  };
}

export function generateUniqueUUID() {
  return crypto.randomUUID();
}

/** The symbol of a part of a unit: a currency code (EUR) gives the symbol of the currency, else it is looked up. */
function unitSymbol(part) {
  if (part.length === 3 && part === part.toUpperCase()) {
    const currency = new Intl.NumberFormat('en-GB', { style: 'currency', currency: part }).formatToParts(0)
      .find(item => item.type === 'currency');
    return currency?.value ?? part;
  }
  return UNIT_SYMBOLS[part] ?? part;
}

/** The units of an attribute as shown after a value, for example "l/h" for ["litre", "per", "hour"]. */
export function resolveUnits(units) {
  return (units ?? []).map(unitSymbol).join('');
}

function getAttributeUnits(attribute, descriptor) {
  return attribute?.meta?.units ?? descriptor?.meta?.units;
}

/** The label of an attribute, with its units in brackets if asked. */
export function getAttributeLabel(attribute, descriptor, showUnits) {
  const name = attribute?.name ?? descriptor?.name;
  const label = attribute?.meta?.label ?? descriptor?.meta?.label ?? (name ? camelCaseToSentenceCase(name) : '');
  const units = showUnits ? resolveUnits(getAttributeUnits(attribute, descriptor)) : '';
  return label ? label + (units ? ` (${units})` : '') : units;
}

export function getAssetTypeLabel(descriptor) {
  return descriptor?.label ?? descriptor?.name ?? '';
}

/** The value of an attribute as text, for example "41.8 MW". */
export function getAttributeValueAsString(attribute, descriptor, showUnits, fallback = '') {
  const value = attribute?.value;
  if (value === undefined || value === null) return fallback;
  let text;
  if (typeof value === 'number') text = value.toLocaleString('en-GB', { maximumFractionDigits: 2 });
  else if (typeof value === 'boolean') text = value ? 'On' : 'Off';
  else if (typeof value === 'object') text = JSON.stringify(value);
  else text = String(value);
  const units = showUnits ? resolveUnits(getAttributeUnits(attribute, descriptor)) : '';
  return units && typeof value === 'number' ? `${text} ${units}` : text;
}
