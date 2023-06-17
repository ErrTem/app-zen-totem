import { Component } from '@angular/core';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';

import { ProfileState } from '../../features/app-common/profile/ngxs/profile.state';
import { UserInfoInterface } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  isSuccessMessage = true;
  isErrorMessage = true;
  firstName: string = 'John';
  lastName: string = 'Doe';

  @Select (ProfileState.getUserNames) userInfo$!: Observable<UserInfoInterface> //todo корректно вывести в темплейт get as
  private showSuccessMessage(): void {
    this.isSuccessMessage = true;
    setTimeout(() => {
      this.closeSuccessMessage();
    }, 30000);
  }

  private closeSuccessMessage(): void {
    this.isSuccessMessage = false;
  }

  private showErrorMessage(): void {
    this.isErrorMessage = true;
  }

  private closeErrorMessage(): void {
    this.isErrorMessage = false;
  }

  public login(): void {
    console.log('login');
  }
}
