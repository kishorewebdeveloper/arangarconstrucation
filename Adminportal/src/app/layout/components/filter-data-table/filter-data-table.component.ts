import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-filter-data-table',
    templateUrl: './filter-data-table.component.html',
})
export class FilterDataTableComponent {

    @Input() placeholder;

    @Output() onFilterKeyPress = new EventEmitter();

    filter(event) {
        this.onFilterKeyPress.emit(event);
    }    
}
