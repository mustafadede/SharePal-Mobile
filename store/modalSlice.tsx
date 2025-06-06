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
    updateModalType: (state, action) => {
      state.modalType = action.payload;
    },
    updateModal: (state, action) => {
      state.modalProps.push(action.payload);
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
