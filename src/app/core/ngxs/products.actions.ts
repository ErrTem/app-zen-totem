export class GetAllProducts {
  static readonly type = '[Product] GetAllProducts';

  constructor() {}
}

export class GetProductById {
  static readonly type = '[Product] GetProductById';

  constructor(public id: string) {}
}

export class GetProductFromServer {
  static readonly type = '[Product] GetProductFromServer';

  constructor(public id: string) {}
}

export class UpdateProductQuantity {
  static readonly type = '[Product] UpdateProductQuantity';

  constructor(public productId: number, public quantity: number) {}
}

