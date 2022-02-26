import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { map } from 'rxjs/operators';

@Injectable()
export class EventContactService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }


    saveEventContacts(data) {
        return this.dataService.post(this.routeHelperService.EVENTCONTACT.saveEventContactRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.CONTACT.getContactsRoute());
            return response;
        }));
    }

    deleteEventContact(id: number) {
      return this.dataService.delete(this.routeHelperService.EVENTCONTACT.deleteEventContactRoute(id));
    }

    getEventByMeetToken(meetToken) {
        
        return this.dataService.getRecord(this.routeHelperService.EVENTCONTACT.getEventByMeetTokenRoute(meetToken));
    }
}