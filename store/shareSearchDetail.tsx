import { createSlice } from "@reduxjs/toolkit";

const shareSearchDetail = createSlice({
  name: "shareSearchDetail",
  initialState: {
    shareStatus: "pending",
    label: "",
  },
  reducers: {
    setStatus: (state, action) => {
      state.shareStatus = action.payload;
    },
    setLabel: (state, action) => {
      state.label = action.payload;
    },
  },
});

export const shareSearchDetailAction = shareSearchDetail.actions;
export default shareSearchDetail.reducer;
