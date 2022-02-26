import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
    UtilityService, ModalService,
    ContactService, AlertService, NavigationService
} from "../../../services/index"

import { Observable, of } from 'rxjs';
import * as _ from "lodash";

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

    heading = '';
    subheading = '';
    icon = 'pe-7s-users icon-gradient bg-mean-fruit';

    isFormSubmitted = false;
    private id: number;
    eventToken: string;
    isOnEventContact = false;
    form: FormGroup;


    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private modalService: ModalService,
        private alertService: AlertService,
        private navigationService: NavigationService,
        private contactService: ContactService,
        private utilityService: UtilityService) {


        this.isOnEventContact = this.navigationService.isOnEventConatct();

        if (!_.isEmpty(this.route.snapshot.queryParams)) {
            this.route.queryParamMap.subscribe((params: any) => {
                this.eventToken = params.params.token;
            });
        }

        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        if (this.id === 0) {
            this.heading = this.isOnEventContact ? 'Create Event Contact' : 'Create Contact';
        } else {
            this.heading = this.isOnEventContact ? 'Edit Event Contact' : 'Edit Contact';
        }
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.form.dirty) {
            return this.modalService.questionModal("Discard Confirmation", 'Are you sure you want to discard your changes?', false)
                .result.then(result => {
                    if (result)
                        return true;
                    else
                        return false;
                }, () => false);
        }
        return of(true);
    }

    ngOnInit(): void {
        this.initializeValidators();
        this.getContact();
    }


    get lf() {
        return this.form.controls;
    }

    initializeValidators() {
        this.form = this.formBuilder.group({
            id: [0, [Validators.required]],
            firstName: ["", [Validators.required, Validators.maxLength(50)]],
            lastName: ["", [Validators.required, Validators.maxLength(50)]],
            emailAddress: ["", [Validators.required, Validators.email]],

        });
    }

    getContact() {
        if (this.id > 0) {
            this.contactService.getContact(this.id).subscribe(data => {
                this.form.patchValue(data);
            });
        }
    }

    saveContact() {
        this.isFormSubmitted = true;
        if (this.form.valid) {
            let data = this.form.value;
            data.eventToken = this.eventToken;
            data.addEventContact = this.isOnEventContact;

            this.contactService.saveContact(this.form.value).subscribe(response => {
                let msg = this.id > 0 ? 'Contact updated successfully' : 'Contact added successfully';
                this.form.reset();
                this.alertService.success(msg);
                this.navigationService.goToBack();
            });

        }
        else {
            this.utilityService.validateFormControl(this.form);
        }
    }

    cancel() {
        this.navigationService.goToBack();
    }

}
