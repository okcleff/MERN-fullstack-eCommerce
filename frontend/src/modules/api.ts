import axios from "axios";

// types
import { IOrder } from "../types";

export const BASE_URL = ""; // If using proxy
export const PRODUCTS_URL = "/api/products";
export const USERS_URL = "/api/users";
export const ORDERS_URL = "/api/orders";
export const PAYPAL_URL = "/api/config/paypal";
export const UPLOAD_URL = "/api/upload";

export const instance = axios.create({
  baseURL: BASE_URL,
});

//---------- product api

const getProducts = async () => {
  const response = await instance.get(`${PRODUCTS_URL}`);
  return response;
};

const getProductDetails = async (productId: string) => {
  const response = await instance.get(`${PRODUCTS_URL}/${productId}`);
  return response;
};

const putProduct = async (body: {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  brand: string;
  category: string;
  countInStock: number;
}) => {
  const response = await instance.put(`${PRODUCTS_URL}/${body.id}`, body);
  return response;
};

const deleteProduct = async (id: string) => {
  const response = await instance.delete(`${PRODUCTS_URL}/${id}`);
  return response;
};

const postNewProduct = async () => {
  const response = await instance.post(`${PRODUCTS_URL}`);
  return response;
};

//---------- upload api

const uploadProductImage = async (body: FormData) => {
  const response = await instance.post(`${UPLOAD_URL}`, body);
  return response;
};

//---------- user api
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

const putProfile = async (body: {
  _id: string;
  name?: string;
  email?: string;
  password: string;
}) => {
  const response = await instance.put(`${USERS_URL}/profile`, body);
  return response;
};

const getAllUsers = async () => {
  const response = await instance.get(`${USERS_URL}`);
  return response;
};

const getUserById = async (id: string) => {
  const response = await instance.get(`${USERS_URL}/${id}`);
  return response;
};

const deleteUser = async (id: string) => {
  const response = await instance.delete(`${USERS_URL}/${id}`);
  return response;
};

const updateUser = async (body: {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}) => {
  const response = await instance.put(`${USERS_URL}/${body.id}`, body);
  return response;
};

//---------- order api

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

const getMyOrders = async () => {
  const response = await instance.get(`${ORDERS_URL}/myorders`);
  return response;
};

const getAllOrders = async () => {
  const response = await instance.get(`${ORDERS_URL}`);
  return response;
};

//---------- paypal api

const getPaypalClientId = async () => {
  const response = await instance.get(`${PAYPAL_URL}`);
  return response;
};

export {
  getProducts,
  getProductDetails,
  postNewProduct,
  putProduct,
  deleteProduct,
  uploadProductImage,
  postSignup,
  postLogin,
  postLogout,
  putProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  postOrder,
  getOrderDetails,
  putOrderToPaid,
  putOrderDelivery,
  getMyOrders,
  getAllOrders,
  getPaypalClientId,
};
