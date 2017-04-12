package com.gabrielfreire.sentry.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gabrielfreire.sentry.service.ExpenseService;
import com.gabrielfreire.sentry.web.rest.util.HeaderUtil;
import com.gabrielfreire.sentry.service.dto.ExpenseDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing Expense.
 */
@RestController
@RequestMapping("/api")
public class ExpenseResource {

    private final Logger log = LoggerFactory.getLogger(ExpenseResource.class);

    private static final String ENTITY_NAME = "expense";
        
    private final ExpenseService expenseService;

    public ExpenseResource(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    /**
     * POST  /expenses : Create a new expense.
     *
     * @param expenseDTO the expenseDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new expenseDTO, or with status 400 (Bad Request) if the expense has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/expenses")
    @Timed
    public ResponseEntity<ExpenseDTO> createExpense(@RequestBody ExpenseDTO expenseDTO) throws URISyntaxException {
        log.debug("REST request to save Expense : {}", expenseDTO);
        if (expenseDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new expense cannot already have an ID")).body(null);
        }
        ExpenseDTO result = expenseService.save(expenseDTO);
        return ResponseEntity.created(new URI("/api/expenses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /expenses : Updates an existing expense.
     *
     * @param expenseDTO the expenseDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated expenseDTO,
     * or with status 400 (Bad Request) if the expenseDTO is not valid,
     * or with status 500 (Internal Server Error) if the expenseDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/expenses")
    @Timed
    public ResponseEntity<ExpenseDTO> updateExpense(@RequestBody ExpenseDTO expenseDTO) throws URISyntaxException {
        log.debug("REST request to update Expense : {}", expenseDTO);
        if (expenseDTO.getId() == null) {
            return createExpense(expenseDTO);
        }
        ExpenseDTO result = expenseService.save(expenseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, expenseDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /expenses : get all the expenses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of expenses in body
     */
    @GetMapping("/expenses")
    @Timed
    public List<ExpenseDTO> getAllExpenses() {
        log.debug("REST request to get all Expenses");
        return expenseService.findAll();
    }

    /**
     * GET  /expenses/:id : get the "id" expense.
     *
     * @param id the id of the expenseDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the expenseDTO, or with status 404 (Not Found)
     */
    @GetMapping("/expenses/{id}")
    @Timed
    public ResponseEntity<ExpenseDTO> getExpense(@PathVariable Long id) {
        log.debug("REST request to get Expense : {}", id);
        ExpenseDTO expenseDTO = expenseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(expenseDTO));
    }

    /**
     * DELETE  /expenses/:id : delete the "id" expense.
     *
     * @param id the id of the expenseDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/expenses/{id}")
    @Timed
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        log.debug("REST request to delete Expense : {}", id);
        expenseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
