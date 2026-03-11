import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectCartItems, selectCartTotal } from '../../../store/selectors';
import { clearCart } from '../../../store/cartSlice';
import type { CheckoutLocationState } from '../../../types';

const generateOrderNumber = () =>
  `000000${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

/**
 * ConfirmStep - shows order summary, then Thank you page after submit.
 */
const ConfirmStep: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const state = location.state as CheckoutLocationState | null;
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const [orderNumber] = useState(generateOrderNumber);
  const [orderDate] = useState(() =>
    new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  );
  const [submitted, setSubmitted] = useState(false);
  const [savedItems] = useState(cartItems);
  const [savedTotal] = useState(cartTotal);

  if (!state?.contactData || !state?.shipmentData) {
    navigate('/checkout/contact');
    return null;
  }

  const handleSubmit = (): void => {
    dispatch(clearCart());
    setSubmitted(true);
  };

  const shipment = state.shipmentData;
  const contact = state.contactData;

  if (submitted) {
    return (
      <div>
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your order!</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            The order confirmation email with details of your order and a link to track its progress has been sent to your email address.
          </p>
          <p className="text-sm font-semibold text-gray-800 mt-2">
            Your order # is {orderNumber} – PENDING
          </p>
          <p className="text-xs text-gray-500">Order Date: {orderDate}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="border border-gray-200 rounded p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
              <span className="text-green-500">👤</span> Contact information
            </h3>
            <p className="text-xs text-gray-700">{contact.email}</p>
            <p className="text-xs text-gray-700">{contact.name}</p>
            <p className="text-xs text-gray-700">{contact.phone}</p>
          </div>
          <div className="border border-gray-200 rounded p-4">
            <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
              <span className="text-green-500">📦</span> Shipment information
            </h3>
            <p className="text-xs text-gray-700">{shipment.address}</p>
            <p className="text-xs text-gray-700">{shipment.city}, {shipment.postalCode}</p>
            <p className="text-xs text-gray-700">{shipment.country}</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded p-4 mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1">
            <span className="text-green-500">🛒</span> Order summary
          </h3>
          <div className="space-y-3">
            {savedItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3 border-b border-gray-100 pb-3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-gray-50 rounded p-1 flex-shrink-0"
                />
                <div>
                  <p className="text-xs text-gray-700 leading-tight">{item.title}</p>
                  <p className="text-xs font-semibold text-gray-900 mt-1">
                    ${(item.price * item.quantity).toFixed(2)}, {item.quantity} product{item.quantity > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-2 space-y-1 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span><span>${savedTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping &amp; Handling:</span><span>$0.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax:</span><span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 pt-2 border-t">
              <span>Grand Total:</span><span>${savedTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition-colors text-sm"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm order</h2>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Contact Information</h3>
        <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
          <p>{contact.name}</p>
          <p>{contact.email}</p>
          <p>{contact.phone}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Shipment Information</h3>
        <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
          <p>{shipment.address}</p>
          <p>{shipment.city}, {shipment.postalCode}</p>
          <p>{shipment.country}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Order Items</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100">
            <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain bg-gray-50 rounded" />
            <div className="flex-1 text-xs text-gray-700">{item.title}</div>
            <div className="text-xs font-semibold text-gray-800 whitespace-nowrap">
              x{item.quantity} — ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
        <div className="flex justify-between font-bold text-sm mt-3 pt-2 border-t">
          <span>Total:</span>
          <span>${cartTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => navigate('/checkout/shipment', { state: { ...state, completedSteps: [1] } })}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded transition-colors text-sm"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition-colors text-sm"
        >
          Submit Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmStep;
