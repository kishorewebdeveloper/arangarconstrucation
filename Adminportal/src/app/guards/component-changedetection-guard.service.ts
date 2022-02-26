import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
 

export interface CanComponentDeactivate {
	canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
	providedIn: 'root',
})
export class ComponentChangeDetectionGuard implements CanDeactivate<CanComponentDeactivate>  {

    canDeactivate(component: CanComponentDeactivate) {
        return component.canDeactivate ?  component.canDeactivate() : of(true);
    }
}