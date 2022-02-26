import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Injectable()
export class NavigationService {
    constructor(private router: Router,
        private location: Location,
        ) { }

    isOnLoginScreen(): boolean {
        return this.router.url === "/login";
    }

    isOnEventLocation(): boolean {
        return this.router.url.includes("/eventlocation");
    }

    isOnEventParticipant(): boolean {
        return this.router.url.includes("/eventparticipants");
    }

    isOnEventConatct(): boolean {
        return this.router.url.includes("/eventcontact");
    }

    isOnEventProduct(): boolean {
        return this.router.url.includes("/eventProduct");
    }

    goToBack() {
        this.location.back();
    }

    

    goToLogin() {
        this.router.navigate(["/login"]);
    }

    goToDashboard() {
        this.router.navigate(["/dashboard"], { queryParamsHandling: 'preserve' });
    }

    goToDashboardWithParams(id: number, token: string) {
        this.router.navigate(["/dashboard/"],
            {
                queryParams: {
                    id: id,
                    token: token
                }
            });
    }

    goToUsers() {
        this.router.navigate(["/users"]);
    }

    goToUser(id: number) {
        this.router.navigate(["/users/" + id]);
    }

    goToProducts() {
        this.router.navigate(["/products"], { queryParamsHandling: 'preserve' });
    }

    goToProduct(id: number) {
        this.router.navigate(["/products/" + id], { queryParamsHandling: 'preserve' });
    }

    goToEventProduct(id: number) {
        this.router.navigate(["/eventproduct/" + id], { queryParamsHandling: 'preserve' });
    }

    goToEvents() {
        this.router.navigate(["/events/"]);
    }

    goToCreateEvent() {
        this.router.navigate(["/event/create/"]);
    }

    goToEditEvent(id: number, token: string) {
        this.router.navigate(["/event/edit/"],
            {
                queryParams: {
                    id: id,
                    token: token
                }
            });
    }

    goToProductCategories() {
        this.router.navigate(["/productcategory"], { queryParamsHandling: 'preserve' });
    }

    goToProductCategory(id: number) {
        this.router.navigate(["/productcategory/" + id], { queryParamsHandling: 'preserve' });
    }

    goToLocations() {
        this.router.navigate(["/locations/"], { queryParamsHandling: 'preserve' });
    }

    goToContacts() {
        this.router.navigate(["/contacts/"], { queryParamsHandling: 'preserve' });
    }

    goToLocation(id: number) {
       
        this.router.navigate(["/locations/" + id], { queryParamsHandling: 'preserve' });
    }

    goToContact(id: number) {
        this.router.navigate(["/contacts/" + id], { queryParamsHandling: 'preserve' });
    }

    goToEventLocation(id: number) {
        this.router.navigate(["/eventlocation/" + id], { queryParamsHandling: 'preserve' });
    }

    goToEventParticipant(id: number) {
        this.router.navigate(["/eventContact/" + id], { queryParamsHandling: 'preserve' });
    }

    goToSchedules() {
        this.router.navigate(["/schedules"], { queryParamsHandling: 'preserve' });
    }

    goToSchedule(id: number) {
        this.router.navigate(["/schedules/" + id], { queryParamsHandling: 'preserve' });
    }

    goToPackages() {
        this.router.navigate(["/packages/"], { queryParamsHandling: 'preserve' });
    }



    goToPackage(id: number) {
        this.router.navigate(["/packages/" + id], { queryParamsHandling: 'preserve' });
    }

    goToNewservices(id: number) {
        this.router.navigate(["/newservices/" + id], { queryParamsHandling: 'preserve' });
    }

    goToProjects(id: number) {
        this.router.navigate(["/projects/" + id], { queryParamsHandling: 'preserve' });
    }

}
