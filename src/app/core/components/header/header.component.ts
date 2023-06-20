import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

import { ProfileState } from '@ngxs/profile.state';
import { UserInfoInterface } from '@core/interfaces/user.interface';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from "@core/services/auth.service";
import { SetUserInfo } from "@ngxs/profile.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit { //todo unsubscribe or use subscribeTo?

  public errorMessage: string | null = null;
  public successMessage: string | null = null;

  @Select (ProfileState.getUserInfo) userInfo$!: Observable<UserInfoInterface>;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly authService: AuthService,
    private readonly store: Store,
    ) {
  }

  ngOnInit(): void {
    this.notificationService.error$.subscribe(errorMessage => {
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = null;
      }, 30000);
    });

    this.notificationService.success$.subscribe(successMessage => {
      this.successMessage = successMessage;
      setTimeout(() => {
        this.successMessage = null;
      }, 30000);
    });
  }

  public logout(): void {
    this.authService.userLogout();
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  closeBanner(): void {
    this.errorMessage = null;
    this.successMessage = null;
  }
}
