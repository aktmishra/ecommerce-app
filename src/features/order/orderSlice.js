import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchAllOrders,
  fetchOrdersByFilters,
  updateOrder,
} from "./orderApi";

const initialState = {
  allOrders: [],
  orders: [],
  currentOrder: null,
  totalOrdersCount: 0,
  status: "idle",
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "product/fetchAllOrders",
  async () => {
    const response = await fetchAllOrders();
    // console.log(response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchOrdersByFiltersAsync = createAsyncThunk(
  "product/fetchOrdersByFilters",
  async ({ sort, pagination }) => {
    const response = await fetchOrdersByFilters(sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "product/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    console.log(response.data);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    currentOrderReset: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.allOrders = action.payload;
        state.totalOrdersCount = action.payload.length;
      })
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrdersByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.orders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        state.orders[index] = action.payload;
      });
  },
});

export const { currentOrderReset } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrder = (state) => state.order.orders;
export const selectTotalOrder = (state) => state.order.totalOrdersCount;
export default orderSlice.reducer;
