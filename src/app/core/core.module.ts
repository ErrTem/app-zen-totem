import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGlideModule } from 'ngx-glide';
import { RouterModule } from '@angular/router';
import { CoreNgxsModule } from '@core/ngxs/ngxs.module';
import { NgOptimizedImage } from '@angular/common';

const CORE_MODULES = [
  ReactiveFormsModule,
  NgxGlideModule,
  RouterModule,
  NgOptimizedImage,
  FormsModule,
];

@NgModule({
  imports: [
    ...CORE_MODULES,
    CoreNgxsModule,
  ],
  declarations: [],
  exports: [
    ...CORE_MODULES,
    CoreNgxsModule,
  ],
})
export class CoreModule {
}
