//manage store
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isModalOpen: false
  },
  reducers: {
    onOpenModal : ( state ) => {
      state.isModalOpen = true;
    } ,
    onCloseModal : ( state ) => {
      state.isModalOpen = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal } = uiSlice.actions