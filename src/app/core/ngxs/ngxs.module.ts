import { NgModule } from '@angular/core';
import { ProfileState } from '@core/ngxs/profile.state';
import { CartState } from '@core/ngxs/cart.state';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from '@core/ngxs/products.state';


@NgModule({
  imports: [
    NgxsModule.forRoot([ProfileState, CartState, ProductsState]),
  ],
  declarations: [],
  exports: [],
  //todo maybe exports
})
export class CoreNgxsModule {
}
