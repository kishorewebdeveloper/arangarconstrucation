import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";


@Injectable()
export class LocationTypeService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }


    getLocationTypeLookUp() {
        return this.dataService.getRecord(this.routeHelperService.LOCATIONTYPE.getLocationTypeLookUpRoute());
    }
}