package com.example.reportservice.ai;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;

class CallLimitsTest {

    private final AtomicReference<Instant> now = new AtomicReference<>(Instant.parse("2026-11-16T12:00:00Z"));

    private void wait(Duration time) {
        now.updateAndGet(instant -> instant.plus(time));
    }

    @Test
    void letsOnlySoManyCallsRunAtATime() {
        CallLimits limits = new CallLimits(2, 100, now::get);

        assertTrue(limits.tryEnter());
        assertTrue(limits.tryEnter());
        assertFalse(limits.tryEnter(), "two are running");

        limits.leave();
        assertTrue(limits.tryEnter(), "one has ended");
        assertFalse(limits.tryEnter());
    }

    @Test
    void letsOnlySoManyCallsStartInAMinute() {
        CallLimits limits = new CallLimits(1, 3, now::get);
        for (int call = 1; call <= 3; call++) {
            assertTrue(limits.tryEnter(), "call " + call);
            limits.leave();
            wait(Duration.ofSeconds(10));
        }

        assertFalse(limits.tryEnter(), "three calls started in the last 30 seconds");

        wait(Duration.ofSeconds(29));
        assertFalse(limits.tryEnter(), "the first call started 59 seconds ago");
        wait(Duration.ofSeconds(1));
        assertTrue(limits.tryEnter(), "the first call started a minute ago");
        limits.leave();
        assertFalse(limits.tryEnter(), "and the second 50 seconds ago");
    }

    @Test
    void aCallThatWasRefusedDoesNotCount() {
        CallLimits limits = new CallLimits(1, 2, now::get);
        assertTrue(limits.tryEnter());
        for (int refused = 0; refused < 5; refused++) {
            assertFalse(limits.tryEnter());
        }

        limits.leave();

        assertTrue(limits.tryEnter(), "only one call started in this minute");
    }
}
