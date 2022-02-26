import { NgModule } from '@angular/core';
import { ComponentsModule } from "./component/components.module";
import { LayoutModule } from "../layout/layout.module";
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgSelectModule } from '@ng-select/ng-select'
import { NgxUploaderModule } from 'ngx-uploader'


@NgModule({
    imports: [
        ComponentsModule,
        LayoutModule,
        NgxPermissionsModule,
        NgSelectModule,
        NgxUploaderModule,
       
    ],
    declarations: [

    ],
    exports: [
        ComponentsModule,
        LayoutModule,
        NgxPermissionsModule,
        NgSelectModule,
        NgxUploaderModule,
       
    ],
    providers: []
})


export class SharedModule { }
