import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { map } from 'rxjs/operators';

@Injectable()
export class LocationService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }


    getLocations(requestData: any, refresh: boolean) {
        const data = this.dataService.getHttpParams(requestData);
        return this.dataService.getDataWithParams(this.routeHelperService.LOCATION.getLocationsRoute(), data, refresh);
    }

    getLocationByEventToken(eventToken: any, refresh: boolean) {
        return this.dataService.getData(this.routeHelperService.LOCATION.getLocationByEventTokenRoute(eventToken), refresh);
    }

   

    getLocation(id: number) {
        return this.dataService.getRecord(this.routeHelperService.LOCATION.getLocationRoute(id));
    }

    saveLocation(data) {
        return this.dataService.post(this.routeHelperService.LOCATION.saveLocationRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.LOCATION.getLocationsRoute());
            return response;
        }));

    }

    saveEventLocation(data) {
        return this.dataService.post(this.routeHelperService.EVENTLOCATION.saveEventLocationRoute(), data).pipe(map((response) => {
            return response;
        }));
    }

    

    deleteLocation(id: number) {
        return this.dataService.delete(this.routeHelperService.LOCATION.deleteLocationRoute(id));
    }

    deleteEventLocation(id: number) {
        return this.dataService.delete(this.routeHelperService.EVENTLOCATION.deleteEventLocationRoute(id));
    }
}