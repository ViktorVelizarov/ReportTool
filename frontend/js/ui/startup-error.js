/** Takes the place of the report when the page cannot start: says what went wrong, and offers to try again. */

import { h, replaceChildren } from '../dom.js';
import '../kit/inputs.js';

export function showStartupError(root, message) {
  replaceChildren(root,
    h('vaadin-card', {
      class: 'startup-error',
      theme: 'outlined',
      role: 'alert',
      'card-title': 'Report Studio cannot start',
      'title-heading-level': 1,
    },
    h('p', null, message),
    h('or-vaadin-button', { slot: 'footer', theme: 'primary', onclick: () => location.reload() }, 'Try again')));
}
