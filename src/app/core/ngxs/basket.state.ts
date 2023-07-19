import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { ShoppingBasket } from '@core/interfaces/basket.interface';
import { CartItem } from '@core/interfaces/product.interface';
import {
  AddProductToBasket,
  DecreaseProductQuantity,
  IncreaseProductQuantity,
  RemoveAllProductsFromBasket,
  RemoveProductFromBasket
} from '@core/ngxs/basket.actions';
import { GetAllProducts, UpdateProductQuantity } from '@core/ngxs/products.actions';

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
  static getProducts(state: BasketStateModel): CartItem[] {
    return state.basketInfo.products;
  }

  @Action(AddProductToBasket)
  addProductToBasket(
    {getState, patchState, dispatch}: StateContext<BasketStateModel>,
    {product}: AddProductToBasket
  ): void {
    const state = getState();
    const updatedProducts = [...state.basketInfo.products];
    updatedProducts.push({...product, quantity: 1});

    dispatch(new UpdateProductQuantity(product.id, 1));

    const totalPrice = updatedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

    const updatedBasket: ShoppingBasket = {
      ...state.basketInfo,
      products: updatedProducts,
      basketTotalPrice: totalPrice,
      basketTotalQuantity: totalQuantity
    };

    patchState({
      basketInfo: updatedBasket
    });
  }

  @Action(RemoveProductFromBasket)
  removeProductFromBasket(
    {getState, patchState, dispatch}: StateContext<BasketStateModel>,
    {product}: RemoveProductFromBasket
  ): void {
    const state = getState();
    const updatedProducts = state.basketInfo.products.filter(item => item.id !== product.id);

    dispatch(new UpdateProductQuantity(product.id, 0));

    const totalPrice = updatedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

    const updatedBasket: ShoppingBasket = {
      ...state.basketInfo,
      products: updatedProducts,
      basketTotalPrice: totalPrice,
      basketTotalQuantity: totalQuantity
    };

    patchState({
      basketInfo: updatedBasket
    });
  }

  @Action(RemoveAllProductsFromBasket)
  removeAllProductsFromBasket({patchState, dispatch}: StateContext<BasketStateModel>): void {

    dispatch(new GetAllProducts());

    patchState({
      basketInfo: defaultBasket
    });
  }

  @Action(IncreaseProductQuantity)
  increaseProductQuantity(
    {getState, patchState, dispatch}: StateContext<BasketStateModel>,
    {product}: IncreaseProductQuantity
  ): void {
    const state = getState();
    const updatedProducts = [...state.basketInfo.products];
    const existingProduct = updatedProducts.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
      const quantity = existingProduct.quantity;
      dispatch(new UpdateProductQuantity(product.id, quantity));
    }

    const totalPrice = updatedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

    const updatedBasket: ShoppingBasket = {
      ...state.basketInfo,
      products: updatedProducts,
      basketTotalPrice: totalPrice,
      basketTotalQuantity: totalQuantity
    };

    patchState({
      basketInfo: updatedBasket
    });
  }

  @Action(DecreaseProductQuantity)
  decreaseProductQuantity(
    {getState, patchState, dispatch}: StateContext<BasketStateModel>,
    {product}: DecreaseProductQuantity
  ): void {
    const state = getState();
    const updatedProducts = [...state.basketInfo.products];
    const existingProduct = updatedProducts.find(item => item.id === product.id);


    if (existingProduct) {
      existingProduct.quantity--;
      const quantity = existingProduct.quantity;
      dispatch(new UpdateProductQuantity(product.id, quantity));
    }

    const totalPrice = updatedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

    const updatedBasket: ShoppingBasket = {
      ...state.basketInfo,
      products: updatedProducts,
      basketTotalPrice: totalPrice,
      basketTotalQuantity: totalQuantity
    };

    patchState({
      basketInfo: updatedBasket
    });
  }
}
