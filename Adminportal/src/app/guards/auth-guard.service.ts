import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from "../services/session.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthenticationService,
        private sessionService: SessionService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        if (route.data.requiredPermission && !this.authService.hasRequiredPermission(route.data.requiredPermission)) {
           this.router.navigate(['/unauthorized']);
           return false;
        }

        // this.utilityService.logPageView(state.url, state.url);

        return true;
    }

    hasRequiredPermission(permission) {
        for (let i = 0; i < permission.length; i++) {
            if (permission[i] === this.sessionService.roleId()) {
                return true;
            }
        }
        return false;
    }


}
