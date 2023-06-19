import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userInfo = localStorage.getItem('userInfo');

    if (!userInfo) {
      return true;
    } else {
      this.router.navigate(['app/home']);
      return false;
    }
  }
}
