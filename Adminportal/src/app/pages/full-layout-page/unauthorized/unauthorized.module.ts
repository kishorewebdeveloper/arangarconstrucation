import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { UnAuthorizedRoutingModule } from "./unauthorized-routing.module";

import {UnAuthorizedComponent  } from "./unauthorized.component";

@NgModule({
    imports: [
        CommonModule,
        UnAuthorizedRoutingModule
    ],
    exports: [],
    declarations: [
        UnAuthorizedComponent
    ],
    providers: [],
})
export class UnAuthorizedModule { }
