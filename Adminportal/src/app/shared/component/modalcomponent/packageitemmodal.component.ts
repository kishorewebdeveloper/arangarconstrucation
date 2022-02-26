import { Component, ViewChild, ChangeDetectorRef, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from "../../../services/alert.service";
import { PackageProductService } from "../../../services/packageproduct.service";
import { NavigationService } from "../../../services/navigation.service";

import {
    ColumnMode,
    DatatableComponent
} from '@swimlane/ngx-datatable';


@Component({
    templateUrl: 'packageitemmodal.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class PackageItemModalComponent {

    selected: any[] = [];

    @Input() public packageId: number;
    @Input() public title: string;

    @ViewChild(DatatableComponent) table: DatatableComponent;
    ColumnMode = ColumnMode;
    rows = [];
    private dataSource = [];
    columns: string[] = [];
    itemid: number;


    ngOnInit(): void {
        this.getProducts();
    }

    constructor(public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private navigationService: NavigationService,
        private packageProductService: PackageProductService,
        private changeDetectorRef: ChangeDetectorRef) {

    }

    onConfirm(): void {
        if (this.selected.length !== 0) {
            var data = this.getDataForPost();
            this.packageProductService.savePackageProduct(data).subscribe(response => {
                this.alertService.success("Product Item Added Successfully");
                this.activeModal.close(true);
            });
        } else {
            this.alertService.warning("Please select product item");
        }
    }

    getDataForPost() {
        let data = [];

        this.selected.forEach(value => {
            let productPackage = {
                "id": 0,
                "productId": value.id,
                "packageId": this.packageId,
            }
            data.push(productPackage);
        });
        return data;
    }

    onProductAdd() {
        this.activeModal.close(false);
        this.navigationService.goToProduct(0);
    }

    onCancel(): void {
        this.activeModal.close(false);
    }

    onRefresh() {
        this.getProducts();
    }

    getProducts() {
        this.packageProductService.getPackageProduct(this.packageId).subscribe(response => {
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
