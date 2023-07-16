import { Selector, State, StateToken } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { ShoppingBasket } from '@core/interfaces/basket.interface';

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

}
