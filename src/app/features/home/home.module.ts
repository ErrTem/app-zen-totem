import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { SharedModule } from '@shared/shared.module';
import { ProductCardComponent } from '@shared/components';
import { PRODUCT_SERVICE_TOKEN, ProductService } from '@core/services';
import { CoreModule } from '@core/core.module';
import { HomeRoutingModule } from '@features/home/home-routing.module';
import { HostComponent } from '@features/host/host/host.component';

@NgModule({
  declarations: [
    HomeComponent,
    HostComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ProductCardComponent,
    HomeRoutingModule,
  ],
  providers: [{
    provide: PRODUCT_SERVICE_TOKEN,
    useClass: ProductService,
  }],
  exports: [
    HomeComponent,
    HostComponent,
  ],
})

export class HomeModule {
}
