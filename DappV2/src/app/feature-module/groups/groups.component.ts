import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent {

  groupsnone = [
    { group: '', role: '', scopes: []}
  ]

  groups = [
    { group: 'Blue', role:'Moderator', scopes: ['Write and Read data', 'Create Shops', 'Write and Read data', 'Create Shops']}
  ]
}
