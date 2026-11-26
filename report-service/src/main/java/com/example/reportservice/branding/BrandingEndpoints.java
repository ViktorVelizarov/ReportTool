package com.example.reportservice.branding;

import com.example.reportservice.openremote.Ids;
import com.example.reportservice.openremote.ManagerClient;
import com.example.reportservice.web.Request;
import com.example.reportservice.web.Router;
import java.io.IOException;

/**
 * The branding endpoint: {@code GET /branding}. It reads the realm of the {@code realm} query parameter, or the realm
 * of the service user if there is none.
 */
public final class BrandingEndpoints {

    private final ManagerClient manager;
    private final BrandingClient branding;

    public BrandingEndpoints(ManagerClient manager) {
        this.manager = manager;
        this.branding = new BrandingClient(manager);
    }

    public void register(Router router) {
        router.get("/branding", this::getBranding);
    }

    /** {@code GET /branding?realm=}: the primary colour and the logo of the realm, each only if the realm has one. */
    private Object getBranding(Request request) throws IOException, InterruptedException {
        return branding.branding(request.query("realm", Ids.REALM, "realm", manager.realm()));
    }
}
