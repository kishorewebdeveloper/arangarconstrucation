import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, ViewChild, ChangeDetectorRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from "../../../services/location.service";
import { AlertService } from "../../../services/alert.service";
import { UtilityService } from "../../../services/utility.service";
import { EventService } from "../../../services/event.service";
import { NgModule } from '@angular/core';

@Component({
    // selector: 'app-privacyModal',
    templateUrl: 'privacymodal.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class PrivacyModalComponent {
   

    form: FormGroup;

    @Input() public id: number;
    @Input() public privacyType: number;
    @Input() public title: string;

    privacyTypeList: any[] = [
        { "key": 1, "value": "Private" },
        { "key": 2, "value": "Public" },
        { "key": 3, "value": "Invite Only" }
    ];


    constructor(private formBuilder: FormBuilder,
        public activeModal: NgbActiveModal,
        private utilityService: UtilityService,
        private eventService: EventService,
        private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.initializeValidators();

        setTimeout(() => {
            this.isDefaultPrivacyType();
        });
    }

    initializeValidators() {
        this.form = this.formBuilder.group({
            id: [this.id, [Validators.required]],
            privacyType: [this.privacyType]
        });
    }

    isDefaultPrivacyType() {
        for (let i = 0; i < this.privacyTypeList.length; i++) {
            if (this.privacyTypeList[i].key === this.privacyType) {
                this.privacyTypeList[i].isSelected = true;
                break;
            }
        }
    }


    onCancel(): void {
        this.activeModal.close(false);
    }

    onSave() {
        if (this.form.valid) {
            this.eventService.saveEventPrivacy(this.form.value).subscribe(response => {
                this.alertService.success("Event privacy setting updated Successfully");
                this.activeModal.close(true);
            });
        }
        else {
            this.utilityService.validateFormControl(this.form);
        }
    }
}