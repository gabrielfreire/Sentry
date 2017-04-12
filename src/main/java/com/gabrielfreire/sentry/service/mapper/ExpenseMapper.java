package com.gabrielfreire.sentry.service.mapper;

import com.gabrielfreire.sentry.domain.*;
import com.gabrielfreire.sentry.service.dto.ExpenseDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Expense and its DTO ExpenseDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface ExpenseMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "user.login", target = "userLogin")
    ExpenseDTO expenseToExpenseDTO(Expense expense);

    List<ExpenseDTO> expensesToExpenseDTOs(List<Expense> expenses);

    @Mapping(source = "userId", target = "user")
    Expense expenseDTOToExpense(ExpenseDTO expenseDTO);

    List<Expense> expenseDTOsToExpenses(List<ExpenseDTO> expenseDTOs);
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Expense expenseFromId(Long id) {
        if (id == null) {
            return null;
        }
        Expense expense = new Expense();
        expense.setId(id);
        return expense;
    }
    

}
