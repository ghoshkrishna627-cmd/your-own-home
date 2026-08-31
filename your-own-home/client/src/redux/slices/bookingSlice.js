import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listingId: null,
  checkIn: null,
  checkOut: null,
  guests: 1,
  // Estimate only — the backend recalculates and is authoritative.
  estimate: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookingDraft: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearBookingDraft: () => initialState,
  },
});

export const { setBookingDraft, clearBookingDraft } = bookingSlice.actions;
export default bookingSlice.reducer;
