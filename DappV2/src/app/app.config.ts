import { ApplicationConfig, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipe, Ng2SearchPipeModule } from 'ng2-search-filter';
import { AuthInterceptorService } from './core-module/services/auth-interceptor.service';
import { Web3ModalCoreButtonWrapperModule } from './web3modal-module/web3modal.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BorrowAssetsComponent } from './pages/borrow-assets/borrow-assets.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideAnimationsAsync(),
    // provideHttpClient(withInterceptors([AuthInterceptorService])),
    CommonModule, 
    NgModule, 
    Ng2SearchPipeModule, 
    Ng2SearchPipe,
    Web3ModalCoreButtonWrapperModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    BorrowAssetsComponent
    // BrowserAnimationsModule,
    //NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
};
