import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, AlertService } from 'ng-jhipster';

import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-expense',
    templateUrl: './expense.component.html'
})
export class ExpenseComponent implements OnInit, OnDestroy {
expenses: Expense[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private expenseService: ExpenseService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.expenseService.query().subscribe(
            (res: Response) => {
                this.expenses = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExpenses();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Expense) {
        return item.id;
    }



    registerChangeInExpenses() {
        this.eventSubscriber = this.eventManager.subscribe('expenseListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
