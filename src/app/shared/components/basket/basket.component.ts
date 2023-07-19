import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BasketState } from '@core/ngxs/basket.state';
import { CartItem, ProductInterface } from '@core/interfaces/product.interface';
import { getModalConfig } from '@shared/utils/getModalConfig';
import { DeleteOrderComponent } from '@shared/components';
import { AuthService } from '@core/services';
import { RemoveAllProductsFromBasket } from '@core/ngxs/basket.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class BasketComponent  {

  @Select(BasketState.getProducts) products$!: Observable<CartItem[]>;
  @Select(BasketState.getTotalPrice) totalPrice$!: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<BasketComponent>
  ) {
  }

  public openDialog(
    component: ComponentType<DeleteOrderComponent> = DeleteOrderComponent
  ): void {
    this.dialog.closeAll();
    this.dialog.open(
      component,
      getModalConfig(500, 200, 'app-delete-dialog', {isCart: true})
    );
  }

  public confirmOrder(): void {
    if (!this.authService.getUserInfo()) {
      this.closeDialog();
      this.router.navigate(['login']);
    } else {
      this.store.dispatch(new RemoveAllProductsFromBasket())
      console.log('success')
    }
  }
  public closeDialog(): void {
    this.dialogRef.close();
  }
}
