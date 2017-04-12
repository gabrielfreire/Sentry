package com.gabrielfreire.sentry.service.mapper;

import com.gabrielfreire.sentry.domain.*;
import com.gabrielfreire.sentry.service.dto.ScheduleDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Schedule and its DTO ScheduleDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ScheduleMapper {

    ScheduleDTO scheduleToScheduleDTO(Schedule schedule);

    List<ScheduleDTO> schedulesToScheduleDTOs(List<Schedule> schedules);

    Schedule scheduleDTOToSchedule(ScheduleDTO scheduleDTO);

    List<Schedule> scheduleDTOsToSchedules(List<ScheduleDTO> scheduleDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Schedule scheduleFromId(Long id) {
        if (id == null) {
            return null;
        }
        Schedule schedule = new Schedule();
        schedule.setId(id);
        return schedule;
    }
    

}
