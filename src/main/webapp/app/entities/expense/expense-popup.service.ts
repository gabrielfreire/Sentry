import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Expense } from './expense.model';
import { ExpenseService } from './expense.service';
@Injectable()
export class ExpensePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private expenseService: ExpenseService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.expenseService.find(id).subscribe(expense => {
                if (expense.date) {
                    expense.date = {
                        year: expense.date.getFullYear(),
                        month: expense.date.getMonth() + 1,
                        day: expense.date.getDate()
                    };
                }
                this.expenseModalRef(component, expense);
            });
        } else {
            return this.expenseModalRef(component, new Expense());
        }
    }

    expenseModalRef(component: Component, expense: Expense): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.expense = expense;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
