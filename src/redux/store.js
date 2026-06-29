import { configureStore } from "@reduxjs/toolkit";
import meReducer from "./slices/me";
import projectsReducer from "./slices/projects";
import selectProjectIdReducer from "./slices/selectedProjectId";
import projectInfoReducer from "./slices/projectInfoSlice";
import subscriptionReducer from "./slices/subscriptionsSlice";
import organisationReducer from "./slices/organisationSlice"
import apiKeysReducer from "./slices/apikeysslice"
import templateReducer from "./slices/templates"
import logsReducer from "./slices/logs"

export const store = configureStore({
  reducer: {
    meReducer,
    projectsReducer,
    selectProjectIdReducer,
    projectInfoReducer,
    subscriptionReducer,
    organisationReducer,
    apiKeysReducer,
    templateReducer,
    logsReducer
  },
});
