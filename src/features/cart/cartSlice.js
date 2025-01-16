import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchCartItemsByUserId,
  removeProductFromCart,
  // resetCart,
  updateProductQuantity,
} from "./cartAPI";
import toast from "react-hot-toast";

const initialState = {
  items: [],
  status: "idle",
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    // The value we return becomes the `fulfilled` action payload
    if (response.data.success) {
      toast.success(response.data.message)
    } 
    return response.data.data;
  }
);
export const fetchCartItemsByUserIdAsync = createAsyncThunk(
  "cart/fetchCartItemsByUserId",
  async (userId) => {
    const response = await fetchCartItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data.data;
  }
);

export const updateProductQuantityAsync = createAsyncThunk(
  "cart/updateProductQuantity",
  async ( item) => {
    const response = await updateProductQuantity(item);
    console.log(response);
    console.log(response.data);
    return response.data.data;
  }
);
export const removeProductFromCartAsync = createAsyncThunk(
  "cart/removeProductFromCart",
  async (itemId) => {
    const response = await removeProductFromCart(itemId);
    if (response.data.success) {
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
    return response.data.data;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await fetchCartItemsByUserId(userId);
    // The value we return becomes the `fulfilled` action payload
    const items = response.data.data;
    for (let item of items) {
      await removeProductFromCart(item.id);
     }
     
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
        if (index >= 0) {
          state.items.splice(index, 1); // Remove the item from the cart
        }
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const {} = cartSlice.actions;

export const selectItems = (state) => state.cart.items;

export default cartSlice.reducer;
