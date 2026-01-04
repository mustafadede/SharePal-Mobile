import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ScrollState = {
  currentY: number;
  lastY: number;
  direction: "up" | "down";
  scrollPosition: number;
};

const initialState: ScrollState = {
  currentY: 0,
  lastY: 0,
  direction: "up",
  scrollPosition: 0,
};

const scrollSlice = createSlice({
  name: "scroll",
  initialState: initialState,
  reducers: {
    updateScrollPosition: (state, action: PayloadAction<number>) => {
      const newY = action.payload;
      state.scrollPosition = action.payload;

      state.direction = newY > state.currentY ? "down" : "up";
      state.lastY = state.currentY;
      state.currentY = newY;
    },
  },
});

export const scrollActions = scrollSlice.actions;
export default scrollSlice.reducer;
