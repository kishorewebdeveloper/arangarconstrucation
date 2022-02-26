import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService, AlertService, NavigationService, UtilityService } from "../../../services";

@Component({
    selector: "app-resetpassword",
    templateUrl: "./resetpassword.component.html",
    styleUrls: ["./resetpassword.component.scss"],
})

export class ResetPasswordComponent implements OnInit {

    public routeParams: any;
    form: FormGroup;
    isTermConditionChecked: boolean = false;
    resetPasswordFormSubmitted: boolean;
    id: any;
    isShowLogIn: boolean;
    isValidLink: boolean = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private utilityService: UtilityService) {
        this.routeParams = route.snapshot.params;
        this.id = this.routeParams.id;
        this.initializeValidators();
    }

    ngOnInit() {
        if (this.id) {
            this.getResetPasswordId();
        }
    }

    initializeValidators() {
        this.form = this.formBuilder.group({
            password: ["", [Validators.required]],
            confirmPassword: ["", [Validators.required]],
            tokenGuid: [null],
            emailAddress: [null],
        });
    }


    get lf() {
        return this.form.controls;
    }

    getResetPasswordId() {
        this.userService.getResetPasswordId(this.id).subscribe((result) => {
            if (result) {
                this.isValidLink = true;
                this.form.controls['tokenGuid'].setValue(result.lostPasswordRequestToken);
                this.form.controls['emailAddress'].setValue(result.emailAddress);
            } else {
                this.isValidLink = false;
            }
        });
    }

    onSave() {
        this.resetPasswordFormSubmitted = true;
        if (this.form.valid) {

            this.userService.resetPassword(this.form.value).subscribe((result) => {
                this.isShowLogIn = true;
                this.alertService.success("Your password has been reset successfully");
            });
        } else {
            this.utilityService.validateFormControl(this.form);
        }
    }
}
