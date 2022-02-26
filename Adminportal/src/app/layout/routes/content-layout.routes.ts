import { Routes } from "@angular/router";

// Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...
export const CONTENT_ROUTES: Routes = [
    {
        path: "content-layout",
        loadChildren: () => import("../../pages/content-layout-page/content-pages.module").then((m) => m.ContentPagesModule),
    },
    {
        path: "login",
        loadChildren: () => import("../../pages/content-layout-page/login/login.module").then((m) => m.LoginModule),
    },
    {
        path: "register",
        loadChildren: () => import("../../pages/content-layout-page/register/register.module").then((m) => m.RegisterModule),
    },
    {
        path: "emailverification/:id",
        loadChildren: () => import("../../pages/content-layout-page/emailverification/emailverification.module").then((m) => m.EmailVerificationModule),
    },
    {
        path: "forgotpassword",
        loadChildren: () => import("../../pages/content-layout-page/forgotpassword/forgotpassword.module").then((m) => m.ForgotPasswordModule),
    },
    {
        path: "resetpassword/:id",
        loadChildren: () => import("../../pages/content-layout-page/resetpassword/resetpassword.module").then((m) => m.ResetPasswordModule),
    },
];
