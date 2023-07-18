import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { LoginComponent } from './login/login.component';
import { LoginRoutingModule } from '@features/login/login-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    LoginRoutingModule,
  ],
  exports: [
    LoginComponent,
  ],
})

export class LoginModule {
}
