import { configureStore } from "@reduxjs/toolkit";
import { errorsSlice } from './slices/errorsSlice.js'
import { notificationsSlice } from './slices/notificationsSlice.js';
import { categoriesSlice } from './slices/categoriesSlice.js';

export const store = configureStore({
  reducer: {
    errors: errorsSlice.reducer,
    notifications: notificationsSlice.reducer,
    categories: categoriesSlice.reducer,
  }
})