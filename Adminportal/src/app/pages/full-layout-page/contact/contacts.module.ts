import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from "../../../shared/shared.module";

import { ContactsRoutingModule } from './contacts-routing.module';

import { ContactsComponent } from './contacts.component';
import { ContactComponent } from './contact.component';
 
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherModule } from 'angular-feather';
import { Camera, RefreshCw, Save, Search, Plus, Trash2, X, CheckSquare, Edit } from 'angular-feather/icons';
import { NgxMaskModule, IConfig } from 'ngx-mask';
 


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
    Edit
};

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [
        ContactsComponent,
        ContactComponent,

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
        ContactsRoutingModule
    ]
})
export class ContactsModule { }
