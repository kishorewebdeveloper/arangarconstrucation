import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from "../../../shared/shared.module";
import { MeetRoutingModule } from './meet-routing.module';
import { MeetComponent } from './meet.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeatherModule } from 'angular-feather';
import { Send} from 'angular-feather/icons';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Select some icons (use an object, not an array)
const icons = {
    Send
};

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    declarations: [
        MeetComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FeatherModule.pick(icons),
        NgxDatatableModule,
        PerfectScrollbarModule,
        SharedModule,
        NgxMaskModule.forRoot(),
        FontAwesomeModule,
        MeetRoutingModule,
        NgbModule
    ]
})
export class MeetModule { }
