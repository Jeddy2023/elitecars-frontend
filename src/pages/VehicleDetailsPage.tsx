import React, { useEffect, useState, useContext } from "react";
import { Modal, TextInput, Button, Alert, LoadingOverlay, Badge } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { MdError } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Vehicle } from "../utils/types";
import { api } from "../api/axios";
import { useTheme } from "../hooks/ThemeContext";
import { UserContext } from "../hooks/userContext";
import { createBookingSchema, CreateBookingSchemaType } from "../utils/schemas/schemas";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const VehicleDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [bookingModalOpened, setBookingModalOpened] = useState(false);

    const { getCurrentTheme } = useTheme();
    const { accessToken } = useContext(UserContext);
    const currentTheme = getCurrentTheme();
    const modalBgColor = currentTheme === "dark" ? "bg-black" : "bg-white";

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<CreateBookingSchemaType>({
        resolver: zodResolver(createBookingSchema),
    });

    useEffect(() => {
        const fetchVehicleDetails = async () => {
            setIsLoading(true);
            try {
                const response = await api.get(`/vehicles/vehicle/${id}/`);
                setVehicle(response.data);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to fetch vehicle details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchVehicleDetails();
    }, [id]);

    const formatDate = (date: Date | null): string => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleBookingSubmit: SubmitHandler<CreateBookingSchemaType> = async (data) => {
        setIsLoading(true);
        setError("");
        try {

            const bookingData = {
                ...data,
                vehicle: vehicle?.id,
            };

            console.log(bookingData)

            const response = await api.post("/bookings/create/", bookingData);
            console.log("This is the response", response)
            toast.success(response.data.message || "Booking created successfully!");
            reset();
            setBookingModalOpened(false);
        } catch (err: any) {
            console.log("This is the error", err)
            setError(err.response?.data?.message || "Failed to create booking.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleBookButtonClick = () => {
        if (!accessToken) {
            toast.error("Login to access this resource.");
            return;
        }
        setBookingModalOpened(true);
    };

    return (
        <div className="p-6">
            <LoadingOverlay visible={isLoading} overlayProps={{ radius: "sm", blur: 2 }} />

            {error && (
                <Alert
                    variant="light"
                    color="red"
                    title="Error"
                    icon={<MdError />}
                    withCloseButton
                    onClose={() => setError("")}
                    className="mb-4"
                >
                    {error}
                </Alert>
            )}

            {vehicle ? (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img src={vehicle.image_data[0]?.url} alt={vehicle.brand} className="rounded-lg shadow-md" />
                        </div>

                        {/* Right Details Section */}
                        <div className="flex flex-col justify-between">
                            <h2 className="text-4xl font-extrabold mb-4">{`${vehicle.brand} ${vehicle.model}`}</h2>
                            <div className="text-lg space-y-4">
                                <p className="text-gray-700">
                                    <span className="font-semibold">Year:</span> {vehicle.year}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Registration Number:</span> {vehicle.registration_number}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Seating Capacity:</span> {vehicle.seating_capacity}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Fuel Type:</span> {vehicle.fuel_type}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Trasmission:</span> {vehicle.transmission}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Category:</span> {vehicle.category}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Location:</span> {vehicle.location}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Daily Rent:</span>{" "}
                                    <span className="text-xl font-bold text-bg-general">${vehicle.daily_rent}</span> /day
                                </p>
                                <Badge
                                    color={'#ff992e'}
                                    variant="outline"
                                    size="lg"
                                    className="w-fit"
                                >
                                    {vehicle.availability_status ? "Available" : "Not Available"}
                                </Badge>
                            </div>
                            <Button
                                onClick={handleBookButtonClick}
                                disabled={!vehicle.availability_status}
                                className="mt-8 w-full py-3 text-lg font-semibold bg-bg-general hover:bg-bg-general transition-all"
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>

                    {/* Booking Modal */}
                    <Modal
                        opened={bookingModalOpened}
                        onClose={() => {
                            setBookingModalOpened(false);
                            reset();
                        }}
                        title="Book Vehicle"
                        centered
                        classNames={{
                            content: `transition-colors duration-300 ${modalBgColor}`,
                            header: `${modalBgColor}`,
                        }}
                    >
                        <form onSubmit={handleSubmit(handleBookingSubmit)}>
                            <TextInput
                                label="Pickup Location"
                                {...register("pickup_location")}
                                error={errors.pickup_location?.message}
                                placeholder="Enter pickup location"
                            />
                            <TextInput
                                label="Drop-off Location"
                                {...register("drop_off_location")}
                                error={errors.drop_off_location?.message}
                                placeholder="Enter drop-off location"
                            />
                            <Controller
                                name="start_date"
                                control={control}
                                render={({ field }) => (
                                    <DateInput
                                        label="Start Date"
                                        placeholder="Select start date"
                                        error={errors.start_date?.message}
                                        value={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(formatDate(date))}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                            <Controller
                                name="end_date"
                                control={control}
                                render={({ field }) => (
                                    <DateInput
                                        label="End Date"
                                        placeholder="Select end date"
                                        error={errors.end_date?.message}
                                        value={field.value ? new Date(field.value) : null}
                                        onChange={(date) => field.onChange(formatDate(date))}
                                        onBlur={field.onBlur}
                                    />
                                )}
                            />
                            <Button type="submit" className="mt-4 w-full" color={'#ff992e'}>
                                Submit Booking
                            </Button>
                        </form>
                    </Modal>
                </div>
            ) : (
                <p className="text-center text-lg text-gray-500">Loading vehicle details...</p>
            )}
        </div>
    );
};

export default VehicleDetails;
