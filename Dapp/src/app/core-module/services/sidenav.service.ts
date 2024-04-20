import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  isExpanded = true

  constructor() { }

  toggleSidnav() {
    this.isExpanded = !this.isExpanded
  }

  expandSidnav() {
    this.isExpanded = true
  }

  collapseSidenav() {
    this.isExpanded = false
  }
}
