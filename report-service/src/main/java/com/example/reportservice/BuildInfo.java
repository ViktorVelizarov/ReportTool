package com.example.reportservice;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/** Build details that Gradle puts into {@code build-info.properties} (see build.gradle). */
final class BuildInfo {

    private static final String RESOURCE = "/build-info.properties";

    private BuildInfo() { }

    /** The project version from build.gradle. */
    static String version() throws IOException {
        Properties properties = new Properties();
        try (InputStream in = BuildInfo.class.getResourceAsStream(RESOURCE)) {
            if (in == null) {
                throw new IOException(RESOURCE + " is missing from the classpath");
            }
            properties.load(in);
        }
        return properties.getProperty("version");
    }
}
