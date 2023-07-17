import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home/home.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { LotteryComponent } from "@features/app-common/lottery/lottery/lottery.component";
import { EMPTY_STRING } from "@shared/constants/empty-string";

const routes: Routes = [
  {
    path: EMPTY_STRING,
    redirectTo: 'lottery',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'lottery',
    component: LotteryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppCommonRoutingModule { }
