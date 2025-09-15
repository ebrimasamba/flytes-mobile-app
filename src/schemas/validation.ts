import { z } from 'zod';
import dayjs from 'dayjs';

// Place schema for validation
export const placeSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['Airport', 'City', 'Country']),
    city: z.string().optional(),
    country: z.string().optional(),
    code: z.string().optional(),
});

// Enhanced Flight Search Validation Schema with Places
export const enhancedFlightSearchSchema = z.object({
    from: placeSchema.nullable().refine((val) => val !== null, 'Departure location is required'),
    to: placeSchema.nullable().refine((val) => val !== null, 'Destination location is required'),
    departDate: z.string().min(1, 'Departure date is required'),
    returnDate: z.string().optional(),
    adults: z.number().min(1, 'At least 1 adult is required').max(9, 'Maximum 9 adults allowed'),
    children: z.number().min(0, 'Children cannot be negative').max(9, 'Maximum 9 children allowed').default(0),
    infants: z.number().min(0, 'Infants cannot be negative').max(9, 'Maximum 9 infants allowed').default(0),
    cabinClass: z.enum(['economy', 'premium_economy', 'business', 'first']).default('economy'),
    currency: z.string().default('USD'),
}).refine((data) => {
    // Check if return date is provided and is after departure date
    if (data.returnDate) {
        const departDate = dayjs(data.departDate);
        const returnDate = dayjs(data.returnDate);
        return returnDate.isAfter(departDate, 'day');
    }
    return true;
}, {
    message: 'Return date must be after departure date',
    path: ['returnDate'],
}).refine((data) => {
    // Check if from and to are different
    return data.from?.id !== data.to?.id;
}, {
    message: 'Departure and destination cannot be the same',
    path: ['to'],
});

// Legacy Flight Search Validation Schema (for backward compatibility)
export const flightSearchSchema = z.object({
    from: z.string().min(1, 'Departure location is required'),
    to: z.string().min(1, 'Destination location is required'),
    departDate: z.string().min(1, 'Departure date is required'),
    returnDate: z.string().optional(),
    adults: z.number().min(1, 'At least 1 adult is required').max(9, 'Maximum 9 adults allowed'),
    children: z.number().min(0, 'Children cannot be negative').max(9, 'Maximum 9 children allowed').default(0),
    infants: z.number().min(0, 'Infants cannot be negative').max(9, 'Maximum 9 infants allowed').default(0),
    cabinClass: z.enum(['economy', 'premium_economy', 'business', 'first']).default('economy'),
    currency: z.string().default('USD'),
}).refine((data) => {
    // Validate that return date is after departure date for round trips
    if (data.returnDate && data.departDate) {
        return dayjs(data.returnDate).isAfter(dayjs(data.departDate));
    }
    return true;
}, {
    message: 'Return date must be after departure date',
    path: ['returnDate'],
}).refine((data) => {
    // Validate that departure date is not in the past
    return dayjs(data.departDate).isAfter(dayjs().subtract(1, 'day'));
}, {
    message: 'Departure date cannot be in the past',
    path: ['departDate'],
}).refine((data) => {
    // Validate that destinations are different
    return data.from.toLowerCase() !== data.to.toLowerCase();
}, {
    message: 'Departure and destination cannot be the same',
    path: ['to'],
});

// Passenger Information Validation Schema
export const passengerSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    dateOfBirth: z.string().min(1, 'Date of birth is required').refine((date) => {
        const birthDate = dayjs(date);
        const today = dayjs();
        const age = today.diff(birthDate, 'years');
        return age >= 0 && age <= 120;
    }, {
        message: 'Please enter a valid date of birth',
    }),
    gender: z.enum(['male', 'female', 'other']),
    passportNumber: z.string().optional(),
    passportExpiry: z.string().optional(),
    nationality: z.string().optional(),
});

// Contact Information Validation Schema
export const contactSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

// Payment Information Validation Schema
export const paymentSchema = z.object({
    method: z.enum(['card', 'paypal', 'bank_transfer']),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
    cardholderName: z.string().optional(),
    billingAddress: z.object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        postalCode: z.string().optional(),
        country: z.string().optional(),
    }).optional(),
}).refine((data) => {
    // If payment method is card, validate card details
    if (data.method === 'card') {
        return data.cardNumber && data.expiryDate && data.cvv && data.cardholderName;
    }
    return true;
}, {
    message: 'Card details are required for card payments',
    path: ['cardNumber'],
}).refine((data) => {
    // Validate card number format (basic validation)
    if (data.method === 'card' && data.cardNumber) {
        const cleanNumber = data.cardNumber.replace(/\s/g, '');
        return /^\d{13,19}$/.test(cleanNumber);
    }
    return true;
}, {
    message: 'Please enter a valid card number',
    path: ['cardNumber'],
}).refine((data) => {
    // Validate expiry date format
    if (data.method === 'card' && data.expiryDate) {
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate);
    }
    return true;
}, {
    message: 'Please enter a valid expiry date (MM/YY)',
    path: ['expiryDate'],
}).refine((data) => {
    // Validate CVV
    if (data.method === 'card' && data.cvv) {
        return /^\d{3,4}$/.test(data.cvv);
    }
    return true;
}, {
    message: 'Please enter a valid CVV',
    path: ['cvv'],
});

// Booking Details Validation Schema
export const bookingSchema = z.object({
    passengers: z.object({
        adults: z.array(passengerSchema).min(1, 'At least one adult passenger is required'),
        children: z.array(passengerSchema).default([]),
        infants: z.array(passengerSchema).default([]),
    }),
    contact: contactSchema,
    payment: paymentSchema,
});

// Authentication Validation Schemas
export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

// Form Types
export type FlightSearchFormData = z.infer<typeof flightSearchSchema>;
export type PassengerFormData = z.infer<typeof passengerSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
