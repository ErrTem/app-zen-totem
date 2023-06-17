import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserInfoInterface } from '../../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  //
  // private apiUrl = '' //todo FAKE API
  //
  // constructor(private http: HttpClient) { }
  //
  // public getUserInfo(): Observable<UserInfoInterface> {
  //   return this.http.get<UserInfoInterface>(`${this.apiUrl}/userinfo`);
  // }
  //
  // public updateUserInfo(userInfo: UserInfoInterface): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/userinfo`, userInfo);
  // }
}
