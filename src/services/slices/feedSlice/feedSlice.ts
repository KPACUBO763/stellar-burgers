import { FEED_SLICE_NAME } from '../sliceNames';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

interface IFeedState {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null | undefined;
}

export const getFeeds = createAsyncThunk(
  'feeds',
  async () => await getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orderNumber',
  async (number: number) => {
    const res = await getOrderByNumberApi(number);

    return res;
  }
);

const initialState: IFeedState = {
  feeds: [],
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
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.error = null;
      });
  },
  selectors: {
    getLoadingFeedsSelector: (state) => state.isLoading,
    getFeedsSelector: (state) => state.feeds,
    getTotalSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday
  }
});

export const {
  getFeedsSelector,
  getTotalSelector,
  getTotalTodaySelector,
  getLoadingFeedsSelector
} = feedSlice.selectors;
