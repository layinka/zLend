import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './feature-module/header/header.component';
import { AuthService } from './core-module/services/auth.service';
import { SidebarComponent } from "./feature-module/sidebar/sidebar.component";
import { ToastsComponent } from './core-module/toasts/toasts.component';
import { Web3Service } from './core-module/services/web3.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, ToastsComponent, NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'zLend';

  public authService = inject(AuthService)
  public  w3Service = inject(Web3Service)

  private spinner = inject(NgxSpinnerService)

  constructor(){

  }

  ngOnInit(){
    // this.spinner.show();


  }
}
