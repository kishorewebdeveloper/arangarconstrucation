import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import {
  EventService,
  ImageService,
  LocationService,
  NavigationService,
  ModalService,
  AlertService,
  SessionService,
  HttpInterceptorService,
  UtilityService,
  ScheduleService,
  PackageService,
} from "../../../services";

import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import * as _ from "lodash";
import { faTrash, faCheck, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions,
} from "ngx-uploader";
import { ImageFileType } from "../../../enums/index";
import { SpinnerVisibilityService } from "ng-http-loader";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  faTrash = faTrash;
  faCheck = faCheck;
  faPen = faPen;

  eventToken: string;
  eventId: number;
  privacySetting: any;
  eventData;
  locationsData = [];
  schedulesData = [];
  eventImages: any[];
  eventPackages: any[];
  productsData = [];
  packagesData = [];
  organizerData = [];

  imageFileType = ImageFileType;
  options: UploaderOptions;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;

  constructor(
    private eventService: EventService,
    private navigationService: NavigationService,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private alertService: AlertService,
    private interceptorService: HttpInterceptorService,
    private utilityService: UtilityService,
    private sessionService: SessionService,
    private packageService: PackageService,
    private modalService: ModalService,
    private scheduleService: ScheduleService,
    private spinner: SpinnerVisibilityService,
    private imageService: ImageService,
    private sanitizer: DomSanitizer
  ) {
    if (!_.isEmpty(this.route.snapshot.queryParams)) {
      this.route.queryParamMap.subscribe((params: any) => {
        this.eventToken = params.params.token;
        //this.getData(this.eventToken);
      });
    }
  }

  ngOnInit() {}
}
