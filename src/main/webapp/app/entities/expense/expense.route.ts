import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ExpenseComponent } from './expense.component';
import { ExpenseDetailComponent } from './expense-detail.component';
import { ExpensePopupComponent } from './expense-dialog.component';
import { ExpenseDeletePopupComponent } from './expense-delete-dialog.component';

import { Principal } from '../../shared';


export const expenseRoute: Routes = [
  {
    path: 'expense',
    component: ExpenseComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'expense/:id',
    component: ExpenseDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const expensePopupRoute: Routes = [
  {
    path: 'expense-new',
    component: ExpensePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'expense/:id/edit',
    component: ExpensePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'expense/:id/delete',
    component: ExpenseDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Expenses'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
