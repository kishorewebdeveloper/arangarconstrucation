import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationModalComponent } from "../shared/component/modalcomponent/confirmationmodal.component";
import { GenericMessageModalComponent } from "../shared/component/modalcomponent/genericmessagemodal.component";
import { LocationModalComponent } from "../shared/component/modalcomponent/locationmodal.component";
import { ContactModalComponent } from "../shared/component/modalcomponent/contactmodal.component";
import { PackageItemModalComponent } from "../shared/component/modalcomponent/packageitemmodal.component";
import { PrivacyModalComponent } from "../shared/component/modalcomponent/privacymodal.component";
import { PreviewModalComponent } from "../shared/component/modalcomponent/previewmodal.component";
import { SendMessageModalComponent } from "../shared/component/modalcomponent/sendmessagemodal.component";
import { ImageUploadModalComponent } from "../shared/component/modalcomponent/imageuploadmodal.component";


@Injectable()
export class ModalService {

    constructor(private modalService: NgbModal) {
    }

    messageModal(title: string, message: string, backdrop = true) {
        const modalRef = this.modalService.open(GenericMessageModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static'
            }
        );

        modalRef.componentInstance.title = title;
        modalRef.componentInstance.body = message;
        return modalRef;
    }

    questionModal(title: string, message: string, backdrop = true) {
        const modalRef = this.modalService.open(ConfirmationModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static'
            }
        );
        modalRef.componentInstance.title = title;
        modalRef.componentInstance.body = message;
        return modalRef;
    }

    imageModal(id: number, type: string, title: string, backdrop = true) {
        const modalRef = this.modalService.open(ImageUploadModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static',
                size: 'lg'
            }
        );
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.type = type;
        modalRef.componentInstance.title = title;
        return modalRef;
    }


    locationModal(id: number, title: string, backdrop = true) {
        const modalRef = this.modalService.open(LocationModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static',
                size: 'lg'
            }
        );
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.title = title;
        return modalRef;
    }

    contactModal(id: number, eventId: number, title: string, backdrop = true) {
        const modalRef = this.modalService.open(ContactModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static',
                size: 'lg'
            }
        );
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.eventId = eventId;
        modalRef.componentInstance.title = title;
        return modalRef;
    }

    privacyModal(id: number, privacyType: number, title: string, backdrop = true) {
        const modalRef = this.modalService.open(PrivacyModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static',
                size: 'lg'
            }
        );
        modalRef.componentInstance.id = id;
        modalRef.componentInstance.privacyType = privacyType;
        modalRef.componentInstance.title = title;
        return modalRef;
    }

    packageItemModal(packageId: number, title: string, backdrop = true) {
        const modalRef = this.modalService.open(PackageItemModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static',
                size: 'lg'
            }
        );
        modalRef.componentInstance.packageId = packageId;
        modalRef.componentInstance.title = title;
        return modalRef;
    }

    previewModal(eventId: number, eventData: any, locationsData: any, schedulesData: any, eventImages: any[], eventPackages: any[], title: string, backdrop = true) {
        const modalRef = this.modalService.open(PreviewModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static',
                size: 'xl'
            }
        );
        modalRef.componentInstance.eventId = eventId;
        modalRef.componentInstance.eventData = eventData;
        modalRef.componentInstance.locationsData = locationsData;
        modalRef.componentInstance.schedulesData = schedulesData;
        modalRef.componentInstance.eventImages = eventImages;
        modalRef.componentInstance.eventPackages = eventPackages;
        modalRef.componentInstance.title = title;
        return modalRef;
    }

    sendMessageModal(userId: number, title: string, backdrop = true) {
        const modalRef = this.modalService.open(SendMessageModalComponent,
            {
                scrollable: true,
                keyboard: true,
                backdrop: backdrop ? backdrop : 'static',
                size: 'lg'
            }
        );

        modalRef.componentInstance.userId = userId;
        modalRef.componentInstance.title = title;
        return modalRef;
    }

}