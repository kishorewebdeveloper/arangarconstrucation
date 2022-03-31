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
  serviceType: number=0;
  pageTitle: string;
  projectData = [];
  routeParams: any;

  constructor(
    private ourService: OurService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routeParams = route.snapshot.params;
    this.serviceType = Number(this.routeParams.serviceType);
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
      debugger;
      this.projectData = data;
      this.projectData = data.filter(
        (item) => item.serviceType === Number(this.serviceType)
      );
    });
    this.setTitle();
  }
  setTitle() {
    if (this.serviceType === 1) {
      this.pageTitle = "CMDA Approved Flats";
    }
    if (this.serviceType === 2) {
      this.pageTitle = "Ready to Occupy Flats";
    }
    if (this.serviceType === 3) {
      this.pageTitle = "Luxury Villas";
    }
    if (this.serviceType === 4) {
      this.pageTitle = "Join Ventures";
    }
    if (this.serviceType === 5) {
      this.pageTitle = "Construction";
    }
  }

  handleCollapse(id) {
    this.router.navigate(["/projectDetail/" + id]);
  }
}
