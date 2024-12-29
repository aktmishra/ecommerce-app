import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchLoggedInUserDetails,
  fetchLoggedInUserOrder,
  updateUser,
} from "./userApi";

const initialState = {
  userCompleteInfo: null,
  userOrders: [],
  status: "idle",
};

export const fetchLoggedInUserDetailsAsync = createAsyncThunk(
  "user/fetchLoggedInUserDetails",
  async (userId) => {
    const response = await fetchLoggedInUserDetails(userId);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response.data;
  }
);

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrder",
  async (userId) => {
    const response = await fetchLoggedInUserOrder(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update) => {
    const response = await updateUser(update);
    console.log(response);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserDetailsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserDetailsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userCompleteInfo = action.payload;
      })
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userCompleteInfo = action.payload;
      });
  },
});

export const {} = userSlice.actions;
export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserCompleteInfo = (state) => state.user.userCompleteInfo;
export default userSlice.reducer;
