import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const projectInfoSlice = createSlice({
  name: "projectInfo",
  initialState,
  reducers: {
    projectInfoLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    projectInfoSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    projectInfoError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetProjectInfo: (state) => {
      state.loading = false;
      state.data = null;
      state.error = null;
    },
  },
});

export const {
  projectInfoLoading,
  projectInfoSuccess,
  projectInfoError,
  resetProjectInfo,
} = projectInfoSlice.actions;

export default projectInfoSlice.reducer;