import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from '../../core-module/services/util.service';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core-module/services/api.service';
import { AuthService } from '../../core-module/services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgbAlertModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {


  userForm: FormGroup;
  message: any;
  isSuccess?: boolean;
  isFailed?: boolean
  invitationToken = null

  private utilService = inject(UtilService)
  private router = inject(Router)
  private apiService = inject(ApiService)
  private authService = inject(AuthService)


  constructor(
  ) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.utilService.EMAIL_REGEX)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])

    })

    if (this.authService.hasLoggedIn()) {
      this.router.navigateByUrl('')
    }
  }

  ngOnInit(): void {
  }

  /**********************************************************************
   * Register User
   * ********************************************************************/

  signUp() {

    if (this.invitationToken) {
      this.acceptInvite()
    } else {
      this.creatAccount()
    }
  }


  /**********************************************************************
  * CREAT USER ACCOUNT FUNTCION
  * ********************************************************************/

  creatAccount() {
    const formData = {
      ...this.userForm.value,
      ignorePwnedPassword: true
    }
    this.apiService.post('/auth/register', formData)
      .subscribe({
          next: data => {
            this.isSuccess = true
            this.isFailed = false
            this.message = 'Registration Successful'
            setTimeout(() => {
              this.router.navigateByUrl('/')
            }, 2000)
          },
          error: err => {
            this.isFailed = true
            this.message = err.error.message
            this.userForm.reset()
            setTimeout(() => {
              location.reload()
            }, 1000)
          }
       })
      
  }


  /**********************************************************************
  * ACCEPT INVITE FUNTCION
  * ********************************************************************/
  acceptInvite() {

  }

}
