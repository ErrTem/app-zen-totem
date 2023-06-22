import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { CoreModule } from "@core/core.module";


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  exports: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ]
})
export class SharedModule { }
