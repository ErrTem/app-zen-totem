import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';

import { ProfileComponent } from './profile/profile.component';
import { ProfileState } from '@ngxs/profile.state';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([ProfileState]),
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
