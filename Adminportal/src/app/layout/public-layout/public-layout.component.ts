import { Component, OnInit } from '@angular/core';
import { animate, query, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-public-layout',
    templateUrl: './public-layout.component.html',
    animations: [

        trigger('architectUIAnimation', [
            transition('* <=> *', [

            ])])
    ]
})
export class PublicLayoutComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

}
