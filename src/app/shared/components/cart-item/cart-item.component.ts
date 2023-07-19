import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';

import { CartItem, ProductInterface } from '@core/interfaces/product.interface';
import { DecreaseProductQuantity, IncreaseProductQuantity, RemoveProductFromCart } from '@core/ngxs/cart.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CartItemComponent {
  @Input() cartItem!: CartItem;

  constructor(
    private readonly store: Store,
    ) {
  }

  public decreaseProductQuantity(cartItem: CartItem):void {
    cartItem.quantity! > 1
      ? this.store.dispatch(new DecreaseProductQuantity(cartItem))
      : this.store.dispatch(new RemoveProductFromCart(cartItem));
  }

  public increaseProductQuantity(cartItem: CartItem): void {
    this.store.dispatch(new IncreaseProductQuantity(cartItem));
  }

  public removeProductFromCart(product: CartItem): void {
    this.store.dispatch(new RemoveProductFromCart(product));
  }
}
