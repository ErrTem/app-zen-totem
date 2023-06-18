import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { ProfileState } from '../../features/app-common/profile/ngxs/profile.state';
import { UserInfoInterface } from '../../shared/interfaces/user.interface';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  firstName: string = 'John';
  lastName: string = 'Doe';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  @Select (ProfileState.getUserNames) userInfo$!: Observable<UserInfoInterface> //todo корректно вывести в темплейт number

  constructor(private notificationService: NotificationService) {
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

  public login(): void {
    console.log('login');
  }

  closeBanner(): void {
    this.errorMessage = null;
    this.successMessage = null;
  }
}
