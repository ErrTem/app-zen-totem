import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'speakers',
    loadChildren: () => import('./features/event-speakers/event-speakers.module').then(m => m.EventSpeakersModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

const extraOptions: ExtraOptions = {
  onSameUrlNavigation: 'reload'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
