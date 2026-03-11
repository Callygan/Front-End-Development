import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { shipmentSchema } from '../../../schemas';
import type { ShipmentFormData, CheckoutLocationState } from '../../../types';

/**
 * ShipmentStep - second checkout step. Matches Figma layout with address fields.
 */
const ShipmentStep: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CheckoutLocationState | null;

  if (!state?.contactData) {
    navigate('/checkout/contact');
    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShipmentFormData>({
    resolver: yupResolver(shipmentSchema),
    defaultValues: state?.shipmentData || {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  const onSubmit = (data: ShipmentFormData): void => {
    navigate('/checkout/confirm', {
      state: {
        completedSteps: [1, 2],
        contactData: state.contactData,
        shipmentData: data,
      } as CheckoutLocationState,
    });
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-colors ${
      hasError ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipment information</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-red-500 mb-1">
            Address (No. &amp; Street)*
          </label>
          <input
            type="text"
            {...register('address')}
            className={inputClass(!!errors.address)}
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>
          )}
        </div>

        {/* Apartment */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Apartment suite, etc. (optional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-green-500 outline-none"
            placeholder="Enter your apartment information"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-medium text-red-500 mb-1">
            City*
          </label>
          <input
            type="text"
            {...register('city')}
            className={inputClass(!!errors.city)}
            placeholder="Enter your city"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>

        {/* Country / State / ZIP in a row */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Country/region
            </label>
            <select
              {...register('country')}
              className={`w-full px-3 py-2 border rounded text-sm focus:ring-1 focus:ring-green-500 outline-none ${
                errors.country ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Select your country/region</option>
              <option value="United States">United States</option>
              <option value="Romania">Romania</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              State
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-green-500 outline-none">
              <option value="">Select your state</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-red-500 mb-1">
              ZIP code*
            </label>
            <input
              type="text"
              {...register('postalCode')}
              className={inputClass(!!errors.postalCode)}
              placeholder="Enter your ZIP code"
            />
            {errors.postalCode && (
              <p className="mt-1 text-xs text-red-500">{errors.postalCode.message}</p>
            )}
          </div>
        </div>

        {/* Submit Order button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-8 rounded transition-colors text-sm"
          >
            Submit order
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipmentStep;