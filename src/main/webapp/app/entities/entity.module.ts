import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SentryScheduleModule } from './schedule/schedule.module';
import { SentryExpenseModule } from './expense/expense.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SentryScheduleModule,
        SentryExpenseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SentryEntityModule {}
