import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProjectId: null,
};

const selectedProjectIdSlice = createSlice({
  name: "selectedProject",
  initialState,
  reducers: {
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },

    resetSelectedProjectId: (state) => {
      state.selectedProjectId = null;
    },
  },
});

export const { setSelectedProjectId, resetSelectedProjectId } =
  selectedProjectIdSlice.actions;

export default selectedProjectIdSlice.reducer;