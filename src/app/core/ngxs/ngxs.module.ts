import { NgModule } from '@angular/core';
import { ProfileState } from '@core/ngxs/profile.state';
import { CartState } from '@core/ngxs/cart.state';
import { NgxsModule } from '@ngxs/store';
import { ProductsState } from '@core/ngxs/products.state';
import { SpeakersState } from '@core/ngxs/speakers.state';


@NgModule({
  imports: [
    NgxsModule.forRoot([ProfileState, CartState, ProductsState, SpeakersState]),
  ],
  declarations: [],
  exports: [],
})
export class CoreNgxsModule {
}
