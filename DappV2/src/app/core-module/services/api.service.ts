import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server = environment.api
  authenticationFailEvent = new EventEmitter
  private http = inject(HttpClient)

  /****************************************************************
   * GET PUT PATCH POST DELETE FFUNCTIONS
   ****************************************************************/

  /*********************************
   * GET FUNCTION
   *********************************/
  /**
  * Get request.
  *
  * @param {string} path
  * @param {HttpParams} params
  * @return {Observable<any>}
  */
  get(path: string, options?: {
    headers?: HttpHeaders | { [header: string]: string | string[]; }, 
    params?: HttpParams

  })
    : Observable<any> {
    const url = `${this.server.url}${path}`;
    return this.http.get(
      url,
      options
    );
  }


  /*********************************
   * PUT FUNCTION
   *********************************/
  /**
   * Put request
   *
   * @param {string} path
   * @param {Object} body
   * @param {HttpParams} params
   * @return {Observable<any>}
   */
  put(path: string, body: Object = {}, params: HttpParams = new HttpParams())
    : Observable<any> {
    const url = `${this.server.url}${path}`;
    return this.http.put(
      url,
      body,
      {
        params: params
      }
    );
  }

  /*********************************
  * PATCH FUNCTION
  *********************************/
  /**
   * Patch Request
   *
   * @param {string} path
   * @param {Object} body
   * @param {HttpParams} params
   * @return {Observable<any>}
   */
  patch(path: string, body: Object = {}, params: HttpParams = new HttpParams())
    : Observable<any> {
    const url = `${this.server.url}${path}`;
    return this.http.patch(
      url,
      body,
      {
        params: params
      }
    );
  }


  /*********************************
  * POST FUNCTION
  *********************************/
  /**
   * Post Request
   *
   * @param {string} path
   * @param {Object} body
   * @param {HttpParams} params
   * @return {Observable<any>}
   */
  post(path: string, body: Object = {}, params: HttpParams = new HttpParams())
    : Observable<any> {
    const url = `${this.server.url}${path}`;
    return this.http.post(
      url,
      body,
      {
        params: params
      }
    );

  }


  /*********************************
  * DELETE FUNCTION
  *********************************/
  /**
    * Delete Request.
    *
    * @param {string} path
    * @param {HttpParams} params
    * @return {Observable<any>}
    */
  delete(path: string, params: HttpParams = new HttpParams())
    : Observable<any> {
    const url = `${this.server.url}${path}`;
    return this.http.delete(
      url,
      {
        params: params
      });
  }
}
