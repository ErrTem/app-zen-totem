import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Select, Store } from '@ngxs/store';
import { ClearUserInfo, SetUserInfo } from "@core/ngxs/profile.actions";

import { AuthService } from "@core/services/auth.service";
import { UserInfoInterface } from "@core/interfaces/user.interface";
import { USER_INFO } from "@shared/constants/localstorage-names";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    const isUserLoggedIn  = !!localStorage.getItem(USER_INFO);

    if (!isUserLoggedIn) {
      this.store.dispatch(new ClearUserInfo());
      this.authService.userLogout();
    }
  }

  public handleLoginSubmit(loginData: UserInfoInterface): void {
    const randomRoles = ['Admin', 'User', 'Guest'];
    const randomRole = randomRoles[Math.floor(Math.random() * randomRoles.length)];

    const userData: UserInfoInterface = { ...loginData, role: randomRole };
    this.authService.setUserInfo(userData);
    this.store.dispatch(new SetUserInfo(userData));

    this.router.navigate(['app/home']);
  }
}
