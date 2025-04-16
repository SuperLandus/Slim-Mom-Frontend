import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setToken } from './authSlice';

const API_URL = 'https://slimmom-backend-s8n8.onrender.com';

// REGISTER
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
      });

      return {
        accessToken: response.data.token,
        user: {
          name: response.data.data.name,
          email: response.data.data.email,
        },
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Registration failed');
    }
  },
);

// LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const token = response.data.data.accessToken;

      if (!token) throw new Error('No token received from API!');

      dispatch(setToken(token));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      return {
        accessToken: token,
        user: response.data.data.user,
      };
    } catch (error) {
      console.error('Axios hata yanıtı:', error);
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  },
);

// REFRESH
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    if (!token) return rejectWithValue('No token available');

    try {
      const response = await axios.get(`${API_URL}/users/current`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        name: response.data.name,
        email: response.data.email,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Refresh failed');
    }
  },
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    if (!token) return rejectWithValue('No token found');

    try {
      const response = await axios.post(`${API_URL}/auth/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      delete axios.defaults.headers.common['Authorization'];

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  },
);
