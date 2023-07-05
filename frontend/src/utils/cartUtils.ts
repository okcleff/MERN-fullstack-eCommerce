import { ICartItem, ICart } from "../types";

const FREE_SHIPPING_PRICE = 50000;
const SHIPPING_PRICE = 4000;
const TAX_RATE = 0.15;

export const updateCart = (state: ICart) => {
  // Calculate the items price
  state.itemsPrice = state.cartItems.reduce(
    (acc: number, item: ICartItem) => acc + item.price * item.qty,
    0
  );

  // Calculate the shipping price
  state.shippingPrice =
    state.itemsPrice > FREE_SHIPPING_PRICE ? 0 : SHIPPING_PRICE;

  // Calculate the tax price
  state.taxPrice = TAX_RATE * state.itemsPrice;

  // Calculate the total price
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

  // Save the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
