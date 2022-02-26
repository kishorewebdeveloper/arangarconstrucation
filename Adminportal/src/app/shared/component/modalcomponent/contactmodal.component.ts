import { Component, ViewChild, ChangeDetectorRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContactService } from "../../../services/contact.service";
import { EventContactService } from "../../../services/eventcontact.service";
import { AlertService } from "../../../services/alert.service";
import { NavigationService } from "../../../services/navigation.service";

import {
    ColumnMode,
    DatatableComponent
} from '@swimlane/ngx-datatable';


@Component({
    templateUrl: 'contactmodal.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ContactModalComponent {

    selected: any[] = [];
    
    @Input() public id: number;
    @Input() public eventId: number;
    @Input() public title: string;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    ColumnMode = ColumnMode;
    rows = [];
    private dataSource = [];
    columns: string[] = [];
    itemid : number;

    constructor(public activeModal: NgbActiveModal,
        private contactService: ContactService,
        private eventContactService: EventContactService,
        private alertService: AlertService,
        private navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef) {

    }


    ngOnInit(): void {
        this.getContacts();
    }


    onContactAdd() {
        this.activeModal.close(false);
        this.navigationService.goToContact(0);
    }


    onConfirm(): void {
        if (this.selected.length !== 0) {
            var data = this.getDataForPost();
            this.eventContactService.saveEventContacts(data).subscribe(response => {
                this.alertService.success("Participant Added Successfully");
                this.activeModal.close(true);
            });

        } else {
            this.alertService.warning("Please select a Contact");
        }
    }

    getDataForPost() {
        let data = [];

        this.selected.forEach(value => {
            let productPackage = {
                "id": 0,
                "contactId": value.id,
                "eventId": this.eventId,
            }
            data.push(productPackage);
        });
        return data;
    }

    onCancel(): void {
        this.activeModal.close(false);
    }

    onRefresh() {
        this.getContacts();
    }

    getContacts() {
        this.contactService.getContactByEventId(this.eventId).subscribe(response => {
            this.dataSource = response;
            
            this.rows = response;
            if (this.rows.length > 0)
                this.columns = Object.keys(this.rows[0]);
            this.changeDetectorRef.detectChanges();
        });
    }

    onCheckboxChange(event: any, row: any): void {
        if (this.getChecked(row) === false) {
            // add
            this.selected.push(row);
        } else {
            // remove
            for (let i = 0; i < this.selected.length; i++) {
                if (this.selected[i].id === row.id) {
                    this.selected.splice(i, 1);
                    break;
                }
            }
        }
    }

    getChecked(row: any): boolean {
        let item = this.selected.filter((e) => e.id === row.id);
        return item.length > 0;
    }
}
