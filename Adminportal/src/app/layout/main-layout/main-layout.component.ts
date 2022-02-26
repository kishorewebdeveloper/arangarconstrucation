import {Component} from '@angular/core';
import { transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  animations: [

      trigger('architectUIAnimation', [
          transition('* <=> *', [
           
          ])
      ])
  ]
})

export class MainLayoutComponent {

  
}



