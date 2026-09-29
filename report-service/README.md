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

## Test

```
./gradlew test
```

## Layout

- `ReportService` - entry point: heartbeat loop and the page server
- `RegistryClient` - authenticates with Keycloak and calls the manager's `/api/{realm}/service` endpoints
- `Config` - environment / `.env` settings
