import { Component, HostBinding } from '@angular/core';
import { SidenavService } from '../../core-module/services/sidenav.service';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, NgbDropdownModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(
    public sidenavService: SidenavService
  ) { }

  @HostBinding('class.is-expanded')
  get isExpanded() {
    return this.sidenavService.isExpanded;
  }

  menuItems = [

    { name: "Dashboard", path: "dashboard", icon: "bi bi-house"},
    { name: "Store", path: "store", icon: "bi bi-house" },
    { name: "Payment", path: "payment", icon: "bi bi-house" },
    { name: "Account", path: "account", icon: "bi bi-house" },
    { name: "Settings", path: "settings", icon: "bi bi-house" },
    { name: "Documentation", path: "documentation", icon: "bi bi-house" },
  ]

}
