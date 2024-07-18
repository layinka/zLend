import { Routes } from '@angular/router';
import { LoginComponent } from './auth-module/login/login.component';
import { HomeComponent } from './feature-module/home/home.component';
import { SignUpComponent } from './auth-module/sign-up/sign-up.component';
import { DashboardComponent } from './feature-module/dashboard/dashboard.component';
import { StoreComponent } from './feature-module/store/store.component';

export const routes: Routes = [
    

    /*****************************************************************
     * OTHER ROUTES
     ******************************************************************/
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: []
    },
    {
        path: 'store',
        component: StoreComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [],
        resolve: {

        }
    },
    
    {
        path: '**',
        redirectTo: 'home'
    }
];
