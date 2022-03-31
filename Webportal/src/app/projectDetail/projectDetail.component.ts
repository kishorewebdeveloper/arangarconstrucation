import { Component, OnInit } from "@angular/core";
import { OurService } from "../../services/ourservices.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-projectDetail",
  templateUrl: "./projectDetail.component.html",
  styleUrls: ["./projectDetail.component.scss"],
})
export class ProjectDetailComponent implements OnInit {
  focus: any;
  focus1: any;
  projectId: string;
  pageTitle: string;
  detailData = [];
  projectDetail: any;
  routeParams: any;

  constructor(private ourService: OurService, private route: ActivatedRoute) {
    this.routeParams = route.snapshot.params;
    this.projectId = this.routeParams.projectId;
    console.log("The service type of this route is: ", this.projectId);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.projectId = params.projectId;
      console.log("The service type of this route is: ", params.projectId);
      this.getServiceDetails();
    });
  }

  getServiceDetails() {
    debugger;
    this.detailData = [];
    this.ourService.getServices(this.projectId).subscribe((data) => {
      console.log(data);
      this.detailData = data.services;
      this.detailData = data.services.filter(
        (item) => item.projectId === this.projectId
      );
      this.pageTitle = this.detailData[0].title;
      this.projectDetail = this.detailData[0];
    });
  }
}
