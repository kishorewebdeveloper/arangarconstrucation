"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Full_ROUTES = void 0;
// Route for content layout with sidebar, navbar and footer
exports.Full_ROUTES = [
    {
        path: 'dashboard',
        loadChildren: function () { return Promise.resolve().then(function () { return require('../../pages/full-layout-page/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardModule; }); }
    },
    
    
    
    
    
    
    
   
   
    {
        path: 'eventparticipants',
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/full-layout-page/contact/contacts.module"); }).then(function (m) { return m.ContactsModule; }); }
    },
    {
        path: 'contacts',
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/full-layout-page/contact/contacts.module"); }).then(function (m) { return m.ContactsModule; }); }
    },
    {
        path: 'unauthorized',
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/full-layout-page/unauthorized/unauthorized.module"); }).then(function (m) { return m.UnAuthorizedModule; }); }
    }
];
//# sourceMappingURL=full-layout.routes.js.map