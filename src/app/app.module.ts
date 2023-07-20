import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { HomeModule } from '@features/home/home.module';
import { ProfileModule } from '@features/profile/profile.module';
import { LoginModule } from '@features/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const FEATURES_MODULES = [
  HomeModule,
  LoginModule,
  ProfileModule
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ...FEATURES_MODULES,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
