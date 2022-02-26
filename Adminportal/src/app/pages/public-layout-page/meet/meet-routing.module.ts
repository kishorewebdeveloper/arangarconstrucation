import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetComponent } from './meet.component';
 

import {ComponentChangeDetectionGuard} from "../../../guards/component-changedetection-guard.service"

const routes: Routes = [
    {
        path: '',
        component: MeetComponent,
        data: {
            title: 'Meet',
        }
    }, 
    {
        path: ':id',
        component: MeetComponent,
        canDeactivate: [ComponentChangeDetectionGuard],
        data: {
            title: 'Meet',
            //requiredPermission: [RoleType.SuperAdmin]
        }
     }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetRoutingModule { }
