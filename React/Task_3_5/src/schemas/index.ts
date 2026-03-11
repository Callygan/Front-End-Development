import * as yup from 'yup';

/**
 * Yup validation schema for the Contact step form.
 * Validates name, email, and phone fields.
 */
export const contactSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone must be at least 10 characters'),
});

/**
 * Yup validation schema for the Shipment step form.
 * Validates address, city, postal code, and country fields.
 */
export const shipmentSchema = yup.object({
  address: yup
    .string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
  city: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters'),
  postalCode: yup
    .string()
    .required('Postal code is required')
    .min(4, 'Postal code must be at least 4 characters'),
  country: yup
    .string()
    .required('Country is required')
    .min(2, 'Country must be at least 2 characters'),
});