import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '../sliceNames';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../../utils/cookie';
import {
  registerUserApi,
  loginUserApi,
  TLoginData,
  getUserApi,
  updateUserApi,
  logoutApi
} from '@api';

interface IUserState {
  user: TUser | null;
  isAuthorized: boolean;
  error: string | undefined | null;
}

export const registerUser = createAsyncThunk('/register', registerUserApi);

export const loginUser = createAsyncThunk(
  '/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res;
  }
);

export const getUser = createAsyncThunk('getUser', getUserApi);

export const updateUser = createAsyncThunk('updateUser', updateUserApi);

export const logout = createAsyncThunk('logout', logoutApi);

const initialState: IUserState = {
  user: null,
  isAuthorized: false,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get user
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthorized = true;
      })
      // Register user
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      // Login user
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthorized = true;
      })
      // Update user data
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthorized = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      });
  },
  selectors: {
    getUserSelector: (state) => state.user,
    getIsAuthorizedSelector: (state) => state.isAuthorized
  }
});

export { initialState as userInitialState };

export const { getUserSelector, getIsAuthorizedSelector } = userSlice.selectors;

export default userSlice.reducer;
