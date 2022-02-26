import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ComponentChangeDetectionGuard} from "../../../guards/component-changedetection-guard.service"
import { UsersComponent } from './users.component';

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        data: {
            title: 'Services',
        }
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
