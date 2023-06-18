import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotifyMessageComponent } from './notify-message/notify-message.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NotifyMessageComponent,
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
    NotifyMessageComponent,
  ]
})
export class CoreModule { }
