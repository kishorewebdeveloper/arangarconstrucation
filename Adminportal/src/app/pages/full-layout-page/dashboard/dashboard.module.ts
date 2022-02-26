import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../shared/shared.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { Camera, RefreshCw, Save, Search, Plus, Trash2, X, CheckSquare, Edit, Eye, UploadCloud, DownloadCloud } from 'angular-feather/icons';

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
    DownloadCloud
}

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        FontAwesomeModule,
        RouterModule,
        PerfectScrollbarModule,
        FeatherModule.pick(icons),
        NgbModule
    ],
    exports: [],
    declarations: [
        DashboardComponent
    ],
    providers: [
        {
            provide:
                PERFECT_SCROLLBAR_CONFIG,
            // DROPZONE_CONFIG,
            useValue:
                DEFAULT_PERFECT_SCROLLBAR_CONFIG,
            // DEFAULT_DROPZONE_CONFIG,
        }
    ],
})
export class DashboardModule { }
