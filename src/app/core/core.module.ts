import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from "@angular/forms";

import { NotifyMessageComponent, HeaderComponent, SidebarComponent } from './components';
import { MatButtonModule } from '@angular/material/button';

const COMPONENTS = [
  HeaderComponent,
  SidebarComponent,
  NotifyMessageComponent,
];
@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
    imports: [
        CommonModule,
        RouterLink,
        RouterModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        MatButtonModule,
    ],
  exports: [
    ...COMPONENTS,
    ReactiveFormsModule,
  ]
})
export class CoreModule { }
