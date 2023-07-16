import { ProductInterface } from '@core/interfaces/product.interface';

export class AddProductToBasket {
  static readonly type = '[Product] Add';

  constructor(public product: ProductInterface) {}
}

export class RemoveProductFromBasket {
  static readonly type = '[Product] Remove';

  constructor(public product: ProductInterface) {}
}

export class RemoveAllProductsFromBasket {
  static readonly type = '[Product] RemoveAll';

  constructor() {}
}

export class IncreaseProductQuantity {
  static readonly type = '[Product] IncreaseProductQuantity';

  constructor(public product: ProductInterface) {}
}

export class DecreaseProductQuantity {
  static readonly type = '[Product] DecreaseProductQuantity';

  constructor(public product: ProductInterface) {}
}
