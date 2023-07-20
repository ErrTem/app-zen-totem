import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from '@core/ngxs/cart.state';
import { CartItem } from '@core/interfaces/product.interface';
import { getModalConfig } from '@shared/utils/getModalConfig';
import { DeleteOrderComponent } from '@shared/components';
import { AuthService } from '@core/services';
import { RemoveAllProductsFromCart } from '@core/ngxs/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent {

  @Select(CartState.getProducts) products$!: Observable<CartItem[]>;
  @Select(CartState.getTotalPrice) totalPrice$!: Observable<number>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private readonly authService: AuthService,
    private readonly store: Store,
    private readonly dialogRef: MatDialogRef<CartComponent>
  ) {
  }
  //todo add notification for actions
  public openDialog(): void {
    const dialogRef = this.dialog.open(
      DeleteOrderComponent, getModalConfig(500, 200, 'app-delete-dialog', {isCart: true})
    );

    dialogRef.componentInstance.deleteClicked.subscribe(() => {
      this.store.dispatch(new RemoveAllProductsFromCart());
      this.dialog.closeAll();
    });
  }

  public confirmOrder(): void {
    if (!this.authService.getUserInfo()) {
      this.closeDialog();
      this.router.navigate(['login']);
    } else {
      this.store.dispatch(new RemoveAllProductsFromCart())
    }
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }
}
