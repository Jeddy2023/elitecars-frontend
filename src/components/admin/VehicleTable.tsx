import { Button, Flex, Input, Table, TableData, Text } from '@mantine/core'
import React, { useState } from 'react'
import { Vehicle } from '../../utils/types'
import { FiSearch } from 'react-icons/fi'
import { api } from '../../api/axios'
import toast from 'react-hot-toast'
import CreateVehicleModal from './CreateVehicleModal'

type Props = {
    data: Vehicle[],
    fetchVehicles: () => void
}

const VehicleTable: React.FC<Props> = ({ data, fetchVehicles }) => {
    const [query, setQuery] = useState<string>("");
    const [opened, setOpened] = useState<boolean>(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const filteredData = data.filter(
        (vehicle) =>
            vehicle.brand.toLowerCase().includes(query.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(query.toLowerCase()) ||
            vehicle.registration_number.toLowerCase().includes(query.toLowerCase()) ||
            vehicle.model.toLowerCase().includes(query.toLowerCase())
    );

    const handleUpdateVehicle = (vehicle: Vehicle) => {
        setSelectedVehicle(vehicle);
        setOpened(true);
    };

    const handleDeleteVehicle = async (id: number) => {
        setLoading(true);

        try {
            await api.delete(`/vehicles/delete-vehicle/${id}/`);
            fetchVehicles();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Error deleting request")
            console.error("Error deleting request:", error);
        } finally {
            setLoading(false)
        }
    };

    const tableData: TableData = {
        head: ["Brand", "Model", "Year", "Reg Num", "Rent", "Status", "Seats", "Fuel Type", "Transmission", "Category", "Location", "Date Created"],
        body: filteredData.map((vehicle: Vehicle) => [
            vehicle.brand,
            vehicle.model,
            vehicle.year,
            vehicle.registration_number,
            vehicle.daily_rent,
            vehicle.availability_status ? 'Available' : 'Not Available',
            vehicle.seating_capacity,
            vehicle.fuel_type,
            vehicle.transmission,
            vehicle.category,
            vehicle.location,
            new Date(vehicle.created_at).toDateString(),
            <Flex gap={5} key={vehicle.id}>
                <Button variant="outline" color="blue" onClick={() => handleUpdateVehicle(vehicle)}>
                    Update
                </Button>
                <Button variant="outline" color="red" onClick={() => handleDeleteVehicle(vehicle.id)} loading={loading}>
                    Delete
                </Button>
            </Flex>,
        ]),
    };

    return (
        <div className="mt-5 p-3 border">
            <div className="w-full min-h-20 border-b flex items-center justify-between p-3">
                <p className="font-semibold">Vehicles</p>
                <p className="text-blue-700">Vehicles Table</p>
            </div>
            <div className="py-5 sm:w-1/5 w-3/5">
                <Input
                    width={50}
                    value={query}
                    placeholder="Search vehicles..."
                    leftSection={<FiSearch size={16} />}
                    onChange={(event) => setQuery(event.currentTarget.value)}
                />
            </div>
            <div className="overflow-scroll">
                {filteredData.length === 0 ? (
                    <div className="text-center py-3">
                        <Text>No content found</Text>
                    </div>
                ) : (
                    <Table.ScrollContainer minWidth={700}>
                        <Table data={tableData} verticalSpacing="lg" className='customer_table' horizontalSpacing="xl" highlightOnHover />
                    </Table.ScrollContainer>
                )}
            </div>

            <CreateVehicleModal
                opened={opened}
                onClose={() => setOpened(false)}
                onSuccess={() => {
                    setOpened(false);
                    fetchVehicles();
                }}
                vehicleData={selectedVehicle}
            />
        </div>
    )
}

export default VehicleTable