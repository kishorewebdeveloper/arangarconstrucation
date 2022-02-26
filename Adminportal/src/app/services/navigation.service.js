"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationService = void 0;
var NavigationService = /** @class */ (function () {
    function NavigationService(router) {
        this.router = router;
    }
    NavigationService.prototype.isOnLoginScreen = function () {
        return this.router.url === "/login";
    };
    NavigationService.prototype.goToLogin = function () {
        this.router.navigate(["/login"]);
    };
    NavigationService.prototype.goToDashboard = function () {
        this.router.navigate(["/dashboard"]);
    };
    NavigationService.prototype.goToUsers = function () {
        this.router.navigate(["/users"]);
    };
    NavigationService.prototype.goToUser = function (id) {
        this.router.navigate(["/users/" + id]);
    };
    return NavigationService;
}());
exports.NavigationService = NavigationService;
//# sourceMappingURL=navigation.service.js.map