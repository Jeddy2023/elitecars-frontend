import React, { useEffect, useState } from 'react'
import { Vehicle } from '../../utils/types';
import { api } from '../../api/axios';
import toast from 'react-hot-toast';
import { Button, Loader } from '@mantine/core';
import VehicleTable from './VehicleTable';
import CreateVehicleModal from './CreateVehicleModal';

type Props = {}

const VehicleManagement: React.FC<Props> = ({ }) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [loading, setLoading] = useState(true);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        setLoading(true);
        try {
            const res = await api.get("/vehicles/all/");
            setVehicles(res?.data?.results);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Error fetching vehicles, please refesh the page');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateVehicle = () => {
        setOpened(true);
    };

    const handleVehicleCreated = () => {
        setOpened(false);
        fetchVehicles();
    };

    return (
        <div>
            <div className="flex justify-between items-center p-5">
                <h1 className="font-semibold">Manage Vehicles</h1>
                <Button color='#3b82f6' size='sm' onClick={handleCreateVehicle}>Register Vehicle</Button>
            </div>
            {loading ? (
                <div className="min-h-screen grid place-items-center">
                    <Loader size={50} />
                </div>
            )
                : <VehicleTable data={vehicles} fetchVehicles={fetchVehicles} />}


            <CreateVehicleModal
                opened={opened}
                onClose={() => setOpened(false)}
                onSuccess={handleVehicleCreated}
            />
        </div>
    )
}

export default VehicleManagement