import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  webImages = [
    "/assets/img/carousel/slide-1.jpg",
    "/assets/img/carousel/slide-2.jpg",
    "/assets/img/carousel/slide-3.jpg",
    "/assets/img/carousel/slide-4.jpg",
    "/assets/img/carousel/slide-1.jpg",
  ];

  constructor() {}

  ngOnInit() {}
}
