import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators, FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";


import { AuthenticationService, AlertService, UtilityService, UserService, NavigationService } from "../../../services/index";


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})

export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    returnUrl: string;
    registerFormSubmitted = false;


    constructor(private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthenticationService,
        private utilityService: UtilityService,
        private userService: UserService,
        private navigationService: NavigationService,
        private alertService: AlertService) {
        this.router = router;
    }

    ngOnInit() {
        this.authService.logOut();
        this.initializeValidators();

    }

    initializeValidators() {
        this.registerForm = this.formBuilder.group({
            id: [0, [Validators.required]],
            emailAddress: new FormControl('', { validators: [Validators.required, Validators.email] }),
            firstName: ["", [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
            lastName: ["", [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
            password: new FormControl({ value: null }, [Validators.required, Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,25})")]),
            confirmPassword: new FormControl({ value: null }, [Validators.required, confirmPasswordValidator]),
            mobileNumber: ["", { validators: [Validators.required, Validators.pattern("[0-9]*")] }],
            roleType: [1],
            isTermsChecked: ["", { validators: [Validators.required] }],
        });
    }

    get lf() {
        return this.registerForm.controls;
    }

    onRegister() {
        this.registerFormSubmitted = true;
        if (this.registerForm.valid) {
            let userData = this.registerForm.value;
            userData.isFromRegistrationPage = true;

            this.userService.saveUser(userData).subscribe((result) => {
                if (result) {
                    this.alertService.success("A verification link has been sent to your email account");
                    this.navigationService.goToLogin();
                }
            });
        }
        else {
            this.utilityService.validateFormControl(this.registerForm);
        }
    }
}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('confirmPassword');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { 'passwordsNotMatching': true };
};