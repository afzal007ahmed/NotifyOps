import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
};

const meSlice = createSlice({
  name: "meSlice",
  initialState,
  reducers: {
    meLoading: (state) => {
      state.loading = true;
    },
    fetchingMeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    meReset: (state) => {
      state.loading = false;
      state.data = null ;
    },
  },
});

export const { meLoading, fetchingMeSuccess, meReset } =
  meSlice.actions;
export default meSlice.reducer;
