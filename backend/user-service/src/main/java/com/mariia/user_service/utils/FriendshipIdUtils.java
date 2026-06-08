package com.mariia.user_service.utils;

import java.util.UUID;

public class FriendshipIdUtils {
    public static UUID[] orderedUuid(UUID a, UUID b) {
        return a.compareTo(b) < 0
                ? new UUID[] { a, b }
                : new UUID[] { b, a };
    }
}
