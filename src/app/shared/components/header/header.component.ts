import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Router } from "@angular/router";

import { Observable, Subscription } from 'rxjs';

import { ProfileState } from '@core/ngxs/profile.state';
import { UserInfoInterface } from '@core/interfaces/user.interface';
import { AuthService } from "@core/services/auth.service";
import { ClearUserInfo } from "@core/ngxs/profile.actions";
import { CartState } from '@core/ngxs/cart.state';
import { MatDialog } from '@angular/material/dialog';
import { CartComponent } from '@shared/components';
import { SetSearchQuery } from '@core/ngxs/speakers.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Select(ProfileState.getUserInfo) userInfo$!: Observable<UserInfoInterface>;
  @Select(CartState.getTotalPrice) totalPrice$!: Observable<number>;
  @Select(CartState.getTotalQuantity) totalQuantity$!: Observable<number>;

  public isCustomerButtonClicked: boolean = false;
  public customerNameAbbreviation: string = '';
  private userInfoSubscription!: Subscription;
  public searchQuery: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.userInfoSubscription = this.userInfo$.subscribe((res) => {
      this.customerNameAbbreviation = res.firstName
        .substring(0, 2)
        .toUpperCase();
    })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CartComponent, {
      panelClass: 'app-cart-dialog',
      position: {
        top: '0',
        right: '0',
      },
    });
  }

  public onSearch() {
    this.store.dispatch(new SetSearchQuery(this.searchQuery));
    console.log(this.searchQuery);
  }

  public logout(): void {
    this.authService.userLogout();
    this.router.navigate(['login']);
    this.store.dispatch(new ClearUserInfo());
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  login() {
    this.router.navigate(['login']);
  }

  ngOnDestroy(): void {
    if (this.userInfoSubscription) {
      this.userInfoSubscription.unsubscribe();
    }
  }
}
