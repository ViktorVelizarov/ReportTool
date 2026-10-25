/** Tiny helpers to build DOM and SVG without innerHTML (so nothing typed by the user is ever parsed as markup). */

const SVG_NS = 'http://www.w3.org/2000/svg';
const PROPERTIES = new Set(['value', 'checked', 'disabled', 'selected']);

function applyProps(el, props) {
  for (const [key, value] of Object.entries(props ?? {})) {
    if (value == null || value === false) continue;
    if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (PROPERTIES.has(key)) {
      el[key] = value;
    } else {
      el.setAttribute(key, value === true ? '' : value);
    }
  }
}

function appendChildren(el, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
}

/** Creates an element: h('div', {class: 'x', onclick: fn}, 'text', childElement, ...). */
export function h(tag, props, ...children) {
  const el = document.createElement(tag);
  applyProps(el, props);
  appendChildren(el, children);
  return el;
}

/** Creates an SVG element in the SVG namespace. */
export function svg(tag, props, ...children) {
  const el = document.createElementNS(SVG_NS, tag);
  applyProps(el, props);
  appendChildren(el, children);
  return el;
}

/** Replaces everything inside el with the given children. */
export function replaceChildren(el, ...children) {
  el.replaceChildren();
  appendChildren(el, children);
  return el;
}

/**
 * Runs render(), which replaces the content of container, and puts the focus back afterwards for someone who works
 * with the keyboard: on the element with the same data-focus, or else on the one that the selector instead finds, or
 * else on a control in the same data-row (for example when a button disables itself). After a click nothing is put
 * back, as the library's buttons would draw a focus ring around a button that nobody asked for.
 */
export function keepFocus(container, render, instead) {
  const active = document.activeElement;
  const inside = container.contains(active) && active.matches(':focus-visible');
  const focusKey = inside ? active.closest('[data-focus]')?.dataset.focus : undefined;
  const rowKey = inside ? active.closest('[data-row]')?.dataset.row : undefined;
  render();
  if (!focusKey) return;
  const enabled = ':not(:disabled, [disabled])';
  const sameElement = container.querySelector(`[data-focus="${CSS.escape(focusKey)}"]${enabled}`);
  const insteadElement = instead && container.querySelector(instead);
  const rowControl = `[data-row="${CSS.escape(rowKey ?? '')}"] :is(button, select, or-vaadin-button)${enabled}`;
  (sameElement ?? insteadElement ?? (rowKey && container.querySelector(rowControl)))?.focus();
}

/** Wraps a render function so it only runs when the key of the state it depends on changes. */
export function onChange(keyOf, render) {
  let last;
  return state => {
    const key = keyOf(state);
    if (key === last) return;
    last = key;
    render(state);
  };
}
