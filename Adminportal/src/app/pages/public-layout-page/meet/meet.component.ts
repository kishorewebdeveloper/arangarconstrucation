import { Component, OnInit, EventEmitter } from '@angular/core';
import {
    EventService, ImageService, LocationService,
    ScheduleService, PackageService, EventContactService,
    ModalService, CartService
} from "../../../services";
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as _ from "lodash";
import { faTrash, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';
import { CartModel } from '../../../models';

@Component({
    selector: 'app-meet',
    templateUrl: './meet.component.html',
    styleUrls: ['./meet.component.scss']
})

export class MeetComponent implements OnInit {

    faTrash = faTrash;
    faCheck = faCheck;
    faPen = faPen;

    meetToken: string;
    eventToken: string;
    message: string;
    eventId: number;
    isValidMeetToken;
    privacySetting: any;
    eventData;
    locationsData = [];
    schedulesData = [];
    eventImages: any[];
    eventPackages: any[];
    productsData = [];
    packagesData = [];
    organizerData = [];
    cartData: any[];
    cartModel = new CartModel();

    constructor(private eventService: EventService,
        private route: ActivatedRoute,
        private locationService: LocationService,
        private packageService: PackageService,
        private eventContactService: EventContactService,
        private scheduleService: ScheduleService,
        private modalService: ModalService,
        private imageService: ImageService,
        private cartService: CartService,
        private sanitizer: DomSanitizer) {

        this.route.params.subscribe(params => {
            this.meetToken = params['id'];
        });
    }

    ngOnInit(): void {
        this.eventContactService.getEventByMeetToken(this.meetToken).subscribe(data => {
            if (data) {
                this.eventToken = data.eventToken;
                this.isValidMeetToken = data.isValidMeetToken;
                if (data.isValidMeetToken === true)
                    this.getData(true);
            }
        });
    }

    getData(refresh) {
        this.getEventByEventToken(refresh);
        this.getLocationByEventToken(refresh);
        this.getScheduleByEventToken(refresh);
        this.getEventImages(refresh);
        this.getPackagesAndItems(refresh);
        this.getCartData();
    }


    getCartData() {
        this.cartData = this.cartService.load(this.getCartId());
        if (this.cartData == null)
            this.cartData = [];
    }

    getEventByEventToken(refresh) {
        this.eventService.getEventByEventToken(this.eventToken, refresh).subscribe(data => {
            if (data) {
                this.eventData = data;
                this.eventId = data.id;
                this.getEventOrganizerInformation(true);
            }
        });
    }

    getLocationByEventToken(refresh) {
        this.locationService.getLocationByEventToken(this.eventToken, refresh).subscribe(response => {
            this.locationsData = response;
        });
    }

    getScheduleByEventToken(refresh) {
        this.scheduleService.getScheduleByEventToken(this.eventToken, refresh).subscribe(response => {
            this.schedulesData = response;
        });
    }

    getEventImages(refresh) {
        this.imageService.getEventImagesForMeetByEventTokenRoute(this.eventToken, refresh).subscribe(result => {
            result.forEach(value => {
                if (value.data) {
                    const objectUrl = 'data:image/png;base64,' + value.data;
                    value.image = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                }
            });
            this.eventImages = result;
        });

    }

    getPackagesAndItems(refresh) {
        if (this.eventToken) {
            this.packageService.getPackagesAndProductItemByEventToken(this.eventToken, refresh).subscribe(response => {
                response.forEach(value => {
                    if (value.productDefaultImage) {
                        const objectUrl = 'data:image/png;base64,' + value.productDefaultImage;
                        value.image = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                    }
                });
                this.eventPackages = response;
            });
        }
    }

    getEventOrganizerInformation(refresh) {
        this.eventService.getEventOrganizerInformation(this.eventId, refresh).subscribe(response => {
            this.organizerData = response;
        });
    }


    openSendMessageModal(userId: number) {
        this.modalService.sendMessageModal(userId, "Contact  Organizer", false).result.then(result => {
            if (result) {

            }
        },
            dismiss => {

            });
    }

    checkOut(item) {
        this.cartModel.id = item.id;
        this.cartModel.name = item.name;
        this.cartModel.description = item.description;

        this.cartData.push(this.cartModel);
        this.cartService.create(this.getCartId(), this.cartData);
    }

    getCartId(): string {
        return 'CartId-' + environment.apiBaseUrl + this.meetToken;
    }
}