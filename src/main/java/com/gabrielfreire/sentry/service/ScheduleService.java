package com.gabrielfreire.sentry.service;

import com.gabrielfreire.sentry.domain.Schedule;
import com.gabrielfreire.sentry.repository.ScheduleRepository;
import com.gabrielfreire.sentry.service.dto.ScheduleDTO;
import com.gabrielfreire.sentry.service.mapper.ScheduleMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Schedule.
 */
@Service
@Transactional
public class ScheduleService {

    private final Logger log = LoggerFactory.getLogger(ScheduleService.class);
    
    private final ScheduleRepository scheduleRepository;

    private final ScheduleMapper scheduleMapper;

    public ScheduleService(ScheduleRepository scheduleRepository, ScheduleMapper scheduleMapper) {
        this.scheduleRepository = scheduleRepository;
        this.scheduleMapper = scheduleMapper;
    }

    /**
     * Save a schedule.
     *
     * @param scheduleDTO the entity to save
     * @return the persisted entity
     */
    public ScheduleDTO save(ScheduleDTO scheduleDTO) {
        log.debug("Request to save Schedule : {}", scheduleDTO);
        Schedule schedule = scheduleMapper.scheduleDTOToSchedule(scheduleDTO);
        schedule = scheduleRepository.save(schedule);
        ScheduleDTO result = scheduleMapper.scheduleToScheduleDTO(schedule);
        return result;
    }

    /**
     *  Get all the schedules.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ScheduleDTO> findAll() {
        log.debug("Request to get all Schedules");
        List<ScheduleDTO> result = scheduleRepository.findAll().stream()
            .map(scheduleMapper::scheduleToScheduleDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one schedule by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ScheduleDTO findOne(Long id) {
        log.debug("Request to get Schedule : {}", id);
        Schedule schedule = scheduleRepository.findOne(id);
        ScheduleDTO scheduleDTO = scheduleMapper.scheduleToScheduleDTO(schedule);
        return scheduleDTO;
    }

    /**
     *  Delete the  schedule by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Schedule : {}", id);
        scheduleRepository.delete(id);
    }
}
