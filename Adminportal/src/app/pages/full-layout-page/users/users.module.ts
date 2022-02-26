import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from "../../../shared/shared.module";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherModule } from 'angular-feather';
import { Camera, RefreshCw, Save, Search,Image, Plus, Trash2, X, CheckSquare, Edit, Download, Delete } from 'angular-feather/icons';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';

// Select some icons (use an object, not an array)
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
    Download,
    Delete,
    Image

};

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [
        UsersComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,      
        FeatherModule.pick(icons),
        NgxDatatableModule,
        PerfectScrollbarModule,
        SharedModule,
        NgxMaskModule.forRoot(),
        FontAwesomeModule,
        UsersRoutingModule,
        NgbModule
    ]
})
export class UsersModule { }
