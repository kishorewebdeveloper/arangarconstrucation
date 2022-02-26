import { Component, OnInit } from "@angular/core";
import { OurService } from "../../services/ourservices.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
@Component({
  selector: "app-services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.scss"],
})
export class ServicesComponent implements OnInit {
  public isExpand = false;
  collapseId: any;
  focus: any;
  focus1: any;
  serviceType: string;
  pageTitle: string;
  projectData = [];
  routeParams: any;

  constructor(
    private ourService: OurService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeParams = route.snapshot.params;
    this.serviceType = this.routeParams.serviceType;
    console.log("The service type of this route is: ", this.serviceType);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.serviceType = params.serviceType;
      console.log("The service type of this route is: ", params.serviceType);
      this.getServiceDetails();
    });
  }

  getServiceDetails() {
    this.projectData = [];
    this.ourService.getServices(this.serviceType).subscribe((data) => {
      this.projectData = data.services;
      this.projectData = data.services.filter(
        (item) => item.serviceType === this.serviceType
      );
    });
    this.setTitle();
  }
  setTitle() {
    if (this.serviceType === "cmda-approved-plots") {
      this.pageTitle = "CMDA Approved Flats";
    }
    if (this.serviceType === "flats") {
      this.pageTitle = "Ready to Occupy Flats";
    }
    if (this.serviceType === "luxury-villas") {
      this.pageTitle = "Luxury Villas";
    }
    if (this.serviceType === "JoinVenture") {
      this.pageTitle = "Join Ventures";
    }
    if (this.serviceType === "Construction") {
      this.pageTitle = "Construction";
    }
  }

  handleCollapse(id) {
    this.router.navigate(["/projectDetail/" + id]);
  }
}
