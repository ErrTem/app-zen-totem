import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { ShoppingBasket } from '@core/interfaces/basket.interface';
import { ProductInterface } from '@core/interfaces/product.interface';
import { AddProductToBasket } from '@core/ngxs/basket.actions';
import { Observable, tap } from 'rxjs';

export interface BasketStateModel {
  basketInfo: ShoppingBasket;
}

const defaultBasket: ShoppingBasket = {
  basketTotalPrice: 0,
  basketTotalQuantity: 0,
  customerId: null,
  products: [],
};

export const BASKET_STATE_MODEL = new StateToken<BasketStateModel>('basket');

@State<BasketStateModel>({
  name: 'BASKET_STATE_MODEL',
  defaults: {
    basketInfo: defaultBasket,
  }
})

@Injectable()
export class BasketState {

  @Selector()
  static getTotalPrice(state: BasketStateModel): number {
    return state.basketInfo.basketTotalPrice;
  }

  @Selector()
  static getTotalQuantity(state: BasketStateModel): number {
    return state.basketInfo.basketTotalQuantity;
  }

  @Selector()
  static getProducts(state: BasketStateModel): ProductInterface[] {
    return state.basketInfo.products;
  }

  @Action(AddProductToBasket)
  addProductToBasket(
    { getState, patchState }: StateContext<BasketStateModel>,
    { product }: AddProductToBasket
  ): void {
  }


}
