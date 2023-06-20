import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      return true;
    } else {
      this.router.navigate(['auth/login']);

      return false;
    }
  }
}
