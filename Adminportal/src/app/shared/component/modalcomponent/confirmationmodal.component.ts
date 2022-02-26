import { Component, Inject, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: 'confirmationmodal.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class ConfirmationModalComponent {

    @Input() public title: string;
    @Input() public body: string;

    @Output() output: EventEmitter<any> = new EventEmitter();
 
    ngOnInit(): void {

    }

    constructor(public activeModal: NgbActiveModal) {
       
    }

    onConfirm(): void {
        this.output.emit(true);
        this.activeModal.close(true);
    }

    onCancel(): void {
        this.activeModal.close(false);
    }
}
