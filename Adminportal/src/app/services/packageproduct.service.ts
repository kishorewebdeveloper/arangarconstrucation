import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { map } from 'rxjs/operators';

@Injectable()
export class PackageProductService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    savePackageProduct(data) {
        return this.dataService.post(this.routeHelperService.PACKAGEPRODUCT.savePackageProductRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.PACKAGE.getPackagesRoute());
            return response;
        }));
    }

    getPackageProductByPackageId(refresh: boolean, packageId: number) {
        return this.dataService.getData(this.routeHelperService.PACKAGEPRODUCT.getPackagePackageByPackageIdRoute(packageId), refresh);
    }

    getPackageProduct(packageId: number) {
        return this.dataService.getRecord(this.routeHelperService.PACKAGEPRODUCT.getPackagePackage(packageId));
    }

    deleteProductPackage(id: number) {
        return this.dataService.delete(this.routeHelperService.PACKAGEPRODUCT.deletePackageProductRoute(id));
    }

}