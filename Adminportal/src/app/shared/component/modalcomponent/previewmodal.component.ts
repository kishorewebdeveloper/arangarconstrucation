import { Component, ViewEncapsulation, Input, } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from "../../../services/event.service";

@Component({
    templateUrl: 'previewmodal.component.html',
    styleUrls: ['./previewmodal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class PreviewModalComponent {

    @Input() public eventId: number;

    @Input() public eventData: any;
    @Input() public locationsData: any;
    @Input() public schedulesData: any;
    @Input() public eventImages: any[];
    @Input() public eventPackages: any[];
    @Input() public organizerData: any[];
    @Input() public title: string;

    ngOnInit(): void {
        this.getEventOrganizerInformation();
    }

    constructor(public activeModal: NgbActiveModal,
        private eventService: EventService) {

    }

    onConfirm(): void {
        this.activeModal.close(true);
    }

    onCancel(): void {
        this.activeModal.close(false);
    }

    getEventOrganizerInformation() {
        this.eventService.getEventOrganizerInformation(this.eventId, false).subscribe(response => {
            this.organizerData = response;
        });
    }
}
