import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: null,
};

const projectsSlice = createSlice({
  name: "projectsSlice",
  initialState,
  reducers: {
    projectsLoading: (state) => {
      state.loading = true;
    },

    fetchingProjectsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    projectsReset: (state) => {
      state.loading = false;
      state.data = null;
    },
  },
});

export const {
  projectsLoading,
  fetchingProjectsSuccess,
  projectsReset,
} = projectsSlice.actions;

export default projectsSlice.reducer;