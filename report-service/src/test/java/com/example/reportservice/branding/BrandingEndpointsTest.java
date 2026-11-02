package com.example.reportservice.branding;

import static com.example.reportservice.support.TestServer.json;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.example.reportservice.support.FakeManager;
import com.example.reportservice.support.TestServer;
import com.example.reportservice.web.Router;
import com.fasterxml.jackson.databind.JsonNode;
import java.net.http.HttpResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BrandingEndpointsTest {

    private static final String CALL = "GET /configuration/manager";

    /** The configuration of the manager's demo, with a default entry that sets only a title and a language. */
    private static final String CONFIG = """
            {"realms":{
              "default":{"appTitle":"OpenRemote Manager Demo","language":"en"},
              "smartcity":{
                "styles":":host > * {--or-app-color2: #F6F7FA; --or-app-color3: #1B1464; --or-app-color4: #662D91;}",
                "logo":"/images/logo_smartcity.svg","logoMobile":"/images/logo-mobile_smartcity.svg"},
              "manufacturer":{
                "styles":":host > * {--or-app-color2: #F6FAFA; --or-app-color3: #1A2456; --or-app-color4: #29ABE2;}",
                "logo":"/images/logo_manufacturer.svg"}}}""";

    private FakeManager manager;
    private TestServer server;

    @BeforeEach
    void setUp() throws Exception {
        manager = new FakeManager().respond(CALL, CONFIG);
        Router router = new Router();
        new BrandingEndpoints(manager.client()).register(router);
        server = new TestServer(router::register);
    }

    @AfterEach
    void tearDown() {
        server.close();
        manager.close();
    }

    /** The branding that the service gives for the realm, when the manager's configuration is this JSON. */
    private JsonNode brandingFor(String realm, String config) throws Exception {
        manager.respond(CALL, config);
        HttpResponse<String> response = server.get("/branding?realm=" + realm);
        assertEquals(200, response.statusCode());
        return json(response);
    }

    @Test
    void givesThePrimaryColourAndTheLogoOfTheRealm() throws Exception {
        HttpResponse<String> response = server.get("/branding?realm=manufacturer");

        assertEquals(200, response.statusCode());
        assertTrue(response.headers().firstValue("Content-Type").orElse("").startsWith("application/json"));
        JsonNode branding = json(response);
        assertEquals("#29ABE2", branding.get("primaryColour").asText());
        // the path of the logo is on the manager, so the browser gets the address at which it reaches the manager
        assertTrue(branding.get("logo").asText().matches("http://127\\.0\\.0\\.1:\\d+/images/logo_manufacturer\\.svg"));
        assertEquals(2, branding.size());
    }

    @Test
    void givesTheBrandingOfTheRealmThatWasAskedFor() throws Exception {
        assertEquals("#662D91", json(server.get("/branding?realm=smartcity")).get("primaryColour").asText());
        assertEquals("#29ABE2", json(server.get("/branding?realm=manufacturer")).get("primaryColour").asText());
    }

    @Test
    void readsTheConfigurationInTheRealmOfTheServiceUserWhateverRealmIsAskedFor() throws Exception {
        server.get("/branding?realm=smartcity");

        assertEquals("master", manager.lastRealm(CALL));
    }

    @Test
    void readsTheRealmOfTheServiceUserWithoutARealmParameter() throws Exception {
        JsonNode config = json(server.get("/branding"));

        // the service user is in the master realm, which this configuration does not know
        assertEquals(0, config.size());

        assertEquals("#FF0000", brandingFor("master", """
                {"realms":{"master":{"styles":"--or-app-color4: #FF0000;"}}}""").get("primaryColour").asText());
    }

    @Test
    void aRealmWithoutAnEntryHasNoBrandingUnlessTheDefaultEntrySetsOne() throws Exception {
        assertEquals(0, brandingFor("master", CONFIG).size());

        JsonNode branding = brandingFor("master", """
                {"realms":{"default":{"styles":"--or-app-color4: #112233;","logo":"https://example.org/logo.png"}}}""");

        assertEquals("#112233", branding.get("primaryColour").asText());
        assertEquals("https://example.org/logo.png", branding.get("logo").asText());
    }

    @Test
    void aSettingOfTheRealmWinsOverTheDefaultEntryAndTheRestComesFromIt() throws Exception {
        JsonNode branding = brandingFor("smartcity", """
                {"realms":{"default":{"styles":"--or-app-color4: #112233;","logo":"https://example.org/logo.png"},
                           "smartcity":{"styles":"--or-app-color4: #445566;"}}}""");

        assertEquals("#445566", branding.get("primaryColour").asText());
        assertEquals("https://example.org/logo.png", branding.get("logo").asText());
    }

    @Test
    void hasNoBrandingWhenTheManagerHasNoConfiguration() throws Exception {
        manager.respond(CALL, ""); // the manager answers 204 without a body

        HttpResponse<String> response = server.get("/branding?realm=manufacturer");

        assertEquals(200, response.statusCode());
        assertEquals(0, json(response).size());
    }

    @Test
    void readsTheLastDeclarationOfThePrimaryColour() throws Exception {
        JsonNode branding = brandingFor("manufacturer", """
                {"realms":{"manufacturer":{"styles":
                  ":host > * {--or-app-color4: #111111; --or-app-color3: #222222; --or-app-color4: #abc !important}"
                }}}""");

        assertEquals("#abc", branding.get("primaryColour").asText());
    }

    @Test
    void ignoresAColourThatIsNotWrittenAsHex() throws Exception {
        for (String colour : new String[] {"red", "rgb(1, 2, 3)", "#12", "#12345", "#1234567", "#ggg"}) {
            JsonNode branding = brandingFor("manufacturer", """
                    {"realms":{"manufacturer":{"styles":"--or-app-color4: %s;"}}}""".formatted(colour));

            assertFalse(branding.has("primaryColour"), colour);
        }
    }

    @Test
    void ignoresOtherColoursOfTheStyles() throws Exception {
        JsonNode branding = brandingFor("manufacturer", """
                {"realms":{"manufacturer":{"styles":"--or-app-color3: #1A2456; --or-app-color44: #FF0000;"}}}""");

        assertFalse(branding.has("primaryColour"));
    }

    @Test
    void givesOnlyALogoThatABrowserCanLoad() throws Exception {
        String[] logos = {"images/logo.svg", "javascript:alert(1)", "data:image/png;base64,AA", "ftp://x"};
        for (String logo : logos) {
            JsonNode branding = brandingFor("manufacturer", """
                    {"realms":{"manufacturer":{"logo":"%s"}}}""".formatted(logo));

            assertFalse(branding.has("logo"), logo);
        }
        assertEquals("http://example.org/a.svg", brandingFor("manufacturer", """
                {"realms":{"manufacturer":{"logo":"http://example.org/a.svg"}}}""").get("logo").asText());
    }

    @Test
    void ignoresSettingsOfTheWrongShape() throws Exception {
        JsonNode branding = brandingFor("manufacturer", """
                {"realms":{"manufacturer":{"styles":{"strings":["--or-app-color4: #111111;"]},"logo":["/a.svg"]}}}""");
        assertEquals(0, branding.size());

        assertEquals(0, brandingFor("manufacturer", "[]").size());
        assertEquals(0, brandingFor("manufacturer", "{\"realms\":[]}").size());
    }

    @Test
    void rejectsAnInvalidRealm() throws Exception {
        assertEquals(400, server.get("/branding?realm=a.b").statusCode());
        assertEquals(400, server.get("/branding?realm=..%2Fmaster").statusCode());
        assertFalse(manager.calls().contains(CALL));
    }

    @Test
    void reportsManagerFailuresAsBadGateway() throws Exception {
        manager.failOnce(CALL, 503);

        HttpResponse<String> response = server.get("/branding?realm=manufacturer");

        assertEquals(502, response.statusCode());
        assertTrue(json(response).get("error").asText().contains("503"));
    }

    @Test
    void rejectsOtherMethodsAndUnknownPaths() throws Exception {
        HttpResponse<String> post = server.send("POST", "/branding");
        assertEquals(405, post.statusCode());
        assertEquals("GET", post.headers().firstValue("Allow").orElse(null));

        assertEquals(404, server.get("/branding/manufacturer").statusCode());
    }
}
