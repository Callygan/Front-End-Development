import { Link, Outlet, useLocation } from 'react-router-dom';
import type { CheckoutLocationState } from '../../../types';

/**
 * Layout for the checkout flow.
 * Renders the breadcrumbs and an Outlet that displays the current step
 * component (Contact, Shipment, Confirm) based on the active route.
 */

/** Determine the current checkout step number from the URL pathname. */
const getCurrentStep = (pathname: string): number => {
  if (pathname.includes('contact')) return 1;
  if (pathname.includes('shipment')) return 2;
  if (pathname.includes('confirm')) return 3;
  return 1;
};

const CheckoutLayout: React.FC = () => {
  const location = useLocation();
  const currentStep = getCurrentStep(location.pathname);
  
  // Get completed steps from location state (passed from previous steps)
  const state = location.state as CheckoutLocationState | null;
  const completedSteps = state?.completedSteps || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {currentStep !== 3 && (
          <>
            {/* Breadcrumbs - same style as CartPage */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
              {currentStep === 0 ? (
                <span className="text-emerald-600 font-medium">Cart</span>
              ) : (
                <Link to="/cart" className="text-emerald-600 font-medium hover:text-[#243573] hover:underline cursor-pointer">Cart</Link>
              )}
              <span>›</span>
              {currentStep === 1 ? (
                <span className="text-emerald-600 font-medium">Contact information</span>
              ) : completedSteps.includes(1) ? (
                <Link to="/checkout/contact" className="text-emerald-600 font-medium hover:text-[#243573] hover:underline cursor-pointer">
                  Contact information
                </Link>
              ) : (
                <span>Contact information</span>
              )}
              <span>›</span>
              {currentStep === 2 ? (
                <span className="text-emerald-600 font-medium">Shipment information</span>
              ) : completedSteps.includes(2) ? (
                <Link to="/checkout/shipment" state={state} className="text-emerald-600 font-medium hover:text-[#243573] hover:underline cursor-pointer">
                  Shipment information
                </Link>
              ) : (
                <span>Shipment information</span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {currentStep === 1 && 'Contact information'}
              {currentStep === 2 && 'Shipment information'}
            </h1>
          </>
        )}

        {/* Current step content */}
        <Outlet />
      </div>
    </div>
  );
};

export default CheckoutLayout;