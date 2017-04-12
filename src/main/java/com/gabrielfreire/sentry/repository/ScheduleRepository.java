package com.gabrielfreire.sentry.repository;

import com.gabrielfreire.sentry.domain.Schedule;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Schedule entity.
 */
@SuppressWarnings("unused")
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {

}
