import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

/**
 * Configure the Redux store with the cart reducer.
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

/** Infer the RootState type from the store itself. */
export type RootState = ReturnType<typeof store.getState>;

/** Infer the AppDispatch type from the store itself. */
export type AppDispatch = typeof store.dispatch;
