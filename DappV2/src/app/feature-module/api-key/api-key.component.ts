import { CommonModule } from '@angular/common';
import { Component, Pipe, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipe } from 'ng2-search-filter';


@Component({
  selector: 'app-api-key',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,],
  templateUrl: './api-key.component.html',
  styleUrl: './api-key.component.scss'
})
export class ApiKeyComponent {

  searchText: any;
  public ng2searchPipe = inject(Ng2SearchPipe)
  userApikey: FormGroup;


  constructor() {
    this.userApikey = new FormGroup ({
      name: new FormControl('', []),
      scopes: new FormControl('', []),
      restrictions: new FormControl('', [])
    })

  }


  apikeysnone = [
    { name: '', scopes: '', restrictions: '' },
  ];

  apikeys = [
    { name: '11', scopes: 'Mr. Nice', restrictions: 'India' },
    { name: '12', scopes: 'Narco', restrictions: 'USA' },
    { name: '13', scopes: 'Bombasto', restrictions: 'UK' },
    { name: '14', scopes: 'Celeritas', restrictions: 'Canada' },
    { name: '15', scopes: 'Magneta', restrictions: 'Russia' },
    { name: '16', scopes: 'RubberMan', restrictions: 'China' },
    { name: '17', scopes: 'Dynama', restrictions: 'Germany' },
    { name: '18', scopes: 'Dr IQ', restrictions: 'Hong Kong' },
    { name: '19', scopes: 'Magma', restrictions: 'South Africa' },
    { name: '20', scopes: 'Tornado', restrictions: 'Sri Lanka' }
  ];

  addApikey() {
    this.apikeys.push(this.userApikey.value)
  }
}
