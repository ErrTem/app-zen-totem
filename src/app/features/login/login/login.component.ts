import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Store } from '@ngxs/store';
import { SetUserInfo } from "@core/ngxs/profile.actions";

import { AuthService } from "@core/services/auth.service";
import { UserInfoInterface } from "@core/interfaces/user.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(
    private readonly store: Store,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  public handleLoginSubmit(loginData: UserInfoInterface): void {
    const randomRoles = ['Admin', 'User', 'Guest'];
    const randomRole = randomRoles[Math.floor(Math.random() * randomRoles.length)];

    const userData: UserInfoInterface = {...loginData, role: randomRole};
    this.authService.setUserInfo(userData);
    this.store.dispatch(new SetUserInfo(userData));

    this.router.navigate(['app/home']);
  }
}
