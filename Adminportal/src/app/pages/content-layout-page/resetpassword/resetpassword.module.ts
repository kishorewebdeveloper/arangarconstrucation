import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ResetPasswordRoutingModule } from "./resetpassword-routing.module";
import { ResetPasswordComponent } from "./resetpassword.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [ResetPasswordComponent],
  providers: [],
})

export class ResetPasswordModule {}
