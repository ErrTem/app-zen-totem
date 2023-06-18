import { Injectable } from '@angular/core';

import { UserInfoInterface } from "../../shared/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInRole: string | null = null;
  private userInfo: any | null = null;

  constructor()  {
    // if user info
    this.loadUserInfo();
  }

  setLoggedInRole(role: string): void {
    this.loggedInRole = role;
    localStorage.setItem('loggedInRole', role);
  }

  getLoggedInRole(): string | null {
    return this.loggedInRole;
  }

  setUserInfo(userInfo: UserInfoInterface): void {
    this.userInfo = userInfo;
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  getUserInfo(): any | null {
    return this.userInfo;
  }

  isLoggedIn(): boolean {
    return this.loggedInRole !== null;
  }

  userLogout(): void {
    this.loggedInRole = null;
    this.userInfo = null;
    localStorage.removeItem('loggedInRole');
    localStorage.removeItem('userInfo');
  }

  private loadUserInfo(): void {
    const loggedInRole = localStorage.getItem('loggedInRole');
    if (loggedInRole) {
      this.loggedInRole = loggedInRole;
    }

    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }
}
