import { CartItem } from '@core/interfaces/product.interface';

export class AddProductToBasket {
  static readonly type = '[Basket] Add';

  constructor(public product: CartItem) {}
}

export class RemoveProductFromBasket {
  static readonly type = '[Basket] Remove';

  constructor(public product: CartItem) {}
}

export class RemoveAllProductsFromBasket {
  static readonly type = '[Basket] RemoveAll';

  constructor() {}
}

export class IncreaseProductQuantity {
  static readonly type = '[Basket] IncreaseProductQuantity';

  constructor(public product: CartItem) {}
}

export class DecreaseProductQuantity {
  static readonly type = '[Basket] DecreaseProductQuantity';

  constructor(public product: CartItem) {}
}
