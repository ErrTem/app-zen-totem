import { NgModule } from '@angular/core';

import { ExtraOptions, RouterModule, Routes } from '@angular/router';

import { AuthUserGuard, LoginGuard } from '@core/guards';
import { LoginComponent } from '@features/auth/components/login/login.component';


const routes: Routes = [
  {
    path: 'app',
    redirectTo: 'app/home',
  },
  {
    path: 'app',
    loadChildren: () => import('./features/app-common/app-common.module').then(m => m.AppCommonModule),
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
    redirectTo: 'app/home',
  },
];

const extraOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
