import { Component,  ViewEncapsulation, Input, EventEmitter} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ImageFileType } from "../../../enums/index"
import { SpinnerVisibilityService } from 'ng-http-loader';
import {
    EventService, ImageService, LocationService,
    NavigationService, ModalService, AlertService,
    SessionService, HttpInterceptorService, UtilityService,
    ScheduleService, PackageService
} from "../../../services";
import { environment } from "../../../../environments/environment";
@Component({
    templateUrl: 'imageuploadmodal.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ImageUploadModalComponent {

    selected: any[] = [];
    
    @Input() public id: number;
    @Input() public type: string;
    @Input() public title: string;
    imageFileType = ImageFileType;
    options: UploaderOptions;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    constructor(public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private navigationService: NavigationService,
        private spinner: SpinnerVisibilityService,
        private imageService: ImageService,
        private sessionService: SessionService,
        private eventService: EventService,
        private interceptorService: HttpInterceptorService,
        private utilityService: UtilityService,) {

    }


    ngOnInit(): void {
        this.initializeUploader();
    }

    initializeUploader() {

        this.options = {
            concurrency: 0,
            maxUploads: 1,
            maxFileSize: 10485760,
            allowedContentTypes: [
                'image/jpeg',
                'image/png'
            ]
        };
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>();
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
                this.clearUploadControlValue();

            } else {
                this.interceptorService.broadcastFriendlyErrorMessage(output.file);
            }
            this.clearUploadControlValue();
        }
    }

    checkFileValidation(output: UploadOutput) {
        if (this.utilityService.isValidFileSize(output.file)) {
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
    startUpload(): void {
        if (this.files.length > 0) {
            this.spinner.show();
            const token = this.sessionService.authToken();
            const event: UploadInput = {
                type: 'uploadAll',
                url: environment.apiBaseUrl + '/api/image/upload',
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token },
                data: {
                    EventId: this.id.toString(),
                    FileType: this.imageFileType.Event.toString()
                }
            };
            this.uploadInput.emit(event);
        } else {
            this.clearUploadControlValue();
        }
    }
    private clearUploadControlValue() {
        this.removeAllFiles();
        const elem: HTMLInputElement = <HTMLInputElement>document.getElementById('imageUpload');
        if (elem)
            elem.value = '';
        this.files = [];
    }
    removeAllFiles(): void {
        this.uploadInput.emit({ type: 'removeAll' });
    }
    onCancel(): void {
        this.activeModal.close(false);
    }
    onImageAdd() {
        this.activeModal.close(false);
        this.navigationService.goToContact(0);
    }
}
