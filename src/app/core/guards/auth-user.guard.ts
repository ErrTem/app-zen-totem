import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from "rxjs";
import { USER_INFO } from "@shared/constants/localstorage-names";

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userInfo = localStorage.getItem(USER_INFO);

    if (userInfo) {
      return true;
    } else {
      this.router.navigate(['login']);

      return false;
    }
  }
}
