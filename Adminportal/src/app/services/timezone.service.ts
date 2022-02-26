import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";


@Injectable()
export class TimeZoneService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }


    getTimeZoneLookUp() {
        return this.dataService.getRecord(this.routeHelperService.TIMEZONE.getTimeZoneLookUpRoute());
    }
}