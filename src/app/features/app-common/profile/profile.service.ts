import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {catchError, Observable, tap, throwError} from 'rxjs';

import {UserInfoInterface} from '../../../shared/interfaces/user.interface';
import {NotificationService} from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'https://jsonplaceholder.typicode.com'

  constructor(
    private readonly http: HttpClient,
    private readonly notificationService: NotificationService,
  ) {
  }

  public fetchUserInfo(): Observable<UserInfoInterface> {
    return this.http.get<UserInfoInterface>(`${this.apiUrl}/users`)
      .pipe(
        tap(() => {
          this.notificationService.notifySuccess('success: Profile data updated successfully');
        }),
        catchError(error => {
          this.notificationService.notifyError('error: An error occurred');

          return throwError(error);
        }),
      );
  }

  public updateUserInfo(userInfo: UserInfoInterface, userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/1`, userInfo)
      .pipe(
        tap(() => {
          this.notificationService.notifySuccess('success: Profile data updated successfully');
        }),
        catchError(error => {
          this.notificationService.notifyError('error: An error occurred');

          return throwError(error);
        }),
      );
  }

  //todo errorInterceptor
  //todo catch error if call dont start
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


