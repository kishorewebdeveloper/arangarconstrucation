import {Component, OnInit} from '@angular/core';
import {animate, query, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-pages-layout',
  templateUrl: './pages-layout.component.html',
  animations: [

    trigger('architectUIAnimation', [
      transition('* <=> *', [
   
      ]),
    ])
  ]
})
export class PagesLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
