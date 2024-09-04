import { createSlice } from "@reduxjs/toolkit";

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    errorMessage: undefined,
  },
  reducers: {
    setError: (state, {payload}) => {
      state.errorMessage = payload
    },
    resetErrors: (state) => {
      state.errorMessage = undefined
    },
  }
})

export const { setError, resetErrors } = errorsSlice.actions;