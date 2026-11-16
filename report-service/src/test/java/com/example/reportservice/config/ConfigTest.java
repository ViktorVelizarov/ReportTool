package com.example.reportservice.config;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.nio.file.Path;
import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;

class ConfigTest {

    private static final Map<String, String> CREDENTIALS = Map.of("OR_CLIENT_ID", "id", "OR_CLIENT_SECRET", "secret");

    /** The configuration of a service that has its credentials and these settings. */
    private static Config configWith(Map<String, String> settings) {
        Map<String, String> env = new HashMap<>(CREDENTIALS);
        env.putAll(settings);
        return Config.from(env::get);
    }

    private static String refusal(Map<String, String> settings) {
        return assertThrows(IllegalArgumentException.class, () -> configWith(settings)).getMessage();
    }

    @Test
    void parsesDotEnvSyntax() {
        Map<String, String> values = Config.parseDotEnv(List.of(
                "\uFEFF# comment",
                "",
                "PLAIN=value",
                "export EXPORTED=1",
                "SPACED = padded ",
                "DOUBLE=\"with # hash\"",
                "SINGLE='quoted'",
                "EQUALS=a=b",
                "no-equals-line",
                "=novalue"));

        assertEquals("value", values.get("PLAIN"));
        assertEquals("1", values.get("EXPORTED"));
        assertEquals("padded", values.get("SPACED"));
        assertEquals("with # hash", values.get("DOUBLE"));
        assertEquals("quoted", values.get("SINGLE"));
        assertEquals("a=b", values.get("EQUALS"));
        assertEquals(6, values.size());
    }

    @Test
    void appliesDefaults() {
        Config config = Config.from(Map.of("OR_CLIENT_ID", "id", "OR_CLIENT_SECRET", "secret")::get);

        assertEquals("http://127.0.0.1:8080", config.managerUrl());
        assertEquals("http://127.0.0.1:8081/auth", config.keycloakUrl());
        assertEquals("master", config.realm());
        assertEquals(5000, config.port());
        assertFalse(config.insecureTls());
        assertFalse(config.globalService());
        assertEquals(Path.of("data/reports"), config.reportsDir());
        assertNull(config.ai(), "AI text is not set up");
    }

    @Test
    void readsOverrides() {
        Config config = Config.from(Map.of(
                "OR_CLIENT_ID", "id",
                "OR_CLIENT_SECRET", "secret",
                "OR_MANAGER", "https://localhost",
                "OR_REALM", "building",
                "PORT", "6000",
                "OR_INSECURE_TLS", "TRUE",
                "REPORTS_DIR", "/var/lib/report-studio")::get);

        assertEquals("https://localhost", config.managerUrl());
        assertEquals("building", config.realm());
        assertEquals(6000, config.port());
        assertTrue(config.insecureTls());
        assertEquals(Path.of("/var/lib/report-studio"), config.reportsDir());
    }

    @Test
    void registersAsAGlobalServiceFromTheMasterRealm() {
        Config config = Config.from(Map.of(
                "OR_CLIENT_ID", "id", "OR_CLIENT_SECRET", "secret", "OR_GLOBAL_SERVICE", "true")::get);

        assertTrue(config.globalService());
        assertEquals("master", config.realm());
    }

    @Test
    void refusesAGlobalServiceOutsideTheMasterRealm() {
        IllegalArgumentException e = assertThrows(IllegalArgumentException.class, () -> Config.from(Map.of(
                "OR_CLIENT_ID", "id",
                "OR_CLIENT_SECRET", "secret",
                "OR_REALM", "building",
                "OR_GLOBAL_SERVICE", "true")::get));

        assertTrue(e.getMessage().contains("OR_REALM=master"));
    }

    @Test
    void requiresCredentials() {
        IllegalArgumentException e = assertThrows(IllegalArgumentException.class,
                () -> Config.from(Map.of("OR_CLIENT_ID", "id")::get));

        assertTrue(e.getMessage().contains("OR_CLIENT_SECRET"));
    }

