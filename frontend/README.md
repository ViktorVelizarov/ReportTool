# Report Studio web interface

The interface of the report service. An author builds a report the way a dashboard is built in OpenRemote's Insights:
drag widgets onto the page and set them up in the sidebar, choose the time frame of the report, tell the AI what the
report shows and what to look out for, review the text it suggests, and export.

**This is a prototype.** The assets, attributes and data points in it are the live data of a realm of OpenRemote, which
the page reads through the [report service](../report-service). The generated text, the exports, the schedules and the
saved reports are still mock behaviour; the table [below](#what-is-real-and-what-is-mock) says what is what. It is a
static site (plain ES modules, no build step, nothing to install) that the report service serves.

## Run

The page needs the report service, which serves this folder at its root and answers the calls of the page:

```
cd ../report-service
./gradlew run --console=plain      # http://localhost:5000/
```

The build copies this folder into the service, so a change here needs a restart of the service. The service needs a
running OpenRemote manager; see its README for the settings.

**The realm.** A report is about the assets of one realm of OpenRemote, which the page reads from its address. When the
manager shows the service in its Services page, it opens `http://localhost:5000/manufacturer` for a super user and
`http://localhost:5000/?realm=smartcity` for any other user, and the page then shows the data of that realm and its name
in the header. An address without a realm shows the realm of the service's own service user, which the header does not
name. The page asks the service for the asset model first; if that fails it says so, with a button to try again.

`?asOf=2026-10-04T12:00:00Z` fixes the moment the report is made for, which makes the pages repeatable (for example
for screenshots). Otherwise it is the current time.

## The dashboard builder of Insights

The widgets are OpenRemote's. `js/builder/` is the dashboard builder of the manager's Insights page
(`ui/component/or-dashboard-builder` in the [openremote](https://github.com/openremote/openremote) repository),
ported from TypeScript to plain JavaScript so that it runs here without the manager and without a build:

- The same elements, working the same way. `or-dashboard-preview` is the grid, made with GridStack;
  `or-dashboard-browser` holds the widget types that are dragged onto it; `or-dashboard-widgetsettings` has the
  settings of the selected widget and `or-dashboard-boardsettings` those of the layout. `widgets/` and `settings/`
  have a widget and its settings for every type, registered by their manifests as in Insights.
- The same data. The layout of a report is a `DashboardTemplate` of `DashboardWidget`s (`widgetTypeId`, `gridItem`,
  `widgetConfig`), and every widget type has the config of Insights.
- The same libraries for drawing: GridStack, ECharts and gauge.js (see [vendor](vendor/README.md)).

The widget types are line chart, bar chart, KPI, gauge, table, map and image. The differences with Insights:

- A line chart, bar chart or KPI follows the time frame of the report. Its setting "Use the report time frame" can be
  switched off; then it has a time window of its own, as in Insights.
- The map is a drawing of the Netherlands instead of a MapLibre map with tiles from the manager, so it works offline.
- In preview mode, a chart, gauge or table has its download buttons (PNG or CSV) in its header.
- Not ported: the attribute input and gateway widgets (they change things or open tunnels, which a report does not),
  the time controls and zoom bar of the charts, the list of dashboards, who can see a dashboard and how often it
  refreshes, and the preview sizes for phones and tablets.

The builder uses parts of OpenRemote's component library: form fields, tabs, dialogs, the attribute picker,
translations and icons. The text field, number field, text area, select, toggle, checkbox, radio button, button,
multi-select combo box, menu bar, badge, dialog and confirm dialog are OpenRemote's own `or-vaadin-*` components, and
so are the scheduler (`or-scheduler`), `<or-translate>` and the `i18next` that it uses: all of them are bundled in
`vendor/or-vaadin.js`. The settings of the builder, the top of the page and the dialogs are made of them, and the page
takes its colours, font, radii and shadows from OpenRemote's theme, `vendor/or-theme.css`. The library has no component
for a message, a card or a progress bar, which the design system of OpenRemote has: a message (saved, exported, failed)
is a notification of Vaadin, a block of generated text and the page that cannot start are cards of Vaadin, and text
that is being written shows a progress bar of Vaadin, all in the colours of that theme. `js/kit/` has small stand-ins,
with the same names, properties and events, for what is not bundled yet: tabs, the attribute picker, icons, the loading
indicator and the colour input; it also gives `i18next` the texts of the page (`js/kit/i18n.js`). Its `OrMwcDialog`,
which the pickers of the builder use, draws an `or-vaadin-dialog`. The calls the widgets make to the manager are
answered by `js/data/asset-service.js`, with the data of the realm from the report service.

The top of the page is made after the header of an asset in OpenRemote's manager: the name of the report with the realm
and a "Prototype" badge, and the buttons that save it and switch between editing and previewing it (in the manager,
"Modify" and "view"). A bar below it has the time frame, the saved reports, the schedule, the text and the export. The
page has no navigation bar or logo of its own, because the manager shows it in its Services page, under its own
navigation.

### License

The files in `js/builder/`, `js/data/util.js`, `js/data/time-window.js` and `js/data/units.js`, and the texts in
`js/kit/texts.js`, are ported from OpenRemote, which is licensed under the **GNU Affero General Public License v3.0 or
later**. Each of those files says so in its header. `vendor/or-vaadin.js` and `vendor/or-theme.css` are OpenRemote's
own components and theme, under the same license, bundled with Vaadin components (Apache-2.0). **The web interface as
a whole is therefore a work based on OpenRemote, and it can only be distributed under AGPL-3.0-or-later**: anyone who
uses it, also over a network, must be able to get its source code. That has to be decided before this code goes into a
closed repository. The alternative is a builder of our own that is written without OpenRemote's code.

## What is real and what is mock

| Part | In the prototype |
|------|------------------|
| Assets, attributes and values | The assets of the realm and their current values, from the service (`GET /assets`, `GET /assets/{id}`), in OpenRemote's format (`js/data/asset-service.js`) |
| Asset types and attributes | The asset model of the manager (`GET /model/assetInfos`): the types with their icons and colours, and the attributes with their value types and units. It is read once, when the page starts (`js/data/asset-model.js`) |
| Data points | The stored history of an attribute, from the service. The service gives every point of a range, so the downsampling of a line chart and the average, minimum or maximum per interval are done in the browser |
| Widgets | OpenRemote's, see above, with that data |
| Time frames | Presets only: last 7, 30 and 90 days, last calendar month and last calendar quarter |
| Instructions for the AI | "Generate text" first opens a dialog with two questions, which have to be answered: what the report shows, and what the AI should look out for. The answers are kept with the saved report, but nothing uses them yet. `js/model/prompt.js` can make the prompt from them (the answers, the figures of every widget and a few fixed rules), but the page neither shows nor sends it |
| Generated text | Written from templates with the figures of the widgets (`js/model/ai.js`); there is no AI, so the text does not follow the answers |
| Review | Generated text starts as a draft. Each block is a card with badges for its state (Draft, Approved or Editing) and the buttons Approve, Edit and Remove below the text; a notice above the blocks counts what is left to approve and approves or discards all of it at once. A block that is being written shows a progress bar. A PDF only includes approved text. The "AI" badge marks drafts only: an approved block, the preview and the printed report do not show it, nor the badges and buttons |
| Export | The PDF, CSV and PNG buttons show progress and the name of the file, but create nothing |
| Saved reports | Kept in memory only, and a reload forgets them. The studio opens with an empty report. A saved report keeps its answers to the two questions |
| Schedule | A dialog sets when the report is made by itself, in OpenRemote's own scheduler (`or-scheduler`: once, or repeating every so many days, weeks, months or years, on days of the week or of the month, until a date or for a number of times), the report admin, whose email address is required and who gets a reminder on every day the report is made, to check it first, who gets the report by email, with which subject and message (with the placeholders `{report}`, `{period}` and `{date}`, filled in for every report) and as which files, and shows the next reports with the subject of the next email. When is an event of OpenRemote's calendar (`start`, `end` and a recurrence rule), the format that the manager uses. It is kept with the saved report, in memory; nothing is made or sent |

What the live data looks like on the page:

- An attribute without a value shows a dash in a KPI, gauge, table, map and image; its gauge has no needle.
- OpenRemote only stores the history of attributes that have the `storeDataPoints` meta item, and some have stored
  nothing yet. A chart of attributes without data points in the time frame says so.
- Units are those of the attribute, or else those of its type in the asset model, written with OpenRemote's symbols
  (`js/data/units.js`): the parts `litre`, `per` and `hour` give `l/h`.
- The attribute picker lists all assets of the realm, grouped by asset type. It reads them all when it opens.

Printing the page (Ctrl+P) prints the report on A4 landscape, scaled to the width of the page, without the controls
and without text that is not approved. The grid puts every widget at a fixed place, so a page break can cut through a
widget; a clean document is a job for the PDF export.

## Layout

- `index.html`, `css/app.css` - the page and its styles. `css/app.css` is read after `vendor/or-theme.css` and gets
  its colours, font, radii and shadows from that theme. The import map in `index.html` points `lit` to
  `vendor/lit.js`.
- `js/main.js` - starts the page. `js/state.js` - the report (its name, time frame and template, the generated text,
  the saved reports) and the actions that change it, as pure functions.
- `js/builder/` - the dashboard builder, see above. `js/ui/builder.js` connects it to the state: the builder elements
  get copies of the template, and their events change the state.
- `js/data/` - what the page knows of OpenRemote: the realm of the address (`realm.js`), the calls to the report
  service (`service-client.js`), the assets and data points that the widgets ask for (`asset-service.js`), the asset
  model (`asset-model.js`), the unit symbols, the time windows, and the context of the report (its realm, moment and
  time frame) that the widgets read when they fetch data.
- `js/model/` - the report apart from the page: time frames, statistics, the figures of the widgets for the text
  (`report.js`), the questions for the AI (`instructions.js`), the prompt they make (`prompt.js`), the text templates,
  the schedule (`schedule.js`, which finds the dates of a repeat with `vendor/rrule.js`), formatting and file names.
- `js/ui/` - the page around the builder: the header and the toolbar, the paper (cover, text blocks, widget
  descriptions), the review blocks, dialogs (a question, the schedule, and the instructions for the AI), messages and
  icons, and the message for a page that cannot start. `js/dom.js` has the helpers they build the page with; nothing is
  built with `innerHTML`.
- `js/kit/` - the stand-ins for the components of OpenRemote that are not bundled, see above, and the texts
  (`texts.js`) and icons (`mdi-icons.js`) of the page. An icon that the page does not have shows as the icon of an
  unknown type.
- `vendor/` - third-party libraries, OpenRemote's components, theme and font included. `test/` - the tests.

## Test

```
npm test
```

Uses the built-in test runner of Node.js (developed with Node 24); there is nothing to install. The tests cover the
state, the report model, the prompt and the text, the schedule, the data layer, and the parts of the builder that need
no browser: time windows, bar chart intervals and methods, the map, the keys, and the widget types with their default
configs.
The data layer is tested against a fake of the service (`test/helpers/service.js`) that has the asset model and a few
assets in the JSON that the service gives, with generated data points, and records every call; `test/helpers/` also
has the report that the tests of the report and the state use. The modules that need a browser are checked for valid
syntax.

## Towards the real thing

- `js/model/ai.js` becomes a call to a language model with the prompt of `js/model/prompt.js`, which is made already;
  the review stays as it is.
- `js/ui/export.js` becomes the real PDF, CSV and PNG export; ECharts can give a chart as an image
  (`getDataURL`).
- Saved reports are stored by the service. A template is the same JSON as an Insights dashboard.
- A schedule is stored by the service with its report. A job in the service makes the report when it is due and mails
  it and the reminder to the report admin, which needs a mail server and a time zone for the schedule (the dialog uses
  the one of the browser, and the rule is about the wall clock of that zone, also when summer time starts). The start
  of the event is when the first report is made; its end is not used. Whether the report waits for the admin before it
  goes out is still to be decided. Generated text has nobody to approve it when nobody is there, so it has to stay out
  of a scheduled report or go out marked as a draft; that is still to be decided.
- The service gives every point of a range, at most 100,000. An endpoint that averages per interval would send far less
  for a long time frame of an attribute that changes often.
- The attribute picker reads all assets of a realm at once. For a large realm it needs a tree of the assets that loads
  what is opened, as the manager's asset tree does.
- If Report Studio becomes part of the manager's own UI, it can use `@openremote/or-dashboard-builder` itself instead
  of this port.
