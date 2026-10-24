# report-service

An external service for [OpenRemote](https://openremote.io). It serves the Report Studio web interface (the
[frontend](../frontend) folder) and registers itself in the manager's external service registry so the interface can
be shown inside the manager UI. It also exposes live OpenRemote data (assets, attributes and their stored history) and
the asset model as read-only JSON.

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
| `OR_INSECURE_TLS`   | `false`                      | Skip TLS certificate verification. **Local testing only.**                                         |

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
3. Select a realm in the manager and open Services, Reports.

How it works: the service registers the address `http://localhost:{PORT}/{realm}`, and the manager replaces `{realm}`
with the realm that is open. A super user gets the name of the realm (`http://localhost:5000/manufacturer`), any other
user a query parameter (`http://localhost:5000/?realm=smartcity`), so the interface is served at both. The data
endpoints take the realm as the query parameter `realm` (see below). Only a super user may read a realm other than its
own, so the service user of a realm-scoped service cannot be used for this. The interface reads the realm from its
address and sends it with every call, and shows it in its header.

The manager checks a token against the realm in the URL of a call, so a token of `master` is only good for
`/api/master/...`, also for a super user. The service therefore always calls the API of its own realm and names the
realm to read in the request, which is what the manager's own UI does for a super user: in the asset query. The data
point API only knows asset IDs, so the service first asks whether the realm has the asset.

A realm named `assets` cannot be opened as `/assets`, which is the list of assets; use `/?realm=assets`.

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
through the endpoints below, while its generated text, exports and saved reports are still mock; the
[frontend README](../frontend/README.md) says what is real and what is mock.

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
`read:assets` role. All endpoints are `GET`.

Every endpoint except the asset model takes the optional query parameter `realm`, the realm to read (letters, digits,
`-` and `_`), for example `http://localhost:5000/assets?realm=smartcity&limit=3`. Without it the realm of the service
user is read. Only a super user may read another realm; for any other service user the manager refuses and the answer
is a `502`. An asset, or the history of an attribute, is only found in the realm that has the asset: for another realm
the answer is a `404`.

**The endpoints have no authentication of their own**: anyone who can reach the service's port can read whatever the
service user can read, and for a super user that is every realm of the manager. Run the service on a trusted network,
or put an authenticating proxy in front of it.

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

### Errors

Errors are `{"error": "..."}`. `400` is an invalid parameter, `404` an unknown path, asset or attribute, `405` a method
other than `GET`, and `413` a data point query that returns too much. `502` means OpenRemote failed or refused the
service (for example the service user lacks a role, or may not read the realm that was asked for), `503` that the
request was interrupted and `500` a bug in this service.

## Test

```
./gradlew test
```

The tests of the web interface itself are in the frontend folder (`npm test`).

## Layout

The code is in `src/main/java/com/example/reportservice`, one package per concern:

- `ReportService` - entry point: wiring, the HTTP server and the shutdown hook. `BuildInfo` reads the project version
  that Gradle writes into `build-info.properties`, so the version is defined only in `build.gradle`.
- `config` - `Config`: environment and `.env` settings.
- `json` - `Json`: the shared JSON mapper.
- `web` - the small HTTP layer: `Router`, `Request` and `ApiException` (routing, parameters and error responses) and
  `StaticHandler`, which serves the web interface. The router handles every request of the server and leaves what is
  not a route to `StaticHandler`.
- `openremote` - talking to the manager: `ManagerClient` (Keycloak service user login, token caching, REST calls in
  the realm of the service user), `ServiceRegistration` (registers, heartbeats and deregisters in
  `/api/{realm}/service`, or in `/api/master/service/global` for a global service) and `Ids` (the rules for asset IDs,
  names and realm names).
- `asset` - `AssetEndpoints` and the client that reads assets from `/api/{realm}/asset`, with the realm to read in the
  query.
- `datapoint` - `DatapointEndpoints` and the client that reads attribute history, and checks that the realm has the
  asset.
- `model` - `ModelEndpoints` and the client that reads the asset model (asset types and their attributes) from
  `/api/{realm}/model`.

A new feature is a new package next to `asset`, `datapoint` and `model`, with an `...Endpoints` class that
`ReportService` registers on the router.

Other resources in `src/main/resources`: `logback.xml`, which sets the log format and level. The web interface is not
in this folder: the build adds it from `../frontend`. The tests mirror the packages, and `support` holds the fake
manager and test server they share.
