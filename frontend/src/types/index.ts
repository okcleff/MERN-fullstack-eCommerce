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
