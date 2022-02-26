import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss']
})

export class SliderComponent implements OnInit {
  focus: any;
  focus1: any;
  webImages = [
    "/assets/img/carousel/slide-1.jpg",
    "/assets/img/carousel/slide-2.jpg",
    "/assets/img/carousel/slide-3.jpg",
    "/assets/img/carousel/slide-4.jpg",
  ];


  constructor() { }

  ngOnInit() {}

}
