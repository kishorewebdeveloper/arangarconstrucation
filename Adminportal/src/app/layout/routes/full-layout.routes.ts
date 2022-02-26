import { Routes, RouterModule } from "@angular/router";

// Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../pages/full-layout-page/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },

  {
    path: "eventparticipants",
    loadChildren: () =>
      import("../../pages/full-layout-page/contact/contacts.module").then(
        (m) => m.ContactsModule
      ),
  },
  {
    path: "contacts",
    loadChildren: () =>
      import("../../pages/full-layout-page/contact/contacts.module").then(
        (m) => m.ContactsModule
      ),
  },
  {
    path: "unauthorized",
    loadChildren: () =>
      import(
        "../../pages/full-layout-page/unauthorized/unauthorized.module"
      ).then((m) => m.UnAuthorizedModule),
  },
  {
    path: "projects",
    loadChildren: () =>
      import(
        "../../pages/full-layout-page/newprojects/newprojects.module"
      ).then((m) => m.NewprojectsModule),
  },
  {
    path: "users",
    loadChildren: () =>
      import(
        "../../pages/full-layout-page/users/users.module"
      ).then((m) => m.UsersModule),
  },
];
