import { Component, Inject, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: 'genericmessagemodal.component.html',
    encapsulation: ViewEncapsulation.None,
})

export class GenericMessageModalComponent {

    @Input() public body: string;
    @Input() public title: string;

    ngOnInit(): void {

    }

    constructor(public activeModal: NgbActiveModal) {
    }

    onOk(): void {
        this.activeModal.close(false);
    }
}
