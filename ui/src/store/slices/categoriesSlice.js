import { createSlice } from "@reduxjs/toolkit";

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories: (state, {payload}) => {
      state.categories = payload
    },
  }
})

export const { setCategories } = categoriesSlice.actions;