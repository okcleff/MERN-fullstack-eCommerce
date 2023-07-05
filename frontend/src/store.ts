import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },

  devTools: true,
});

export default store;
