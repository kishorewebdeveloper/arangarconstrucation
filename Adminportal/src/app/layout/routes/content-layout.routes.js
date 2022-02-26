"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_ROUTES = void 0;
// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...
exports.CONTENT_ROUTES = [
    {
        path: "content-layout",
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/content-layout-page/content-pages.module"); }).then(function (m) { return m.ContentPagesModule; }); },
    },
    {
        path: "login",
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/content-layout-page/login/login.module"); }).then(function (m) { return m.LoginModule; }); },
    },
    {
        path: "register",
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/content-layout-page/register/register.module"); }).then(function (m) { return m.RegisterModule; }); },
    },
    {
        path: "emailverification/:id",
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/content-layout-page/emailverification/emailverification.module"); }).then(function (m) { return m.EmailVerificationModule; }); },
    },
    {
        path: "forgotpassword",
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/content-layout-page/forgotpassword/forgotpassword.module"); }).then(function (m) { return m.ForgotPasswordModule; }); },
    },
    {
        path: "resetpassword/:id",
        loadChildren: function () { return Promise.resolve().then(function () { return require("../../pages/content-layout-page/resetpassword/resetpassword.module"); }).then(function (m) { return m.ResetPasswordModule; }); },
    },
];
//# sourceMappingURL=content-layout.routes.js.map