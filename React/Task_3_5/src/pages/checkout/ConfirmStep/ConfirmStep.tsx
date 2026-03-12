import { useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { selectCartItems, selectCartTotal } from '../../../store/selectors';
import { clearCart } from '../../../store/cartSlice';
import type { CheckoutLocationState } from '../../../types';
import manIcon from '../../../assets/images/man_icon.png';
import truckIcon from '../../../assets/images/truck_icon.png';
import infoIcon from '../../../assets/images/info_icon.png';

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

  const savedItemsRef = useRef(cartItems);
  const savedTotalRef = useRef(cartTotal);

  const orderNumber = useMemo(() => generateOrderNumber(), []);
  const orderDate = useMemo(
    () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    []
  );

  // Clear cart on mount
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  // Redirect if missing data
  useEffect(() => {
    if (!state?.contactData || !state?.shipmentData) {
      navigate('/checkout/contact', { replace: true });
    }
  }, [state, navigate]);

  if (!state?.contactData || !state?.shipmentData) {
    return null;
  }

  const shipment = state.shipmentData;
  const contact = state.contactData;
  const items = savedItemsRef.current;
  const total = savedTotalRef.current;

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-[#243573] mb-2">Thank you for your order!</h2>
        <p className="text-sm text-[#243573] max-w-md mx-auto">
          The order confirmation email with details of your order and a link to track its progress has been sent to your email address.
        </p>
        <p className="text-sm font-semibold text-[#243573] mt-2">
          Your order # is {orderNumber} – PENDING
        </p>
        <p className="text-xs text-gray-500 mt-2">Order Date: {orderDate}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-[#243573] font-bold mb-2 flex items-center gap-1">
            <img src={manIcon} alt="Contact icon" className="w-4 h-4" /> Contact information
          </h3>
          <p className="text-sm text-gray-700">{contact.email}</p>
          <p className="text-sm text-gray-700">{contact.name}</p>
          <p className="text-sm text-gray-700">{contact.phone}</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-md">
          <h3 className="text-sm text-[#243573] font-bold mb-2 flex items-center gap-1">
            <img src={truckIcon} alt="Shipment icon" className="w-4 h-4" /> Shipment information
          </h3>
          <p className="text-sm text-gray-700">{shipment.address}</p>
          <p className="text-sm text-gray-700">{shipment.city}, {shipment.postalCode}</p>
          <p className="text-sm text-gray-700">{shipment.country}</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-sm text-[#243573] font-bold mb-3 flex items-center gap-1">
          <img src={infoIcon} alt="Order summary icon" className="w-4 h-4" /> Order summary
        </h3>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 border-b border-gray-300 pb-3">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-contain bg-gray-50 rounded p-1 flex-shrink-0"
              />
              <div className="flex flex-col justify-between self-stretch">
                <p className="text-sm text-gray-700 leading-tight">{item.title}</p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  ${(item.price * item.quantity).toFixed(2)}, {item.quantity} product{item.quantity > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-2 space-y-1 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal:</span><span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping &amp; Handling:</span><span>$0.00</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax:</span><span>$0.00</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900">
            <span>Grand Total:</span><span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded transition-colors text-sm cursor-pointer"
      >
        Continue shopping
      </button>
    </div>
  );
};

export default ConfirmStep;