import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { X, CheckSquare, Minus } from 'angular-feather/icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from "./spinnercomponent/spinner.component";
import { ConfirmationModalComponent } from "./modalcomponent/confirmationmodal.component";
import { GenericMessageModalComponent } from "./modalcomponent/genericmessagemodal.component";
import { LocationModalComponent } from "./modalcomponent/locationmodal.component";
import { ContactModalComponent } from "./modalcomponent/contactmodal.component";
import { PackageItemModalComponent } from "./modalcomponent/packageitemmodal.component";
import { PrivacyModalComponent } from "./modalcomponent/privacymodal.component";
import { PreviewModalComponent } from "./modalcomponent/previewmodal.component";
import { SendMessageModalComponent } from "./modalcomponent/sendmessagemodal.component";
import { ImageUploadModalComponent } from "./modalcomponent/imageuploadmodal.component";

// Select some icons (use an object, not an array)
const icons = {
    X,
    CheckSquare,
    Minus
};


export const components = [
    SpinnerComponent,
    ConfirmationModalComponent,
    GenericMessageModalComponent,
    LocationModalComponent,
    ContactModalComponent,
    PackageItemModalComponent,
    PrivacyModalComponent,
    PreviewModalComponent,
    SendMessageModalComponent,
    ImageUploadModalComponent
];

@NgModule({
    declarations: [components],
    imports: [
        NgxDatatableModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FeatherModule.pick(icons)],
    exports: [components],

})
export class ComponentsModule { }
