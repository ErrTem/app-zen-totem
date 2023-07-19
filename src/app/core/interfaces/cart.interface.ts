import { CartItem } from '@core/interfaces/product.interface';

export interface ShoppingCart {
  cartTotalPrice: number;
  cartTotalQuantity: number;
  customerId: number | null;
  products: CartItem[];
}
