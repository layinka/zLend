import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from '../../core-module/services/util.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userForm: FormGroup
  private utilService = inject(UtilService)

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl('',[]),
      email: new FormControl('',[]),
      company: new FormControl('',[]),
      profileImg: new FormControl('',[Validators.required, Validators.pattern(this.utilService.FILE_TYPE)]),
      role: new FormControl('',[]),
      dateofBirth: new FormControl('',[]), 
    })
  }
}
