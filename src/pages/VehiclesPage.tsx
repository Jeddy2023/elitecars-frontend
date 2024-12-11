import React, { useEffect, useState } from 'react'
import { Vehicle } from '../utils/types';
import { getVehicles } from '../utils/apiHelpers';
import { styles } from '../components/styles/styles';
import Loader from '../components/common/Loader';
import VehicleCard from '../components/common/VehicleCard';
import NoAuctions from '../assets/images/empty-animate.svg';

type Props = {}

const VehiclesPage: React.FC<Props> = ({ }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [fuelType, setFuelType] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [transmission, setTransmission] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [fetchTrigger, setFetchTrigger] = useState<boolean>(true);

    useEffect(() => {
        if (fetchTrigger) {
            getVehicles(
                {
                    search,
                    fuelType,
                    transmission,
                },
                setVehicles,
                setIsLoading
            );
            setFetchTrigger(false);
        } else {
            setIsLoading(true);
            getVehicles(
                {
                    search,
                    fuelType,
                    transmission,
                },
                setVehicles,
                setIsLoading
            );
        }
    }, [fuelType, search, transmission]);

    return (
        <div
            className={`${styles.page} pt-3 bg-white dark:bg-[#0e0e0ec1] text-gray-800 dark:text-gray-200`}
        >
            <div className="mx-auto px-4">
                <div className="flex flex-col-reverse lg:flex-row-reverse lg:gap-5">
                    <div className="w-full lg:w-3/4">
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <div>
                                {vehicles && vehicles.length > 0 ? (
                                    <div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4">
                                            {vehicles.map((vehicle) => (
                                                <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img
                                            src={NoAuctions}
                                            alt="No Auctions Found"
                                            className="w-72 mx-auto"
                                        />
                                        <h1 className="text-lg font-semibold mt-4 dark:text-gray-200">
                                            No Auctions Found
                                        </h1>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehiclesPage