"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public_ROUTES = void 0;
// Route for content layout with sidebar, navbar and footer
exports.Public_ROUTES = [
    {
        path: 'meet',
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/public-layout-page/meet/meet.module"); }).then(function (m) { return m.MeetModule; }); }
    },
];
//# sourceMappingURL=public-layout.routes.js.map