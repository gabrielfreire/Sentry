import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SentrySharedModule } from '../../shared';
import { SentryAdminModule } from '../../admin/admin.module';

import {
    ExpenseService,
    ExpensePopupService,
    ExpenseComponent,
    ExpenseDetailComponent,
    ExpenseDialogComponent,
    ExpensePopupComponent,
    ExpenseDeletePopupComponent,
    ExpenseDeleteDialogComponent,
    expenseRoute,
    expensePopupRoute,
} from './';

let ENTITY_STATES = [
    ...expenseRoute,
    ...expensePopupRoute,
];

@NgModule({
    imports: [
        SentrySharedModule,
        SentryAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ExpenseComponent,
        ExpenseDetailComponent,
        ExpenseDialogComponent,
        ExpenseDeleteDialogComponent,
        ExpensePopupComponent,
        ExpenseDeletePopupComponent,
    ],
    entryComponents: [
        ExpenseComponent,
        ExpenseDialogComponent,
        ExpensePopupComponent,
        ExpenseDeleteDialogComponent,
        ExpenseDeletePopupComponent,
    ],
    providers: [
        ExpenseService,
        ExpensePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SentryExpenseModule {}
