package com.example.reportservice.openremote;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import java.time.Duration;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Keeps this service registered in the manager's external service registry ({@code /api/{realm}/service}), in the
 * realm of the service user.
 *
 * <p>A global service is registered at {@code /api/master/service/global} instead, and the manager then shows it in
 * every realm. That needs a super user of the master realm.
 *
 * <p>Registers, then sends a heartbeat every {@code heartbeat}; the manager expires a lease after 60s without one.
 * Registers again if the manager forgets the service, and deregisters when stopped.
 */
public final class ServiceRegistration {

    private static final Logger LOG = LoggerFactory.getLogger(ServiceRegistration.class);

    private final ManagerClient manager;
    private final ObjectNode service;
    private final boolean global;
    private final String serviceId;
    private final Duration heartbeat;
    private final CountDownLatch stopped = new CountDownLatch(1);
    private final Thread thread = new Thread(this::run, "service-registration");

    /**
     * @param service registration payload; must contain a {@code serviceId}
     * @param global  whether to register as a global service
     */
    public ServiceRegistration(ManagerClient manager, ObjectNode service, boolean global, Duration heartbeat) {
        this.manager = manager;
        this.service = service;
        this.global = global;
        this.serviceId = service.get("serviceId").asText();
        this.heartbeat = heartbeat;
    }

    public void start() {
        thread.start();
    }

    /** Stops the heartbeat, deregisters and waits for that to finish. */
    public void stop() {
        stopped.countDown();
        try {
            thread.join();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    private void run() {
        String instanceId = null;
        do {
            try {
                if (instanceId == null) {
                    instanceId = register();
                } else {
                    manager.request("PUT", instancePath(instanceId), null);
                }
            } catch (HttpStatusException e) {
                LOG.warn("Registry call failed: {}", e.getMessage());
                if (e.status() == 404) { // the registry is in memory, so a manager restart forgets us
                    instanceId = null;
                }
            } catch (Exception e) {
                LOG.warn("Registry call failed: {}", e.toString());
            }
        } while (!awaitStop());

        if (instanceId != null) {
            try {
                manager.request("DELETE", instancePath(instanceId), null);
                LOG.info("Deregistered {}", serviceId);
            } catch (Exception e) {
                LOG.warn("Deregistering failed: {}", e.toString());
            }
        }
    }

    private String register() throws Exception {
        JsonNode registered = manager.request("POST", global ? "/service/global" : "/service", service);
        String instanceId = registered.get("instanceId").asText();
        LOG.info("Registered {} instanceId={} realm={} global={}",
                serviceId, instanceId, registered.get("realm").asText(), global);
        return instanceId;
    }

    private String instancePath(String instanceId) {
        return "/service/" + serviceId + "/" + instanceId;
    }

    /** Waits one heartbeat interval; returns true if stopped meanwhile. */
    private boolean awaitStop() {
        try {
            return stopped.await(heartbeat.toMillis(), TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return true;
        }
    }
}
