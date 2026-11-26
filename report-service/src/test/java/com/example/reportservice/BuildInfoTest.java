package com.example.reportservice;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

class BuildInfoTest {

    @Test
    void readsTheVersionThatGradleWroteIntoTheBuild() throws Exception {
        String version = BuildInfo.version();

        // not the unexpanded "${version}" of the template
        assertTrue(version.matches("\\d+\\.\\d+\\.\\d+.*"), version);
    }
}
