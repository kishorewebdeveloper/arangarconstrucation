import { Component, OnInit } from "@angular/core";
import {
  EMailMessageService,
  BroadCastingService,
  UtilityService,
  AlertService,
  ModalService,
} from "../../../../../services";
import { Subscription } from "rxjs";
import * as _ from "lodash";

@Component({
  selector: "app-notification-box",
  templateUrl: "./notification-box.component.html",
  styleUrls: ["./notification-box.component.scss"],
})
export class NotificationBoxComponent implements OnInit {
  showNotification: boolean;
  emailMessages = [];
  emailMessageSubscription: Subscription;

  constructor(
    private emailMessageService: EMailMessageService,
    private broadCastingService: BroadCastingService,
    private modalService: ModalService,
    private alertService: AlertService,
    private utilityService: UtilityService
  ) {
    this.onNewEmailMessageReceived();
  }

  ngOnInit() {
    // this.getUnReadEmailMessages(false);
  }

  openNotification(state: boolean) {
    this.showNotification = state;
  }

  onNewEmailMessageReceived() {
    this.emailMessageSubscription = this.broadCastingService
      .listenEmailMessageCreated()
      .subscribe((message) => {
        if (!_.find(this.emailMessages, { id: message.id })) {
          message.creationTs = this.utilityService.utcDateTimeToLocal(
            message.creationTs
          );
          this.emailMessages.unshift(message);
        }
      });
  }

  getUnReadEmailMessages(refresh) {
    this.emailMessageService
      .getUnReadEmailMessages(refresh)
      .subscribe((response) => {
        response.forEach((value) => {
          value.creationTs = this.utilityService.utcDateTimeToLocal(
            value.creationTs
          );
        });
        this.emailMessages = response;
      });
  }

  ngOnDestroy(): void {
    if (this.emailMessageSubscription)
      this.emailMessageSubscription.unsubscribe();
  }

  onMarkAsRead(data: any) {
    this.emailMessageService.markAsRead(data).subscribe((response) => {
      this.getUnReadEmailMessages(true);
    });
  }

  onMarkAllAsRead() {
    return this.modalService
      .questionModal(
        "Confirmation",
        "Are you sure want to mark as read ?",
        true
      )
      .result.then(
        (result) => {
          if (result) {
            this.emailMessageService
              .markAllAsRead(this.emailMessages)
              .subscribe((response) => {
                this.getUnReadEmailMessages(true);
              });
          }
        },
        () => false
      );
  }
}
