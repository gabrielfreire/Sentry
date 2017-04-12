import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SentrySharedModule } from '../../shared';

import {
    ScheduleService,
    SchedulePopupService,
    ScheduleComponent,
    ScheduleDetailComponent,
    ScheduleDialogComponent,
    SchedulePopupComponent,
    ScheduleDeletePopupComponent,
    ScheduleDeleteDialogComponent,
    scheduleRoute,
    schedulePopupRoute,
} from './';

let ENTITY_STATES = [
    ...scheduleRoute,
    ...schedulePopupRoute,
];

@NgModule({
    imports: [
        SentrySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ScheduleComponent,
        ScheduleDetailComponent,
        ScheduleDialogComponent,
        ScheduleDeleteDialogComponent,
        SchedulePopupComponent,
        ScheduleDeletePopupComponent,
    ],
    entryComponents: [
        ScheduleComponent,
        ScheduleDialogComponent,
        SchedulePopupComponent,
        ScheduleDeleteDialogComponent,
        ScheduleDeletePopupComponent,
    ],
    providers: [
        ScheduleService,
        SchedulePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SentryScheduleModule {}
