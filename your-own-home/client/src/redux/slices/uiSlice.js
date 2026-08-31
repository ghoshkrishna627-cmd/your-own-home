import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isMobileMenuOpen: false,
    activeModal: null, // e.g. 'confirmDelete', 'loginPrompt'
  },
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    openModal: (state, action) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { toggleMobileMenu, openModal, closeModal } = uiSlice.actions;
export default uiSlice.reducer;
