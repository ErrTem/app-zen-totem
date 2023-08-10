import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, Observable, tap, throwError } from 'rxjs';

import { UserInfoInterface } from '@core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public fetchUserInfo(): Observable<UserInfoInterface> {
    return this.http.get<UserInfoInterface>(`${this.apiUrl}/users`)
      .pipe(
        tap(() => {
          //todo add notificationService.notifyError
        }),
        catchError(error => {
          //todo add notificationService.notifyError

          return throwError(error);
        }),
      );
  }

  public updateUserInfo(userInfo: UserInfoInterface, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/1`, userInfo)
      .pipe(
        tap(() => {
          //todo add notificationService.notifyError
        }),
        catchError(error => {
          //todo add notificationService.notifyError

          return throwError(error);
        }),
      );
  }

  //todo errorInterceptor
  public test(): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/1`, 'uncorrectBody').pipe(
      tap(() => console.log('API call success')),
      catchError((error) => {
        console.log('API call error:', error);

        return throwError(error);
      })
    );
  }
}
