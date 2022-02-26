import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RouteHelperService {


    readonly FORGOTPASSWORD = {

        forgotPasswordRoute: (): string => "/api/forgotpassword",
        resetPasswordIdRoute: (id): string => `/api/resetpassword/${id}`,
        resetPasswordRoute: (): string => "/api/resetpassword",
    }


    readonly EMAILVERIFICATION = {

        verifyEmailRoute: (): string => "/api/verifyemail",
        isValidLinkRoute: (id): string => `/api/isvalidlink/${id}`,
    }

    readonly USER = {

        getUsersRoute: (): string => "/api/users",
        getUserRoute: (id: number): string => `/api/user/${id}`,
        saveUserRoute: (): string => "/api/user",
        deleteUserRoute: (id: number): string => `/api/user/${id}`,
    }

    readonly NEWSERVICES = {

        getallDataRoute: (): string => "/api/services",
        getByIDRoute: (id: number): string => `/api/service/${id}`,
        saveRoute: (): string => "/api/service",
        deleteRoute: (id: number): string => `/api/service/${id}`,
    }

    readonly PROJECTS = {

        getallDataRoute: (): string => "/api/projects",
        getByIDRoute: (id: number): string => `/api/project/${id}`,
        saveRoute: (): string => "/api/project",
        deleteRoute: (id: number): string => `/api/project/${id}`,
    }


    readonly PRODUCT = {

        getProductsRoute: (): string => "/api/products",
        getProductRoute: (id: number): string => `/api/product/${id}`,
        saveProductRoute: (): string => "/api/product",
        deleteProductRoute: (id: number): string => `/api/product/${id}`,
    }


    readonly PRODUCTCATEGORY = {

        getProductCategoriesRoute: (): string => "/api/productcategories",
        getProductCategoryLookUpRoute: (): string => "/api/productcategory/lookup",
        getProductCategoryRoute: (id: number): string => `/api/productcategory/${id}`,
        saveProductCategoryRoute: (): string => "/api/productcategory",
        deleteProductCategoryRoute: (id: number): string => `/api/productcategory/${id}`,
    }

    readonly EVENTTYPE = {

        getEventTypeLookUpRoute: (): string => "/api/eventtype/lookup",
    }

    readonly EVENT = {

        getEventsRoute: (): string => "/api/events",
        getEventRoute: (id: number): string => `/api/event/${id}`,
        getEventByEventTokenRoute: (eventToken: string): string => `/api/eventbyeventtoken/${eventToken}`,
        getEventMetaDataRoute: (eventToken: string): string => `/api/eventmetadata/${eventToken}`,
        saveEventRoute: (): string => "/api/event",
        saveEventPrivacyRoute: (): string => "/api/eventprivacy",
        deleteEventRoute: (id: number): string => `/api/event/${id}`,
        getEventOrganizerInformationRoute: (id: number): string => `/api/eventorganizerinformation/${id}`,
    }

    readonly LOCATIONTYPE = {

        getLocationTypeLookUpRoute: (): string => "/api/locationtype/lookup",
    }

    readonly LOCATION = {

        getLocationsRoute: (): string => "/api/locations",
        getLocationRoute: (id: number): string => `/api/location/${id}`,
        getLocationByEventTokenRoute: (eventToken: string): string => `/api/locationsbyeventtoken/${eventToken}`,
        saveLocationRoute: (): string => "/api/location",
        deleteLocationRoute: (id: number): string => `/api/location/${id}`,
    }

    readonly CONTACT = {

        getContactsRoute: (): string => "/api/contacts",
        getContactRoute: (id: number): string => `/api/contact/${id}`,
        getContactByEventIdRoute: (eventId: number): string => `/api/contactbyeventid/${eventId}`,
        getContactByEventTokenRoute: (eventToken: string): string => `/api/eventcontacts/${eventToken}`,
        saveContactRoute: (): string => "/api/contact",
        deleteContactRoute: (id: number): string => `/api/contact/${id}`,
    }

    readonly EVENTLOCATION = {
        saveEventLocationRoute: (): string => "/api/eventlocation",
        deleteEventLocationRoute: (id: number): string => `/api/eventlocation/${id}`,
    }

    readonly EVENTCONTACT = {
        isValidToken: (token: string): string => `/api/eventcontacts/${token}`,
        saveEventContactRoute: (): string => "/api/eventcontact",
        deleteEventContactRoute: (id: number): string => `/api/eventcontact/${id}`,
        getEventByMeetTokenRoute: (meetToken: string): string => `/api/eventbymeettoken/${meetToken}`,

    }

    readonly EVENTSCHEDULE = {
        saveEventScheduleRoute: (): string => "/api/eventschedule",
        deleteEventScheduleRoute: (id: number): string => `/api/eventschedule/${id}`,
    }

    readonly SCHEDULE = {

        getSchedulesRoute: (): string => "/api/Schedules",
        getScheduleRoute: (id: number): string => `/api/Schedule/${id}`,
        getScheduleByEventTokenRoute: (eventToken: string): string => `/api/schedulebyeventtoken/${eventToken}`,
        saveScheduleRoute: (): string => "/api/Schedule",
        deleteScheduleRoute: (id: number): string => `/api/Schedule/${id}`,
    }

    readonly TIMEZONE = {

        getTimeZoneLookUpRoute: (): string => "/api/timezone/lookup",
    }

    readonly IMAGE = {
        getServiceImagesRoute: (id: number): string => `/api/serviceimages/${id}`,
        getProjectImagesRoute: (id: number): string => `/api/projectimage/${id}`,
        getEventImagesRoute: (id: number): string => `/api/eventimage/${id}`,
        getEventImagesByEventTokenRoute: (eventToken: string): string => `/api/eventimagebyeventtoken/${eventToken}`,
        getEventImagesForMeetByEventTokenRoute: (eventToken: string): string => `/api/eventimageformeetbyeventtoken/${eventToken}`,
        downloadImageRoute: (id: number): string => `/api/image/download/${id}`,
        deleteImageRoute: (id: number): string => `/api/image/${id}`,
        deleteServiceImageRoute: (id: number): string => `/api/serviceimage/${id}`,
        deleteProjectImageRoute: (id: number): string => `/api/projectimage/${id}`,
    }

    readonly PACKAGE = {
        getPackagesRoute: (): string => "/api/packages",
        getPackageRoute: (id: number): string => `/api/package/${id}`,
        getPackageByEventTokenRoute: (eventToken: string): string => `/api/packagesbyeventtoken/${eventToken}`,
        getPackagesAndProductItemsByEventTokenRoute: (eventToken: string): string => `/api/packagesandproductitemsbyeventtoken/${eventToken}`,
        savePackageRoute: (): string => "/api/package",
        deletePackageRoute: (id: number): string => `/api/package/${id}`,
    }

    readonly PACKAGEPRODUCT = {
        getPackagePackage: (packageId: number): string => `/api/packageproduct/${packageId}`,
        getPackagePackageByPackageIdRoute: (packageId: number): string => `/api/packageproductbypackage/${packageId}`,
        savePackageProductRoute: (): string => "/api/packageproduct",
        deletePackageProductRoute: (id: number): string => `/api/packageproduct/${id}`,
    }

    readonly EMAILMESSAGE = {
        sendEmailMessageRoute: (): string => "/api/email",
        getEmailMessageRoute: (): string => "/api/emails",
        getUnReadEmailMessageRoute: (): string => "/api/unreademails",
        markAsReadRoute: (): string => "/api/markasread",
        markAllAsReadRoute: (): string => "/api/markallasread"
    }
}