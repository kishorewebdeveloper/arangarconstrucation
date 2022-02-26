import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';
import { SplashScreenService } from './shared/component/splashcomponent/splashscreen.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { SessionService, SignalRService } from './services';
import { SpinnerVisibilityService } from 'ng-http-loader';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router'
import { Subscription } from 'rxjs';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})

export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    spinnerComponent = SpinnerComponent;
    title = 'ArchitectUI - Angular 7 Bootstrap 4 & Material Design Admin Dashboard Template';


    filteredUrlPatterns = [
        '/version.json'
    ];

    constructor(private splashScreenService: SplashScreenService,
        private router: Router,
        private loadingBar: LoadingBarService,
        private signalRService: SignalRService,
        private sessionService: SessionService,
        private spinner: SpinnerVisibilityService,
        private permissionsService: NgxPermissionsService) {

        this.subscription = router.events.subscribe((event: RouterEvent) => {
            this.navigationInterceptor(event);
        });
    }

    ngOnInit(): void {
        this.loadPermissions(this.sessionService.roleName());
        this.signalRService.initiateSignalRConnection();
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    loadPermissions(roleName: string) {
        let permissions = [];
        permissions.push(roleName);
        this.permissionsService.loadPermissions(permissions);
    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loadingBar.start();
        }
        if (event instanceof NavigationEnd) {
            window.scrollTo(0, 0);
            this.loadingBar.complete();
        }
        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel || event instanceof NavigationError) {
            this.loadingBar.complete();
        }
    }
}