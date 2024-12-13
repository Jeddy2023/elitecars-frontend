import { z, ZodSchema } from 'zod';

export type SignInFormData = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(5, { message: "Password must contain at least 5 characters" })
        .max(16, { message: "Password should be less than 16 characters" })
        .refine(value => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(value), { message: "Password must contain at least one uppercase letter and one symbol" }),
});

export type RegisterFormData = {
    full_name: string;
    email: string;
    phone_number: string;
    password: string;
};

export const registerSchema: ZodSchema<RegisterFormData> = z.object({
    full_name: z
        .string()
        .trim()
        .min(1, 'Full name is required')
        .refine(
            (value) => value.split(' ').filter(Boolean).length >= 2,
            { message: 'Full name must include at least a first name and a surname' }
        ),
    email: z.string().email('Invalid email address').trim(),
    phone_number: z.string().regex(/^\d{10,15}$/, 'Phone number must be between 10 and 15 digits'),
    password: z.string()
        .min(5, { message: "Password must contain at least 5 characters" })
        .max(16, { message: "Password should be less than 16 characters" })
        .refine(value => /^(?=.*[A-Z])(?=.*[\W_]).{5,}$/.test(value), { message: "Password must contain at least one uppercase letter and one symbol" })
});

export const vehicleSchema = z.object({
    brand: z.string().nonempty({ message: "Brand is required" }),
    model: z.string().nonempty({ message: "Model is required" }),
    year: z
        .number()
        .int({ message: "Year must be a valid number" })
        .min(1900, { message: "Year must be after 1900" })
        .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
    registration_number: z.string().nonempty({ message: "Registration number is required" }),
    daily_rent: z
        .string()
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Daily rent must be a valid amount" }),
    availability_status: z.boolean(),
    seating_capacity: z.number().min(1, { message: "Seating capacity must be at least 1" }),
    fuel_type: z.enum(["Petrol", "Diesel", "Electric"], { message: "Fuel type is required" }),
    transmission: z.enum(["Automatic", "Manual"], { message: "Transmission type is required" }),
    category: z.enum(["SUV", "Sedan", "Hatchback"], { message: "Category is required" }),
    location: z.string().nonempty({ message: "Location is required" })
});

export type VehicleSchemaType = z.infer<typeof vehicleSchema>;

export const createBookingSchema = z.object({
    pickup_location: z.string().nonempty({ message: "Pickup location is required" }),
    drop_off_location: z.string().nonempty({ message: "Drop-off location is required" }),
    start_date: z.date({ required_error: "Start date is required" }),
    end_date: z.date({ required_error: "End date is required" }),
});

export type CreateBookingSchemaType = z.infer<typeof createBookingSchema>;

export type ProfileSchemaType = {
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
};

export const ProfileSchema: ZodSchema<ProfileSchemaType> = z.object({
    full_name: z.string().trim().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address').trim(),
    phone_number: z.string().min(10, 'Invalid phone number').max(15, 'Invalid phone number'),
    address: z.string().min(3, 'Address is too short').max(100, 'Address is too long'),
});