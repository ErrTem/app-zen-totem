import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService { //todo вынести в shared?

  // constructor(
  //   private http: HttpClient,
  // ) {}
//todo fakeAPI
  // public get(url: string, params?: HttpParams | any, options?: any): Observable<any> {
  //   const param = params ? `?${params.toString()}` : '';
  //
  //   return this.http.get<any>(`${environment.API_DOMAIN}/${url}${param}`, options);
  // }
  //
  // public post(url: string, body: any | null, options?: any): Observable<any> {
  //   return this.http.post(`${environment.API_DOMAIN}/${url}`, body, options);
  // }
  //
  // public put(url: string, body?: any | null, options?: any): Observable<any> {
  //   return this.http.put(`${environment.API_DOMAIN}/${url}`, body, options );
  // }
  //
  // public patch(url: string, body: any | null, id?: string, options?: any): Observable<any> {
  //   return this.http.patch(`${environment.API_DOMAIN}/${url}${id}`, body, options);
  // }
  //
  // public delete(url: string, options?: any): Observable<any> {
  //   return this.http.delete<any>(`${environment.API_DOMAIN}/${url}`, options);
  // }

}
