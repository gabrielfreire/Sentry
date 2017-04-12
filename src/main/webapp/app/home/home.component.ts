import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager} from 'ng-jhipster';
import { ScheduleService } from '../entities/schedule/';
import { ExpenseService } from '../entities/expense/';

import { Account, LoginModalService, Principal, UserService } from '../shared';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.css'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    users: any[];
    schedules: any[];
    expenses: any[];
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private userService: UserService,
        private scheduleService: ScheduleService,
        private expenseService: ExpenseService
    ) {
        }

    ngOnInit() {
        this.getAccount();
        this.getUsers();
        this.getSchedules();
        this.getExpenses();
        this.registerAuthenticationSuccess();
        this.registerScheduleListModification();
        this.registerExpenseListModification();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
            this.getUsers();
        });
    }

    registerScheduleListModification() {
        this.eventManager.subscribe('scheduleListModification', (message) => {
            this.getSchedules();
        });
    }
    registerExpenseListModification() {
        this.eventManager.subscribe('expenseListModification', (message) => {
            this.getExpenses();
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getExpenses() {
        this.expenseService.query().subscribe((expenses) => {
            this.expenses = expenses.json();
        });
    }

    getSchedules() {
        this.scheduleService.query().subscribe((shedules) => {
            this.schedules = shedules.json();
        });
    }

    getUsers() {
        this.userService.query().subscribe((users) => {
            this.users = users.json();
        });
    }

    getAccount() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }
}
