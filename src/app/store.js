import { configureStore } from '@reduxjs/toolkit'
import productReducer from "../features/product/productSlice"
import userReducer from "../features/user/userSlice"
import cartReducer from '../features/cart/cartSlice'
import orderReducer from "../features/order/orderSlice";
import authReducer from "../features/auth/authSlice"
export const store = configureStore({
  reducer: {
    product: productReducer,
    auth : authReducer,
    user : userReducer,
    cart : cartReducer,
    order: orderReducer
  },

})