import { NgModule } from '@angular/core';
import { ProfileState } from '@core/ngxs/profile.state';
import { BasketState } from '@core/ngxs/basket.state';
import { NgxsModule } from '@ngxs/store';


@NgModule({
  imports: [
    NgxsModule.forRoot([ProfileState, BasketState]),
  ],
  declarations: [],
  exports: [],
  //todo maybe exports
})
export class CoreNgxsModule {
}
