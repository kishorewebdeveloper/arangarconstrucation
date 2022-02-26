import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmailMessageCreatedBroadCaster } from "../shared/broadcaster/index";


@Injectable()
export class BroadCastingService {

    constructor(private emailMessageCreatedBroadCaster: EmailMessageCreatedBroadCaster) {
    }

    broadCastEmailMessageCreated(data: any): void {
        this.emailMessageCreatedBroadCaster.broadCast(MessageEvent, data);
    }

    listenEmailMessageCreated(): Observable<any> {
        return this.emailMessageCreatedBroadCaster.on<any>(MessageEvent);
    }
}