package com.gabrielfreire.sentry.repository;

import com.gabrielfreire.sentry.domain.Expense;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Expense entity.
 */
@SuppressWarnings("unused")
public interface ExpenseRepository extends JpaRepository<Expense,Long> {

    @Query("select expense from Expense expense where expense.user.login = ?#{principal.username}")
    List<Expense> findByUserIsCurrentUser();

}
