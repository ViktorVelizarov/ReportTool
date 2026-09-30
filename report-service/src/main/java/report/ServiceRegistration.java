package report;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.time.Duration;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * Keeps this service registered in the manager's external service registry ({@code /api/{realm}/service}).
 *
 * <p>Registers, then sends a heartbeat every {@code heartbeat}; the manager expires a lease after 60s without one.
 * Registers again if the manager forgets the service, and deregisters when stopped.
 */
final class ServiceRegistration {

    private final ManagerClient manager;
    private final ObjectNode service;
    private final String serviceId;
    private final Duration heartbeat;
    private final CountDownLatch stopped = new CountDownLatch(1);
    private final Thread thread = new Thread(this::run, "service-registration");

    /** @param service registration payload; must contain a {@code serviceId} */
    ServiceRegistration(ManagerClient manager, ObjectNode service, Duration heartbeat) {
        this.manager = manager;
        this.service = service;
        this.serviceId = service.get("serviceId").asText();
        this.heartbeat = heartbeat;
    }

    void start() {
        thread.start();
    }

    /** Stops the heartbeat, deregisters and waits for that to finish. */
    void stop() {
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
                System.out.println("registry call failed: " + e.getMessage());
                if (e.status == 404) { // the registry is in memory, so a manager restart forgets us
                    instanceId = null;
                }
            } catch (Exception e) {
                System.out.println("registry call failed: " + e);
            }
        } while (!awaitStop());

        if (instanceId != null) {
            try {
                manager.request("DELETE", instancePath(instanceId), null);
                System.out.println("deregistered");
            } catch (Exception e) {
                System.out.println("deregister failed: " + e);
            }
        }
    }

    private String register() throws Exception {
        JsonNode registered = manager.request("POST", "/service", service);
        String instanceId = registered.get("instanceId").asText();
        System.out.println("registered " + serviceId + " instanceId=" + instanceId
                + " realm=" + registered.get("realm").asText());
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
