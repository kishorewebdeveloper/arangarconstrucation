import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    getUsers(refresh: boolean): Observable<any[]> {
        return this.dataService.getData(this.routeHelperService.USER.getUsersRoute(), refresh);
    }

    getUser(id: number) {
        return this.dataService.getRecord(this.routeHelperService.USER.getUserRoute(id));
    }

    saveUser(user: any) {
        return this.dataService.post(this.routeHelperService.USER.saveUserRoute(), user).pipe(map((response) => {
            this.dataService.clearRouteCache(this.routeHelperService.USER.getUsersRoute());
            return response;
        }));
    }

    deleteUser(id: number) {
        return this.dataService.delete(this.routeHelperService.USER.deleteUserRoute(id));
    }

    verifyEmail(data: any) {
        return this.dataService.post(this.routeHelperService.EMAILVERIFICATION.verifyEmailRoute(), data).pipe(map((response) => {
            return response;
        }));
    }

    isValidLink(data: any) {
        return this.dataService.getRecord(this.routeHelperService.EMAILVERIFICATION.isValidLinkRoute(data)).pipe(map((response) => {
            return response;
        }));
    }

    forgotPassword(user: any) {
        return this.dataService.post(this.routeHelperService.FORGOTPASSWORD.forgotPasswordRoute(), user).pipe(map((response) => {
            return response;
        }));
    }

    getResetPasswordId(id) {
        return this.dataService.getRecord(this.routeHelperService.FORGOTPASSWORD.resetPasswordIdRoute(id));
    }

    resetPassword(data: any) {
        return this.dataService.post(this.routeHelperService.FORGOTPASSWORD.resetPasswordRoute(), data).pipe(map((response) => {
            return response;
        }));
    }

}
