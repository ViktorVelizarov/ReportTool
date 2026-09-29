# report-service

A minimal external service for [OpenRemote](https://openremote.io). It serves a small HTML page and registers itself
in the manager's external service registry so the page can be shown inside the manager UI.

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

The service reads live data from the manager's REST API and exposes it as read-only JSON. The service user needs
the `read:assets` role. Errors from the manager are returned as `502` with `{"error": "..."}`.

| Endpoint | Description |
|----------|-------------|
| `GET /assets` | Assets in the realm, oldest first, without attributes. Optional query parameters: `type` (asset type name, subtypes included), `limit` (default: all), `offset`. Returns `{"total": <matching assets>, "assets": [{id, name, type, realm, parentId, path, createdOn, version, accessPublicRead}]}`. |

## Test

```
./gradlew test
```

## Layout

- `ReportService` - entry point: wiring, the page server and the shutdown hook
- `ServiceRegistration` - registers, heartbeats and deregisters in the manager's `/api/{realm}/service` registry
- `ApiEndpoints` - the read-only JSON endpoints above
- `AssetClient` / `Asset` - reads assets from the manager's `/api/{realm}/asset` API
- `ManagerClient` - authenticated manager REST client (Keycloak service user login, token caching)
- `Config` - environment / `.env` settings
