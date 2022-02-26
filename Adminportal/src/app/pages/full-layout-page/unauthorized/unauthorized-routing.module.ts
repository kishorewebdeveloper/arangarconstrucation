import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnAuthorizedComponent } from './unauthorized.component';

const routes: Routes = [
    {
        path: '',
        component: UnAuthorizedComponent,
        data: {
            title: 'UnAuthorized'
        }
         
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UnAuthorizedRoutingModule { }
