import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],        
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    subscriptionsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchSubscriptionsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    fetchSubscriptionsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetSubscriptions: (state) => {
      state.loading = false;
      state.data = [];
      state.selected = null;
      state.error = null;
    },
  },
});

export const {
  subscriptionsLoading,
  fetchSubscriptionsSuccess,
  fetchSubscriptionsError,
  resetSubscriptions,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;