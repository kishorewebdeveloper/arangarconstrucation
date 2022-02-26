import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from "../services/session.service";

@Injectable({
    providedIn: 'root',
})
export class AuthGuardChild implements CanActivateChild {

    constructor(private authService: AuthenticationService,
        private router: Router) { }


    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
        
        if (childRoute.data.requiredPermission && !this.authService.hasRequiredPermission(childRoute.data.requiredPermission)) {
           this.router.navigate(['/unauthorized']);
           return false;
        }

        //this.utilityService.logPageView(state.url, state.url);

        return true;
    }

    


}