import { Outlet, useLocation } from 'react-router-dom';
import { Breadcrumbs } from '../../../components';
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
        {/* Breadcrumbs */}
        <Breadcrumbs currentStep={currentStep} completedSteps={completedSteps} />
        
        {/* Current step content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
