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
| `or-vaadin.js` | The form controls of OpenRemote's component library that the settings of the builder use (`or-vaadin-text-field`, `-number-field`, `-select`, `-toggle`, `-button` and `-multi-select-combo-box`), with the Vaadin components and the copy of Lit that they are made of | `@openremote/or-vaadin-components` 1.32.2, `@vaadin/*` 25.3.4, `lit` 3.3.3 | AGPL-3.0-or-later (OpenRemote), Apache-2.0 (Vaadin), BSD-3-Clause (Lit); the notices are at the end of the file |
| `or-theme.css` | OpenRemote's theme: its colours (`--or-color-*`), the Vaadin Lumo variables they are mapped on (`--lumo-*`) and the styles of the controls | `@openremote/theme` 1.32.2, `@vaadin/vaadin-lumo-styles` 25.3.4 | AGPL-3.0-or-later (OpenRemote), Apache-2.0 (Vaadin); the notices are at the end of the file |
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
- `or-vaadin.js`, `or-theme.css` and `fonts/` are built from the packages that OpenRemote publishes. In an empty folder
  `work/`, install them:

  ```
  npm install --ignore-scripts @openremote/or-vaadin-components@1.32.2 @openremote/theme@1.32.2
  ```

  and add three small files next to `node_modules/`:

  - `entry.js` has one line for each control: `import '@openremote/or-vaadin-components/or-vaadin-button';`, and the
    same for `or-vaadin-multi-select-combo-box`, `or-vaadin-number-field`, `or-vaadin-select`, `or-vaadin-text-field`
    and `or-vaadin-toggle`.
  - `theme.css` is `@import "@openremote/theme/default.css";`.
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

  Then build both, with `$BANNER` the comment `/*! OpenRemote or-vaadin-components 1.32.2 and theme 1.32.2
  (AGPL-3.0-or-later, Copyright OpenRemote Inc.) with Vaadin 25.3.4 (Apache-2.0), Lit 3.3.3 (BSD-3-Clause) and Inter
  4.1.1 (OFL-1.1) - https://github.com/openremote/openremote */` (on one line):

  ```
  esbuild entry.js --bundle --format=esm --minify --legal-comments=eof --banner:js="$BANNER" \
    --outfile=out/or-vaadin.js
  esbuild theme.css --bundle --minify --legal-comments=eof --banner:css="$BANNER" \
    --alias:inter-ui/inter.css=./inter.css --loader:.woff2=file --asset-names=fonts/[name] --outfile=out/or-theme.css
  ```

  `out/or-vaadin.js`, `out/or-theme.css` and `out/fonts/` go into this folder, and `LICENSE.txt` of `inter-ui` becomes
  `fonts/LICENSE.txt`. The controls bring their own copy of Lit, which does not interact with `lit.js`. The other
  controls of the library are left out until the page uses them. Some of them (`or-vaadin-dialog`,
  `or-vaadin-confirm-dialog`) import `@openremote/core`, the runtime of the manager, which a bundle for this page does
  not want.

To update one, replace the file in the same way and run the frontend tests and the page.
