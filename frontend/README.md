# Report Studio web interface

The interface of the report service. An author builds a report the way a dashboard is built in OpenRemote's Insights:
drag widgets onto the page and set them up in the sidebar, choose the time frame of the report, tell the AI what the
report shows and what to look out for, review the text it suggests, and export.

**This is a prototype.** The assets, attributes and data points in it are the live data of a realm of OpenRemote, which
the page reads through the [report service](../report-service), and the PDF of a report is made by that service. The
generated text, the CSV and PNG exports, the schedules and the saved reports are still mock behaviour; the table
[below](#what-is-real-and-what-is-mock) says what is what. It is a static site (plain ES modules, no build step, nothing
to install) that the report service serves.

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
`http://localhost:5000/?realm=smartcity` for any other user, and the page then shows the data of that realm. An address
without a realm shows the realm of the service's own service user. The page asks the service for the asset model first; if that fails it says so, with a button to try again.

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
`vendor/or-vaadin.js`. The settings of the builder, the review blocks and the dialogs are made of them, and the page
takes its colours, font, radii and shadows from OpenRemote's theme, `vendor/or-theme.css`. The library has no component
for a message, a card or a progress bar, which the design system of OpenRemote has: a message (saved, exported, failed)
is a notification of Vaadin, a block of generated text and the page that cannot start are cards of Vaadin, and text
that is being written shows a progress bar of Vaadin, all in the colours of that theme. `js/kit/` has small stand-ins,
with the same names, properties and events, for what is not bundled yet: tabs, the attribute picker, icons, the loading
indicator and the colour input; it also gives `i18next` the texts of the page (`js/kit/i18n.js`). Its `OrMwcDialog`,
which the pickers of the builder use, draws an `or-vaadin-dialog`. The calls the widgets make to the manager are
answered by `js/data/asset-service.js`, with the data of the realm from the report service.

