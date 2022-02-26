import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { RouteHelperService } from "./route.helper.service";

@Injectable()
export class ImageService {

    constructor(private routeHelperService: RouteHelperService,
        private dataService: DataService) { }

    getProjectImages(projectId: number) {
        return this.dataService.getRecord(this.routeHelperService.IMAGE.getProjectImagesRoute(projectId));
    }
    getServiceImages(serviceId: number) {
        return this.dataService.getRecord(this.routeHelperService.IMAGE.getServiceImagesRoute(serviceId));
    }

    downloadImage(id: number) {
        return this.dataService.downloadFile(this.routeHelperService.IMAGE.downloadImageRoute(id));
    }
    deleteImage(id: number) {
        return this.dataService.delete(this.routeHelperService.IMAGE.deleteImageRoute(id));
    }

    deleteServiceImage(id: number) {
        return this.dataService.delete(this.routeHelperService.IMAGE.deleteServiceImageRoute(id));
    }
    deleteProjectImage(id: number) {
        return this.dataService.delete(this.routeHelperService.IMAGE.deleteProjectImageRoute(id));
    }

    getEventImagesByEventToken(eventToken: string, refresh : boolean) {
        return this.dataService.getData(this.routeHelperService.IMAGE.getEventImagesByEventTokenRoute(eventToken), refresh);
    }

    getEventImagesForMeetByEventTokenRoute(eventToken: string, refresh : boolean) {
        return this.dataService.getData(this.routeHelperService.IMAGE.getEventImagesForMeetByEventTokenRoute(eventToken), refresh);
    }

    getEventImages(eventId: number) {
        return this.dataService.getRecord(this.routeHelperService.IMAGE.getEventImagesRoute(eventId));
    }
}