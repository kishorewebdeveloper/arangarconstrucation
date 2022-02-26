import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app.routing";

import { AppComponent } from "./app.component";
import { SignupComponent } from "./signup/signup.component";
import { LandingComponent } from "./landing/landing.component";
import { ProfileComponent } from "./profile/profile.component";
import { OldComponent } from "./old/old.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";

import { OldModule } from "./old/old.module";
import { ServicesModule } from "./services/services.module";
import { ProjectDetailModule } from "./projectDetail/projectDetail.module";
import { LoginComponent } from "./login/login.component";
import { SliderComponent } from "./slider/slider.component";
import { OurService } from "../services/ourservices.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    OldModule,
    ServicesModule,
    ProjectDetailModule,
    HttpClientModule,
  ],
  providers: [OurService],
  bootstrap: [AppComponent],
})
export class AppModule {}
