import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';

import { CartItem, ProductInterface } from '@core/interfaces/product.interface';
import { DecreaseProductQuantity, IncreaseProductQuantity, RemoveProductFromBasket } from '@core/ngxs/basket.actions';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class BasketItemComponent {
  @Input() basketItem!: CartItem;

  constructor(
    private readonly store: Store,
    ) {
  }

  public decreaseProductQuantity(cartItem: CartItem):void {
    cartItem.quantity! > 1
      ? this.store.dispatch(new DecreaseProductQuantity(cartItem))
      : this.store.dispatch(new RemoveProductFromBasket(cartItem));
  }

  public increaseProductQuantity(cartItem: CartItem): void {
    this.store.dispatch(new IncreaseProductQuantity(cartItem));
  }

  public removeProductFromCart(product: CartItem): void {
    this.store.dispatch(new RemoveProductFromBasket(product));
  }
}
