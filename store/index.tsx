import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";
import searchDetailSlice from "./searchDetailSlice";
import scrollSlice from "./scrollSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    searchDetail: searchDetailSlice,
    scroll: scrollSlice,
    modal: modalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
