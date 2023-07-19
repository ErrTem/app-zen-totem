import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Injectable } from "@angular/core";
import { CartItem, ProductInterface } from '@core/interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { GetAllProducts, UpdateProductQuantity } from '@core/ngxs/products.actions';
import { ProductService } from '@core/services';

export interface ProductsStateModel {
  Products: CartItem[];
}

export const PRODUCTS_STATE_MODEL = new StateToken<ProductsStateModel>('Products');

@State<ProductsStateModel>({
  name: 'PRODUCTS_STATE_MODEL',
  defaults: {
    Products: [],
  }
})

@Injectable()
export class ProductsState {

  constructor(
    private readonly productService: ProductService,
  ) {
  }

  @Selector()
  static getAllProducts(state: ProductsStateModel): ProductInterface[] {
    return state.Products;
  }

  @Action(GetAllProducts)
  getAllProducts(
    {setState}: StateContext<ProductsStateModel>,
  ): Observable<ProductInterface[]> {
    return this.productService.getAllProducts()
      .pipe(
        tap(
          (data: ProductInterface[]) => {
            const productsWithQuantity = data.map(product => ({...product, quantity: 0}))

            setState({
              Products: productsWithQuantity,
            });
          }
        ))
  }

  @Action(UpdateProductQuantity)
  updateProductQuantity(
    { getState, patchState }: StateContext<ProductsStateModel>,
    { productId, quantity }: UpdateProductQuantity
  ): void {
    const state = getState();
    const updatedProducts = [...state.Products];
    const productIndex = updatedProducts.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      updatedProducts[productIndex].quantity = quantity;
      patchState({
        Products: updatedProducts,
      });
    }
  }
}
