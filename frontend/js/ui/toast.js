/** Short messages in the corner of the page. */

import { h } from '../dom.js';
import { icon } from './icons.js';

const TONE_ICONS = { info: 'information-outline', success: 'check', warning: 'alert-outline' };
const LEAVE_MS = 200;

/**
 * Shows a message that disappears after durationMs (never, with 0). With progress, a bar fills while something is
 * "busy"; update() then replaces the message when it is done.
 */
export function showToast(text, { tone = 'info', durationMs = 4000, progress = false } = {}) {
  const message = h('span', { class: 'toast-text' }, text);
  const iconSlot = h('span', { class: 'toast-icon' }, icon(TONE_ICONS[tone]));
  const bar = progress ? h('div', { class: 'toast-bar' }, h('span')) : null;
  const toast = h('div', { class: `toast toast-${tone}` }, iconSlot, h('div', { class: 'toast-body' }, message, bar));
  document.getElementById('toasts').append(toast);

  let timer;
  const arm = ms => {
    clearTimeout(timer);
    if (ms) timer = setTimeout(dismiss, ms);
  };
  function dismiss() {
    clearTimeout(timer);
    toast.classList.add('leaving');
    setTimeout(() => toast.remove(), LEAVE_MS);
  }
  arm(progress ? 0 : durationMs);

  return {
    dismiss,
    update(newText, options = {}) {
      const next = options.tone ?? tone;
      message.textContent = newText;
      toast.className = `toast toast-${next}`;
      iconSlot.replaceChildren(icon(TONE_ICONS[next]));
      bar?.remove();
      arm(options.durationMs ?? durationMs);
    },
  };
}
