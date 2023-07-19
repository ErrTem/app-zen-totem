export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartItem extends ProductInterface {
  quantity: number;
}
