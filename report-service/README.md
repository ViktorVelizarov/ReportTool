# report-service

A minimal external service for [OpenRemote](https://openremote.io). It serves a small HTML page and registers itself
in the manager's external service registry so the page can be shown inside the manager UI. It also exposes live
OpenRemote data (assets, attributes and their stored history) as read-only JSON.

On startup it registers as `report-service`, then sends a heartbeat every 20 seconds (the manager drops a service
after 60 seconds without one). If the manager forgets it (for example after a restart) it registers again, and it
deregisters on shutdown.

## Requirements

- JDK 21 (the Gradle wrapper downloads Gradle itself)
- A running OpenRemote manager and Keycloak
- A **service user** in the realm you want to register in. Create one in the manager UI (Users, Service users).
  Its client ID and secret are the credentials below. If registering fails with `HTTP 403`, give the user more roles.

## Configuration

Settings are read from environment variables and from a `.env` file in the working directory. Environment variables
take precedence. Copy [.env.example](.env.example) to `.env` (git-ignored) to get started.

| Setting            | Default                      | Description                                                      |
|--------------------|------------------------------|------------------------------------------------------------------|
| `OR_CLIENT_ID`     | required                     | Service user client ID                                           |
| `OR_CLIENT_SECRET` | required                     | Service user client secret                                       |
| `OR_REALM`         | `master`                     | Realm the service user belongs to                                |
| `OR_MANAGER`       | `http://127.0.0.1:8080`      | Manager base URL                                                 |
| `OR_KEYCLOAK`      | `http://127.0.0.1:8081/auth` | Keycloak base URL including `/auth`                              |
| `PORT`             | `5000`                       | Port this service listens on                                     |
| `OR_INSECURE_TLS`  | `false`                      | Skip TLS certificate verification. **Local testing only.**       |

The manager only accepts tokens whose issuer matches the `authServerUrl` it advertises at `/api/master/info`, so
use the same host name for `OR_KEYCLOAK` that the manager and Keycloak are configured with (for example
`localhost` when Keycloak runs behind the docker proxy at `https://localhost/auth`, `127.0.0.1` otherwise).

## Run

```
./gradlew run --console=plain
```

Or build a start script with `./gradlew installDist` and run `build/install/report-service/bin/report-service`.
The page is served at `http://localhost:5000/`. Stop with Ctrl-C to deregister cleanly.

## Live OpenRemote data

The service reads live data from the manager's REST API and exposes it as read-only JSON, in the service user's realm.
The service user needs the `read:assets` role. All endpoints are `GET`.

**The endpoints have no authentication of their own**: anyone who can reach the service's port can read whatever the
service user can read. Run the service on a trusted network, or put an authenticating proxy in front of it.

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

### Errors

Errors are `{"error": "..."}`. `400` is an invalid parameter, `404` an unknown path, asset or attribute, `405` a method
other than `GET`, and `413` a data point query that returns too much. `502` means OpenRemote failed or refused the
service (for example the service user lacks a role), `503` that the request was interrupted and `500` a bug in this
service.

## Test

```
./gradlew test
```

## Layout

- `ReportService` - entry point: wiring, the page server and the shutdown hook
- `ServiceRegistration` - registers, heartbeats and deregisters in the manager's `/api/{realm}/service` registry
- `ApiEndpoints` - the JSON endpoints above: input validation and the mapping to the clients below
- `Router` / `Request` / `ApiException` - the small GET router behind them, and its error handling
- `AssetClient` / `Asset` / `Attribute` - read assets from the manager's `/api/{realm}/asset` API
- `DatapointClient` / `Datapoint` / `DatapointPeriod` - read attribute history from the manager's data point API
- `ManagerClient` - authenticated manager REST client (Keycloak service user login, token caching)
- `Config` - environment / `.env` settings
