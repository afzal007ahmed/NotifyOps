import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const organisationSlice = createSlice({
  name: "organisation",
  initialState,
  reducers: {
    fetchOrganisationSuccess: (state, action) => {
      state.data = action.payload;
    },

    fetchOrganisationError: (state) => {
      state.data = null;
    },

    resetOrganisation: (state) => {
      state.data = null;
    },
  },
});

export const {
  fetchOrganisationSuccess,
  fetchOrganisationError,
  resetOrganisation,
} = organisationSlice.actions;

export default organisationSlice.reducer;
