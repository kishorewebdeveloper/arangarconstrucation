import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ComponentChangeDetectionGuard} from "../../../guards/component-changedetection-guard.service"
import { NewprojectComponent } from './newproject.component';
import { NewprojectsComponent } from './newprojects.component';

const routes: Routes = [
    {
        path: '',
        component: NewprojectsComponent,
        data: {
            title: 'Projects',
        }
    },
    {
        path: ':id',
        component: NewprojectComponent,
        canDeactivate: [ComponentChangeDetectionGuard],
        data: {
            title: 'Projects',
        }
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewprojectsRoutingModule { }
