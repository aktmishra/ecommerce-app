import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartItemsByUserId,
  removeProductFromCart,
  updateProductQuantity,
} from "./cartAPI";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchCartItemsByUserId",
  async (userId) => {
    const response = await fetchCartItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateProductQuantityAsync = createAsyncThunk(
  "cart/updateProductQuantity",
  async (productObject) => {
    const response = await updateProductQuantity(productObject);
    console.log(response);
    console.log(response.data);
    return response.data;
  }
);
export const removeProductFromCartAsync = createAsyncThunk(
  "cart/removeProductFromCart",
  async (productId) => {
    const response = await removeProductFromCart(productId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartItemsByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(updateProductQuantityAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateProductQuantityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
      })
      .addCase(removeProductFromCartAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeProductFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1);
      });
  },
});

export const {} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
