import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { EmailVerificationRoutingModule } from "./emailverification-routing.module";
import { EmailVerificationComponent } from "./emailverification.component";

@NgModule({
    imports: [
        CommonModule, NgbModule,
        EmailVerificationRoutingModule,
        ReactiveFormsModule
    ],
    exports: [],
    declarations: [EmailVerificationComponent],
    providers: [],
})

export class EmailVerificationModule { }
