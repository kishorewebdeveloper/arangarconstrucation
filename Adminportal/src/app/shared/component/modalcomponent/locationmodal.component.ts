import { Component, ViewChild, ChangeDetectorRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationService } from "../../../services/location.service";
import { AlertService } from "../../../services/alert.service";
import { NavigationService } from "../../../services/navigation.service";

import {
    ColumnMode,
    DatatableComponent
} from '@swimlane/ngx-datatable';


@Component({
    templateUrl: 'locationmodal.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class LocationModalComponent {

    selected: any[] = [];


    @Input() public id: number;
   /* @Input() public productId: number;*/
    @Input() public title: string;


    @Output() output: EventEmitter<any> = new EventEmitter();
 

    @ViewChild(DatatableComponent) table: DatatableComponent;
    ColumnMode = ColumnMode;
    rows = [];
    private dataSource = [];
    columns: string[] = [];
    itemid : number;

    ngOnInit(): void {
        this.getLocations(true);
    }

    constructor(public activeModal: NgbActiveModal,
        private locationService: LocationService,
        private alertService: AlertService,
        private navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef) {

    }

    onLocationAdd() {
        this.activeModal.close(false);
        this.navigationService.goToLocation(0);
    }


    onConfirm(): void {
        if (this.selected.length !== 0) {
            this.activeModal.close(this.selected[0].id);
        } else {
            this.alertService.warning("Please select a Location");
        }
    }

    onCancel(): void {
        this.activeModal.close(false);
    }

    onRefresh() {
        this.getLocations(true);
    }

    getLocations(refresh) {
        const requestData: any = {};
        requestData.eventToken = "";
        this.locationService.getLocations(requestData, refresh).subscribe(response => {
            this.dataSource = response;
            this.rows = response;
            if (this.rows.length > 0)
                this.columns = Object.keys(this.rows[0]);
            this.changeDetectorRef.detectChanges();
        });
    }

    onCheckboxChange(event: any, row: any): void {
       
        if (this.getChecked(row) === false) {
            // add
            this.selected = [];
            this.selected.push(row);
        } else {
            // remove
            for (let i = 0; i < this.selected.length; i++) {
                if (this.selected[i].id === row.id) {
                    this.selected.splice(i, 1);
                    break;
                }
            }
        }
    }

    getChecked(row: any): boolean {
        let item = this.selected.filter((e) => e.id === row.id);
        return item.length > 0;
    }
}
