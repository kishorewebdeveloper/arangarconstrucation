import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService, NavigationService, UserService } from '../../../services/index';

@Component({
    selector: "app-emailverification",
    templateUrl: "./emailverification.component.html",
    styleUrls: ["./emailverification.component.scss"],
})
export class EmailVerificationComponent implements OnInit {

    public routeParams: any;

    isTermConditionChecked: boolean = false;

    id: any;
    isEmailVerified: boolean;
    isValidEmailLink: boolean;


    constructor(

        private route: ActivatedRoute,
        private navigationService: NavigationService,
        private userService: UserService,
        private alertService: AlertService,
        private router: Router) {
        this.routeParams = route.snapshot.params;
        this.id = this.routeParams.id;
    }

    ngOnInit() {
        this.userService.isValidLink(this.id).subscribe((result) => {
            this.isValidEmailLink = result as boolean;
        });
    }

    onLogin() {
        this.navigationService.goToLogin();
    }

    onEmailVerification() {
        let data = {
            "emailVerificationGuid": this.id
        }
        this.userService.verifyEmail(data).subscribe((result) => {
            if (result) {
                this.alertService.success("Your email has been verified successfully!");
                this.isEmailVerified = true;
            }
        });
    }
}
