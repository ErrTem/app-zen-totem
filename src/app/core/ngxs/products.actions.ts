export class GetAllProducts {
  static readonly type = '[Product] GetAllProducts';

  constructor() {}
}

export class GetProduct {
  static readonly type = '[Product] GetProduct';

  constructor(public id: number) {}
}

export class UpdateProductQuantity {
  static readonly type = '[Product] UpdateProductQuantity';

  constructor(public productId: number, public quantity: number) {}
}

