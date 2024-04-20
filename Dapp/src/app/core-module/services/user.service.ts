import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../auth-module/user.model';
import { USER_KEY } from '../../constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser$ = new BehaviorSubject<User|undefined>(undefined)

  private apiService = inject(ApiService)

  constructor(){
    const jsonStr = localStorage.getItem(USER_KEY);
    if(jsonStr){
      const user = JSON.parse( jsonStr);
      if (!user) {
        this.currentUser$.next(user)
      }
    }
    
  }

  public get CurrentUser() {
    return this.currentUser$.value
  }

  

 


  /************************************************
  * SET FUNCTION
  *************************************************/
  set(user: any) {
    localStorage.setItem(USER_KEY,JSON.stringify( user));
    this.currentUser$.next(user);
  }


  /************************************************
    * RESET FUNCTION
    *************************************************/
  reset() {
    localStorage.removeItem(USER_KEY);
    this.currentUser$.next(undefined);
  }


}
