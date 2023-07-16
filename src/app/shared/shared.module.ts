import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '@core/core.module';
import { NgxGlideModule } from 'ngx-glide';
import { LoginFormComponent, SliderComponent, SnackBarComponent } from './components';

const COMPONENTS = [LoginFormComponent, SliderComponent, SnackBarComponent];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, CoreModule, NgxGlideModule],
})
export class SharedModule {}
