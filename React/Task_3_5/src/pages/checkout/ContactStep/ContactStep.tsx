import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { contactSchema } from '../../../schemas';
import type { ContactFormData, CheckoutLocationState } from '../../../types';

const ContactStep: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obținem state-ul anterior (dacă există)
  const state = location.state as CheckoutLocationState | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    // Pre-populăm dacă avem date salvate
    defaultValues: state?.contactData || {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = (data: ContactFormData): void => {
    // Navigăm la pasul următor și salvăm datele în location.state
    navigate('/checkout/shipment', {
      state: {
        completedSteps: [1],
        contactData: data,
        shipmentData: state?.shipmentData,
      } as CheckoutLocationState,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact information</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className={`
              w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors
              ${errors.name ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`
              w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors
              ${errors.email ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone')}
            className={`
              w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors
              ${errors.phone ? 'border-red-500' : 'border-gray-300'}
            `}
            placeholder="+1 234 567 890"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactStep;
