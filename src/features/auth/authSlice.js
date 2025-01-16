import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, fetchUser, logOut } from "./authAPI";
import toast from "react-hot-toast";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
  signupSuccess: false,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    console.log(response);
    if (response.data.success) {
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
    return response.data;
  }
);
export const checkUserAsync = createAsyncThunk(
  "auth/fetchUser",
  async (loginInfo, {rejectWithValue}) => {
    try {
      const response = await fetchUser(loginInfo);
      // The value we return becomes the `fulfilled` action payload
      if (response.data.success) {
        toast.success(response.data.message)
      }
      return response.data.data;
     
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const logOutAsync = createAsyncThunk("auth/logOut", async () => {
  const response = await logOut();
  return response.data;
});

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
        state.signupSuccess = action.payload.success;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(logOutAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      });
  },
});

export const {} = userSlice.actions;

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const signupSuccess = (state) => state.auth.signupSuccess;
export const selectError = (state) => state.auth.error;

export default userSlice.reducer;
