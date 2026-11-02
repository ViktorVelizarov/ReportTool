package com.example.reportservice.branding;

import com.example.reportservice.openremote.ManagerClient;
import java.io.IOException;

/**
 * Reads the branding of a realm from the manager's configuration ({@code /api/{realm}/configuration/manager}). The
 * configuration is public and the same for every realm, so it is read from the realm of the service user, which the
 * service can always call.
 */
final class BrandingClient {

    private final ManagerClient manager;

    BrandingClient(ManagerClient manager) {
        this.manager = manager;
    }

    /** The branding of the realm; without colour or logo if the manager has no configuration or the realm sets none. */
    Branding branding(String realm) throws IOException, InterruptedException {
        return Branding.of(manager.request("GET", "/configuration/manager", null), realm, manager.managerUrl());
    }
}
