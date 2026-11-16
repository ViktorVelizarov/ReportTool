package com.example.reportservice.ai;

import java.time.Duration;
import java.time.Instant;
import java.time.InstantSource;
import java.util.ArrayDeque;
import java.util.Deque;

/**
 * Limits the calls to the model, which cost money on a hosted one and time on a local one: only so many at a time, and
 * only so many in a minute. The limits are for the whole service, as it does not know who calls it.
 */
final class CallLimits {

    private static final Duration WINDOW = Duration.ofMinutes(1);

    private final int atATime;
    private final int perMinute;
    private final InstantSource clock;
    private final Deque<Instant> starts = new ArrayDeque<>();
    private int running;

    CallLimits(int atATime, int perMinute, InstantSource clock) {
        this.atATime = atATime;
        this.perMinute = perMinute;
        this.clock = clock;
    }

    /** Whether a call may start now. A call that may must {@link #leave()} when it has ended. */
    synchronized boolean tryEnter() {
        Instant now = clock.instant();
        while (!starts.isEmpty() && !starts.peekFirst().plus(WINDOW).isAfter(now)) {
            starts.removeFirst();
        }
        if (running >= atATime || starts.size() >= perMinute) {
            return false;
        }
        running++;
        starts.addLast(now);
        return true;
    }

    synchronized void leave() {
        running--;
    }
}
