import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {
  NotifyMessageComponent,
  HeaderComponent,
  SidebarComponent,
} from './components';
import { MatBadgeModule } from '@angular/material/badge';

const COMPONENTS = [HeaderComponent, SidebarComponent, NotifyMessageComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  exports: [...COMPONENTS, ReactiveFormsModule],
})
export class CoreModule {}
