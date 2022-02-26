import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { map } from 'rxjs/operators';

@Injectable()
export class PackageService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }


    getPackages(refresh: boolean, requestData: any) {
        const data = this.dataService.getHttpParams(requestData);
        return this.dataService.getDataWithParams(this.routeHelperService.PACKAGE.getPackagesRoute(), data, refresh);
    }

    getPackageByEventToken(eventToken: any, refresh: boolean) {
        return this.dataService.getData(this.routeHelperService.PACKAGE.getPackageByEventTokenRoute(eventToken), refresh);
    }

    getPackagesAndProductItemByEventToken(eventToken: any, refresh : boolean) {
        return this.dataService.getData(this.routeHelperService.PACKAGE.getPackagesAndProductItemsByEventTokenRoute(eventToken), refresh);
    }

    getPackage(id: number) {
        return this.dataService.getRecord(this.routeHelperService.PACKAGE.getPackageRoute(id));
    }

    savePackage(data) {
        return this.dataService.post(this.routeHelperService.PACKAGE.savePackageRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.PACKAGE.getPackagesRoute());
            this.dataService.clearRouteCache(this.routeHelperService.PACKAGE.getPackageByEventTokenRoute(data.eventToken));
            return response;
        }));

    }

    deletePackage(id: number) {
        return this.dataService.delete(this.routeHelperService.PACKAGE.deletePackageRoute(id));
    }

}