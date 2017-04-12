import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Schedule } from './schedule.model';
import { SchedulePopupService } from './schedule-popup.service';
import { ScheduleService } from './schedule.service';

@Component({
    selector: 'jhi-schedule-dialog',
    templateUrl: './schedule-dialog.component.html'
})
export class ScheduleDialogComponent implements OnInit {

    schedule: Schedule;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private scheduleService: ScheduleService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.schedule.id !== undefined) {
            this.scheduleService.update(this.schedule)
                .subscribe((res: Schedule) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.scheduleService.create(this.schedule)
                .subscribe((res: Schedule) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess (result: Schedule) {
        this.eventManager.broadcast({ name: 'scheduleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-schedule-popup',
    template: ''
})
export class SchedulePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private schedulePopupService: SchedulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.schedulePopupService
                    .open(ScheduleDialogComponent, params['id']);
            } else {
                this.modalRef = this.schedulePopupService
                    .open(ScheduleDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
