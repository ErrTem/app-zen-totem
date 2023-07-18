import { Component, Input } from '@angular/core';
import { Store } from '@ngxs/store';

import { ProductInterface } from '@core/interfaces/product.interface';
import { DecreaseProductQuantity, IncreaseProductQuantity, RemoveProductFromBasket } from '@core/ngxs/basket.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.sass']
})
export class CartItemComponent {
  @Input() cartItem!: ProductInterface;

  constructor(
    private readonly store: Store,
    ) {
  }

  public decreaseProductQuantity(cartItem: ProductInterface):void {
    cartItem.quantity! > 1
      ? this.store.dispatch(new DecreaseProductQuantity(cartItem))
      : this.store.dispatch(new RemoveProductFromBasket(cartItem));
  }

  public increaseProductQuantity(cartItem: ProductInterface): void {
    this.store.dispatch(new IncreaseProductQuantity(cartItem));
  }

  public removeProductFromCart(product: ProductInterface): void {
    this.store.dispatch(new RemoveProductFromBasket(product));
  }
}
