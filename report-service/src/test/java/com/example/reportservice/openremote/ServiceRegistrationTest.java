package com.example.reportservice.openremote;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.json.Json;
import com.example.reportservice.support.FakeManager;
import java.time.Duration;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ServiceRegistrationTest {

    private static final String HEARTBEAT = "PUT /service/report-service/i1";

    private FakeManager manager;
    private ServiceRegistration registration;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager()
                .respond("POST /service", "{\"instanceId\":\"i1\",\"realm\":\"master\"}")
                .respond("POST /service/global", "{\"instanceId\":\"i1\",\"realm\":\"master\"}");
        registration = registration(false);
    }

    @AfterEach
    void tearDown() {
        registration.stop();
        manager.close();
    }

    private ServiceRegistration registration(boolean global) {
        return new ServiceRegistration(
                manager.client(),
                Json.object().put("serviceId", "report-service").put("label", "Reports"),
                global,
                Duration.ofMillis(50));
    }

    @Test
    void registersThenHeartbeatsThenDeregistersOnStop() throws Exception {
        registration.start();
        FakeManager.await(() -> manager.calls().contains(HEARTBEAT));
        registration.stop();

        assertEquals("POST /service", manager.calls().getFirst());
        assertEquals("Reports", manager.lastBody("POST /service").get("label").asText());
        assertEquals("DELETE /service/report-service/i1", manager.calls().getLast());
    }

    @Test
    void registersInTheRealmOfTheServiceUser() throws Exception {
        registration.start();
        FakeManager.await(() -> manager.calls().contains(HEARTBEAT));
        registration.stop();

        assertEquals("master", manager.lastRealm("POST /service"));
        assertEquals("master", manager.lastRealm(HEARTBEAT));
        assertEquals("master", manager.lastRealm("DELETE /service/report-service/i1"));
    }

    @Test
    void registersAsAGlobalServiceWhenAsked() throws Exception {
        registration = registration(true);

        registration.start();
        FakeManager.await(() -> manager.calls().contains(HEARTBEAT));
        registration.stop();

        assertEquals("POST /service/global", manager.calls().getFirst());
        assertEquals("master", manager.lastRealm("POST /service/global"));
        assertFalse(manager.calls().contains("POST /service"));
        // a global service is kept alive and removed in the same way
        assertEquals("DELETE /service/report-service/i1", manager.calls().getLast());
    }

    @Test
    void registersAgainWhenTheManagerForgotTheService() throws Exception {
        manager.failOnce(HEARTBEAT, 404);

        registration.start();
        FakeManager.await(() -> manager.calls().stream().filter("POST /service"::equals).count() == 2);
        registration.stop();

        assertTrue(manager.calls().indexOf(HEARTBEAT) < manager.calls().lastIndexOf("POST /service"));
    }

    @Test
    void keepsRetryingWhileTheManagerIsUnavailable() throws Exception {
        manager.failOnce("POST /service", 503);

        registration.start();
        FakeManager.await(() -> manager.calls().contains(HEARTBEAT));
        registration.stop();

        assertEquals(2, manager.calls().stream().filter("POST /service"::equals).count());
    }
}
