import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";

import { ProjectDetailComponent } from "./projectDetail.component";

import { SectionsModule } from "../sections/sections.module";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    SectionsModule,
  ],
  declarations: [ProjectDetailComponent],
  exports: [ProjectDetailComponent],
  providers: [],
})
export class ProjectDetailModule {}
