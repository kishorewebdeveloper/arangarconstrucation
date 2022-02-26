import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, ViewEncapsulation, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from "../../../services/alert.service";
import { UtilityService } from "../../../services/utility.service";
import { EMailMessageService } from "../../../services/emailmessage.service";


@Component({
    // selector: 'app-privacyModal',
    templateUrl: 'sendmessagemodal.component.html',
    styleUrls: ['sendmessagemodal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class SendMessageModalComponent {

    isFormSubmitted = false;
    form: FormGroup;

    @Input() public userId: number;
    @Input() public title: string;
  

    constructor(private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private utilityService: UtilityService,
        private emailMessageService: EMailMessageService,
        private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.initializeValidators();
    }

    get lf() {
        return this.form.controls;
    }

    initializeValidators() {
        this.form = this.formBuilder.group({
            id: [0, [Validators.required]],
            fromEmailAddress: ["", [Validators.required, Validators.email]],
            firstName: ["", [Validators.required, Validators.maxLength(50)]],
            lastName: ["", [Validators.required, Validators.maxLength(50)]],
            message: ["", [Validators.required, Validators.maxLength(50000)]],
            userId: [this.userId, [Validators.required]],
        });
    }

    onCancel(): void {
        this.activeModal.close(false);
    }

    onSave() {
        this.isFormSubmitted = true;
        if (this.form.valid) {
            this.emailMessageService.sendEmailMessage(this.form.value).subscribe(response => {
                this.alertService.success("Message send to organizer");
                this.activeModal.close(true);
            });
        }
        else {
            this.utilityService.validateFormControl(this.form);
        }
    }
}