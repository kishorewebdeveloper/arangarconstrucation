import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { map } from 'rxjs/operators';

@Injectable()
export class ContactService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }


    getContacts(refresh : boolean) {
        return this.dataService.getData(this.routeHelperService.CONTACT.getContactsRoute(), refresh);
    }

    getContactByEventToken(eventToken: any) {
        return this.dataService.getRecord(this.routeHelperService.CONTACT.getContactByEventTokenRoute(eventToken));
    }

    getContactByEventId(eventId: number) {
        return this.dataService.getRecord(this.routeHelperService.CONTACT.getContactByEventIdRoute(eventId));
    }

    saveEventParticipant(data) {
        return this.dataService.post(this.routeHelperService.EVENTCONTACT.saveEventContactRoute(), data).pipe(map((response) => {
            return response;
        }));
    }

    getContact(id: number) {
        return this.dataService.getRecord(this.routeHelperService.CONTACT.getContactRoute(id));
    }

    saveContact(data) {
        return this.dataService.post(this.routeHelperService.CONTACT.saveContactRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.CONTACT.getContactsRoute());
            return response;
        }));

    }

    deleteContact(id: number) {
        return this.dataService.delete(this.routeHelperService.CONTACT.deleteContactRoute(id));
    }
}