import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrdersData } from '@utils-types';

type TFeedState = {
  orders: TOrdersData['orders'];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk('feed/fetch', async () => {
  const data = await getFeedsApi();
  return data;
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      });
  }
});

export const selectFeedOrders = (state: { feed: TFeedState }) =>
  state.feed.orders;
export const selectFeedTotal = (state: { feed: TFeedState }) =>
  state.feed.total;
export const selectFeedTotalToday = (state: { feed: TFeedState }) =>
  state.feed.totalToday;
export const selectFeedLoading = (state: { feed: TFeedState }) =>
  state.feed.isLoading;
export const selectFeedError = (state: { feed: TFeedState }) =>
  state.feed.error;

export default feedSlice.reducer;
