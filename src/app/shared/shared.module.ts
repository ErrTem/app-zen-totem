import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BasketComponent,
  CartItemComponent,
  DeleteOrderComponent,
  HeaderComponent,
  LoginFormComponent,
  PopupComponent,
  SidebarComponent,
  SliderComponent,
  SnackBarComponent
} from './components';
import { MaterialModule } from '@shared/UI-kit/material/material.module';
import { CoreModule } from '@core/core.module';

const COMPONENTS = [
  BasketComponent,
  CartItemComponent,
  DeleteOrderComponent,
  HeaderComponent,
  LoginFormComponent,
  PopupComponent,
  SidebarComponent,
  SliderComponent,
  SnackBarComponent,
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
