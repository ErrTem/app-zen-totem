import { Injectable } from '@angular/core';

import { UserInfoInterface } from "@core/interfaces/user.interface";
import { USER_INFO, USER_ROLE } from "@shared/constants/localstorage-names";

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

  private loadUserInfo(): void {
    const loggedInRole = localStorage.getItem(USER_ROLE);
    if (loggedInRole) {
      this.loggedInRole = loggedInRole;
    }

    const userInfo = localStorage.getItem(USER_INFO);
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  setLoggedInRole(role: string): void {
    this.loggedInRole = role;
    localStorage.setItem(USER_ROLE, role);
  }

  getLoggedInRole(): string | null {
    return this.loggedInRole;
  }

  public setUserInfo(userInfo: UserInfoInterface): void {
    this.userInfo = userInfo;
    localStorage.setItem(USER_INFO, JSON.stringify(userInfo));
  }

  public getUserInfo(): any | null {
    return this.userInfo;
  }

  public isLoggedIn(): boolean {
    return this.userInfo !== null;
  }

  public userLogout(): void {
    this.loggedInRole = null;
    this.userInfo = null;
    localStorage.removeItem(USER_ROLE);
    localStorage.removeItem(USER_INFO);
  }
}
