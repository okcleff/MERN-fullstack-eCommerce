import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./App";
import MainPage from "./pages/MainPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<MainPage />} />
      <Route path="/product/:productId" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);
