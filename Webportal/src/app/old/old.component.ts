import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-old",
  templateUrl: "./old.component.html",
  styleUrls: ["./old.component.scss"],
})
export class OldComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false,
  };

  focus;
  focus1;
  constructor() {}

  ngOnInit() {}
}
