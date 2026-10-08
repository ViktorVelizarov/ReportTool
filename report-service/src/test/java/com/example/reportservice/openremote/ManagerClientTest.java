package com.example.reportservice.openremote;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.json.Json;
import com.example.reportservice.support.FakeManager;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ManagerClientTest {

    private FakeManager manager;
    private ManagerClient client;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager().respond("GET /thing", "{\"a\":1}");
        client = manager.client();
    }

    @AfterEach
    void tearDown() {
        manager.close();
    }

    @Test
    void readsTheJsonResponse() throws Exception {
        assertEquals(1, client.request("GET", "/thing", null).get("a").asInt());
    }

    @Test
    void sendsTheBodyAsJson() throws Exception {
        client.request("POST", "/thing", Json.object().put("b", 2));

        assertEquals(2, manager.lastBody("POST /thing").get("b").asInt());
    }

    @Test
    void returnsNullForAnEmptyResponse() throws Exception {
        assertNull(client.request("GET", "/empty", null));
    }

    @Test
    void callsTheRealmOfTheServiceUser() throws Exception {
        assertEquals("master", client.realm());

        client.request("GET", "/thing", null);

        assertEquals("master", manager.lastRealm("GET /thing"));
    }

    @Test
    void reusesTheTokenUntilItExpires() throws Exception {
        client.request("GET", "/thing", null);
        client.request("GET", "/thing", null);

        assertEquals(1, manager.tokenCalls());
        assertEquals(List.of("Bearer token1", "Bearer token1"), manager.authHeaders());
    }

    @Test
    void reportsNonSuccessStatuses() {
        manager.failOnce("GET /thing", 403);

        HttpStatusException e = assertThrows(HttpStatusException.class, () -> client.request("GET", "/thing", null));
        assertEquals(403, e.status());
        assertTrue(e.getMessage().contains("403"));
    }
}
