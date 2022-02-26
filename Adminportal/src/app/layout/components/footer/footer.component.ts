import { Component, OnInit } from '@angular/core';
import { environment } from "../../../../environments/environment";


@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
})

export class FooterComponent implements OnInit {

    apiBaseUrl = environment.apiBaseUrl;
    showEnvironment = environment.showEnvironment;

    ngOnInit() {
    }
}
