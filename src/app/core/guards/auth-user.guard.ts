import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthUserGuard implements CanActivate { //todo how to implement correctly, make call to API
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth = true;

    if (isAuth) {
      return true;
    } else {
      return this.router.navigate(['auth/login']);
    }
  }
}
