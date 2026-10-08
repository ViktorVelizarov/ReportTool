/** Takes the place of the report when the page cannot start: says what went wrong, and offers to try again. */

import { h, replaceChildren } from '../dom.js';

export function showStartupError(root, message) {
  replaceChildren(root,
    h('div', { class: 'startup-error', role: 'alert' },
      h('h2', null, 'Report Studio cannot start'),
      h('p', null, message),
      h('button', { type: 'button', class: 'btn primary', onclick: () => location.reload() }, 'Try again')));
}
