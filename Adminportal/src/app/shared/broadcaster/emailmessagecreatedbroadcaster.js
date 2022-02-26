"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMessageCreatedBroadCaster = void 0;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var EmailMessageCreatedBroadCaster = /** @class */ (function () {
    function EmailMessageCreatedBroadCaster() {
        this.eventBus = new rxjs_1.Subject();
    }
    EmailMessageCreatedBroadCaster.prototype.broadCast = function (key, data) {
        this.eventBus.next({ key: key, data: data });
    };
    EmailMessageCreatedBroadCaster.prototype.on = function (key) {
        return this.eventBus.asObservable().pipe(operators_1.filter(function (event) { return event.key === key; }), operators_1.map(function (event) { return event.data; }));
    };
    return EmailMessageCreatedBroadCaster;
}());
exports.EmailMessageCreatedBroadCaster = EmailMessageCreatedBroadCaster;
//# sourceMappingURL=emailmessagecreatedbroadcaster.js.map