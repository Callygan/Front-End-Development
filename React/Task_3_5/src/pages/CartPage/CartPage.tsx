import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectCartItems, selectCartTotal } from '../../store/selectors';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';

/**
 * CartPage - displays the shopping cart with items, quantities, and totals.
 * Matches the Figma design with breadcrumbs, item rows, and Next step button.
 */
const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const totalProducts = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleIncrement = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity: quantity - 1 }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleNextStep = () => {
    navigate('/checkout/contact');
  };

  return (
    <div className="container mx-auto px-6 py-6 max-w-3xl">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link to="/cart" className="text-gray-800 font-medium">Cart</Link>
        <span>›</span>
        <span>Contact information</span>
        <span>›</span>
        <span>Shipment information</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <Link to="/" className="text-green-600 hover:underline font-medium">
            Continue shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-start gap-4 py-4 border-b border-gray-200">
                {/* Product Image */}
                <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded flex items-center justify-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain p-1"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-tight mb-3 pr-8">
                    {item.title}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 text-sm font-medium"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrement(item.id, item.quantity)}
                      className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded text-gray-600 hover:bg-gray-100 text-sm font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Delete + Price */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition-colors"
                  >
                    Delete
                  </button>
                  <span className="text-sm font-semibold text-gray-900">
                    Price: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mb-6">
            <div className="flex gap-8 text-sm text-gray-700">
              <div>
                <span className="font-medium">Together: </span>
                <span>{totalProducts} products.</span>
              </div>
              <div>
                <span className="font-medium">Sum: </span>
                <span className="text-green-600 font-semibold">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Next Step Button */}
          <button
            onClick={handleNextStep}
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-8 rounded transition-colors text-sm"
          >
            Next step
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
