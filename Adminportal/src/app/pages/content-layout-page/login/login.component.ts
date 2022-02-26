import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxPermissionsService } from 'ngx-permissions';

import { AuthenticationService, SessionService, UtilityService, SignalRService } from "../../../services/index";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})

export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    returnUrl: string;
    loginFormSubmitted = false;


    constructor(private router: Router,
        private authService: AuthenticationService,
        private utilityService: UtilityService,
        private sessionService: SessionService,
        private signalRService: SignalRService,
        private permissionsService: NgxPermissionsService,
        private route: ActivatedRoute) {
        this.router = router;
    }

    ngOnInit() {
        this.authService.logOut();
        this.initializeValidators();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    initializeValidators() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }
    

    get lf() {
        return this.loginForm.controls;
    }

    onLogin() {
        this.loginFormSubmitted = true;
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(() => {
                this.signalRService.initiateSignalRConnection();
                this.loadPermissions(this.sessionService.roleName());
                this.router.navigate([this.returnUrl]);
            });
        } else {
            this.utilityService.validateFormControl(this.loginForm);
        }
    }

    loadPermissions(roleName: string) {
        let permissions = [];
        permissions.push(roleName);
        this.permissionsService.loadPermissions(permissions);
    }
}