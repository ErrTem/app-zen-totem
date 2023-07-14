import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { CoreModule } from "@core/core.module";
import { SliderComponent } from './components/slider/slider.component';
import { NgxGlideComponent, NgxGlideModule } from 'ngx-glide';


@NgModule({
  declarations: [
    LoginFormComponent,
    SliderComponent,
  ],
  exports: [
    LoginFormComponent,
    SliderComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    NgxGlideModule,
  ]
})
export class SharedModule { }
