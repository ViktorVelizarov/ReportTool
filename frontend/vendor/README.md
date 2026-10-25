# vendor

Third-party code that the page loads, committed so that the page needs no network and no build step. Every file is
taken unchanged from its npm package, except where the table says otherwise.

| File | What | Package and version | License |
|------|------|---------------------|---------|
| `lit.js` | [Lit](https://lit.dev), the web components that OpenRemote's dashboard builder is made of | `lit` 3.3.3 | BSD-3-Clause (the notices are at the end of the file) |
| `gridstack-all.js` | [GridStack](https://gridstackjs.com), the grid in which widgets are dragged, dropped and resized; the one Insights uses | `gridstack` 12.4.2 | MIT, see `gridstack-all.js.LICENSE.txt` |
| `gridstack-css.js` | The stylesheet of GridStack as a module, for the shadow roots of the builder | `gridstack` 12.4.2 | MIT |
| `echarts.min.js` | [Apache ECharts](https://echarts.apache.org), draws the line, bar and KPI charts; the library Insights uses | `echarts` 6.1.0 | Apache-2.0 (header of the file), see `echarts.min.js.NOTICE.txt` |
| `gauge.min.js` | [gauge.js](https://bernii.github.io/gauge.js/), draws the gauge; the library OpenRemote's or-gauge uses | `gaugeJS` 1.3.9 | MIT, see `gauge.min.js.LICENSE.txt` |
| `or-vaadin.js` | The controls of OpenRemote's component library that the page uses (`or-vaadin-badge`, `-button`, `-checkbox`, `-checkbox-group`, `-confirm-dialog`, `-dialog`, `-menu-bar`, `-multi-select-combo-box`, `-number-field`, `-radio-group`, `-select`, `-text-area`, `-text-field` and `-toggle`), OpenRemote's scheduler (`or-scheduler`) with the date and time pickers that it is made of, `i18next` with OpenRemote's `<or-translate>`, and Vaadin's card, notification and progress bar, which the library has no version of; with the Vaadin components, moment, rrule and the copy of Lit that they are made of | `@openremote/or-vaadin-components`, `@openremote/or-scheduler` and `@openremote/or-translate` 1.32.2, `@vaadin/*` 25.3.4, `lit` 3.3.3, `moment` 2.31.0, `rrule` 2.8.1, `i18next` 26.5.10 | AGPL-3.0-or-later (OpenRemote), Apache-2.0 (Vaadin), BSD-3-Clause (Lit, rrule), MIT (moment, i18next); the notices are at the end of the file |
| `or-theme.css` | OpenRemote's theme: its colours (`--or-color-*`), the Vaadin Lumo variables they are mapped on (`--lumo-*`) and the styles of the controls, the card, the notification and the progress bar | `@openremote/theme` 1.32.2, `@vaadin/vaadin-lumo-styles` 25.3.4 | AGPL-3.0-or-later (OpenRemote), Apache-2.0 (Vaadin); the notices are at the end of the file |
| `rrule.js` | [rrule](https://github.com/jakubroztocil/rrule), which finds the dates of a recurrence rule; the page uses it for the next reports of a schedule (the scheduler in `or-vaadin.js` has a copy of its own) | `rrule` 2.8.1 | BSD-3-Clause, see `rrule.js.LICENSE.txt` |
| `fonts/Inter-*.woff2` | Inter regular, medium, semi-bold and bold, the font of the theme | `inter-ui` 4.1.1 | SIL OFL 1.1, see `fonts/LICENSE.txt` |

How each file is made:

- `lit.js` is one bundle of `lit` and the directives the builder uses, so that the page can import everything from
  `"lit"` through the import map in `index.html`. It is made from an entry file with `export * from 'lit';` and an
  `export { ... } from 'lit/directives/....js';` line for each directive that `js/` imports from `"lit"` (`when`,
  `map`, `repeat`, `guard`, `until`, `styleMap`, `classMap`, `ifDefined`, `ref`, `unsafeHTML` and `live`), with
  `esbuild entry.js --bundle --format=esm --minify --legal-comments=eof` and the banner
  `/*! Lit 3.3.3 (lit, lit-html, lit-element, @lit/reactive-element) - BSD-3-Clause - Copyright 2017 Google LLC -
  https://lit.dev */` (on one line).
- `gridstack-all.js` is `dist/gridstack-all.js` of `gridstack`, which sets `window.GridStack`.
- `gridstack-css.js` is `export default "<the content of dist/gridstack.min.css>";` with a comment line on top.
- `echarts.min.js` is `dist/echarts.min.js` of `echarts`, which sets `window.echarts`.
- `gauge.min.js` is `dist/gauge.min.js` of `gaugeJS`, which sets `window.Gauge`.
- `or-vaadin.js`, `or-theme.css`, `rrule.js` and `fonts/` are built from the packages that OpenRemote publishes, and
  from Vaadin's card, notification and progress bar, which neither the library nor the theme has anything for. In an
  empty folder `work/`, install them:

  ```
  npm install --ignore-scripts @openremote/or-vaadin-components@1.32.2 @openremote/or-scheduler@1.32.2 \
    @openremote/theme@1.32.2 @vaadin/card@25.3.4 @vaadin/notification@25.3.4 @vaadin/progress-bar@25.3.4
  ```

  and add these small files next to `node_modules/`:

  - `entry.js` has one line for each control: `import '@openremote/or-vaadin-components/or-vaadin-badge';`, and the
    same for `or-vaadin-button`, `or-vaadin-checkbox`, `or-vaadin-checkbox-group`, `or-vaadin-confirm-dialog`,
    `or-vaadin-dialog`, `or-vaadin-menu-bar`, `or-vaadin-multi-select-combo-box`, `or-vaadin-number-field`,
    `or-vaadin-radio-group` (which brings the radio button), `or-vaadin-select`, `or-vaadin-text-area`,
    `or-vaadin-text-field` and `or-vaadin-toggle`; then `import '@openremote/or-scheduler';`,
    `import '@vaadin/card';`, `import '@vaadin/notification';` and `import '@vaadin/progress-bar';`; and the two things
    that the page asks the bundle for: `export { INTUITIVE_NOT_APPLICABLE } from '@openremote/or-scheduler';` and
    `export { i18next } from '@openremote/or-translate';`.
  - `theme.css` is `@import "@openremote/theme/default.css";` and, on the next lines,
    `@import "@vaadin/vaadin-lumo-styles/components/card.css";`, the same for `notification.css` and then for
    `progress-bar.css`.
  - `core.js` stands in for `@openremote/core`, the runtime of the manager, which a bundle for this page does not want.
    The dialogs of the library use `Util.generateUniqueUUID` of it in their `showDialog` and `showConfirmDialog`
    helpers, which the page does not call, the scheduler uses `Util.objectsEqual` to compare plain data, and the date
    and time pickers want the names of the locales of the manager's languages, of which there is one here:

    ```
    const objectsEqual = (a, b) => a === b || (a && b && typeof a === 'object' && typeof b === 'object'
      && Object.keys(a).length === Object.keys(b).length && Object.keys(a).every(key => objectsEqual(a[key], b[key])));

    export const Util = { generateUniqueUUID: () => crypto.randomUUID(), objectsEqual };
    export const I18NEXT_TO_MOMENT_LOCALE = {};
    ```

  - `or-icon.js` stands in for `@openremote/or-icon`, which draws its icons from a font of 7000 icons; the page defines
    `<or-icon>` itself (`js/kit/or-icon.js`). It has one line: `export {};`.
  - `rrule-entry.js` has one line: `export { RRule } from 'rrule';`.
  - `inter.css` has a rule for each of the weights 400 (`Inter-Regular`), 500 (`Inter-Medium`), 600 (`Inter-SemiBold`)
    and 700 (`Inter-Bold`), like this one. It stands in for `inter-ui/inter.css`, which the theme imports and which
    declares all 18 files of Inter, the thin and italic ones too.

    ```
    @font-face {
      font-family: "Inter";
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url("./node_modules/inter-ui/web/Inter-Regular.woff2") format("woff2");
    }
    ```

  Then build, with `$BANNER` the comment `/*! OpenRemote or-vaadin-components 1.32.2, or-scheduler 1.32.2 and theme
  1.32.2 (AGPL-3.0-or-later, Copyright OpenRemote Inc.) with Vaadin 25.3.4 (Apache-2.0), Lit 3.3.3 (BSD-3-Clause),
  moment 2.31.0 (MIT), rrule 2.8.1 (BSD-3-Clause), i18next 26.5.10 (MIT) and Inter 4.1.1 (OFL-1.1) -
  https://github.com/openremote/openremote */` and `$RRULE_BANNER` the comment `/*! rrule 2.8.1 (BSD-3-Clause), see
  rrule.js.LICENSE.txt - https://github.com/jakubroztocil/rrule */` (both on one line):

  ```
  esbuild entry.js --bundle --format=esm --minify --legal-comments=eof --banner:js="$BANNER" \
    --alias:@openremote/core=./core.js --alias:@openremote/or-icon=./or-icon.js --outfile=out/or-vaadin.js
  esbuild theme.css --bundle --minify --legal-comments=eof --banner:css="$BANNER" \
    --alias:inter-ui/inter.css=./inter.css --loader:.woff2=file --asset-names=fonts/[name] --outfile=out/or-theme.css
  esbuild rrule-entry.js --bundle --format=esm --minify --legal-comments=eof --banner:js="$RRULE_BANNER" \
    --outfile=out/rrule.js
  ```

  `out/or-vaadin.js`, `out/or-theme.css`, `out/rrule.js` and `out/fonts/` go into this folder, `LICENCE` of `rrule`
  becomes `rrule.js.LICENSE.txt`, and `LICENSE.txt` of `inter-ui` becomes `fonts/LICENSE.txt`. The controls bring
  their own copy of Lit, which does not interact with `lit.js`, and the scheduler brings its own copy of rrule. The
  other controls of the library are left out until the page uses them.

To update one, replace the file in the same way and run the frontend tests and the page.
