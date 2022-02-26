import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDateStruct, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import * as fileSaver from 'file-saver';
import * as _ from "lodash";
import { Observable, of } from 'rxjs';
import { UploadFile } from 'ngx-uploader';


@Injectable({
    providedIn: 'root',
})
export class UtilityService {

    constructor(private route: ActivatedRoute) {

    }

    validateFormControl(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateFormControl(control);
            }
        });
    }

    filter(searchText, dataSource: any[], columns: string[]): any[] {

        let temp = [];
        if (dataSource.length === 0)
            return temp;

        temp = dataSource.filter(item => {
            // iterate through each row's column data
            for (let i = 0; i < columns.length; i++) {
                const colValue = item[columns[i]];

                // if no filter OR colvalue is NOT null AND contains the given filter
                if (!searchText || (!!colValue && colValue.toString().toLowerCase().indexOf(searchText) !== -1)) {
                    return true;
                }
            }
        });

        return temp;
    }


    formatDate(date: NgbDateStruct): string {
        if (date == null || !date) {
            return null;
        }
        return moment().year(date.year).month(date.month - 1).date(date.day).format();
    }


    parseDate(value: string): NgbDateStruct {
        if (value) {
            let d: moment.Moment = moment(value);
            return { year: d.year(), month: (d.month() + 1), day: d.date() };
        }
        return null;
    }

    utcDateTimeToLocal(utcDateTime) {
        const momentUtcDateTime = moment.utc(utcDateTime);
        return momentUtcDateTime.local();
    }


    saveFile = (blobContent: Blob, fileName: string, fileType: string) => {
        const blob = new Blob([blobContent], { type: fileType });
        fileSaver.saveAs(blob, fileName);
    };

    isValidFileSize(uploadFile: UploadFile) {
        // 10 MB File size
        return uploadFile.size < 10485760;
    }
}