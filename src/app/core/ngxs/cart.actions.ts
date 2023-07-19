import { CartItem } from '@core/interfaces/product.interface';

export class AddProductToCart {
  static readonly type = '[Cart] Add';

  constructor(public product: CartItem) {}
}

export class RemoveProductFromCart {
  static readonly type = '[Cart] Remove';

  constructor(public product: CartItem) {}
}

export class RemoveAllProductsFromCart {
  static readonly type = '[Cart] RemoveAll';

  constructor() {}
}

export class IncreaseProductQuantity {
  static readonly type = '[Cart] IncreaseProductQuantity';

  constructor(public product: CartItem) {}
}

export class DecreaseProductQuantity {
  static readonly type = '[Cart] DecreaseProductQuantity';

  constructor(public product: CartItem) {}
}
