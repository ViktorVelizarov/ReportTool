/** A button that opens a small menu. The items are made when the menu opens, so they always show the current state. */

import { h, replaceChildren } from '../dom.js';
import { icon } from './icons.js';

/**
 * items() returns [{ label, hint?, icon?, checked?, disabled?, onSelect }]. A disabled item says in its hint why it
 * cannot be used.
 */
export function menuButton({ label, iconName, className = '', items }) {
  let open = false;

  const button = h('button', {
    type: 'button',
    class: `btn ${className}`.trim(),
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

  function show() {
    replaceChildren(popup, items().map(item => h('button', {
      type: 'button',
      class: 'menu-item',
      role: 'menuitem',
      disabled: item.disabled,
      onclick: () => {
        close(true);
        item.onSelect();
      },
    },
    item.icon && icon(item.icon),
    h('span', { class: 'menu-text' },
      h('span', { class: 'menu-label' }, item.label),
      item.hint && h('small', null, item.hint)),
    item.checked && icon('check'))));
    open = true;
    popup.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    document.addEventListener('pointerdown', onOutside, true);
    enabledItems()[0]?.focus();
  }

  return wrap;
}
