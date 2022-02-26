import { Injectable } from "@angular/core";
import { DataService  } from "./data.service";
import { RouteHelperService  } from "./route.helper.service";
import { map } from 'rxjs/operators';


@Injectable()
export class ProjectService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    getallData(refresh: boolean, requestData: any) {
        const data = this.dataService.getHttpParams(requestData);
        return this.dataService.getDataWithParams(this.routeHelperService.PROJECTS.getallDataRoute(), data, refresh);
    }

    getById(id: number) {
        return this.dataService.getRecord(this.routeHelperService.PROJECTS.getByIDRoute(id));
    }

    save(data) {
        return this.dataService.post(this.routeHelperService.PROJECTS.saveRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.PROJECTS.getallDataRoute());
            return response;
        }));
    }

    delete(id: number) {
        return this.dataService.delete(this.routeHelperService.PROJECTS.deleteRoute(id));
    }
}
