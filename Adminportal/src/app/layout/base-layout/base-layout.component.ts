import {Component} from '@angular/core';
import {ThemeOptions} from '../../theme-options';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  animations: [

      trigger('architectUIAnimation', [
          transition('* <=> *', [
           
          ]),
      ])
  ]
})

export class BaseLayoutComponent {

  constructor(public globals: ThemeOptions) {
  }

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }
}



