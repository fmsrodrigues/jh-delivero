import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'sonner'

import { api } from "../../lib/axios";
import { redirect } from "react-router-dom";

interface AuthState {
  isLoading: boolean;
  token: string | null
}

const initialState: AuthState = {
  isLoading: false,
  token: localStorage.getItem("@delivero/token"),
}

const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials: { email: string, password: string }) => {
    const { email, password } = credentials;

    const res = await api.post<{ access_token: string }>("/sessions", {
      email,
      password
    })

    const token = res.data.access_token;
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("@delivero/token", token);

    toast.success("Logged in successfully!");

    return token
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;

      localStorage.removeItem("@delivero/token");
      delete api.defaults.headers["Authorization"];
      
      toast.success("Logged out successfully!");
      redirect("/")
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.token = action.payload
      state.isLoading = false;
    })

    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
      toast.error("Invalid credentials!");
    })

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    })
  },
})

export const auth = authSlice.reducer;
export const authActions = {
  ...authSlice.actions,
  signIn,
};