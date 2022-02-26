import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { map } from 'rxjs/operators';

@Injectable()
export class EventService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }


    getEvents(refresh: boolean) {
        return this.dataService.getData(this.routeHelperService.EVENT.getEventsRoute(), refresh);
    }

    getEvent(id: number) {
        return this.dataService.getRecord(this.routeHelperService.EVENT.getEventRoute(id));
    }

    getEventOrganizerInformation(id: number, refresh: boolean) {
        return this.dataService.getData(this.routeHelperService.EVENT.getEventOrganizerInformationRoute(id), refresh);
    }

    getEventByEventToken(eventToken, refresh: boolean) {
        return this.dataService.getData(this.routeHelperService.EVENT.getEventByEventTokenRoute(eventToken), refresh);
    }

    getEventMetaData(eventToken, refresh: boolean) {
        return this.dataService.getData(this.routeHelperService.EVENT.getEventMetaDataRoute(eventToken), refresh);
    }

    saveEvent(data) {
        return this.dataService.post(this.routeHelperService.EVENT.saveEventRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.EVENT.getEventsRoute());
            this.dataService.clearRouteCache(this.routeHelperService.EVENT.getEventMetaDataRoute(data.eventToken));
            return response;
        }));
    }

    saveEventPrivacy(data) {
        return this.dataService.post(this.routeHelperService.EVENT.saveEventPrivacyRoute(), data).pipe(map((response) => {
            return response;
        }));
    }

    deleteEvent(id: number) {
        return this.dataService.delete(this.routeHelperService.EVENT.deleteEventRoute(id));
    }

}