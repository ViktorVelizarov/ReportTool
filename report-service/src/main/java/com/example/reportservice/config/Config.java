package com.example.reportservice.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.UnaryOperator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service settings, read from environment variables and an optional {@code .env} file (environment wins).
 *
 * @param realm         the realm of the service user, which is also the realm that is read when a request names none
 * @param globalService whether the service registers as a global service, which the manager shows in every realm
 */
public record Config(
        String managerUrl,
        String keycloakUrl,
        String realm,
        String clientId,
        String clientSecret,
        int port,
        boolean insecureTls,
        boolean globalService) {

    private static final Logger LOG = LoggerFactory.getLogger(Config.class);
    private static final Path ENV_FILE = Path.of(".env");
    private static final String MASTER_REALM = "master";

    /** @throws IllegalArgumentException if a required setting is missing or invalid */
    public static Config load() throws IOException {
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
        LOG.info("Loaded {} settings from {}", values.size(), ENV_FILE.toAbsolutePath());
        return values;
    }

    static Config from(UnaryOperator<String> env) {
        String realm = optional(env, "OR_REALM", MASTER_REALM);
        boolean globalService = Boolean.parseBoolean(optional(env, "OR_GLOBAL_SERVICE", "false"));
        if (globalService && !realm.equals(MASTER_REALM)) {
            throw new IllegalArgumentException("OR_GLOBAL_SERVICE=true needs OR_REALM=" + MASTER_REALM
                    + ": the manager only accepts global services from a super user of the master realm");
        }
        return new Config(
                optional(env, "OR_MANAGER", "http://127.0.0.1:8080"),
                optional(env, "OR_KEYCLOAK", "http://127.0.0.1:8081/auth"),
                realm,
                required(env, "OR_CLIENT_ID"),
                required(env, "OR_CLIENT_SECRET"),
                Integer.parseInt(optional(env, "PORT", "5000")),
                Boolean.parseBoolean(optional(env, "OR_INSECURE_TLS", "false")),
                globalService);
    }

    /**
     * Parses {@code NAME=value} lines; blank lines, {@code #} comments, {@code export} and surrounding quotes are
     * handled.
     */
    static Map<String, String> parseDotEnv(List<String> lines) {
        Map<String, String> values = new LinkedHashMap<>();
        for (String raw : lines) {
            String line = raw.replace("\uFEFF", "").strip(); // a byte order mark may start the file
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
                + ", clientId=" + clientId + ", port=" + port + ", insecureTls=" + insecureTls
                + ", globalService=" + globalService + "]";
    }
}
