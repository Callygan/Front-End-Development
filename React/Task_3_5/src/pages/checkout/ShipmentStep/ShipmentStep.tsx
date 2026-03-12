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
    mode: 'onTouched',
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
    `w-full px-3 py-2 border-0 border-b-2 text-sm focus:ring-0 focus:border-[#243573] outline-none transition-colors ${
      hasError ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-[#243573] mb-1">
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
          <label className="block text-xs font-medium text-[#243573] mb-1">
            Apartment suite, etc. (optional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border-0 border-b-2 border-gray-300 text-sm focus:ring-0 focus:border-[#243573] outline-none"
            placeholder="Enter your apartment information"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-medium text-[#243573] mb-1">
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
            <label className="block text-xs font-medium text-[#243573] mb-1">
              Country/Region*
            </label>
            <select
              {...register('country')}
              className={`w-full px-3 py-2 border-0 border-b-2 text-sm focus:ring-0 focus:border-[#243573] outline-none ${
                errors.country ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Select your country/region</option>
              <option value="United States">United States</option>
            </select>
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#243573] mb-1">
              State*
            </label>
            <select className="w-full px-3 py-2 border-0 border-b-2 border-gray-300 text-sm focus:ring-0 focus:border-[#243573] outline-none">
              <option value="">Select your state</option>
              <option value="Texas">Texas</option>
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Florida">Florida</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[#243573] mb-1">
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

        </div>

        {/* Submit Order button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-8 rounded transition-colors text-sm cursor-pointer"
          >
            Submit order
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipmentStep;