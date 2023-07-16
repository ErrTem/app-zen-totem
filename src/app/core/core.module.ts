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
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const COMPONENTS = [HeaderComponent, SidebarComponent, NotifyMessageComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [...COMPONENTS, ReactiveFormsModule],
})
export class CoreModule {}
