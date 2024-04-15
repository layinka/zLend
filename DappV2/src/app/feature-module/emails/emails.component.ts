import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-emails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss'
})
export class EmailsComponent {

  emailsnone = [
    { email: '',}
  ]

  emails = [
    { email: 'hshsh@gmail.com'}
  ]
}
