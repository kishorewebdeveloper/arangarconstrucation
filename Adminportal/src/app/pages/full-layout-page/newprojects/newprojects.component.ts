import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
    ColumnMode,
    DatatableComponent
} from '@swimlane/ngx-datatable';

import { ActivatedRoute } from '@angular/router';
import { NavigationService, ModalService, AlertService, UtilityService, EventService } from "../../../services";
import * as _ from "lodash";

import { EventModel } from "../../../models/index"
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-newprojectss',
    templateUrl: './newprojects.component.html',
    styleUrls: ['./newprojects.component.scss']
})
export class NewprojectsComponent implements OnInit {

    @ViewChild(DatatableComponent) table: DatatableComponent;
    ColumnMode = ColumnMode;
    eventData: EventModel;
    rows = [];
    eventToken: string;
    private dataSource = [];
    isAddVisible = true;
    heading = 'Projects';
    subheading = "";
    icon = 'pe-7s-album icon-gradient bg-mean-fruit';
    columns: string[] = [];

    constructor(private navigationService: NavigationService,
        private modalService: ModalService,
        private eventService: EventService,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private utilityService: UtilityService,
        private projectService: ProjectService,
        private changeDetectorRef: ChangeDetectorRef) {

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
        this.heading = 'Projects';
        this.getProjects(false);
    }

    getProjects(isRefresh: boolean) {
        const requestData: any = {};
        requestData.eventToken = "";
        this.projectService.getallData(isRefresh, requestData).subscribe(response => {
            this.dataSource = response;
            console.log(response);
            this.rows = response;

            if (this.rows.length > 0)
                this.columns = Object.keys(this.rows[0]);

            this.changeDetectorRef.detectChanges();

        });
    }

    getEventProjects(isRefresh: boolean) {
        if (this.eventToken) {
            const requestData: any = {};
            requestData.eventToken = this.eventToken;
            this.projectService.getallData(isRefresh, requestData).subscribe(response => {
                this.dataSource = response;
                this.rows = response;
                this.isAddVisible = this.rows.length === 0;
                if (this.rows.length > 0)
                    this.columns = Object.keys(this.rows[0]);
                this.changeDetectorRef.detectChanges();
            });
        }
    }

    filter(event) {
        const filter = event.target.value.toLowerCase();
        this.rows = this.utilityService.filter(filter, this.dataSource, this.columns);
        this.table.offset = 0;
    }

    refreshClicked() {
        this.getProjects(true);
    }

    onNewClicked() {
        this.navigationService.goToProjects(0);
    }

    onEdit(data: any) {
            this.navigationService.goToProjects(data.id);

    }

    onDelete(data: any) {
        return this.modalService.questionModal("Delete Confirmation", 'Are you sure you want to delete the project?', true)
            .result.then(result => {
                if (result) {
                    this.projectService.delete(data.id).subscribe(response => {
                        this.alertService.success("Project deleted successfully");
                        this.getProjects(true);
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
