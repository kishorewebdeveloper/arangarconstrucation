import { Routes, RouterModule } from '@angular/router';

// Route for content layout with sidebar, navbar and footer
export const Public_ROUTES: Routes = [
    {
        
        path: 'meet',
        loadChildren: () => import("../../pages/public-layout-page/meet/meet.module").then(m => m.MeetModule)
    },
    
];