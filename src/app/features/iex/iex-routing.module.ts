import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IexComponent } from './iex/iex.component';

const routes: Routes = [
  {
    path: '',
    component: IexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IexRoutingModule {}
