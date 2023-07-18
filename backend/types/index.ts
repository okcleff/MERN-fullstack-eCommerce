import { Request } from "express";
import { Schema } from "mongoose";

export interface IReview {
  name: string;
  rating: number;
  comment: string;
  user: Schema.Types.ObjectId;
}

export interface IProduct {
  user: Schema.Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  reviews: IReview;
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

export interface IUserRequest extends Request {
  user: {
    _id: string;
    name: string;
  };
}

export interface IOrderItem {
  _id: string;
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Schema.Types.ObjectId;
}

export interface IOrder {
  user: Schema.Types.ObjectId;
  orderItems: IOrderItem[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: {
    id: string;
    status: string;
    update_time: string;
    email_address: string;
  };
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
}
