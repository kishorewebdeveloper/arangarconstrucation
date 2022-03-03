import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
    UtilityService, ModalService, AlertService, NavigationService,
    HttpInterceptorService, SessionService, ImageService
} from "../../../services/index"
import * as _ from "lodash";

import { Observable, of } from 'rxjs';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { environment } from "../../../../environments/environment";
import { ImageFileType } from "../../../enums/index"
import { NewserviceService } from 'src/app/services/newservice.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
    selector: 'app-newproject',
    templateUrl: './newproject.component.html',
    styleUrls: ['./newproject.component.scss']
})
export class NewprojectComponent implements OnInit {

    heading = '';
    subheading = '';
    icon = 'pe-7s-album icon-gradient bg-mean-fruit';

    isFormSubmitted = false;
    id: number;
    form: FormGroup;
    eventToken: string;
    serviceTypes:any=[
        {key:1,value:'CMDA Approved Flats'},
        {key:2,value:'Ready to Occupy Flats'},
        {key:3,value:'Luxury Villas'},
        {key:4,value:'Join Ventures'},
        {key:5,value:'Construction'}
    ]

    projectImages: any[];

    imageFileType = ImageFileType;
    options: UploaderOptions;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;

    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private modalService: ModalService,
        private interceptorService: HttpInterceptorService,
        private sessionService: SessionService,
        private alertService: AlertService,
        private navigationService: NavigationService,
        private projectService: ProjectService,
        private spinner: SpinnerVisibilityService,
        private imageService: ImageService,
        private utilityService: UtilityService,
        private sanitizer: DomSanitizer) {

        if (!_.isEmpty(this.route.snapshot.queryParams)) {
            this.route.queryParamMap.subscribe((params: any) => {
                this.eventToken = params.params.token;
            });
        }

        this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.heading = this.id === 0 ? 'Create Project' : 'Edit Project';
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this.form.dirty) {
            return this.modalService.questionModal("Discard Confirmation", 'Are you sure you want to discard your changes?', false)
                .result.then(result => {
                    if (result)
                        return true;
                    else
                        return false;
                }, () => false);
        }
        return of(true);
    }

    ngOnInit(): void {
        this.initializeUploader();
        this.initializeValidators();
        this.getProjectImages();
        this.getById();
    }

    get lf() {
        return this.form.controls;
    }

    initializeUploader() {
        this.options = {
            concurrency: 0,
            allowedContentTypes: [
                'image/jpeg',
                'image/png'
            ]
        };
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    }

    initializeValidators() {
        this.form = this.formBuilder.group({
            id: [0, [Validators.required]],
            projectName: ["", [Validators.required]],
            title: ["", [Validators.required]],
            description: [""],
            address1: ["", [Validators.required]],
            address2: [""],
            city: ["", [Validators.required]],
            state: ["", [Validators.required]],
            pinCode: ["", [Validators.required]],
            bhk: [""],
            facing:[""],
            landMark: ["", [Validators.required]],
            features: [""],
            serviceType: ["", [Validators.required]],
        });
    }

    getById() {
        if (this.id > 0) {
            this.projectService.getById(this.id).subscribe(data => {
                this.form.patchValue(data);
            });
        }
    }

    cancel() {
        this.navigationService.goToBack();
    }

    onSubmit() {
        this.isFormSubmitted = true;
        if (this.form.valid) {
            let data = this.form.value;
            data.eventToken = this.eventToken;
            this.projectService.save(this.form.value).subscribe(response => {
                const msg = this.id > 0 ? 'Project updated successfully' : 'Project added successfully';
                this.form.reset();
                this.alertService.success(msg);
                this.navigationService.goToBack();
            });
        }
        else {
            this.utilityService.validateFormControl(this.form);
        }
    }

    onTabChanged(event) {
        if (event.nextId === 2 && this.id > 0) {
            //TODO:: Call images from API
            this.getProjectImages();
        }
    }

    getProjectImages() {
        if (this.id > 0) {
            this.imageService.getProjectImages(this.id).subscribe(result => {

                result.forEach(value => {
                    const objectUrl = 'data:image/png;base64,' + value.data;
                    value.image = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
                });
                this.projectImages = result;
                for (var i = result.length; i < 3; i++) {
                    var dumyProject = {
                        "id": 0,
                        "fileName": null,
                        "data": null
                    };
                    this.projectImages.push(dumyProject)
                }
            });
        }
    }

    private clearUploadControlValue() {
        this.removeAllFiles();
        const elem: HTMLInputElement = <HTMLInputElement>document.getElementById('imageUpload');
        elem.value = '';
        this.files = [];
    }

    private isValidFileSize(uploadFile: UploadFile) {
        // 10 MB File size
        return uploadFile.size < 10485760;
    }

    onUploadOutput(output: UploadOutput): void {
        console.log(output.type);
        if (output.type === 'allAddedToQueue') {
            this.startUpload();
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') { // add file to array when added
            this.files = [];
            this.checkFileValidation(output);
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
            this.spinner.show();
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        }
        else if (output.type === 'rejected') {
            this.clearUploadControlValue();
            this.cancelUpload(output.file.id);
            this.alertService.error("Invalid file format, allowed type are :.jpg ,  .jpeg , .png");
            this.files = [];
        } else if (output.type === 'done') {
            this.spinner.hide();
            if (output.file.responseStatus === 200) {
                //File uploaded successfully
                this.removeFile(output.file.id);
                this.alertService.success("Image uploaded successfully");
                this.getProjectImages();
                this.clearUploadControlValue();

            } else {
                this.interceptorService.broadcastFriendlyErrorMessage(output.file);
            }
            this.clearUploadControlValue();
        }
    }

    startUpload(): void {
        if (this.files.length > 0) {
            this.spinner.show();
            const token = this.sessionService.authToken();
            const event: UploadInput = {
                type: 'uploadAll',
                url: environment.apiBaseUrl + '/api/projectimage',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
                data: {
                    ProjectId: this.id.toString(),
                    FileType: this.imageFileType.Project.toString()
                }
            };
            this.uploadInput.emit(event);
        } else {
            this.clearUploadControlValue();
        }
    }

    checkFileValidation(output: UploadOutput) {
        if (this.isValidFileSize(output.file)) {
            this.files.push(output.file);
        } else {
            this.clearUploadControlValue();
            this.alertService.error("File is too large, maximum allowed size is : 1 MB");
        }
    }

    cancelUpload(id: string): void {
        this.uploadInput.emit({ type: 'cancel', id: id });
    }

    removeFile(id: string): void {
        this.uploadInput.emit({ type: 'remove', id: id });
    }

    removeAllFiles(): void {
        this.uploadInput.emit({ type: 'removeAll' });
    }

    deleteProjectImage(id: number) {
        return this.modalService.questionModal("Delete Confirmation", 'Are you sure you want to delete the image?', true)
            .result.then(result => {
                if (result) {
                    this.imageService.deleteProjectImage(id).subscribe(response => {
                        this.alertService.success("Image deleted successfully");
                        this.getProjectImages();
                    });
                }
            }, () => false);
    }

    downloadImage(data: any) {
        return this.modalService.questionModal("Download Confirmation", 'Are you sure you want to download the image?', true)
            .result.then(result => {
                if (result) {
                    this.imageService.downloadImage(data.id).subscribe(response => {
                        this.utilityService.saveFile(response, data.fileName, response.type);
                    });
                }
            }, () => false);

    }
}
