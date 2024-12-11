export interface User {
    id: number
    full_name: string;
    email: string;
    phone_number: string;
    role: string;
    profile_picture: string;
    is_active: boolean,
    address: string,
    created_at: string,
    updated_at: string
}

export interface Vehicle {
    id: number;
    brand: string;
    model: string;
    year: number;
    registration_number: string;
    daily_rent: number;
    availability_status: boolean; 
    seating_capacity: number;
    fuel_type: string; 
    transmission: string; 
    category: string;
    location: string; 
    image_data: {
        public_id: string;
        url: string;
    }[];
    created_at: string; 
    updated_at: string; 
}

export interface Booking {
    id: number;
    user: User;
    vehicle: Vehicle;
    pickup_location: string;
    drop_off_location: string;
    booking_date: string; 
    start_date: string; 
    end_date: string; 
    total_cost: number; 
    status: string; 
    created_at: string; 
    updated_at: string; 
}