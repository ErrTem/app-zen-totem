import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const COMPONENTS = [
  MatMenuModule,
  MatButtonModule,
  MatBadgeModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    ...COMPONENTS,
  ]
})
export class MaterialModule {
}
