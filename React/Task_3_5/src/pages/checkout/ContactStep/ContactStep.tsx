import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import type { CheckoutLocationState } from '../../../types';

interface ContactFormDataExtended {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const contactSchemaExtended = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'Min 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Min 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  phone: yup.string().required('Phone is required').matches(/^\+?[0-9]+$/, 'Only + and digits allowed').min(6, 'Min 6 characters'),
});

/**
 * ContactStep - first step of checkout. Two-column layout matching Figma design.
 */
const ContactStep: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CheckoutLocationState | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormDataExtended>({
    resolver: yupResolver(contactSchemaExtended),
    mode: 'onTouched',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (data: ContactFormDataExtended): void => {
    navigate('/checkout/shipment', {
      state: {
        completedSteps: [1],
        contactData: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
        },
        shipmentData: state?.shipmentData,
      } as CheckoutLocationState,
    });
  };

  const inputClass = (hasError: boolean) =>
    `w-full py-2 border-0 border-b-2 text-sm focus:ring-0 focus:border-[#243573] outline-none transition-colors ${
      hasError ? 'border-red-400' : 'border-gray-300'
    }`;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
        {/* Row 1: First name + Last name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#243573] mb-1">
              First name*
            </label>
            <input
              type="text"
              {...register('firstName')}
              className={inputClass(!!errors.firstName)}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#243573] mb-1">
              Last name*
            </label>
            <input
              type="text"
              {...register('lastName')}
              className={inputClass(!!errors.lastName)}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Row 2: Email + Phone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#243573] mb-1">
              Email*
            </label>
            <input
              type="email"
              {...register('email')}
              className={inputClass(!!errors.email)}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-[#243573] mb-1">
              Phone*
            </label>
            <input
              type="tel"
              {...register('phone')}
              className={inputClass(!!errors.phone)}
              placeholder="Enter your phone"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        </div>

        {/* Next step button */}
        <div className="pt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-8 rounded transition-colors text-sm cursor-pointer"
          >
            Next step
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactStep;