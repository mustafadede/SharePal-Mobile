import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShareStatus = "loading" | "done";

type ShareSearchDetailState = {
  shareStatus: ShareStatus;
  label: string;
};

const initialState: ShareSearchDetailState = {
  shareStatus: "loading",
  label: "",
};

const shareSearchDetail = createSlice({
  name: "shareSearchDetail",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<ShareStatus>) {
      state.shareStatus = action.payload;
    },
    setLabel(state, action: PayloadAction<string>) {
      state.label = action.payload;
    },
  },
});

export const shareSearchDetailActions = shareSearchDetail.actions;
export default shareSearchDetail.reducer;
