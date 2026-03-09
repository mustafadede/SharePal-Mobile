import { Notification } from "@/constants/Notifications";
import { createSlice } from "@reduxjs/toolkit";
type NotificationState = {
  status: false;
  data: Notification[];
};

const initialState: NotificationState = {
  status: false,
  data: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    initilizeNotifications: (state, action) => {
      state.data = action.payload;
    },
    deleteSelectedNotification: (state, action: { payload: string }) => {
      state.data = state.data.filter(
        (notification) => notification.id !== action.payload,
      );
    },
  },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
