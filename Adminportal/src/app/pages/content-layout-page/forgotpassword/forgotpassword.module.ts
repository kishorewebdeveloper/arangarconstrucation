import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ForgotPasswordComponent } from "./forgotpassword.component";
import { ForgotPasswordRoutingModule } from "./forgotpassword-routing.module";
import { FeatherModule } from 'angular-feather';
import { Camera, RefreshCw, Save, Search, Plus, Trash2, X, CheckSquare, Edit, Minus } from 'angular-feather/icons';

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
    Minus
};


@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        FeatherModule.pick(icons),
        ForgotPasswordRoutingModule
    ],
    declarations: [
        ForgotPasswordComponent
    ],
    providers: [],
    exports: [],
})


export class ForgotPasswordModule { }
