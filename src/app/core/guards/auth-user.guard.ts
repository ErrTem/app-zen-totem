import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthUserGuard implements CanActivate { //todo how to implement correctly
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
    if ( localStorage.getItem('userInfo')) {
      return true
    } else {
      return  false
    }
  }
}
