import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const apiKeysSlice = createSlice({
  name: "apiKeysSlice",
  initialState,
  reducers: {
    apiKeysLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    apiKeysSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    apiKeysError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    apiKeysInfo: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const { apiKeysLoading, apiKeysSuccess, apiKeysError, apiKeysInfo } =
  apiKeysSlice.actions;

export default apiKeysSlice.reducer;
