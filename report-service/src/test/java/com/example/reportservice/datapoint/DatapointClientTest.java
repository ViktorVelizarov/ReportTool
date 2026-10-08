package com.example.reportservice.datapoint;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.openremote.HttpStatusException;
import com.example.reportservice.support.FakeManager;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DatapointClientTest {

    private static final String ID = FakeManager.ASSET_ID;
    private static final String POINTS = "POST /asset/datapoint/" + ID + "/temperature";
    private static final String PERIOD = "GET /asset/datapoint/periods";
    private static final String QUERY = "POST /asset/query";

    private FakeManager manager;
    private DatapointClient datapoints;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager()
                .respond(POINTS, "[{\"x\":2000,\"y\":21.5},{\"x\":1000,\"y\":null},{\"x\":500}]")
                .respond(QUERY, FakeManager.ASSETS);
        datapoints = new DatapointClient(manager.client());
    }

    @AfterEach
    void tearDown() {
        manager.close();
    }

    @Test
    void readsAllDatapointsInTheRange() throws Exception {
        List<Datapoint> result = datapoints.all(ID, "temperature", 100, 3000);

        assertEquals(3, result.size());
        assertEquals(2000L, result.get(0).timestamp());
        assertEquals(21.5, result.get(0).value().asDouble());
        assertTrue(result.get(1).value().isNull());
        assertNull(result.get(2).value()); // the manager left y out

        JsonNode query = manager.lastBody(POINTS);
        assertEquals("all", query.get("type").asText());
        assertEquals(100, query.get("fromTimestamp").asLong());
        assertEquals(3000, query.get("toTimestamp").asLong());
    }

    @Test
    void readsThePeriod() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\","
                + "\"oldestTimestamp\":1000,\"latestTimestamp\":2000}");

        assertEquals(new DatapointPeriod(ID, "temperature", 1000L, 2000L), datapoints.period(ID, "temperature"));
        assertEquals("assetId=" + ID + "&attributeName=temperature", manager.lastQuery(PERIOD));
    }

    @Test
    void readsAPeriodWithoutDatapoints() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\"}");

        assertEquals(new DatapointPeriod(ID, "temperature", null, null), datapoints.period(ID, "temperature"));
    }

    @Test
    void passesOnErrorsFromTheManager() {
        manager.failOnce(POINTS, 413);

        HttpStatusException e =
                assertThrows(HttpStatusException.class, () -> datapoints.all(ID, "temperature", 1, 2));
        assertEquals(413, e.status());
    }

    @Test
    void reportsUnexpectedResponsesAsIoErrors() {
        manager.respond(POINTS, "{}");
        assertThrows(IOException.class, () -> datapoints.all(ID, "temperature", 1, 2));

        manager.respond(POINTS, "[{\"y\":1}]");
        assertThrows(IOException.class, () -> datapoints.all(ID, "temperature", 1, 2));

        manager.respond(POINTS, "");
        assertThrows(IOException.class, () -> datapoints.all(ID, "temperature", 1, 2));

        manager.respond(PERIOD, "");
        assertThrows(IOException.class, () -> datapoints.period(ID, "temperature"));
    }

    @Test
    void asksTheManagerWhetherTheRealmHasTheAsset() throws Exception {
        assertTrue(datapoints.inRealm("building", ID));

        JsonNode query = manager.lastBody(QUERY);
        assertEquals("building", query.get("realm").get("name").asText());
        assertEquals(ID, query.get("ids").get(0).asText());
        assertEquals(1, query.get("ids").size());
        assertEquals(0, query.get("select").get("attributes").size()); // the asset is enough
        assertEquals("master", manager.lastRealm(QUERY)); // in the realm of the service user, whichever is asked
    }

    @Test
    void saysThatARealmWithoutTheAssetDoesNotHaveIt() throws Exception {
        manager.respond(QUERY, "[]");

        assertFalse(datapoints.inRealm("building", ID));
    }

    @Test
    void passesOnAManagerThatRefusesTheRealmAndReportsUnexpectedAnswersAsIoErrors() {
        manager.failOnce(QUERY, 403);
        HttpStatusException e = assertThrows(HttpStatusException.class, () -> datapoints.inRealm("building", ID));
        assertEquals(403, e.status());

        manager.respond(QUERY, "{}");
        assertThrows(IOException.class, () -> datapoints.inRealm("building", ID));

        manager.respond(QUERY, "");
        assertThrows(IOException.class, () -> datapoints.inRealm("building", ID));
    }
}
