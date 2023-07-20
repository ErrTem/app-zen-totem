import { Injectable } from '@angular/core';
import { CartItem } from '@core/interfaces/product.interface';
import {
  AddProductToCart,
  DecreaseProductQuantity,
  IncreaseProductQuantity,
  RemoveProductFromCart
} from '@core/ngxs/cart.actions';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    private readonly store: Store,
  ) {
  }

  public decreaseProductQuantity(product: CartItem): void {
    product.quantity! > 1
      ? this.store.dispatch(new DecreaseProductQuantity(product))
      : this.store.dispatch(new RemoveProductFromCart(product));
  }

  public increaseProductQuantity(product: CartItem): void {
    this.store.dispatch(new IncreaseProductQuantity(product));
  }

  public addProductToCart(product: CartItem): void {
    this.store.dispatch(new AddProductToCart(product));
  }

  public removeProductFromCart(product: CartItem): void {
    this.store.dispatch(new RemoveProductFromCart(product));
  }
}
