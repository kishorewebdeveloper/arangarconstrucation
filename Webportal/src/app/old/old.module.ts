import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";

import { OldComponent } from "./old.component";

import { SectionsModule } from "../sections/sections.module";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    SectionsModule,
  ],
  declarations: [OldComponent],
  exports: [OldComponent],
  providers: [],
})
export class OldModule {}
