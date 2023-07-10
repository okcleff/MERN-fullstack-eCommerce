export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: string;
}

export interface IProduct {
  _id: string;
  user: string;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: IReview[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

export interface ICartItem extends IProduct {
  qty: number;
}

export interface ICart {
  cartItems: ICartItem[];
  shippingAddress: string[];
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export interface IUserInfo {
  _id: string;
  email: string;
  isAdmin: boolean;
  name: string;
}
