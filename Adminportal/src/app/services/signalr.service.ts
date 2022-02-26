import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { BroadCastingService } from "./broadcasting.service";
import { SessionService } from "./session.service";
import { AuthenticationService } from "./authentication.service";
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const waitUntilAspnetcoreIsReadyDelayInMs = 2000;

@Injectable({
    providedIn: 'root'
})

export class SignalRService {

    private hubConnection: HubConnection;

    constructor(private broadCastingService: BroadCastingService,
        private authService: AuthenticationService,
        private sessionService: SessionService) {

    }

    initiateSignalRConnection() {
        if (this.authService.isAuthenticated()) {
            this.createConnection();
            setTimeout(() => {
                this.startConnection();
                this.registerOnServerEvents();
            }, waitUntilAspnetcoreIsReadyDelayInMs);
        }
    }

    private createConnection() {
        const authToken = this.sessionService.authToken();
        const signalREmailMessageHubUrl = `${environment.apiBaseUrl}/${environment.signalREmailMessageHubUrl}`;
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(signalREmailMessageHubUrl, { accessTokenFactory: () => authToken })
            .withAutomaticReconnect()
            .build();
    }

    private startConnection() {
        this.hubConnection
            .start()
            .then(() => console.log("SignalR connection success"))
            .catch(err => console.log("Error while establishing connection"));
    }

    private registerOnServerEvents(): void {

        this.hubConnection.on('UserConnected', (connectionId: string) => {
            if (environment.showEnvironment)
                console.log(`User Connected! ConnectionId: ${connectionId} `);
        });

        this.hubConnection.on('UserDisconnected', (connectionId: string) => {
            if (environment.showEnvironment)
                console.log(`User Disconnected! ConnectionId: ${connectionId} `);
        });

        this.hubConnection.on('emailmessage-created', (message: any) => {
            if (environment.showEnvironment)
                console.log(message);
            this.broadCastingService.broadCastEmailMessageCreated(message);
        });
    }
}
