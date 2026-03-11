import type { RootState } from './store';

/**
 * Select all cart items from the store.
 */
export const selectCartItems = (state: RootState) => state.cart.items;

/**
 * Select the total number of items in the cart (sum of all quantities).
 */
export const selectCartItemsCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

/**
 * Select the total price of all items in the cart.
 */
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
