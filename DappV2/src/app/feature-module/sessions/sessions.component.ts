import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss'
})
export class SessionsComponent {

  sessionsnone = [
    {name: '', scopes: '', lastused: ''}
  ]

  sessions = [
    {name: 'Android 12', lastused: '22/01/2024'}
  ]

}
