package com.rs.planner.activities;

import java.time.LocalDateTime;
import java.util.UUID;

public record ActivityData (UUID activity_id, String title, LocalDateTime occurs_at){
}