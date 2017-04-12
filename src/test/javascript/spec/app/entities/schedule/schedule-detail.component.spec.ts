import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { SentryTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ScheduleDetailComponent } from '../../../../../../main/webapp/app/entities/schedule/schedule-detail.component';
import { ScheduleService } from '../../../../../../main/webapp/app/entities/schedule/schedule.service';
import { Schedule } from '../../../../../../main/webapp/app/entities/schedule/schedule.model';

describe('Component Tests', () => {

    describe('Schedule Management Detail Component', () => {
        let comp: ScheduleDetailComponent;
        let fixture: ComponentFixture<ScheduleDetailComponent>;
        let service: ScheduleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SentryTestModule],
                declarations: [ScheduleDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ScheduleService,
                    EventManager
                ]
            }).overrideComponent(ScheduleDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScheduleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScheduleService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Schedule(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.schedule).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
