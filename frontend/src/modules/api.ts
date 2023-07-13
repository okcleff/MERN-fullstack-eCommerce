import axios from "axios";

// types
import { IOrder } from "../types";

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

const getProductDetails = async (productId: string) => {
  const response = await instance.get(`${PRODUCTS_URL}/${productId}`);
  return response;
};

const postSignup = async (body: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await instance.post(`${USERS_URL}/signup`, body);
  return response;
};

const postLogin = async (body: { email: string; password: string }) => {
  const response = await instance.post(`${USERS_URL}/login`, body);
  return response;
};

const postLogout = async () => {
  const response = await instance.post(`${USERS_URL}/logout`);
  return response;
};

const postOrder = async (body: IOrder) => {
  const response = await instance.post(`${ORDERS_URL}`, body);
  return response;
};

const getOrderDetails = async (id: string) => {
  const response = await instance.get(`${ORDERS_URL}/${id}`);
  return response;
};

const putOrderToPaid = async ({
  id,
  details,
}: {
  id: string;
  details: any;
}) => {
  const response = await instance.put(`${ORDERS_URL}/${id}/pay`, {
    ...details,
  });
  return response;
};

const putOrderDelivery = async (id: string) => {
  const response = await instance.put(`${ORDERS_URL}/${id}/deliver`);
  return response;
};

const getPaypalClientId = async () => {
  const response = await instance.get(`${PAYPAL_URL}`);
  return response;
};

const putProfile = async (body: {
  _id: string;
  name?: string;
  email?: string;
  password: string;
}) => {
  const response = await instance.put(`${USERS_URL}/profile`, body);
  return response;
};

const getMyOrders = async () => {
  const response = await instance.get(`${ORDERS_URL}/myorders`);
  return response;
};

export {
  getProducts,
  getProductDetails,
  postSignup,
  postLogin,
  postLogout,
  postOrder,
  getOrderDetails,
  putOrderToPaid,
  putOrderDelivery,
  getPaypalClientId,
  putProfile,
  getMyOrders,
};
