package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

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
        manager = new FakeManager().respond("POST /service", "{\"instanceId\":\"i1\",\"realm\":\"master\"}");
        registration = new ServiceRegistration(
                manager.client(),
                ManagerClient.MAPPER.createObjectNode().put("serviceId", "report-service").put("label", "Reports"),
                Duration.ofMillis(50));
    }

    @AfterEach
    void tearDown() {
        registration.stop();
        manager.close();
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
