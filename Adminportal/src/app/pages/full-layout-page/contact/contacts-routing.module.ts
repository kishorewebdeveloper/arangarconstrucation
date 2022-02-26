import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts.component';
import { ContactComponent } from './contact.component';

import {ComponentChangeDetectionGuard} from "../../../guards/component-changedetection-guard.service"

const routes: Routes = [
    {
        path: '',
        component: ContactsComponent,
        data: {
            title: 'Contacts'
            //requiredPermission: [RoleType.SuperAdmin]
        }
    }, 
    {
       path: ':id',
       component: ContactComponent,
       canDeactivate: [ComponentChangeDetectionGuard],
       data: {
           title: 'Contact',
           //requiredPermission: [RoleType.SuperAdmin]
       }
    },
    {
        path: 'eventcontact:id',
        component: ContactComponent,
        canDeactivate: [ComponentChangeDetectionGuard],
        data: {
            title: 'Contact',
            //requiredPermission: [RoleType.SuperAdmin]
        }
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
