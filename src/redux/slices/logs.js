import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const logsSlice = createSlice({
  name: "logsSlice",
  initialState,
  reducers: {
    logsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    logsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    logsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logsInfo: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const { logsLoading, logsSuccess, logsError, logsInfo } =
  logsSlice.actions;

export default logsSlice.reducer;
