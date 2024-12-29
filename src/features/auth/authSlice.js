import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUser, updateUser } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response.data;
  }
);
export const fetchUserAsync = createAsyncThunk(
  "auth/fetchUser",
  async (loginInfo) => {
    const response = await fetchUser(loginInfo);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "auth/updateUser",
  async (update) => {
    const response = await updateUser(update)
    console.log(response);
    return response.data
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(fetchUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
