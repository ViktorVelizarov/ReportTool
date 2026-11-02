/** A button that opens a small menu. The items are made when the menu opens, so they always show the current state. */

import { h, replaceChildren } from '../dom.js';
import { icon } from './icons.js';

/** The space that a menu keeps free at the edge of the window, in pixels. */
const MARGIN = 16;

/**
 * items() returns [{ label, checked?, disabled?, onSelect }], and { separator: true } for a line between items. An
 * item that is checked has a tick in front of it; a disabled item says in its label what it needs.
 */
export function menuButton({ label, iconName, items }) {
  let open = false;

  const button = h('button', {
    type: 'button',
    class: 'btn',
    'aria-haspopup': 'menu',
    'aria-expanded': 'false',
    onclick: () => (open ? close() : show()),
  }, iconName && icon(iconName), h('span', null, label), icon('chevron-down', 14));
  const popup = h('div', { class: 'menu', role: 'menu', hidden: true });
  const wrap = h('div', { class: 'menu-wrap', onkeydown: onKey }, button, popup);

  function enabledItems() {
    return [...popup.querySelectorAll('.menu-item:not(:disabled)')];
  }

  function onOutside(event) {
    if (!wrap.contains(event.target)) close();
  }

  function onKey(event) {
    if (!open) return;
    if (event.key === 'Escape') {
      event.stopPropagation();
      close(true);
    } else if (event.key === 'Tab') {
      close();
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const entries = enabledItems();
      const next = entries.indexOf(document.activeElement) + (event.key === 'ArrowDown' ? 1 : -1);
      entries[(next + entries.length) % entries.length]?.focus();
    }
  }

  function close(restoreFocus = false) {
    if (!open) return;
    open = false;
    popup.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    document.removeEventListener('pointerdown', onOutside, true);
    if (restoreFocus) button.focus();
  }

  function menuItem(item) {
    if (item.separator) return h('div', { class: 'menu-separator', role: 'separator' });
    const choice = item.checked !== undefined;
    return h('button', {
      type: 'button',
      class: 'menu-item',
      role: choice ? 'menuitemradio' : 'menuitem',
      'aria-checked': choice ? String(item.checked) : null,
      disabled: item.disabled,
      onclick: () => {
        close(true);
        item.onSelect();
      },
    }, h('span', { class: 'menu-check', 'aria-hidden': 'true' }, item.checked && icon('check', 16)), item.label);
  }

  function show() {
    replaceChildren(popup, items().map(menuItem));
    open = true;
    popup.hidden = false;
    // The menu starts at the left of its button, as far left as it must to stay in the window
    const start = wrap.getBoundingClientRect().left;
    const fitting = Math.min(start, document.documentElement.clientWidth - MARGIN - popup.offsetWidth);
    popup.style.left = `${Math.max(MARGIN, fitting) - start}px`;
    button.setAttribute('aria-expanded', 'true');
    document.addEventListener('pointerdown', onOutside, true);
    enabledItems()[0]?.focus();
  }

  return wrap;
}
