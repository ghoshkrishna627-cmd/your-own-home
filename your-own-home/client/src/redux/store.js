import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice.js';
import searchReducer from './slices/searchSlice.js';
import bookingReducer from './slices/bookingSlice.js';

/**
 * Redux holds cross-cutting UI/app state (search filters, in-progress
 * booking draft, global UI flags). User identity lives in AuthContext,
 * not here, since it's fetched once via cookie and doesn't need the
 * ceremony of actions/reducers.
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer,
    search: searchReducer,
    booking: bookingReducer,
  },
});
