import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UserInfoInterface } from '../../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) { }

  public getUserInfo(): Observable<UserInfoInterface> {
    return this.http.get<UserInfoInterface>(`${this.apiUrl}/users`);
  }

  public updateUserInfo(userInfo: UserInfoInterface): Observable<any> {
    const a = this.http.put(`${this.apiUrl}/posts/1`, userInfo);
    console.log(a)
    return a
  }
}
