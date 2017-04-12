import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager   } from 'ng-jhipster';

import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';

@Component({
    selector: 'jhi-expense-detail',
    templateUrl: './expense-detail.component.html'
})
export class ExpenseDetailComponent implements OnInit, OnDestroy {

    expense: Expense;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private expenseService: ExpenseService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInExpenses();
    }

    load (id) {
        this.expenseService.find(id).subscribe(expense => {
            this.expense = expense;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExpenses() {
        this.eventSubscriber = this.eventManager.subscribe('expenseListModification', response => this.load(this.expense.id));
    }

}
