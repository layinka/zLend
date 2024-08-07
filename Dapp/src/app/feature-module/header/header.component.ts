import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Web3ModalCoreButtonWrapperModule } from '../../web3modal-module/web3modal.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Web3ModalCoreButtonWrapperModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent {

}
