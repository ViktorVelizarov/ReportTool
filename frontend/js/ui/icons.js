/** The icons of the page: Material Design icons by name, the ones the builder uses as well (see kit/mdi-icons.js). */

import { svg } from '../dom.js';
import MDI from '../kit/mdi-icons.js';

export function icon(name, size = 18) {
  return svg('svg', {
    class: 'icon',
    viewBox: '0 0 24 24',
    width: size,
    height: size,
    fill: 'currentColor',
    'aria-hidden': 'true',
    focusable: 'false',
  }, svg('path', { d: MDI[name] }));
}
