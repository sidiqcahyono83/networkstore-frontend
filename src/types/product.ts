export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  username: string;
  fullname: string;
  ontName: string;
  redamanOlt: string;
  address: string;
  phoneNumber: string;
  paketId: string;
  areaId: string;
  odpId: string;
  modemId: string;
  pembayaranId: string;
};

export interface Item {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product;
}

export type Cart = {
  id: string;
  totalPrice: number;
  items: Item[];
  user: string;
  createdAt: Date;
  updatedAt: Date;
};
