import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NavigationService, UserService, AlertService, UtilityService } from "../../../services";

@Component({
    selector: "app-forgotpassword",
    templateUrl: "./forgotpassword.component.html",
    styleUrls: ["./forgotpassword.component.scss"],
})

export class ForgotPasswordComponent implements OnInit {

    form: FormGroup;
    eventData: any;
    isSuccess: boolean ;
    registerFormSubmitted: boolean;

    constructor(
        private navigationService: NavigationService,
        private userService: UserService,
        private utilityService: UtilityService,
        private alertService: AlertService) {
        this.initializeValidators();
    }

    ngOnInit() { }
    initializeValidators() {
        this.form = new FormGroup({
            emailAddress: new FormControl("", { validators: [Validators.required, Validators.email] }),
        });
    }

    get lf() {
        return this.form.controls;
    }

    onSubmit() {
        this.registerFormSubmitted = true;
        if (this.form.valid) {
            this.userService.forgotPassword(this.form.value).subscribe((result) => {
                this.form.reset();
                this.isSuccess = true;
            });
        } else {
            this.utilityService.validateFormControl(this.form);
        }
    }
}
