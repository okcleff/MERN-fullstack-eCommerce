import axios from "axios";

export const BASE_URL = ""; // If using proxy
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";

export const instance = axios.create({
  baseURL: BASE_URL,
});

const getProducts = async () => {
  const response = await instance.get(`${PRODUCTS_URL}`);
  return response;
};

export { getProducts };
