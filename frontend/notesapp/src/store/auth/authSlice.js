import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking',
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: ( state ) => {
        state.status = 'checking',
        state.user = {},
        state.errorMessage= undefined
      },
    onLogin: (state, {payload} ) => {
      state.user = payload
      state.status = 'authenticated'
    },
    onLogout: ( state, { payload } ) => {
      state.status = 'not-authenticated',
      state.user = {},
      state.errorMessage= payload
    },
    clearErrorMessage: ( state ) => {
        state.errorMessage = undefined;
    }
  },
})

// Action creators are generated for each case reducer function
export const {onChecking, clearErrorMessage, onLogin, onLogout } = authSlice.actions