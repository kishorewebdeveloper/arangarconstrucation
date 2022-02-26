import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './resetpassword.component';

const routes: Routes = [
    {
        path: '',
        component: ResetPasswordComponent,
        data: {
            title: 'ResetpasswordForm'
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ResetPasswordRoutingModule { }
