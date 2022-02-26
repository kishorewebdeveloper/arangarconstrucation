import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FeatherModule } from 'angular-feather';
import { Camera, RefreshCw, Save, Search, Plus, Trash2, X, CheckSquare, Edit, Users } from 'angular-feather/icons';

// COMPONENTS
import { PageTitleComponent } from './Components/page-title/page-title.component';
import { FilterDataTableComponent } from "./components/filter-data-table/filter-data-table.component";
import { HeaderComponent } from './Components/header/header.component';
import { UserBoxComponent } from './Components/header/elements/user-box/user-box.component';
import { NotificationBoxComponent } from "./components/header/elements/notification-box/notification-box.component";
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { LogoComponent } from './Components/sidebar/elements/logo/logo.component';
import { FooterComponent } from './Components/footer/footer.component';


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
    Users
}

@NgModule({
    exports: [
        CommonModule,
        PageTitleComponent,
        FilterDataTableComponent,
        HeaderComponent,
        UserBoxComponent,
        SidebarComponent,
        LogoComponent,
        FooterComponent,
        NotificationBoxComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        PerfectScrollbarModule,
        FontAwesomeModule,
        FeatherModule.pick(icons),
    ],
    declarations: [
        PageTitleComponent,
        FilterDataTableComponent,
        HeaderComponent,
        UserBoxComponent,
        SidebarComponent,
        LogoComponent,
        FooterComponent,
        NotificationBoxComponent
    ]
})
export class LayoutModule { }