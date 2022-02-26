import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
    ColumnMode,
    DatatableComponent
} from '@swimlane/ngx-datatable';
import { ActivatedRoute } from '@angular/router';
import {
    NavigationService, ModalService, ContactService,
    AlertService, UtilityService, EventService, EventContactService
} from "../../../services";
import * as _ from "lodash";

import { EventModel } from "../../../models/index"

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    ColumnMode = ColumnMode;
    eventData: EventModel;
    eventToken: string;
    rows = [];
    private dataSource = [];
    contactsData = [];
   
    heading = 'Contacts';
    addButtonText = '';
    subheading = "";

    icon = 'pe-7s-users icon-gradient bg-mean-fruit';
    columns: string[] = [];

    isOnEventParticipant = false;

    constructor(private navigationService: NavigationService,
        private route: ActivatedRoute,
        private modalService: ModalService,
        private contactService: ContactService,
        private eventContactService: EventContactService,
        private eventService: EventService,
        private alertService: AlertService,
        private utilityService: UtilityService,
        private changeDetectorRef: ChangeDetectorRef) {

        this.isOnEventParticipant = this.navigationService.isOnEventParticipant();

        if (!_.isEmpty(this.route.snapshot.queryParams)) {
            this.route.queryParamMap.subscribe((params: any) => {
                this.eventToken = params.params.token;
            });
        }

        setTimeout(() => {
            this.getEventMetaData();
        });
    }

    ngOnInit(): void {
        this.getData(false);
    }

    getData(refresh) {
        if (this.isOnEventParticipant) {
            this.heading = 'Email Invitation';
            this.addButtonText = 'Send Invite';
            this.getEventParticipants();

        } else {
            this.heading = 'Contacts';
            this.addButtonText = 'Add Contact';
            this.getContacts(refresh);
        }
    }

    refreshClicked() {
        this.getData(true);
    }

    filter(event) {
        const filter = event.target.value.toLowerCase();
        this.rows = this.utilityService.filter(filter, this.dataSource, this.columns);
        this.table.offset = 0;
    }

    getContacts(refresh) {
        this.contactService.getContacts(refresh).subscribe(response => {
            this.dataSource = response;
            this.rows = response;
            if (this.rows.length > 0)
                this.columns = Object.keys(this.rows[0]);
            this.changeDetectorRef.detectChanges();
        });
    }

    getEventParticipants() {
        this.contactService.getContactByEventToken(this.eventToken).subscribe(response => {
            this.contactsData = response;
            this.rows = response;
          
            if (this.rows.length > 0)
                this.columns = Object.keys(this.rows[0]);
            this.changeDetectorRef.detectChanges();
        });


    }

    onNewClicked() {
        if (this.isOnEventParticipant) {
            this.openContactModal();
            //this.navigationService.goToEventParticipant(0);
        }
        else
            this.navigationService.goToContact(0);

    }

    openContactModal() {
        this.modalService.contactModal(0, this.eventData.id, "Contacts", false).result.then(result => {
                if (result) {
                    this.getData(true);
                }
            },
            dismiss => {

            });
    }

    onEdit(data: any) {
        if (this.isOnEventParticipant)
            this.navigationService.goToEventParticipant(data.id);
        else
            this.navigationService.goToContact(data.id);
    }

    onDelete(data: any) {
        if (this.isOnEventParticipant) {
            this.modalService
                .questionModal("Delete Confirmation", 'Are you sure you want to delete this Participant ' + data.fullName + '?' , true)
                .result.then(result => {
                    if (result) {

                        this.eventContactService.deleteEventContact(data.eventContactId).subscribe(users => {
                            this.alertService.success("Participant deleted successfully");
                            this.getEventParticipants();
                        });
                    }
                },
                    dismiss => {
                        console.log(dismiss);
                    });

        }
        else {
            return this.modalService.questionModal("Delete Confirmation", 'Are you sure you want to delete the Contact ' + data.fullName + '?', true)
                .result.then(result => {
                    if (result) {
                        this.contactService.deleteContact(data.id).subscribe(response => {
                            this.alertService.success("Contact deleted successfully");
                            this.getContacts(true);
                        });
                    }
                }, () => false);
        }
    }



    getEventMetaData() {
        this.eventService.getEventMetaData(this.eventToken, false).subscribe(response => {
            this.eventData = response;
        });
    }

}
