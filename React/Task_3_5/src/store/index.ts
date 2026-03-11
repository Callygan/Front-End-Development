export { store } from './store';
export type { RootState, AppDispatch } from './store';
export { useAppDispatch, useAppSelector } from './hooks';
export {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from './cartSlice';
export {
  selectCartItems,
  selectCartItemsCount,
  selectCartTotal,
} from './selectors';
