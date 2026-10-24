/**
 * OpenRemote's i18next and its <or-translate> element, which the bundle in vendor/ has, because the scheduler needs
 * them, set up with the texts of texts.js. <or-translate value="key"> shows the text of a key, and the ported code asks
 * for texts with i18next.t, as in OpenRemote.
 */

import { i18next } from '../../vendor/or-vaadin.js';
import { EN } from './texts.js';

i18next.init({
  lng: 'en',
  initAsync: false, // the texts are here already, so the first one can be asked for at once
  keySeparator: false, // the keys of texts.js are flat: 'dashboard.zoom' is one key
  nsSeparator: false,
  interpolation: { escapeValue: false }, // what is shown is escaped by Lit
  resources: { en: { translation: EN } },
});

export { i18next };
