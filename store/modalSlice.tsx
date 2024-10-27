import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalStatus: "idle",
    modalType: "",
    modalProps: [],
  },
  reducers: {
    updateStatus: (state, action) => {
      state.modalStatus = action.payload;
    },
    updateModal: (state, action) => {
      state.modalType = action.payload.modalType;
      state.modalProps.push(action.payload.modalProps);
    },
    closeModal: (state) => {
      state.modalStatus = "idle";
      state.modalType = "";
      state.modalProps = [];
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
