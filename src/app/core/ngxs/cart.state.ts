import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { ShoppingCart } from '@core/interfaces/cart.interface';
import { CartItem } from '@core/interfaces/product.interface';
import {
  AddProductToCart,
  DecreaseProductQuantity,
  IncreaseProductQuantity,
  RemoveAllProductsFromCart,
  RemoveProductFromCart
} from '@core/ngxs/cart.actions';
import { GetAllProducts, UpdateProductQuantity } from '@core/ngxs/products.actions';

export interface CartStateModel {
  cartInfo: ShoppingCart;
}

const defaultCart: ShoppingCart = {
  cartTotalPrice: 0,
  cartTotalQuantity: 0,
  customerId: null,
  products: [],
};

export const CART_STATE_MODEL = new StateToken<CartStateModel>('cart');

@State<CartStateModel>({
  name: 'CART_STATE_MODEL',
  defaults: {
    cartInfo: defaultCart,
  }
})

@Injectable()
export class CartState {

  @Selector()
  static getTotalPrice(state: CartStateModel): number {
    return state.cartInfo.cartTotalPrice;
  }

  @Selector()
  static getTotalQuantity(state: CartStateModel): number {
    return state.cartInfo.cartTotalQuantity;
  }

  @Selector()
  static getProducts(state: CartStateModel): CartItem[] {
    return state.cartInfo.products;
  }

  @Action(AddProductToCart)
  AddProductToCart(
    {getState, patchState, dispatch}: StateContext<CartStateModel>,
    {product}: AddProductToCart
  ): void {
    const state = getState();
    const updatedProducts = [...state.cartInfo.products];
    updatedProducts.push({...product, quantity: 1});

    dispatch(new UpdateProductQuantity(product.id, 1));

    const totalPrice = updatedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

    const updatedCart: ShoppingCart = {
      ...state.cartInfo,
      products: updatedProducts,
      cartTotalPrice: totalPrice,
      cartTotalQuantity: totalQuantity
    };

    patchState({
      cartInfo: updatedCart
    });
  }

  @Action(RemoveProductFromCart)
  RemoveProductFromCart(
    {getState, patchState, dispatch}: StateContext<CartStateModel>,
    {product}: RemoveProductFromCart
  ): void {
    const state = getState();
    const updatedProducts = state.cartInfo.products.filter(item => item.id !== product.id);

    dispatch(new UpdateProductQuantity(product.id, 0));

    const totalPrice = updatedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

    const updatedCart: ShoppingCart = {
      ...state.cartInfo,
      products: updatedProducts,
      cartTotalPrice: totalPrice,
      cartTotalQuantity: totalQuantity
    };

    patchState({
      cartInfo: updatedCart
    });
  }

  @Action(RemoveAllProductsFromCart)
  RemoveAllProductsFromCart({patchState, dispatch}: StateContext<CartStateModel>): void {
    console.log('RemoveAllProductsFromCart');
    dispatch(new GetAllProducts());

    patchState({
      cartInfo: defaultCart
    });
  }

  @Action(IncreaseProductQuantity)
  increaseProductQuantity(
    {getState, patchState, dispatch}: StateContext<CartStateModel>,
    {product}: IncreaseProductQuantity
  ): void {
    const state = getState();
    const updatedProducts = [...state.cartInfo.products];
    const existingProduct = updatedProducts.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity++;
      const quantity = existingProduct.quantity;
      dispatch(new UpdateProductQuantity(product.id, quantity));
    }

    const totalPrice = updatedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

    const updatedCart: ShoppingCart = {
      ...state.cartInfo,
      products: updatedProducts,
      cartTotalPrice: totalPrice,
      cartTotalQuantity: totalQuantity
    };

    patchState({
      cartInfo: updatedCart
    });
  }

  @Action(DecreaseProductQuantity)
  decreaseProductQuantity(
    {getState, patchState, dispatch}: StateContext<CartStateModel>,
    {product}: DecreaseProductQuantity
  ): void {
    const state = getState();
    const updatedProducts = [...state.cartInfo.products];
    const existingProduct = updatedProducts.find(item => item.id === product.id);


    if (existingProduct) {
      existingProduct.quantity--;
      const quantity = existingProduct.quantity;
      dispatch(new UpdateProductQuantity(product.id, quantity));
    }

    const totalPrice = updatedProducts.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = updatedProducts.reduce((total, item) => total + item.quantity, 0);

    const updatedCart: ShoppingCart = {
      ...state.cartInfo,
      products: updatedProducts,
      cartTotalPrice: totalPrice,
      cartTotalQuantity: totalQuantity
    };

    patchState({
      cartInfo: updatedCart
    });
  }
}
