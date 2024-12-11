import React from 'react';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Vehicle } from '../../utils/types';

interface Props {
    vehicle: Vehicle;
}

const VehicleCard: React.FC<Props> = ({ vehicle }) => {
    const shortModelName = vehicle.model.length > 20 ? vehicle.model.substr(0, 18) + '...' : vehicle.model;

    return (
        <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white dark:bg-[#0e0e0ec1] overflow-hidden shadow-lg mx-auto">
            <div className="flex flex-col">
                <div className="flex-1 overflow-hidden">
                    <div className='relative overflow-hidden'>
                        <img
                            src={vehicle.image_data[0].url}
                            alt={`${vehicle.brand} ${vehicle.model}`}
                            className="object-cover w-full h-50 sm:h-48 md:h-56 lg:h-64 transform transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                </div>
                <div className="p-2 sm:p-4 flex flex-col flex-grow">
                    <Link to={`/vehicles/${vehicle.id}`}>
                        <h2 className="text-sm sm:text-lg font-semibold mb-2 text-gray-800 truncate dark:text-gray-200">
                            {vehicle.year} {vehicle.brand} {shortModelName}
                        </h2>
                    </Link>
                    <h4 className="text-xs sm:text-sm text-gray-600 font-medium mb-4 dark:text-gray-400">
                        From: <span className="text-black font-bold dark:text-gray-100">₦{vehicle.daily_rent.toFixed(2)}/day</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-chair"></i>
                            <span>{vehicle.seating_capacity} Seats</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-gas-pump"></i>
                            <span>{vehicle.fuel_type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-cogs"></i>
                            <span>{vehicle.transmission}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{vehicle.location}</span>
                        </div>
                    </div>
                    <Link to={`/car-listing/${vehicle.id}`}>
                        <Button
                            className="bg-bg-general hover:bg-bg-general text-white font-bold w-full !font-saira"
                            size='md'
                            disabled={!vehicle.availability_status}
                        >
                            {vehicle.availability_status ? 'Book Now' : 'Unavailable'}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;
