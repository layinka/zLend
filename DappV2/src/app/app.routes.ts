import { Routes } from '@angular/router';
import { LoginComponent } from './auth-module/login/login.component';
import { HomeComponent } from './feature-module/home/home.component';
import { SignUpComponent } from './auth-module/sign-up/sign-up.component';
import { authGuard } from './core-module/guards/auth.guard';
import { SettingsComponent } from './feature-module/settings/settings.component';
import { DashboardComponent } from './feature-module/dashboard/dashboard.component';
import { StoreComponent } from './feature-module/store/store.component';

export const routes: Routes = [
    /*****************************************************************
     * AUTH ROUTES
     ******************************************************************/
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },

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
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
