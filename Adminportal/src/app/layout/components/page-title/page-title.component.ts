import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faStar, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-page-title',
    templateUrl: './page-title.component.html',
    styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent {

    faStar = faStar;
    faPlus = faPlus;

    @Input() heading;
    @Input() subheading;
    @Input() refreshButtonText: string = 'Refresh';
    @Input() addNewButtonText: string = 'Add New';
    @Input() icon;
    @Input() isVisible: boolean = false;
    @Input() isAddVisible: boolean = false;
    @Input() isRefreshVisible: boolean = false;

    @Output() onRefreshClick = new EventEmitter();
    @Output() onAddNewClick = new EventEmitter();

    
    onRefreshClicked() {
        this.onRefreshClick.emit();
    }

    onAddNewClicked() {
        this.onAddNewClick.emit();
    }

}
