import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { map } from 'rxjs/operators';

@Injectable()
export class EMailMessageService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    sendEmailMessage(data) {
        return this.dataService.post(this.routeHelperService.EMAILMESSAGE.sendEmailMessageRoute(), data).pipe(map((response) => {
            return response;
        }));
    }

    getEmailMessages(refresh) {
        return this.dataService.getData(this.routeHelperService.EMAILMESSAGE.getEmailMessageRoute(), refresh);
    }

    getUnReadEmailMessages(refresh) {
        return this.dataService.getData(this.routeHelperService.EMAILMESSAGE.getUnReadEmailMessageRoute(), refresh);
    }

    markAsRead(data: any) {
        return this.dataService.post(this.routeHelperService.EMAILMESSAGE.markAsReadRoute(), data);
    }

    markAllAsRead(data: any) {
        return this.dataService.post(this.routeHelperService.EMAILMESSAGE.markAllAsReadRoute(), data);
    }
}