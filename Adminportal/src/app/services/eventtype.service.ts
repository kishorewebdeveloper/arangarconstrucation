import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";


@Injectable()
export class EventTypeService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }


    getEventTypeLookUp() {
        return this.dataService.getRecord(this.routeHelperService.EVENTTYPE.getEventTypeLookUpRoute());
    }
}