import { Component, HostListener, Input, OnInit } from "@angular/core";
import { ThemeOptions } from "../../../theme-options";
import { ActivatedRoute } from "@angular/router";
import { SessionService, EventService } from "../../../services/index";
import { EventModel } from "../../../models/index";
import * as _ from "lodash";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public extraParameter: any;

  eventData: EventModel;
  eventToken: string;

  constructor(
    public globals: ThemeOptions,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {
    this.eventData = new EventModel();

    if (!_.isEmpty(this.route.snapshot.queryParams)) {
      this.route.queryParamMap.subscribe((params: any) => {
        this.eventToken = params.params.token;
      });
    }

    setTimeout(() => {
      this.getEventMetaData();
    });
  }

  isSuperAdmin: boolean;
  private newInnerWidth: number;
  private innerWidth: number;
  activeId = "dashboardsMenu";

  toggleSidebar() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  sidebarHover() {
    this.globals.sidebarHover = !this.globals.sidebarHover;
  }

  ngOnInit() {
    setTimeout(() => {
      this.innerWidth = window.innerWidth;
      if (this.innerWidth < 1200) {
        this.globals.toggleSidebar = true;
      }
    });
    this.isSuperAdmin = this.sessionService.isSuperAdmin();
    this.extraParameter =
      this.activatedRoute.snapshot.firstChild.data.extraParameter;
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.newInnerWidth = event.target.innerWidth;

    if (this.newInnerWidth < 1200) {
      this.globals.toggleSidebar = true;
    } else {
      this.globals.toggleSidebar = false;
    }
  }

  getEventMetaData() {
    if (this.eventToken) {
      this.eventService
        .getEventMetaData(this.eventToken, false)
        .subscribe((response) => {
          this.eventData = response;
        });
    }
  }
}
