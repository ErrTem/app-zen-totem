import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { SuccessMessageComponent } from './success-message/success-message.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    NgOptimizedImage,
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    ErrorMessageComponent,
    SuccessMessageComponent,
  ]
})
export class CoreModule { }
