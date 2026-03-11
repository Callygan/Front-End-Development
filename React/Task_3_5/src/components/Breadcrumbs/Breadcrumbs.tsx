import { Link } from 'react-router-dom';
import type { BreadcrumbsProps, Step } from '../../types';

/** Checkout step definitions with their labels and routes. */
const steps: Step[] = [
  { number: 1, name: 'Contact', path: '/checkout/contact' },
  { number: 2, name: 'Shipment', path: '/checkout/shipment' },
  { number: 3, name: 'Confirm', path: '/checkout/confirm' },
];

/**
 * Breadcrumbs component for the checkout flow.
 * Displays the current step, completed steps, and allows navigation
 * to previously completed steps.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ currentStep, completedSteps = [] }) => {
  return (
    <nav className="mb-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isCurrent = currentStep === step.number;
          // Can navigate only to previous or already completed steps
          const isClickable = step.number < currentStep || isCompleted;

          return (
            <li key={step.number} className="flex items-center">
              {/* Step Circle + Name */}
              {isClickable ? (
                <Link
                  to={step.path}
                  className="flex flex-col items-center"
                >
                  <span 
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 
                      font-semibold transition-colors
                      ${isCurrent 
                        ? 'border-emerald-500 bg-emerald-500 text-white' 
                        : isCompleted 
                          ? 'border-emerald-500 bg-emerald-500 text-white' 
                          : 'border-gray-300 text-gray-500'
                      }
                    `}
                  >
                    {isCompleted && !isCurrent ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </span>
                  <span 
                    className={`
                      mt-2 text-sm font-medium
                      ${isCurrent || isCompleted ? 'text-emerald-600' : 'text-gray-500'}
                    `}
                  >
                    {step.name}
                  </span>
                </Link>
              ) : (
                <div className="flex flex-col items-center cursor-not-allowed">
                  <span 
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 
                      font-semibold
                      ${isCurrent 
                        ? 'border-emerald-500 bg-emerald-500 text-white' 
                        : 'border-gray-300 text-gray-500'
                      }
                    `}
                  >
                    {step.number}
                  </span>
                  <span 
                    className={`
                      mt-2 text-sm font-medium
                      ${isCurrent ? 'text-emerald-600' : 'text-gray-500'}
                    `}
                  >
                    {step.name}
                  </span>
                </div>
              )}

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div 
                  className={`
                    w-16 sm:w-24 h-0.5 mx-2 sm:mx-4
                    ${completedSteps.includes(step.number) ? 'bg-emerald-500' : 'bg-gray-300'}
                  `} 
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;