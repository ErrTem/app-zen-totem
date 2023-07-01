import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';
import { BillingModule } from './billing/billing.module';
import { ProfileModule } from './profile/profile.module';
import { LotteryModule } from "@features/app-common/lottery/lottery.module";

import { AppCommonRoutingModule } from './app-common-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonRoutingModule,
    HomeModule,
    InventoryModule,
    ReportsModule,
    BillingModule,
    ProfileModule,
    LotteryModule,
  ],
})
export class AppCommonModule {
}
