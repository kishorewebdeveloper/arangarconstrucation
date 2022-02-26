import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
    ColumnMode,
    DatatableComponent
} from '@swimlane/ngx-datatable';

import { ActivatedRoute } from '@angular/router';
import { NavigationService, ModalService, ProductService, AlertService, UtilityService, EventService } from "../../../services";
import * as _ from "lodash";

import { EventModel } from "../../../models/index"
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    ColumnMode = ColumnMode;
    eventData: EventModel;
    rows = [];
    eventToken: string;
    private dataSource = [];
    isAddVisible = true;
    heading = 'Users';
    subheading = "";
    icon = 'pe-7s-album icon-gradient bg-mean-fruit';
    columns: string[] = [];

    isOnEventProduct = false;

    constructor(private navigationService: NavigationService,
        private modalService: ModalService,
        private eventService: EventService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private utilityService: UtilityService,
        private userService: UserService,
        private changeDetectorRef: ChangeDetectorRef) {

        this.isOnEventProduct = this.navigationService.isOnEventProduct();

        console.log(this.isOnEventProduct);
        if (!_.isEmpty(this.route.snapshot.queryParams)) {
            this.route.queryParamMap.subscribe((params: any) => {
                this.eventToken = params.params.token;
            });
        }

        setTimeout(() => {
            // this.getEventMetaData();
        });
    }


    ngOnInit(): void {
        this.getData(false);

    }

    getData(isRefresh: boolean) {
        this.heading = 'Users';
        this.getUsers(false);
    }

    getUsers(isRefresh: boolean) {
        const requestData: any = {};
        requestData.eventToken = "";
        this.userService.getUsers(isRefresh).subscribe(response => {
            this.dataSource = response;
            this.rows = response;

            if (this.rows.length > 0)
                this.columns = Object.keys(this.rows[0]);

            this.changeDetectorRef.detectChanges();

        });
    }

    filter(event) {
        const filter = event.target.value.toLowerCase();
        this.rows = this.utilityService.filter(filter, this.dataSource, this.columns);
        this.table.offset = 0;
    }

    refreshClicked() {
        this.getUsers(true);
    }

    onDelete(data: any) {
        return this.modalService.questionModal("Delete Confirmation", 'Are you sure you want to delete the service?', true)
            .result.then(result => {
                if (result) {
                    this.userService.deleteUser(data.id).subscribe(response => {
                        this.alertService.success("Service deleted successfully");
                        this.getUsers(true);
                    });
                }
            }, () => false);
    }

    getEventMetaData() {
        this.eventService.getEventMetaData(this.eventToken, false).subscribe(response => {
            this.eventData = response;
        });
    }


}
