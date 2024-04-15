import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { UtilService } from '../../core-module/services/util.service';
import { ApiService } from '../../core-module/services/api.service';
import { AuthService } from '../../core-module/services/auth.service';
import { ActivatedRoute, Params, Router, RouterModule } from "@angular/router";
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppToastService } from '../../core-module/services/app-toast.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom, Subscription } from 'rxjs';
import { UserService } from '../../core-module/services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterModule, NgbAlertModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  userForm: FormGroup;
  message: any
  isSuccess?: boolean
  isFailed?: boolean

  returnUrl? : string

  private utilService = inject(UtilService)
  private apiService = inject(ApiService)
  private authService = inject(AuthService)
  private userService = inject(UserService)
  private router = inject(Router)

  private routeSubscription: Subscription|undefined=undefined;

  constructor(
    public toastService: AppToastService,
    private route: ActivatedRoute,
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(this.utilService.EMAIL_REGEX)]),
      password: new FormControl('', [Validators.required])
    })

    if (this.authService.hasLoggedIn()) {
      this.router.navigateByUrl('/')
    }
  }

  ngOnInit(){
    
    this.routeSubscription=this.route.queryParams.subscribe((params: Params) => {
      this.returnUrl = params["returnUrl"]
    })
  }

  ngOnDestroy(){
    if(this.routeSubscription){
      this.routeSubscription.unsubscribe();
      this.routeSubscription = undefined
    }
  }


  /*******************************************************************
   * LOGIN
   *******************************************************************/

  login() {

    this.apiService.post('/auth/login', this.userForm.value)
      .subscribe(async data => {
        this.isSuccess = true
        this.isFailed = false
        this.message = 'Login Successful'
        this.authService.set(data.accessToken)

        

        const headers =  new HttpHeaders({
            'Authorization': 'Bearer ' + data.accessToken,
        });
    
        const userInfo = await lastValueFrom(this.apiService.get('/users/me', {headers}))

        this.userService.set(userInfo);

        this.toastService.show('Success!', 'Login Successful')
        
        this.router.navigateByUrl(this.returnUrl??'/');

        // setTimeout(() => {
        //   this.router.navigateByUrl('')
        // }, 1000)
        
      },
        err => {
          this.isFailed = true
          this.message = err.error.message
          this.toastService.error('Error!', err.error.message)

          // setTimeout(() => {
          //   location.reload()
          // }, 1000)
        })
  }

}
