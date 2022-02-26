import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ProductCategoryService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    getProductCategories(refresh: boolean): Observable<any[]> {
        return this.dataService.getData(this.routeHelperService.PRODUCTCATEGORY.getProductCategoriesRoute(), refresh);
    }

    getProductCategory(id: number) {
        return this.dataService.getRecord(this.routeHelperService.PRODUCTCATEGORY.getProductCategoryRoute(id));
    }

    getProductCategoryLookUp() {
        return this.dataService.getRecord(this.routeHelperService.PRODUCTCATEGORY.getProductCategoryLookUpRoute());
    }

    saveProductCategory(user: any) {
        return this.dataService.post(this.routeHelperService.PRODUCTCATEGORY.saveProductCategoryRoute(), user).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.PRODUCTCATEGORY.getProductCategoriesRoute());
            return response;
        }));
    }

    deleteProductCategory(id: number) {
        return this.dataService.delete(this.routeHelperService.PRODUCTCATEGORY.deleteProductCategoryRoute(id));
    }
}