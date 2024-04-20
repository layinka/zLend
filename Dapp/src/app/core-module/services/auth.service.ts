import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiService } from './api.service';
import { ACCESS_TOKEN_KEY, USER_KEY } from '../../constants';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new BehaviorSubject<boolean>(false)
  token: any;
  user: any;

  private userService = inject(UserService)
  private router = inject(Router)
  private apiService = inject(ApiService)

  constructor() {
    this.token = localStorage.getItem(ACCESS_TOKEN_KEY)
    this.authState.next(!!this.token)
  }

  /************************************************
   * SET FUNCTION
   *************************************************/
  /**
    * Save token to local-storage and update  Auth State.
    * @param token
    */
  set(token: any) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    this.authState.next(true);
    this.token = token;
  }


  /**
   * Clear local-storage and sign out.
   */
  signOut(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.token = null;
    this.authState.next(false);
    this.userService.reset();
    this.router.navigateByUrl('/login');
  }

  /************************************************
 * GETACCESSINFO FUNCTION
 *************************************************/
  /**
   * Get User Information
   */
  getAccessInfo() {
    this.user = localStorage.getItem('user');
    this.authState.next(!!this.user);
    return this.user
  }



  /************************************************
 * HASLOGGEDIN  FUNCTION
 *************************************************/
  /**
   * Simple check if user's is already authenticated.
   */
  hasLoggedIn(): any {
    return this.authState.getValue();
  }


//   /**********************************************************************
//    * ********************************************************************
//    * THESE ARE OTHER CODES ALMOST LIKE THE ONES ABOVE TESTING THE CODES 
//    * SAMPLES TO GET THE ONE THAT WORSKS BEST USING JWT METHOD
//    * *********************************************************************
//    ***********************************************************************/

//   /************************************************
//   * ISLOGGEDIN  FUNCTION
//   *************************************************/
//   public isLoggedIn(): boolean {
//     this.user = window.sessionStorage.getItem(USER_KEY)
//     if (this.user) {
//       return true
//     }
//     return false
//   }


//   /************************************************
//  * GETUSER  FUNCTION
//  *************************************************/
//   public getUser(): any {
//     this.user = window.sessionStorage.getItem(USER_KEY);
//     if (this.user) {
//       return JSON.parse(this.user);
//     }

//     return {};
//   }


  // /************************************************
  // * GETUSERINFO  FUNCTION
  // *************************************************/
  // getUserInfo(): Observable<any> {
  //   const headers = {
  //     headers: new HttpHeaders({
  //       'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY),
  //     })
  //   };
  //   const params = new HttpParams()

  //   return this.apiService.get('/users/', {
  //     headers: headers.headers
  //   })
  // }


}
