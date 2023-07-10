import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from "@ngxs/store";

import { LotteryComponent } from "@features/app-common/lottery/lottery/lottery.component";
import { LotteryState } from "@ngxs/lottery.state";


@NgModule({
  declarations: [
    LotteryComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LotteryComponent,
  ]
})
export class LotteryModule { }
