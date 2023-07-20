export class GetAllProducts {
  static readonly type = '[Product] GetAllProducts';

  constructor() {}
}

export class GetProductById {
  static readonly type = '[Product] GetProductById';

  constructor(public id: number) {}
}
//todo refactor id to strings
export class GetProductFromServer {
  static readonly type = '[Product] GetProductFromServer';

  constructor(public id: number) {}
}

export class UpdateProductQuantity {
  static readonly type = '[Product] UpdateProductQuantity';

  constructor(public productId: number, public quantity: number) {}
}

