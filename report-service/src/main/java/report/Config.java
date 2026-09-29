package report;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.UnaryOperator;

/** Service settings, read from environment variables and an optional {@code .env} file (environment wins). */
record Config(
        String managerUrl,
        String keycloakUrl,
        String realm,
        String clientId,
        String clientSecret,
        int port,
        boolean insecureTls) {

    private static final Path ENV_FILE = Path.of(".env");

    /** @throws IllegalArgumentException if a required setting is missing or invalid */
    static Config load() throws IOException {
        Map<String, String> dotenv = readDotEnv();
        return from(name -> {
            String value = System.getenv(name);
            return value != null ? value : dotenv.get(name);
        });
    }

    private static Map<String, String> readDotEnv() throws IOException {
        if (!Files.isRegularFile(ENV_FILE)) {
            return Map.of();
        }
        Map<String, String> values = parseDotEnv(Files.readAllLines(ENV_FILE));
        System.out.println("loaded " + values.size() + " settings from " + ENV_FILE.toAbsolutePath());
        return values;
    }

    static Config from(UnaryOperator<String> env) {
        return new Config(
                optional(env, "OR_MANAGER", "http://127.0.0.1:8080"),
                optional(env, "OR_KEYCLOAK", "http://127.0.0.1:8081/auth"),
                optional(env, "OR_REALM", "master"),
                required(env, "OR_CLIENT_ID"),
                required(env, "OR_CLIENT_SECRET"),
                Integer.parseInt(optional(env, "PORT", "5000")),
                Boolean.parseBoolean(optional(env, "OR_INSECURE_TLS", "false")));
    }

    /** Parses {@code NAME=value} lines; blank lines, {@code #} comments, {@code export} and surrounding quotes are handled. */
    static Map<String, String> parseDotEnv(List<String> lines) {
        Map<String, String> values = new LinkedHashMap<>();
        for (String raw : lines) {
            String line = raw.strip();
            if (line.startsWith("﻿")) line = line.substring(1);
            if (line.startsWith("export ")) line = line.substring(7).stripLeading();
            int eq = line.indexOf('=');
            if (line.startsWith("#") || eq <= 0) continue;

            String value = line.substring(eq + 1).strip();
            if (value.length() >= 2 && (value.charAt(0) == '"' || value.charAt(0) == '\'')
                    && value.charAt(value.length() - 1) == value.charAt(0)) {
                value = value.substring(1, value.length() - 1);
            }
            values.put(line.substring(0, eq).strip(), value);
        }
        return values;
    }

    private static String optional(UnaryOperator<String> env, String name, String fallback) {
        String value = env.apply(name);
        return value != null ? value : fallback;
    }

    private static String required(UnaryOperator<String> env, String name) {
        String value = env.apply(name);
        if (value == null) {
            throw new IllegalArgumentException(
                    "Missing required setting " + name + " (set the environment variable or add it to .env)");
        }
        return value;
    }

    /** Keeps the client secret out of logs. */
    @Override
    public String toString() {
        return "Config[managerUrl=" + managerUrl + ", keycloakUrl=" + keycloakUrl + ", realm=" + realm
                + ", clientId=" + clientId + ", port=" + port + ", insecureTls=" + insecureTls + "]";
    }
}
