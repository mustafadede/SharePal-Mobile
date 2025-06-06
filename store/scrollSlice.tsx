import { createSlice } from "@reduxjs/toolkit";

const scrollSlice = createSlice({
  name: "scroll",
  initialState: {
    scrollPosition: 0,
  },
  reducers: {
    updateScrollPosition: (state, action) => {
      state.scrollPosition = action.payload;
    },
  },
});

export const scrollActions = scrollSlice.actions;
export default scrollSlice.reducer;
