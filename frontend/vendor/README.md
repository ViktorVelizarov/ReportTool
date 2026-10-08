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

To update one, replace the file in the same way and run the frontend tests and the page.
