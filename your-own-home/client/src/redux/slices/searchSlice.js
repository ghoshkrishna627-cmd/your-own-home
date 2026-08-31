import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  location: '',
  checkIn: null,
  checkOut: null,
  guests: 1,
  minPrice: null,
  maxPrice: null,
  propertyType: null,
  bedrooms: null,
  bathrooms: null,
  amenities: [],
  minRating: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetSearchParams: () => initialState,
  },
});

export const { setSearchParams, resetSearchParams } = searchSlice.actions;
export default searchSlice.reducer;
