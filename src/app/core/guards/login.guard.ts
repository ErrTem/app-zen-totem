import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { Observable } from "rxjs";
import { USER_INFO } from "@shared/constants/localstorage-names";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userInfo = localStorage.getItem(USER_INFO);

    if (!userInfo) {
      return true;
    } else {
      this.router.navigate(['app/home']);

      return false;
    }
  }
}
