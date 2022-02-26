import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailVerificationComponent } from './emailverification.component';

const routes: Routes = [
    {
        path: '',
        component: EmailVerificationComponent,
        data: {
            title: 'EmailverificationForm'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmailVerificationRoutingModule { }
