/**
 * Short messages in the corner of the page: Vaadin's notification, which OpenRemote's design system has as
 * "Notification", in the theme of OpenRemote. An info message is the plain card; a success or error message has the
 * colour of its tone.
 */

import { h } from '../dom.js';
import '../kit/inputs.js';
import { icon } from './icons.js';

const TONES = {
  info: { theme: '', iconName: 'information-outline' },
  success: { theme: 'success', iconName: 'check' },
  error: { theme: 'error', iconName: 'alert-outline' },
};

/**
 * Shows a message that disappears after durationMs (never, with 0). update() replaces the message, for example when
 * something that was busy is done.
 */
export function showToast(text, { tone = 'info', durationMs = 4000 } = {}) {
  const message = h('span', { class: 'toast-text' }, text);
  const toneIcon = h('span', { class: 'toast-icon' }, icon(TONES[tone].iconName, 24));
  const notification = h('vaadin-notification', { position: 'bottom-end', theme: TONES[tone].theme });
  notification.duration = durationMs;
  notification.renderer = root => {
    root.append(h('div', { class: 'toast' },
      toneIcon,
      message,
      h('or-vaadin-button', { theme: 'icon tertiary', 'aria-label': 'Close', onclick: dismiss }, icon('close'))));
  };
  document.body.append(notification);
  notification.opened = true;
  // After opening: the element announces its first state, which is closed, when it is added to the page
  notification.addEventListener('opened-changed', event => {
    if (!event.detail.value) notification.remove();
  });

  function dismiss() {
    notification.opened = false;
  }

  return {
    dismiss,
    update(newText, options = {}) {
      const next = TONES[options.tone ?? tone];
      message.textContent = newText;
      notification.setAttribute('theme', next.theme);
      toneIcon.replaceChildren(icon(next.iconName, 24));
      notification.duration = options.durationMs ?? durationMs;
    },
  };
}
