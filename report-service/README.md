# report-service

An external service for [OpenRemote](https://openremote.io). It serves the Report Studio web interface (the
[frontend](../frontend) folder) and registers itself in the manager's external service registry so the interface can
be shown inside the manager UI. It also exposes live OpenRemote data (assets, attributes and their stored history) and
the asset model as read-only JSON, makes the PDF of a report (see [PDF export](#pdf-export)) and keeps the reports that
authors save (see [Saved reports](#saved-reports)).

On startup it registers as `report-service`, then sends a heartbeat every 20 seconds (the manager drops a service
after 60 seconds without one). If the manager forgets it (for example after a restart) it registers again, and it
deregisters on shutdown. It serves the realm of its service user or, registered as a global service, every realm (see
[Serving every realm](#serving-every-realm)).

## Requirements

- JDK 21 (the Gradle wrapper downloads Gradle itself)
- A running OpenRemote manager and Keycloak
- A **service user** in the realm you want to register in. Create one in the manager UI (Users, Service users).
  Its client ID and secret are the credentials below. If registering fails with `HTTP 403`, give the user more roles.
  To serve every realm it has to be a super user, see below.
- For the PDF export: Chrome, Chromium or Edge on the machine that runs the service, see [PDF export](#pdf-export).
  The rest of the service works without it.

## Configuration

Settings are read from environment variables and from a `.env` file in the working directory. Environment variables
take precedence. Copy [.env.example](.env.example) to `.env` (git-ignored) to get started.

| Setting             | Default                      | Description                                                                                        |
|---------------------|------------------------------|----------------------------------------------------------------------------------------------------|
| `OR_CLIENT_ID`      | required                     | Service user client ID                                                                             |
| `OR_CLIENT_SECRET`  | required                     | Service user client secret                                                                         |
| `OR_REALM`          | `master`                     | Realm the service user belongs to; also the default realm of the data endpoints                    |
| `OR_GLOBAL_SERVICE` | `false`                      | Register as a global service shown in every realm, see [Serving every realm](#serving-every-realm) |
| `OR_MANAGER`        | `http://127.0.0.1:8080`      | Manager base URL                                                                                   |
| `OR_KEYCLOAK`       | `http://127.0.0.1:8081/auth` | Keycloak base URL including `/auth`                                                                |
| `PORT`              | `5000`                       | Port this service listens on                                                                       |
| `REPORTS_DIR`       | `data/reports`               | The folder that the saved reports are kept in, see [Saved reports](#saved-reports)                 |
| `OR_INSECURE_TLS`   | `false`                      | Skip TLS certificate verification, also in the browser of the PDF export. **Local testing only.**  |
| `CHROME_PATH`       | a browser that is found      | The Chrome, Chromium or Edge that makes the PDFs, see [PDF export](#pdf-export)                    |

The manager only accepts tokens whose issuer matches the `authServerUrl` it advertises at `/api/master/info`, so
use the same host name for `OR_KEYCLOAK` that the manager and Keycloak are configured with (for example
`localhost` when Keycloak runs behind the docker proxy at `https://localhost/auth`, `127.0.0.1` otherwise).

## Serving every realm

Without `OR_GLOBAL_SERVICE` the service serves the realm of its service user, and the manager shows it on the Services
page of that realm only. With `OR_GLOBAL_SERVICE=true` it registers once as a **global service**: the manager shows it
on the Services page of every realm, and the data endpoints can read the realm that is open in the manager.

1. In the manager, open the `master` realm and create a service user (Users, Service users) with the realm role
   `admin`, which makes it a super user, and the roles `read:assets`, `read:services` and `write:services`.
2. Put its credentials in `.env` with `OR_REALM=master` and `OR_GLOBAL_SERVICE=true`, and start the service.
3. Select a realm in the manager and open Services, Report Studio.

How it works: the service registers the address `http://localhost:{PORT}/{realm}`, and the manager replaces `{realm}`
with the realm that is open. A super user gets the name of the realm (`http://localhost:5000/manufacturer`), any other
user a query parameter (`http://localhost:5000/?realm=smartcity`), so the interface is served at both. The data
endpoints take the realm as the query parameter `realm` (see below). Only a super user may read a realm other than its
own, so the service user of a realm-scoped service cannot be used for this. The interface reads the realm from its
address and sends it with every call.

The manager checks a token against the realm in the URL of a call, so a token of `master` is only good for
`/api/master/...`, also for a super user. The service therefore always calls the API of its own realm and names the
realm to read in the request, which is what the manager's own UI does for a super user: in the asset query. The data
point API only knows asset IDs, so the service first asks whether the realm has the asset.

A realm that is named like an endpoint (`assets`, `branding` or `reports`) cannot be opened as `/{realm}`, which is the
endpoint; use `/?realm=assets`.

## Run

```
./gradlew run --console=plain
```

Or build a start script with `./gradlew installDist` and run `build/install/report-service/bin/report-service`.
The web interface is served at `http://localhost:5000/`. Stop with Ctrl-C to deregister cleanly. Logs go to the
console; the format and level are in `src/main/resources/logback.xml`.

## Web interface

The interface is the [frontend](../frontend) folder, a static site. The build copies it into the `static` folder of the
service's resources (see `processResources` in `build.gradle`) and `StaticHandler` serves it from there, so the
service is still a single jar with nothing else to deploy. A change in `../frontend` needs a new build; `./gradlew run`
does that. The interface is a prototype that reads the assets, attributes, data points and asset model of a realm
through the endpoints below, has its PDFs made by this service and its reports saved by it, while its generated text,
CSV and PNG exports and schedules are still mock; the [frontend README](../frontend/README.md) says what is real and
what is mock.

The widgets of the interface are the dashboard builder of OpenRemote's Insights, ported to plain JavaScript, and its
form controls and theme are OpenRemote's own components, bundled. That code is licensed under the AGPL-3.0-or-later,
and the jar includes it, so the jar can only be distributed under that license too. The
[frontend README](../frontend/README.md#license) explains this.

The manager shows the interface inside its Services page by loading the `homepageUrl` the service registers. That is
always `http://localhost:{PORT}/` for now (`http://localhost:{PORT}/{realm}` for a global service, see
[Serving every realm](#serving-every-realm)), which suits local development (Chrome shows an `http://localhost` page
inside an `https://localhost` manager). A deployment on another host would need this URL to be a setting, and the
service to be served over HTTPS, or browsers block it as mixed content.

## Live OpenRemote data

The service reads live data from the manager's REST API and exposes it as read-only JSON. The service user needs the
`read:assets` role. All these endpoints are `GET`.

Every endpoint except the asset model takes the optional query parameter `realm`, the realm to read (letters, digits,
`-` and `_`), for example `http://localhost:5000/assets?realm=smartcity&limit=3`. Without it the realm of the service
user is read. Only a super user may read another realm; for any other service user the manager refuses and the answer
is a `502`. An asset, or the history of an attribute, is only found in the realm that has the asset: for another realm
the answer is a `404`.

**The endpoints have no authentication of their own**: anyone who can reach the service's port can read whatever the
service user can read, and for a super user that is every realm of the manager. The same goes for the
[saved reports](#saved-reports), which anyone who can reach the port can also add and change, in every realm. Run the
service on a trusted network, or put an authenticating proxy in front of it.

### Assets and attributes

| Endpoint | Description |
|----------|-------------|
| `/assets` | Assets, oldest first. Query parameters (all optional): `type` (asset type name, subtypes included), `attributes` (comma separated attribute names, or `*` for all; default: none), `limit` (default: all), `offset`. Returns `{"total": <matching assets, ignoring limit and offset>, "assets": [...]}`. |
| `/assets/{id}` | One asset with all its attributes. |

An asset is `{id, name, type, realm, parentId, path, createdOn, version, accessPublicRead, attributes}`, where
`attributes` is left out when they were not requested. An attribute is `{name, type, value, timestamp, meta}`: its
value type, current value, when the value was set (Unix milliseconds) and its meta items (e.g. `units`,
`storeDataPoints`).

### Data points (history)

OpenRemote only stores history for attributes that have the `storeDataPoints` meta item (or an agent link). For other
attributes these endpoints return no data points.

| Endpoint | Description |
|----------|-------------|
| `/assets/{id}/attributes/{name}/datapoints/period` | When the stored history begins and ends: `{assetId, attributeName, oldestTimestamp, latestTimestamp}`; both timestamps are `null` if there is none. |
| `/assets/{id}/attributes/{name}/datapoints` | Every stored data point in a time range, newest first, as `[{timestamp, value}]`. Query parameters: `from` (required) and `to` (default: now), both included, as epoch milliseconds or an ISO-8601 timestamp with offset, e.g. `2026-01-01T00:00:00Z` (encode a `+` in an offset as `%2B`). |

One query returns at most 100000 data points (a manager setting); use a shorter range if you get a `413`.

Example, the data points of one day:

```
http://localhost:5000/assets/7A6p4AnLTkKxJUCQAAABAA/attributes/temperature/datapoints?from=2026-01-01T00:00:00Z&to=2026-01-02T00:00:00Z
```

### Asset model

| Endpoint | Description |
|----------|-------------|
| `/model/assetInfos` | The asset types of the manager, agents included, with their attributes: `[{assetDescriptor, attributeDescriptors}]`. It is the manager's own `assetInfos` without the lists of meta items and value types that it repeats for every type. The model is the same in every realm and needs no role, so there is no `realm` parameter. |

An `assetDescriptor` is `{descriptorType, name, icon, colour}`: `asset` or `agent`, the type name that the `type` of an
asset refers to, the name of a Material Design Icon and a hex colour without the `#`. `icon` and `colour` are left out
when the type has none. An `attributeDescriptor` is `{name, type, units}`, an attribute that the assets of the type
have, with the name of its value type and the units of its value, which are left out when it has none. Units are in
parts, as OpenRemote names them: `["litre", "per", "hour"]`. The `units` meta item of an asset's own attribute, if it
has one, takes precedence over the descriptor's.

### Branding

| Endpoint | Description |
|----------|-------------|
| `/branding` | How the manager shows the realm: `{primaryColour, logo}`. The report uses them to look like the realm. |

The manager keeps the look of each realm in its configuration (`manager_config.json`, which an administrator edits on
the manager's Configuration page): under `realms.{realm}` the `styles` that set the colours of the realm, and its
`logo`. A setting that the realm leaves out is that of the `default` entry, as the manager merges them. The service
reads the configuration, which the manager gives to everyone, and passes on two settings:

- `primaryColour` is the `--or-app-color4` of the `styles`, the colour the manager uses for the realm, as `#rgb` or
  `#rrggbb`. A colour in another notation (`red`, `rgb(...)`) is ignored.
- `logo` is the address of the logo, which the browser loads. A path on the manager (`/images/logo.svg`) gets the
  address of the manager (`OR_MANAGER`) in front of it, so that has to be an address the browser can reach; an
  `http://` or `https://` address is passed as it is, and anything else is ignored.

Each is left out of the answer when the realm has none, and the answer is `{}` for a manager that has no configuration
(the manager then answers 204, as the one of `docker compose` does until someone saves a configuration). The page keeps
the look of OpenRemote then. An unknown realm has no entry of its own and gets that of `default`.

### Errors

Errors are `{"error": "..."}`. `400` is an invalid parameter or body, `404` an unknown path, asset, attribute or saved
report, `405` a method that the path does not take (`Allow` says which), `409` a name that another saved report has, and
`413` a data point query that returns too much, or a body that is too large. `502` means OpenRemote failed or refused
the service (for example the service user lacks a role, or may not read the realm that was asked for) or, for a PDF,
that it could not be made; `503` that the request was interrupted, or that a PDF cannot be made now (see below), and
`500` a bug in this service, or a saved report that cannot be read or written.

## PDF export

| Endpoint | Description |
|----------|-------------|
| `POST /export/pdf` | The PDF of the report in the body: A4 landscape, looking as the report does in Preview, with no widget or block of text cut by a page break. The answer is the PDF, `application/pdf`. |

The body is a JSON object that the web interface posts when the author chooses Export, PDF report (`pdfRequest` in
`js/model/exports.js` of the [frontend](../frontend)): `realm` (the realm that the report is about; without it the realm
of the service user), `width` (the width in pixels that the report has in Preview, a whole number from 524 to 4000,
which is the width that the PDF is laid out in; 1280 when it is left out, and `400` when it is not a whole number in
that range), `name`, `periodId`, `asOf` (the moment the report is made for, in milliseconds), `template` (the layout and
widgets, a `DashboardTemplate` of OpenRemote's Insights) and `text` (the generated text that the author approved, as
`{block id: text}`). The service reads only the realm and the width; the page that is printed checks the rest and
refuses what is not a report.

**How it works.** For every PDF the service starts a headless browser with a profile of its own, opens `/render.html` of
this service in it, in a window as wide as the report is in Preview, and has it print the page when it is drawn. That
page is the report as in Preview, without the toolbar and the sidebar; it reads the assets and data points from this
service, as the interface does, so the PDF shows what the author saw. The service drives the browser with the Chrome
DevTools protocol (`ChromiumPdfRenderer` and `DevTools`): it gives the page the report and the width, and waits until
the page says that it is drawn. The [frontend README](../frontend/README.md#the-pdf-export) describes the page. The
browser ends when the PDF is made, and its profile is removed. A PDF takes one to three seconds on a development
machine, longer for a report with much data.

**Which browser.** The one that `CHROME_PATH` names. Otherwise the service looks where Chrome and Edge (Windows) or
Chrome, Chromium and Edge (macOS, Linux) are normally installed; any browser that is built on Chromium will do. When it
finds none, the service starts all the same and says so in its log, and the endpoint answers `503`. It was tried with
Chrome 157, Edge 156 and Playwright's Chromium 1208 on Windows 11, started from PowerShell. Edge started from a Git Bash
terminal stopped at once, which Chrome did not: start the service from PowerShell, or set `CHROME_PATH` to Chrome.
A Linux container was not tried: the browser needs its system libraries and fonts there, and Chrome does not start as
root unless its sandbox is switched off, which the service does not do.

**Limits.** A body can be 2 MB at most (`413`). At most two browsers run at a time and a request waits up to a minute
for its turn (`503`). A PDF that is not ready within a minute is a `502`, and so is a page that cannot draw the report;
the answer then has its message. As for the data endpoints, anyone who can reach the service can ask for a PDF, and the
browser opens whatever the report refers to, such as the address of an image, from the machine of the service. With
`OR_INSECURE_TLS=true` the browser accepts any TLS certificate, so that the logo of a realm can be on a manager with a
self-signed one.

## Saved reports

The service keeps the reports that authors save, so that a report can be opened again later and made with the data of
that day. A saved report is the setup of a report, not what it shows: nothing of the data or of the generated text is in
it.

| Endpoint | Description |
|----------|-------------|
| `GET /reports` | The saved reports of the realm by name, ignoring case: `[{id, name, updatedAt}]`. |
| `POST /reports` | Saves the report in the body as a new saved report. The answer is its `{id, name, updatedAt}`. |
| `GET /reports/{id}` | The saved report: `{id, name, periodId, template, instructions, schedule, createdAt, updatedAt}`. |
| `PUT /reports/{id}` | Saves the report in the body over the saved report with the ID, under the name that the body gives it. Answers like `POST`; an ID that the realm does not have is a `404`. |

All of them take the optional query parameter `realm`, as the data endpoints do, and keep the reports of each realm
apart. The body of `POST` and `PUT` is what the web interface saves of a report (`reportOf` in `js/state.js` of the
[frontend](../frontend)):

| Property | Description |
|----------|-------------|
| `name` | 1 to 80 characters without control characters; the spaces around it are dropped. Required. |
| `periodId` | The time frame of the report, such as `last30`. It is relative, so a report that is opened a month later is made for the days before that day; it is never a date. Required. |
| `template` | The layout and widgets, a `DashboardTemplate` of OpenRemote's Insights: an object with a list `widgets`, which can be empty. Required. |
| `instructions` | What the author told the AI about the report, an object. Optional. |
| `schedule` | When the report is made by itself, an object, or `null`. Optional. |

The service checks that these are there and of the right kind, and keeps them as they are, so a new setting of the web
interface needs no change here. Other properties are ignored: the service gives the report its `id` (a UUID) and the
times `createdAt` and `updatedAt` (Unix milliseconds). The web interface checks what it reads when it opens a report.

**Names.** A report is its ID and not its name: saving a report with `PUT` under another name renames it. A name is
unique within a realm, upper and lower case ignored, because the author tells the reports apart by their name; a name
that another report has is a `409`, for `POST` and for `PUT` alike.

**Where they are kept.** In `REPORTS_DIR`, which is relative to the folder that the service is started from (so
`report-service/data/reports` for `./gradlew run`) and is made at startup; the service does not start when it cannot.
Each report is the file `{realm}/{id}.json`, written to a file of its own first and then moved into place, so that a
report is never half written. The folder can be copied to make a backup, and a report is removed by deleting its file:
there is no endpoint for that yet. A damaged file is skipped, and logged, so that it cannot hide the other reports. Keep
the folder on a volume if the service runs in a container, or the reports go with the container.

**Limits.** There is one service at a time: the files are guarded by a lock in the process, so two services on one
folder could overwrite each other. A report can be 2 MB at most (`413`). The service does not know who the author is
(see the note on authentication above), so the saved reports of a realm are shared by everyone who works in it, and when
two people save the same report the last save wins. A failure to read or write a file is a `500`, with the cause in the
log.

## Test

```
./gradlew test
```

The tests of the web interface itself are in the frontend folder (`npm test`). The tests of the PDF export that drive a
real browser, among them one that makes the PDF of a report with the real web interface, are skipped on a machine that
has no Chrome, Chromium or Edge.

## Layout

The code is in `src/main/java/com/example/reportservice`, one package per concern:

- `ReportService` - entry point: wiring, the HTTP server and the shutdown hook. `BuildInfo` reads the project version
  that Gradle writes into `build-info.properties`, so the version is defined only in `build.gradle`.
- `config` - `Config`: environment and `.env` settings.
- `json` - `Json`: the shared JSON mapper.
- `web` - the small HTTP layer: `Router`, `Request` and `ApiException` (routing, parameters, bodies and error
  responses), `Binary` (an answer that is not JSON, such as a PDF) and `StaticHandler`, which serves the web interface.
  The router handles every request of the server and leaves what is not a route to `StaticHandler`.
- `openremote` - talking to the manager: `ManagerClient` (Keycloak service user login, token caching, REST calls in
  the realm of the service user), `ServiceRegistration` (registers, heartbeats and deregisters in
  `/api/{realm}/service`, or in `/api/master/service/global` for a global service) and `Ids` (the rules for asset IDs,
  names and realm names).
- `asset` - `AssetEndpoints` and the client that reads assets from `/api/{realm}/asset`, with the realm to read in the
  query.
- `branding` - `BrandingEndpoints` and the client that reads the colour and logo of a realm from
  `/api/{realm}/configuration/manager`.
- `datapoint` - `DatapointEndpoints` and the client that reads attribute history, and checks that the realm has the
  asset.
- `model` - `ModelEndpoints` and the client that reads the asset model (asset types and their attributes) from
  `/api/{realm}/model`.
- `export` - `PdfEndpoints` and the `PdfRenderer` that makes the PDF: `ChromiumPdfRenderer` starts the browser that
  `BrowserLocator` finds and talks to it through `DevTools`, a small client of the Chrome DevTools protocol.
- `report` - `ReportEndpoints` and the `ReportStore` that keeps the saved reports as files; `ReportDraft` is a report
  as it is sent to be saved, and checks it.

A new feature is a new package next to `asset`, `datapoint` and `model`, with an `...Endpoints` class that
`ReportService` registers on the router.

Other resources in `src/main/resources`: `logback.xml`, which sets the log format and level. The web interface is not
in this folder: the build adds it from `../frontend`. The tests mirror the packages, and `support` holds the fake
manager and test server they share.
