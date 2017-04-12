import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Schedule } from './schedule.model';
import { ScheduleService } from './schedule.service';
@Injectable()
export class SchedulePopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private scheduleService: ScheduleService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.scheduleService.find(id).subscribe(schedule => {
                if (schedule.eventDate) {
                    schedule.eventDate = {
                        year: schedule.eventDate.getFullYear(),
                        month: schedule.eventDate.getMonth() + 1,
                        day: schedule.eventDate.getDate()
                    };
                }
                this.scheduleModalRef(component, schedule);
            });
        } else {
            return this.scheduleModalRef(component, new Schedule());
        }
    }

    scheduleModalRef(component: Component, schedule: Schedule): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.schedule = schedule;
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
