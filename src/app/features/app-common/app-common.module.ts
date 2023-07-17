import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';
import { ProfileState } from '@ngxs/profile.state';
import { LotteryState } from '@ngxs/lottery.state';
import { HomeModule } from './home/home.module';
import { ProfileModule } from './profile/profile.module';
import { LotteryModule } from '@features/app-common/lottery/lottery.module';

import { AppCommonRoutingModule } from './app-common-routing.module';
import { BasketState } from '@ngxs/basket.state';

@NgModule({
  imports: [
    CommonModule,
    AppCommonRoutingModule,
    HomeModule,
    ProfileModule,
    LotteryModule,
    NgxsModule.forRoot([ProfileState, LotteryState, BasketState]),
  ],
  declarations: [
  ],
})
export class AppCommonModule {}
