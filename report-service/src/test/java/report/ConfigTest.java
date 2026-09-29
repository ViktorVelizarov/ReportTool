package report;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.Test;

class ConfigTest {

    @Test
    void parsesDotEnvSyntax() {
        Map<String, String> values = Config.parseDotEnv(List.of(
                "﻿# comment",
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
    }

    @Test
    void readsOverrides() {
        Config config = Config.from(Map.of(
                "OR_CLIENT_ID", "id",
                "OR_CLIENT_SECRET", "secret",
                "OR_MANAGER", "https://localhost",
                "OR_REALM", "building",
                "PORT", "6000",
                "OR_INSECURE_TLS", "TRUE")::get);

        assertEquals("https://localhost", config.managerUrl());
        assertEquals("building", config.realm());
        assertEquals(6000, config.port());
        assertTrue(config.insecureTls());
    }

    @Test
    void requiresCredentials() {
        IllegalArgumentException e = assertThrows(IllegalArgumentException.class,
                () -> Config.from(Map.of("OR_CLIENT_ID", "id")::get));

        assertTrue(e.getMessage().contains("OR_CLIENT_SECRET"));
    }

    @Test
    void toStringHidesSecret() {
        Config config = Config.from(Map.of("OR_CLIENT_ID", "id", "OR_CLIENT_SECRET", "hunter2")::get);

        assertFalse(config.toString().contains("hunter2"));
    }
}
