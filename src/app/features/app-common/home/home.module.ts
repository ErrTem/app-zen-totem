import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';
import { ProductCardComponent } from '@shared/components';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, ProductCardComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
