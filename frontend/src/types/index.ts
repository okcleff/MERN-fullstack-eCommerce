export interface IReview {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  user: string;
  createdAt: string;
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
  product: string;
  qty: number;
}

export interface ICart {
  cartItems: ICartItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
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

export interface IOrder {
  orderItems: ICartItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

export interface IMyOrder extends IOrder {
  _id: string;
  createdAt: string;
  paidAt: string;
  deliveredAt: string;
  isPaid: boolean;
  isDelivered: boolean;
}

export interface ApiError {
  response: {
    data: {
      message: string;
    };
  };
}
