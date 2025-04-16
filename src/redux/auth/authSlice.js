import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, refreshUser } from './authOps';
import axios from 'axios';

export const initialState = {
  user: {
    name: null,
    email: null,
    password: '',
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload;
      axios.defaults.headers.common['Authorization'] =
        `Bearer ${action.payload}`;
    },

    logoutSuccess: (state) => {
      delete axios.defaults.headers.common['Authorization'];
      state.isLoggedIn = false;
      state.token = null;
      state.user = { name: null, email: null };
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Reducers
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
        state.isLoggedIn = false;
      })

      // Register Reducers
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload || 'Registration failed';
        state.isLoggedIn = false;
      })

      // Logout Reducers
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || 'Logout failed';
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload || 'Refresh failed';
        state.isRefreshing = false;
      })
      .addCase('persist/REHYDRATE', (state, action) => {
        if (action.payload && action.payload.auth) {
          const storedToken = action.payload.auth.token || null;
          state.token = storedToken;
          state.user = action.payload.auth.user || { name: null, email: null };
          state.isLoggedIn = !!storedToken;
          if (storedToken) {
            axios.defaults.headers.common['Authorization'] =
              `Bearer ${storedToken}`;
          }
        }
      });
  },
});
export const { setToken } = authSlice.actions;

export default authSlice.reducer;