    @Test
    void readsTheModelThatWritesTheText() {
        AiSettings ai = configWith(Map.of(
                "AI_BASE_URL", " https://api.example.org/v1/ ",
                "AI_MODEL", " writer-1 ",
                "AI_API_KEY", " sk-123 ",
                "AI_TIMEOUT_SECONDS", " 45 ")).ai();

        assertEquals("https://api.example.org/v1", ai.baseUrl(), "without the slash, so that a path can be added");
        assertEquals("writer-1", ai.model());
        assertEquals("sk-123", ai.apiKey());
        assertEquals(Duration.ofSeconds(45), ai.timeout());
        assertEquals("api.example.org", ai.host());
    }

    @Test
    void aLocalModelNeedsNoKeyAndWaitsHalfAMinuteByDefault() {
        AiSettings ai = configWith(Map.of(
                "AI_BASE_URL", "http://localhost:11434/v1", "AI_MODEL", "llama3.2", "AI_API_KEY", "")).ai();

        assertEquals("http://localhost:11434/v1", ai.baseUrl());
        assertNull(ai.apiKey());
        assertEquals(Duration.ofSeconds(30), ai.timeout());
        assertEquals("localhost", ai.host());
    }

    @Test
    void aiTextIsNotSetUpWhenItsSettingsAreEmpty() {
        assertNull(configWith(Map.of("AI_BASE_URL", "", "AI_MODEL", " ")).ai());
        // a key and a time limit alone set nothing up, and are not looked at
        assertNull(configWith(Map.of("AI_API_KEY", "sk-123", "AI_TIMEOUT_SECONDS", "soon")).ai());
    }

    @Test
    void refusesAnAddressWithoutAModelAndAModelWithoutAnAddress() {
        String noModel = refusal(Map.of("AI_BASE_URL", "https://api.example.org/v1"));
        String noAddress = refusal(Map.of("AI_MODEL", "writer-1", "AI_BASE_URL", " "));

        assertTrue(noModel.contains("AI_MODEL is missing"), noModel);
        assertTrue(noAddress.contains("AI_BASE_URL is missing"), noAddress);
    }

    @Test
    void refusesAnAddressOfTheModelThatIsNotAWebAddress() {
        for (String address : List.of("localhost:11434/v1", "api.example.org/v1", "ftp://api.example.org/v1",
                "https:///v1", "https://api.example.org/v1?key=sk-123", "https://api.example.org/v1#top",
                "https://api.example.org/a b", "sk-123")) {
            String message = refusal(Map.of("AI_BASE_URL", address, "AI_MODEL", "writer-1"));

            assertTrue(message.contains("AI_BASE_URL must be"), address);
            assertFalse(message.contains("sk-123"), "a key in the wrong setting stays out of the log");
        }
    }

    @Test
    void refusesATimeLimitThatIsNotAWholeNumberOfSeconds() {
        for (String seconds : List.of("0", "-5", "1.5", "30s", "soon")) {
            String message = refusal(Map.of(
                    "AI_BASE_URL", "https://api.example.org/v1",
                    "AI_MODEL", "writer-1",
                    "AI_TIMEOUT_SECONDS", seconds));

            assertTrue(message.contains("AI_TIMEOUT_SECONDS"), seconds);
        }
    }

    @Test
    void toStringHidesSecrets() {
        Config config = Config.from(Map.of(
                "OR_CLIENT_ID", "id",
                "OR_CLIENT_SECRET", "hunter2",
                "AI_BASE_URL", "https://api.example.org/v1",
                "AI_MODEL", "writer-1",
                "AI_API_KEY", "sk-123")::get);

        assertFalse(config.toString().contains("hunter2"));
        assertFalse(config.toString().contains("sk-123"));
        assertFalse(config.ai().toString().contains("sk-123"));
        assertTrue(config.toString().contains("writer-1"), "the model is no secret");
    }
}
