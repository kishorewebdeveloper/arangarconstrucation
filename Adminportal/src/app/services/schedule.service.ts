import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { map } from 'rxjs/operators';


@Injectable()
export class ScheduleService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    getSchedules(requestData: any) {
        const data = this.dataService.getHttpParams(requestData);
        return this.dataService.getRecordWithParams(this.routeHelperService.SCHEDULE.getSchedulesRoute(), data);
    }

    getSchedule(id: number) {
        return this.dataService.getRecord(this.routeHelperService.SCHEDULE.getScheduleRoute(id));
    }

    getScheduleByEventToken(eventToken: any, refresh: boolean) {
        return this.dataService.getData(this.routeHelperService.SCHEDULE.getScheduleByEventTokenRoute(eventToken), refresh);
    }

    saveSchedule(data) {
        return this.dataService.post(this.routeHelperService.SCHEDULE.saveScheduleRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.SCHEDULE.getSchedulesRoute());
            return response;
        }));
    }

    saveEventSchedule(data) {
        return this.dataService.post(this.routeHelperService.EVENTSCHEDULE.saveEventScheduleRoute(), data).pipe(map((response) => {
            return response;
        }));
    }

    deleteSchedule(id: number) {
        return this.dataService.delete(this.routeHelperService.SCHEDULE.deleteScheduleRoute(id));
    }

    deleteEventSchedule(id: number) {
        return this.dataService.delete(this.routeHelperService.EVENTSCHEDULE.deleteEventScheduleRoute(id));
    }
}
