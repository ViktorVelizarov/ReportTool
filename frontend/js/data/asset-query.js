/**
 * The asset queries that OpenRemote's asset tree sends to the manager, answered in memory from the assets of a realm:
 * the ids (with or without everything below them), the parents, the types, the names, the names of attributes, the
 * order, the offset and the limit. The answer has the asset tree of OpenRemote's: { assets, hasMore }.
 */

const ORDER_BY = {
  NAME: (a, b) => (a.name ?? '').localeCompare(b.name ?? ''),
  CREATED_ON: (a, b) => (a.createdOn ?? 0) - (b.createdOn ?? 0),
  ASSET_TYPE: (a, b) => (a.type ?? '').localeCompare(b.type ?? ''),
};

/**
 * Whether the text satisfies a string predicate: { match, value, caseSensitive, negate }, where match is EXACT, BEGIN,
 * END or CONTAINS.
 */
export function stringMatches(predicate, text = '') {
  const fold = value => (predicate.caseSensitive === false ? String(value).toLowerCase() : String(value));
  const haystack = fold(text);
  const needle = fold(predicate.value ?? '');
  let found;
  switch (predicate.match) {
    case 'BEGIN':
      found = haystack.startsWith(needle);
      break;
    case 'END':
      found = haystack.endsWith(needle);
      break;
    case 'CONTAINS':
      found = haystack.includes(needle);
      break;
    default:
      found = haystack === needle;
  }
  return predicate.negate ? !found : found;
}

/** Whether the asset has the attributes that a group of predicates asks for: all of them (AND) or one of them (OR). */
function hasAttributes(asset, group) {
  const names = Object.keys(asset.attributes ?? {});
  const has = item => names.some(name => stringMatches(item.name, name));
  return group.operator === 'OR' ? group.items.some(has) : group.items.every(has);
}

function matches(asset, query) {
  const { ids, recursive, parents, types, names, attributes } = query;
  if (ids && !ids.includes(asset.id) && !(recursive && asset.path?.some(id => ids.includes(id)))) return false;
  if (parents) {
    const noParent = parents.length === 0 || parents.some(parent => parent.noParent);
    if (noParent ? asset.parentId : !parents.some(parent => parent.id === asset.parentId)) return false;
  }
  if (types?.length && !types.includes(asset.type)) return false;
  if (names?.length && !names.every(predicate => stringMatches(predicate, asset.name))) return false;
  return !attributes?.items?.length || hasAttributes(asset, attributes);
}

/** The asset with the attributes that the query selects: none, the named ones, or (without select) all. */
function selected(asset, attributeNames) {
  if (!attributeNames) return asset;
  const attributes = Object.entries(asset.attributes ?? {}).filter(([name]) => attributeNames.includes(name));
  return { ...asset, attributes: Object.fromEntries(attributes) };
}

/** The assets of the realm that the query asks for, in the order, from the offset, and at most the limit. */
export function runAssetQuery(assets, query = {}) {
  const found = assets.filter(asset => matches(asset, query));
  const order = ORDER_BY[query.orderBy?.property];
  if (order) found.sort(order);
  const from = query.offset ?? 0;
  const page = query.limit ? found.slice(from, from + query.limit) : found.slice(from);
  const assetsOfPage = page.map(asset => selected(asset, query.select?.attributes));
  return { assets: assetsOfPage, hasMore: from + page.length < found.length };
}
