import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import searchDetailSlice from "./searchDetailSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    searchDetail: searchDetailSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
