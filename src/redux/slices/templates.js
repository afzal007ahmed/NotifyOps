import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const templatesSlice = createSlice({
  name: "templatesSlice",
  initialState,
  reducers: {
    templatesLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    templatesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    templatesError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    templatesInfo: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const { templatesLoading, templatesSuccess, templatesError, templatesInfo } =
  templatesSlice.actions;

export default templatesSlice.reducer;
