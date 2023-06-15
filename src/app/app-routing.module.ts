import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthUserGuard } from './core/guards/auth-user.guard';
import { LoginComponent } from './features/auth/login/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'app',
    canActivate: [AuthUserGuard],
    loadChildren: () => import('./features/app-common/app-common.module').then(m => m.AppCommonModule)
  },
  // {
  //   path: '**',
  //   component: ErrorComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
