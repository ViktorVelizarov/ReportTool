package com.example.reportservice.datapoint;

import static com.example.reportservice.support.TestServer.json;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.FakeManager;
import com.example.reportservice.support.TestServer;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;
import java.net.http.HttpResponse;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DatapointEndpointsTest {

    private static final String ID = FakeManager.ASSET_ID;
    private static final String POINTS = "POST /asset/datapoint/" + ID + "/temperature";
    private static final String PERIOD = "GET /asset/datapoint/periods";
    private static final String POINTS_URL = "/assets/" + ID + "/attributes/temperature/datapoints";
    private static final String INTERVAL_URL = POINTS_URL + "/interval";
    private static final String QUERY = "POST /asset/query";

    private FakeManager manager;
    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager()
                .respond(POINTS, "[{\"x\":2000,\"y\":21.5},{\"x\":1000,\"y\":null}]")
                .respond(QUERY, FakeManager.ASSETS); // the realm has the asset
        Router router = new Router();
        new DatapointEndpoints(manager.client()).register(router);
        server = new TestServer(router::register);
    }

    @AfterEach
    void tearDown() {
        server.close();
        manager.close();
    }

    @Test
    void returnsAllDatapointsInARange() throws Exception {
        HttpResponse<String> response = server.get(POINTS_URL + "?from=1000&to=3000");

        assertEquals(200, response.statusCode());
        JsonNode json = json(response);
        assertEquals(2, json.size());
        assertEquals(2000, json.get(0).get("timestamp").asLong());
        assertEquals(21.5, json.get(0).get("value").asDouble());
        assertTrue(json.get(1).get("value").isNull());

        JsonNode query = manager.lastBody(POINTS);
        assertEquals("all", query.get("type").asText());
        assertEquals(1000, query.get("fromTimestamp").asLong());
        assertEquals(3000, query.get("toTimestamp").asLong());
    }

    @Test
    void acceptsIsoTimestampsWithAnOffset() throws Exception {
        long midnight = Instant.parse("2026-01-01T00:00:00Z").toEpochMilli();

        server.get(POINTS_URL + "?from=2026-01-01T00:00:00Z&to=2026-01-02T00:00:00Z");
        assertEquals(midnight, manager.lastBody(POINTS).get("fromTimestamp").asLong());
        assertEquals(midnight + 24 * 3_600_000, manager.lastBody(POINTS).get("toTimestamp").asLong());

        server.get(POINTS_URL + "?from=2026-01-01T02:00:00%2B02:00&to=2026-01-01T03:00:00%2B02:00");
        assertEquals(midnight, manager.lastBody(POINTS).get("fromTimestamp").asLong());

        // an unencoded '+' arrives as a space
        server.get(POINTS_URL + "?from=2026-01-01T02:00:00+02:00&to=2026-01-01T03:00:00+02:00");
        assertEquals(midnight, manager.lastBody(POINTS).get("fromTimestamp").asLong());
    }

    @Test
    void rangeEndsNowByDefault() throws Exception {
        long before = System.currentTimeMillis();
        server.get(POINTS_URL + "?from=1000");
        long after = System.currentTimeMillis();

        long to = manager.lastBody(POINTS).get("toTimestamp").asLong();
        assertTrue(to >= before && to <= after);
    }

    @Test
    void rejectsInvalidParameters() throws Exception {
        assertEquals(400, server.get(POINTS_URL).statusCode()); // from is required
        assertEquals(400, server.get(POINTS_URL + "?from=yesterday").statusCode());
        assertEquals(400, server.get(POINTS_URL + "?from=1&to=soon").statusCode());
        assertEquals(400, server.get(POINTS_URL + "?from=2026-01-01T00:00:00").statusCode()); // no offset
        assertEquals(400, server.get(POINTS_URL + "?from=2000&to=1000").statusCode());
        assertTrue(manager.calls().isEmpty()); // none of these reached the manager
    }

    @Test
    void returnsTheDatapointsPerInterval() throws Exception {
        manager.respond(POINTS, "[{\"x\":1000,\"y\":21.5},{\"x\":4600000,\"y\":null}]");

        HttpResponse<String> response = server.get(INTERVAL_URL + "?from=1000&to=9000000&interval=1%20hour&formula=avg"
                + "&gapFill=true");

        assertEquals(200, response.statusCode());
        JsonNode json = json(response);
        assertEquals(2, json.size());
        assertEquals(1000, json.get(0).get("timestamp").asLong());
        assertEquals(21.5, json.get(0).get("value").asDouble());
        assertTrue(json.get(1).get("value").isNull());

        JsonNode query = manager.lastBody(POINTS);
        assertEquals("interval", query.get("type").asText());
        assertEquals(1000, query.get("fromTimestamp").asLong());
        assertEquals(9000000, query.get("toTimestamp").asLong());
        assertEquals("1 hour", query.get("interval").asText());
        assertEquals("AVG", query.get("formula").asText());
        assertTrue(query.get("gapFill").asBoolean());
    }

    @Test
    void leavesTheGapsOutUnlessTheyAreAskedFor() throws Exception {
        server.get(INTERVAL_URL + "?from=1&interval=5%20minutes&formula=MAX");
        assertFalse(manager.lastBody(POINTS).get("gapFill").asBoolean());

        server.get(INTERVAL_URL + "?from=1&interval=1%20DAY&formula=COUNT&gapFill=false");
        assertFalse(manager.lastBody(POINTS).get("gapFill").asBoolean());
        assertEquals("1 DAY", manager.lastBody(POINTS).get("interval").asText());
    }

    @Test
    void rejectsInvalidIntervalParameters() throws Exception {
        String base = INTERVAL_URL + "?from=1&interval=1%20hour&formula=AVG";
        assertEquals(400, server.get(INTERVAL_URL + "?interval=1%20hour&formula=AVG").statusCode()); // needs from
        assertEquals(400, server.get(INTERVAL_URL + "?from=1&formula=AVG").statusCode()); // so is the interval
        assertEquals(400, server.get(INTERVAL_URL + "?from=1&interval=1%20hour").statusCode()); // and the formula
        List<String> intervals =
                List.of("hour", "0%20hour", "1%20fortnight", "1%20hour;drop", "-1%20hour", "1000000%20day");
        for (String interval : intervals) {
            String url = INTERVAL_URL + "?from=1&formula=AVG&interval=" + interval;
            assertEquals(400, server.get(url).statusCode(), interval);
        }
        assertEquals(400, server.get(INTERVAL_URL + "?from=1&interval=1%20hour&formula=MEAN").statusCode());
        assertEquals(400, server.get(base + "&gapFill=yes").statusCode());
        assertEquals(400, server.get(base + "&to=0").statusCode()); // from after to
        assertTrue(manager.calls().isEmpty()); // none of these reached the manager
    }

    @Test
    void readsTheIntervalsInTheRealmThatIsAskedFor() throws Exception {
        assertEquals(200, server.get(INTERVAL_URL + "?from=1&interval=1%20day&formula=SUM&realm=smartcity")
                .statusCode());
        assertEquals("smartcity", checkedRealm());

        manager.respond(QUERY, "[]"); // the realm does not have the asset
        assertEquals(404, server.get(INTERVAL_URL + "?from=1&interval=1%20day&formula=SUM&realm=other")
                .statusCode());
    }

    @Test
    void explainsAnIntervalQueryThatTheManagerRefuses() throws Exception {
        manager.failOnce(POINTS, 400); // a text attribute, or the difference of a flag
        HttpResponse<String> response = server.get(INTERVAL_URL + "?from=1&interval=1%20day&formula=DIFFERENCE");

        assertEquals(400, response.statusCode());
        assertTrue(json(response).get("error").asText().contains("number or a flag"));
    }

    private String checkedRealm() {
        return manager.lastBody(QUERY).get("realm").get("name").asText();
    }

    @Test
    void readsTheRealmOfTheServiceUserByDefault() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\"}");

        server.get(POINTS_URL + "?from=1");
        assertEquals("master", checkedRealm());
        server.get(POINTS_URL + "/period");
        assertEquals("master", checkedRealm());
    }

    @Test
    void readsTheRealmThatIsAskedFor() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\"}");

        assertEquals(200, server.get(POINTS_URL + "?from=1&realm=smartcity").statusCode());
        assertEquals("smartcity", checkedRealm());
        assertEquals(ID, manager.lastBody(QUERY).get("ids").get(0).asText());

        assertEquals(200, server.get(POINTS_URL + "/period?realm=manufacturer").statusCode());
        assertEquals("manufacturer", checkedRealm());
    }

    @Test
    void callsTheManagerInTheRealmOfTheServiceUserWhicheverRealmIsRead() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\"}");

        server.get(POINTS_URL + "?from=1&realm=smartcity");
        server.get(POINTS_URL + "/period?realm=smartcity");

        assertEquals("master", manager.lastRealm(QUERY));
        assertEquals("master", manager.lastRealm(POINTS));
        assertEquals("master", manager.lastRealm(PERIOD));
    }

    @Test
    void doesNotFindTheHistoryOfAnAssetThatIsInAnotherRealm() throws Exception {
        manager.respond(QUERY, "[]"); // the realm that is asked for does not have the asset

        HttpResponse<String> points = server.get(POINTS_URL + "?from=1&realm=smartcity");
        assertEquals(404, points.statusCode());
        assertEquals("asset or attribute not found", json(points).get("error").asText());
        assertEquals(404, server.get(POINTS_URL + "/period?realm=smartcity").statusCode());

        assertEquals(List.of(QUERY, QUERY), manager.calls()); // the history of the asset was not read
    }

    @Test
    void reportsAManagerThatRefusesTheRealmAsBadGateway() throws Exception {
        manager.failOnce(QUERY, 403); // the service user may not read the realm

        HttpResponse<String> response = server.get(POINTS_URL + "?from=1&realm=smartcity");

        assertEquals(502, response.statusCode());
        assertTrue(json(response).get("error").asText().contains("403"));
    }

    @Test
    void rejectsAnInvalidRealm() throws Exception {
        for (String realm : List.of("a%2Fb", "..", "a%20b", "a.b", "a%3Fb")) {
            assertEquals(400, server.get(POINTS_URL + "?from=1&realm=" + realm).statusCode(), realm);
            assertEquals(400, server.get(POINTS_URL + "/period?realm=" + realm).statusCode(), realm);
        }
        assertTrue(manager.calls().isEmpty()); // none of these reached the manager
    }

    @Test
    void rejectsMalformedIdsAndNames() throws Exception {
        assertEquals(400, server.get("/assets/not-an-id/attributes/temperature/datapoints?from=1").statusCode());
        assertEquals(400, server.get("/assets/" + ID + "/attributes/not-a-name/datapoints?from=1").statusCode());
        assertEquals(400, server.get("/assets/not-an-id/attributes/temperature/datapoints/period").statusCode());
        assertEquals(400, server.get("/assets/" + ID + "/attributes/../datapoints/period").statusCode());
        assertTrue(manager.calls().isEmpty());
    }

    @Test
    void explainsErrorsFromTheManager() throws Exception {
        manager.failOnce(POINTS, 413);
        HttpResponse<String> tooLarge = server.get(POINTS_URL + "?from=1");
        assertEquals(413, tooLarge.statusCode());
        assertTrue(json(tooLarge).get("error").asText().contains("shorter range"));

        manager.failOnce(POINTS, 404);
        HttpResponse<String> missing = server.get(POINTS_URL + "?from=1");
        assertEquals(404, missing.statusCode());
        assertTrue(json(missing).get("error").asText().contains("not found"));

        manager.failOnce(PERIOD, 404);
        assertEquals(404, server.get(POINTS_URL + "/period").statusCode());

        manager.failOnce(POINTS, 403); // the service user may not read it: not the caller's mistake
        assertEquals(502, server.get(POINTS_URL + "?from=1").statusCode());
    }

    @Test
    void returnsThePeriod() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\","
                + "\"oldestTimestamp\":1000,\"latestTimestamp\":2000}");

        JsonNode json = json(server.get(POINTS_URL + "/period"));

        assertEquals(1000, json.get("oldestTimestamp").asLong());
        assertEquals(2000, json.get("latestTimestamp").asLong());
        assertEquals("assetId=" + ID + "&attributeName=temperature", manager.lastQuery(PERIOD));
    }

    @Test
    void returnsNullTimestampsWhenThereAreNoDatapoints() throws Exception {
        manager.respond(PERIOD, "{\"assetId\":\"" + ID + "\",\"attributeName\":\"temperature\"}");

        JsonNode json = json(server.get(POINTS_URL + "/period"));

        assertTrue(json.get("oldestTimestamp").isNull());
        assertTrue(json.get("latestTimestamp").isNull());
    }
}
