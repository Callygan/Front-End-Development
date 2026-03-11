import { useAppDispatch } from '../../store/hooks';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import type { CartItemRowProps } from '../../types';

/**
 * CartItem component - displays a single item in the shopping cart.
 * Supports optional quantity controls for incrementing, decrementing, and removing items.
 */
const CartItem: React.FC<CartItemRowProps> = ({ item, showControls = true }) => {
  const dispatch = useAppDispatch();

  /** Increase the item quantity by 1. */
  const handleIncrement = (): void => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  /** Decrease the item quantity by 1. Removes the item if quantity reaches 0. */
  const handleDecrement = (): void => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
  };

  /** Remove the item from the cart entirely. */
  const handleRemove = (): void => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-200">
      {/* Item Thumbnail */}
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
      />

      {/* Item Details */}
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">{item.title}</h4>
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      {showControls && (
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            -
          </button>

          <span className="w-8 text-center text-sm font-medium">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrement}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded transition-colors"
          >
            +
          </button>

          <button
            onClick={handleRemove}
            className="ml-2 text-red-500 hover:text-red-700 transition-colors"
            title="Remove item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Subtotal */}
      <div className="text-sm font-semibold text-gray-700 w-20 text-right">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