The top of the page is the page's own: one toolbar with the name of the report, the switch between editing and
previewing, the time frame, the saved reports, and the buttons for saving, scheduling, writing text and exporting. Its
buttons and menus are styled in `css/app.css`, not taken from the library.

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
| Look of the realm | The primary colour and the logo that the realm has in the manager's configuration (`GET /branding`, `js/data/branding.js`), read when the page starts. The colour goes on the whole theme, as the manager does for a realm; the logo is on the cover. A realm that sets none looks like OpenRemote, in green and without a logo |
| Asset types and attributes | The asset model of the manager (`GET /model/assetInfos`): the types with their icons and colours, and the attributes with their value types and units. It is read once, when the page starts (`js/data/asset-model.js`) |
| Data points | The stored history of an attribute, from the service. The service gives every point of a range, so the downsampling of a line chart and the average, minimum or maximum per interval are done in the browser |
| Widgets | OpenRemote's, see above, with that data |
| Time frames | Presets only: last 7, 30 and 90 days, last calendar month and last calendar quarter |
| Instructions for the AI | "Generate text" first opens a dialog with two questions, which have to be answered: what the report shows, and what the AI should look out for. The answers are kept with the saved report, but nothing uses them yet. `js/model/prompt.js` can make the prompt from them (the answers, the figures of every widget and a few fixed rules), but the page neither shows nor sends it |
| Generated text | Written from templates with the figures of the widgets (`js/model/ai.js`); there is no AI, so the text does not follow the answers |
| Review | Generated text starts as a draft. Each block is a card with badges for its state (Draft, Approved or Editing) and the buttons Approve, Edit and Remove below the text; a notice above the blocks counts what is left to approve and approves or discards all of it at once. A block that is being written shows a progress bar. A PDF only includes approved text. The "AI" badge marks drafts only: an approved block, the preview and the printed report do not show it, nor the badges and buttons |
| PDF export | Export, PDF report has the service make the PDF and saves it as `report-name_2026-10-04.pdf`, see [below](#the-pdf-export). The report and its approved text are posted to `POST /export/pdf`; the file looks as the report does in Preview, with the real data, and has no widget cut by a page break |
| CSV and PNG export | The buttons show progress and the name of the file, but create nothing |
| Saved reports | Kept in memory only, and a reload forgets them. The studio opens with an empty report. A saved report keeps its answers to the two questions |
| Schedule | A dialog sets when the report is made by itself, in OpenRemote's own scheduler (`or-scheduler`: once, or repeating every so many days, weeks, months or years, on days of the week or of the month, until a date or for a number of times), the report admin, whose email address is required and who gets a reminder on every day the report is made, to check it first, who gets the report by email, with which subject and message (with the placeholders `{report}`, `{period}` and `{date}`, filled in for every report) and as which files, and shows the next reports with the subject of the next email. When is an event of OpenRemote's calendar (`start`, `end` and a recurrence rule), the format that the manager uses. It is kept with the saved report, in memory; nothing is made or sent |

What the live data looks like on the page:

- An attribute without a value shows a dash in a KPI, gauge, table, map and image; its gauge has no needle.
- OpenRemote only stores the history of attributes that have the `storeDataPoints` meta item, and some have stored
  nothing yet. A chart of attributes without data points in the time frame says so.
- Units are those of the attribute, or else those of its type in the asset model, written with OpenRemote's symbols
  (`js/data/units.js`): the parts `litre`, `per` and `hour` give `l/h`.
- The attribute picker lists all assets of the realm, grouped by asset type. It reads them all when it opens.

Printing the page (Ctrl+P) prints the report on A4 landscape, scaled to the width of the page, as it is in Preview: the
cover, the text, the widgets and the descriptions one after the other. It leaves out the controls (the toolbar, the
sidebar, the download buttons of the widgets and the buttons of a table) and the text that is not approved. The grid
puts every widget at a fixed place, so a page break can still cut through a widget when you print the page yourself; the
PDF export does not.

## The PDF export

Export, PDF report posts the report to the service (`POST /export/pdf`, see the [service
README](../report-service/README.md#pdf-export)) and saves what comes back. `pdfRequest` in `js/model/exports.js` makes
the request: the report as it is on the page, with only the generated text that is approved (the author is asked about
drafts first), and the width that the report has in Preview (`previewWidth` in `js/ui/paper.js`: the inside of the
paper, which is the same when the report is being edited and the sidebar takes room). The file is named by
`exportFileName`, from the name of the report and the moment it is made for.

The service has a headless browser open `render.html`, which is this page again without the toolbar and the sidebar;
`js/render.js` starts it. Before the page starts, the browser sets `window.reportRenderRequest = { width, report }`: the
request, and the width in pixels that the report has in Preview, which is also the width of its window. The page turns
the request into the state of a report (`stateOfPdfRequest`), shows it as in Preview, and waits until the widgets have
their data and are drawn: nothing was fetched or loading for 300 ms. Then it puts the report on the pages and sets
`window.reportRenderResult = { scale }`, or `{ error }` when it cannot draw the report. The browser prints the page at
that scale, which makes the layout as wide as the paper. The PDF therefore looks as the report does in Preview, with the
same proportions between the text, the charts and the widgets, and with 2 pixels to every pixel of a chart so that it
stays sharp. What is left out is what cannot be used on paper: the toolbar, the download buttons of the widgets and the
buttons of a table (its count of rows stays).

The report is printed as one flow, as it is in Preview, and only where a page break would cut a part is that part moved
to the next page. `placeOnPages` in `js/model/pages.js` decides where the parts go, and `placeOnPaper` in `js/render.js`
moves them: the cover, each block of text, each widget, and each description (the heading goes with the first one). A
part that would cross the bottom of a page goes to the top of the next page, together with every part below it in its
column, and a part never goes to an earlier page than the one before it in reading order, so the report reads in the
order it was built. A part that is taller than a page cannot be kept whole; it starts on a page of its own. The line at
the end of the report is not left alone on a page: the lowest parts keep room for it. If a part is cut all the same, the
page logs it, and the service logs that as a warning.

The print rules of `css/app.css` decide what is on the paper, for the PDF and for Ctrl+P alike: the page has margins of
10 mm instead of the padding of the paper, the controls are left out, and generated text that is not approved is left
out. Everything else is styled as it is on the screen.

## Layout

- `index.html`, `render.html`, `css/app.css` - the page, the page that the service prints to make a PDF, and their
  styles. `css/app.css` is read after `vendor/or-theme.css` and gets its colours, font, radii and shadows from that
  theme. The import map points `lit` to `vendor/lit.js`.
- `js/main.js` - starts the page; `js/render.js` starts the page that is printed. `js/state.js` - the report (its name,
  time frame and template, the generated text, the saved reports) and the actions that change it, as pure functions.
- `js/builder/` - the dashboard builder, see above. `js/ui/builder.js` connects it to the state: the builder elements
  get copies of the template, and their events change the state.
- `js/data/` - what the page knows of OpenRemote: the realm of the address (`realm.js`), the calls to the report
  service (`service-client.js`), the assets and data points that the widgets ask for (`asset-service.js`), the asset
  model (`asset-model.js`), the colour and logo of the realm (`branding.js`), the unit symbols, the time windows, and
  the context of the report (its realm, moment and time frame) that the widgets read when they fetch data.
- `js/model/` - the report apart from the page: time frames, statistics, the figures of the widgets for the text
  (`report.js`), the questions for the AI (`instructions.js`), the prompt they make (`prompt.js`), the text templates,
  the schedule (`schedule.js`, which finds the dates of a repeat with `vendor/rrule.js`), formatting, the file names and
  the request for a PDF (`exports.js`), and the pages of a printed report (`pages.js`).
- `js/ui/` - the page around the builder: the toolbar, the paper (cover, text blocks, widget descriptions), the review
  blocks, menus, dialogs (a question, the schedule, and the instructions for the AI), messages and icons, and the
  message for a page that cannot start. `js/dom.js` has the helpers they build the page with; nothing is
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
state, the report model, the prompt and the text, the schedule, the request for a PDF, the placing of widgets on pages,
the data layer, and the parts of the builder that need no browser: time windows, bar chart intervals and methods, the
map, the keys, and the widget types with their default configs.
The data layer is tested against a fake of the service (`test/helpers/service.js`) that has the asset model, the look of
the realm and a few assets in the JSON that the service gives, with generated data points, and records every call; `test/helpers/` also
has the report that the tests of the report and the state use. The modules that need a browser are checked for valid
syntax.

## Towards the real thing

- `js/model/ai.js` becomes a call to a language model with the prompt of `js/model/prompt.js`, which is made already;
  the review stays as it is.
- The CSV and PNG buttons (`mockExport` in `js/ui/export.js`) become real exports; ECharts can give a chart as an image
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
