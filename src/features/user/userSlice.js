import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLoggedInUserOrder } from "./userApi";

const initialState = {
  userOrders: [],
  status: "idle",
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrder",
  async (userId) => {
    const response = await fetchLoggedInUserOrder(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const {   } = userSlice.actions;
export const selectUserOrders = (state) => state.user.userOrders;
export default userSlice.reducer;
