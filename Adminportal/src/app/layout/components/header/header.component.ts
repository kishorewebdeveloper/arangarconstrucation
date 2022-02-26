import { Component, OnInit, HostBinding } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { ThemeOptions } from '../../../theme-options';
import { SessionService } from "../../../services/index"

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    faEllipsisV = faEllipsisV;
    loggedOnUserName: string = '';

    constructor(public globals: ThemeOptions,
        private sessionService: SessionService) {
    }


    ngOnInit(): void {
        this.loggedOnUserName = this.sessionService.getUserName();
    }

    @HostBinding('class.isActive')
    get isActiveAsGetter() {
        return this.isActive;
    }

    isActive: boolean;


    toggleSidebarMobile() {
        this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
    }

    toggleHeaderMobile() {
        this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
    }

}
