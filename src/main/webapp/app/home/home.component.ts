import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager} from 'ng-jhipster';

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
    users: any;
    modalRef: NgbModalRef;

    constructor(
        private principal: Principal,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private userService: UserService
    ) {
        }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
            this.getUsers();
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    getUsers() {
        this.userService.query().subscribe((users) => {
            this.users = users.json();
        });
    }
}
