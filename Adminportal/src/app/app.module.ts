import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NotificationBarModule } from 'ngx-notification-bar'
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxUploaderModule, NgUploaderService } from 'ngx-uploader';
import { LoadingBarModule } from "@ngx-loading-bar/core";

// BOOTSTRAP COMPONENTS
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// LAYOUT
import { SharedModule } from '../app/shared/shared.module'
import { AppComponent } from './app.component';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PagesLayoutComponent } from './layout/pages-layout/pages-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

import {
    DataService, UserService, AlertService,
    HttpInterceptorService, NavigationService,
    AuthenticationService, SessionService,
    ProductCategoryService, ProductService,
    ModalService, EventTypeService, EventService,
    LocationTypeService, LocationService, ScheduleService,
    TimeZoneService, ImageService, PackageService, BroadCastingService,
    PackageProductService, ContactService, EventContactService,
    EMailMessageService, SignalRService, CartService
} from "./services";

import {
    ConfirmationModalComponent,
    GenericMessageModalComponent,
    ImageUploadModalComponent
} from './shared/component/modalcomponent';

import { SpinnerComponent } from './shared/component/spinnercomponent/spinner.component';
import { FeatherModule } from 'angular-feather';

//Import Broadcaster
import { EmailMessageCreatedBroadCaster as EventChangeBroadcaster } from "./shared/broadcaster/index";
import { NewserviceService } from './services/newservice.service';
import { ProjectService } from './services/project.service';
// import { MeetComponent } from './pages/full-layout-page/meet/meet.component';
// import { ContactsComponent } from './pages/full-layout-page/contacts/contacts.component';
// import { ContactComponent } from './pages/full-layout-page/contacts/contact/contact.component';
import { Camera, RefreshCw, Save, Search, Plus, Trash2, Image, X, CheckSquare, Edit, Eye, UploadCloud, DownloadCloud } from 'angular-feather/icons';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

const icons = {
    Camera,
    RefreshCw,
    Save,
    Search,
    Plus,
    Trash2,
    X,
    CheckSquare,
    Edit,
    Eye,
    UploadCloud,
    DownloadCloud,
    Image
}

@NgModule({
    declarations: [
        // LAYOUT
        AppComponent,
        MainLayoutComponent,
        BaseLayoutComponent,
        PagesLayoutComponent,
        PublicLayoutComponent,
        
        // ContactsComponent,
        // ContactComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        NgxUploaderModule,
        FeatherModule.pick(icons),
        // Angular Bootstrap Components
        PerfectScrollbarModule,
        NgbModule,
        HttpClientModule,
        NotificationBarModule,
        NgHttpLoaderModule.forRoot(),
        NgxPermissionsModule.forRoot(),
        LoadingBarModule
    ],
    providers: [
        // NgxPermissionsService,
        DataService,
        UserService,
        AlertService,
        NavigationService,
        AuthenticationService,
        ModalService,
        ProductService,
        NewserviceService,
        ProjectService,
        ProductCategoryService,
        EventTypeService,
        SessionService,
        EventService,
        LocationTypeService,
        LocationService,
        ScheduleService,
        TimeZoneService,
        ImageService,
        PackageService,
        ContactService,
        EventContactService,
        EMailMessageService,
        BroadCastingService,
        PackageProductService,
        EventChangeBroadcaster,
        SignalRService,
        CartService,
        NgUploaderService,
        {
            provide:
                PERFECT_SCROLLBAR_CONFIG,
            useValue:
                DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        HttpInterceptorService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents:
        [
            SpinnerComponent,
            ConfirmationModalComponent,
            GenericMessageModalComponent,
            ImageUploadModalComponent
        ]
})

export class AppModule { }
