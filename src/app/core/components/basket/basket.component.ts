import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BasketState } from '@ngxs/basket.state';
import { ProductInterface } from '@core/interfaces/product.interface';
import { getModalConfig } from '@shared/utils/getModalConfig';
import { DeleteOrderComponent } from '@shared/components';
import { AuthService } from '@core/services';
import { RemoveAllProductsFromBasket } from '@ngxs/basket.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass'],
})
export class BasketComponent  {

  @Select(BasketState.getProducts) products$!: Observable<ProductInterface[]>;
  @Select(BasketState.getTotalPrice) totalPrice$!: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private readonly authService: AuthService,
    private readonly store: Store,
  ) {
  }

  public openDialog(
    component: ComponentType<DeleteOrderComponent> = DeleteOrderComponent //todo how it works
  ): void {
    this.dialog.closeAll();
    this.dialog.open(
      component,
      getModalConfig(500, 200, 'app-delete-dialog', {isCart: true})
    );
  }

  public confirmOrder(): void {
    if (!this.authService.getUserInfo()) {
      this.router.navigate(['auth/login']);
    } else {
      this.store.dispatch(new RemoveAllProductsFromBasket())
      console.log('success')
    }
  }
}
