import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "./modalSlice";
import postSlice from "./postSlice";
import profileSlice from "./profileSlice";
import scrollSlice from "./scrollSlice";
import searchDetailSlice from "./searchDetailSlice";
import shareSearchDetail from "./shareSearchDetail";
import themeReducer from "./themeSlice";

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    searchDetail: searchDetailSlice,
    scroll: scrollSlice,
    modal: modalSlice,
    post: postSlice,
    shareSearchDetail: shareSearchDetail,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
