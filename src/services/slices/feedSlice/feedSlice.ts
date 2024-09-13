import { FEED_SLICE_NAME } from '../sliceNames';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface IFeedState {
  feeds: TOrder[];
  orderModalData: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
}

export const getFeeds = createAsyncThunk('feeds', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'orderNumber',
  getOrderByNumberApi
);

const initialState: IFeedState = {
  feeds: [],
  orderModalData: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: FEED_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get feeds
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.error = null;
      })
      // Get order by number
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.orders;
        state.error = null;
      });
  },
  selectors: {
    getFeedsSelector: (state) => state,
    getLoadingFeedsSelector: (state) => state.isLoading,
    getOrderModalDataSelector: (state) => state.orderModalData[0]
  }
});

export const {
  getFeedsSelector,
  getLoadingFeedsSelector,
  getOrderModalDataSelector
} = feedSlice.selectors;
