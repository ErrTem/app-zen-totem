import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CartComponent,
  CartItemComponent,
  DeleteOrderComponent,
  HeaderComponent,
  LoginFormComponent,
  PopupComponent,
  SliderComponent,
  SnackBarComponent
} from './components';
import { MaterialModule } from '@shared/UI-kit/material/material.module';
import { CoreModule } from '@core/core.module';
import { LimitTotalPricePipe } from '@shared/pipes/limit-total-price.pipe';

const COMPONENTS = [
  CartComponent,
  CartItemComponent,
  DeleteOrderComponent,
  HeaderComponent,
  LoginFormComponent,
  PopupComponent,
  SliderComponent,
  SnackBarComponent,
  LimitTotalPricePipe,
];

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    CoreModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    MaterialModule,
    ...COMPONENTS,
  ],
})

export class SharedModule {
}
