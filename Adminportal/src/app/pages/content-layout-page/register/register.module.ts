import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterRoutingModule } from "./register-routing.module";
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        RegisterRoutingModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot()
    ],
    exports: [],
    declarations: [
        RegisterComponent
    ],
    providers: [],
})
export class RegisterModule { }
