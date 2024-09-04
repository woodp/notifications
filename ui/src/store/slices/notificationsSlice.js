import { createSlice } from "@reduxjs/toolkit";

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
  },
  reducers: {
    setNotifications: (state, {payload}) => {
      state.notifications = payload
    },
  }
})

export const { setNotifications } = notificationsSlice.actions;