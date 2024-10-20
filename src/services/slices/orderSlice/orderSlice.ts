import { ORDER_SLICE_NAME } from '../sliceNames';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrderState {
  name: string | null;
  profileOrders: TOrder[];
  isLoading: boolean;
  error: string | undefined | null;
}

export const getOrders = createAsyncThunk('orders', getOrdersApi);

const initialState: IOrderState = {
  name: null,
  profileOrders: [],
  isLoading: false,
  error: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profileOrders = action.payload;
      });
  },
  selectors: {
    getProfileOrdersSelector: (state) => state.profileOrders,
    getIsLoadingOrderSelector: (state) => state.isLoading
  }
});

export { initialState as orderInitialState };

export const { getProfileOrdersSelector, getIsLoadingOrderSelector } =
  orderSlice.selectors;

export default orderSlice.reducer;
