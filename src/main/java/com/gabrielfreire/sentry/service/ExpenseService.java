package com.gabrielfreire.sentry.service;

import com.gabrielfreire.sentry.domain.Expense;
import com.gabrielfreire.sentry.repository.ExpenseRepository;
import com.gabrielfreire.sentry.service.dto.ExpenseDTO;
import com.gabrielfreire.sentry.service.mapper.ExpenseMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Expense.
 */
@Service
@Transactional
public class ExpenseService {

    private final Logger log = LoggerFactory.getLogger(ExpenseService.class);
    
    private final ExpenseRepository expenseRepository;

    private final ExpenseMapper expenseMapper;

    public ExpenseService(ExpenseRepository expenseRepository, ExpenseMapper expenseMapper) {
        this.expenseRepository = expenseRepository;
        this.expenseMapper = expenseMapper;
    }

    /**
     * Save a expense.
     *
     * @param expenseDTO the entity to save
     * @return the persisted entity
     */
    public ExpenseDTO save(ExpenseDTO expenseDTO) {
        log.debug("Request to save Expense : {}", expenseDTO);
        Expense expense = expenseMapper.expenseDTOToExpense(expenseDTO);
        expense = expenseRepository.save(expense);
        ExpenseDTO result = expenseMapper.expenseToExpenseDTO(expense);
        return result;
    }

    /**
     *  Get all the expenses.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<ExpenseDTO> findAll() {
        log.debug("Request to get all Expenses");
        List<ExpenseDTO> result = expenseRepository.findAll().stream()
            .map(expenseMapper::expenseToExpenseDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one expense by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ExpenseDTO findOne(Long id) {
        log.debug("Request to get Expense : {}", id);
        Expense expense = expenseRepository.findOne(id);
        ExpenseDTO expenseDTO = expenseMapper.expenseToExpenseDTO(expense);
        return expenseDTO;
    }

    /**
     *  Delete the  expense by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Expense : {}", id);
        expenseRepository.delete(id);
    }
}
