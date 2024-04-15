import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  FILE_TYPE = /^[.]+[jpeg jpg png webg svg]/
  // ['.jpg', '.jpeg', '.png', 'webg', '.svg']

  private apiService = inject(ApiService)

  match(field: string, confirmField: string) {
    
  }



  /**
  * Fetch list of countries form backend.
  * @param country
  */
  countries(country: string): Observable<any> {
    return this.apiService.get(`/location/country?country=${country}`);
  }

  /**
  * Fetch list cities for a query along with country.
  * @param country
  * @param city
  */
  cities(country: string, city: string): Observable<any> {

    return this.apiService.get(
      `/location/country?country=${country}&city=${city}`
    );
  }

  /**
  * Scroll to top of page.
  */
  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
