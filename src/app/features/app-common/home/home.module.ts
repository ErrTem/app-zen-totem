import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';
import { ProductCardComponent } from '@shared/components';
import { PRODUCT_SERVICE_TOKEN, ProductService } from '@core/services';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, SharedModule, ProductCardComponent],
  providers: [ { provide: PRODUCT_SERVICE_TOKEN, useClass: ProductService }],
  exports: [HomeComponent],
})
export class HomeModule {}
