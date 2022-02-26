import { Injectable } from "@angular/core";
import { DataService  } from "./data.service";
import { RouteHelperService  } from "./route.helper.service";
import { map } from 'rxjs/operators';


@Injectable()
export class ProductService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    getProducts(refresh: boolean, requestData: any) {
        const data = this.dataService.getHttpParams(requestData);
        return this.dataService.getDataWithParams(this.routeHelperService.PRODUCT.getProductsRoute(), data, refresh);
    }

    getProduct(id: number) {
        return this.dataService.getRecord(this.routeHelperService.PRODUCT.getProductRoute(id));
    }

    saveProduct(data) {
        return this.dataService.post(this.routeHelperService.PRODUCT.saveProductRoute(), data).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.PRODUCT.getProductsRoute());
            return response;
        }));
    }

    deleteProduct(id: number) {
        return this.dataService.delete(this.routeHelperService.PRODUCT.deleteProductRoute(id));
    }
}
