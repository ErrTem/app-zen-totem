import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthUserGuard } from './core/guards/auth-user.guard';
import { LoginComponent } from './features/auth/login/login/login.component';
import { LoginGuard } from "./core/guards/login.guard";

const routes: Routes = [
  {
    path: 'app',
    redirectTo: 'app/home',
  },
  {
    path: 'app',
    loadChildren: () => import('./features/app-common/app-common.module').then(m => m.AppCommonModule),
    canActivateChild: [AuthUserGuard]
  },
  {
    path: 'auth',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
