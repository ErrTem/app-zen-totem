import { Component, Input, ViewEncapsulation } from '@angular/core';

import { CartItem } from '@core/interfaces/product.interface';
import { SnackBarComponent } from '@shared/components';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '@core/services';
import { SNACKBAR_DURATION } from '@shared/constants/snackbar-duration';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;

  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly dialog: MatDialog,
    private readonly cartService: CartService,
  ) {
  }


  public decreaseProductQuantity(product: CartItem): void {
    this.cartService.decreaseProductQuantity(product);
    this.showSnackBar('Removed from basket');
  }

  public increaseProductQuantity(product: CartItem): void {
    this.cartService.increaseProductQuantity(product);
    this.showSnackBar('Added to basket');
  }

  public addProductToCart(product: CartItem): void {
    this.cartService.addProductToCart(product);
    this.showSnackBar('Added to basket');
  }

  public removeProductFromCart(product: CartItem): void {
    this.cartService.removeProductFromCart(product);
    this.showSnackBar('Removed from basket');
  }

  public showSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: SNACKBAR_DURATION,
      panelClass: 'snackbar-awesome',
      data: {
        message: message
      }
    });
  }
}
