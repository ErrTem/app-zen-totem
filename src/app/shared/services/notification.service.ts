import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private errorSubject = new Subject<string>(); //todo behSubj diff
  private successSubject = new Subject<string>();

  constructor() {
  }

  error$ = this.errorSubject.asObservable();
  success$ = this.successSubject.asObservable();

  notifyError(message: string): void {
    this.errorSubject.next(message);
  }

  notifySuccess(message: string): void {
    this.successSubject.next(message);
  }
}
