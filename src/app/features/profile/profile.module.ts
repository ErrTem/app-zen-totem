import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { ProfileRoutingModule } from '@features/profile/profile-routing.module';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ProfileRoutingModule,
  ],
  exports: [
    ProfileComponent,
  ],
})

export class ProfileModule {
}
