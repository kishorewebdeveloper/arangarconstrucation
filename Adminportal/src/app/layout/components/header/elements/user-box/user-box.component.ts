import { Component, OnInit } from '@angular/core';
import { AuthenticationService, NavigationService } from '../../../../../services';
import { ThemeOptions } from '../../../../../theme-options';


@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  constructor(public globals: ThemeOptions,
    private authService: AuthenticationService,
    private navigationService: NavigationService) {
  }

  ngOnInit() {
  }

  onLogOut(): void {
    this.authService.logOut();
    this.navigationService.goToLogin();
  }

}
