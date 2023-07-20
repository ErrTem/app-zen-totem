import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@features/home/home/components/home/home.component';
import { SingleProductComponent } from '@features/home/home/components/single-product/single-product.component';
import { LoaderComponent } from '@features/home/home/components/loader/loader.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dialog',
        component: LoaderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
//todo   entryComponents: [HomeComponent, LoaderComponent] что такое и зачем нужно?
