import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';

export const router: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'service', component: ServiceComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);