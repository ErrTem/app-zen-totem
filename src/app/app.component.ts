import { Component, OnInit } from '@angular/core';
import { Store } from "@ngxs/store";

import { SetUserInfo } from "@ngxs/profile.actions";
import { USER_INFO } from "@shared/constants/localstorage-names";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app-zen-totem';
  constructor(private readonly store: Store) {
  }
  ngOnInit(): void {
    this.setUserInfoToStore();
  }

  private setUserInfoToStore(): void {
    const userInfo = localStorage.getItem(USER_INFO);
    if (userInfo) {
      this.store.dispatch(new SetUserInfo(JSON.parse(userInfo)));
    }
  }
}
