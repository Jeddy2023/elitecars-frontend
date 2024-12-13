import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, TextInput, Button, Select, NumberInput, LoadingOverlay, Alert } from "@mantine/core";
import { MdError } from "react-icons/md";
import { toast } from "react-hot-toast";
import { api } from "../../api/axios";
import { vehicleSchema, VehicleSchemaType } from "../../utils/schemas/schemas";
import { useTheme } from "../../hooks/ThemeContext";
import { Vehicle } from "../../utils/types";

interface CreateVehicleModalProps {
    opened: boolean;
    onClose: () => void;
    onSuccess: () => void;
    vehicleData?: Vehicle;
}

const CreateVehicleModal: React.FC<CreateVehicleModalProps> = ({ opened, onClose, onSuccess, vehicleData }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        reset,
    } = useForm<VehicleSchemaType>({
        resolver: zodResolver(vehicleSchema),
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    // const [images, setImages] = useState<File[]>([]);
    const { getCurrentTheme } = useTheme();
    const currentTheme = getCurrentTheme();

    useEffect(() => {
        if (vehicleData) {
            setValue("brand", vehicleData.brand);
            setValue("model", vehicleData.model);
            setValue("year", vehicleData.year);
            setValue("registration_number", vehicleData.registration_number);
            setValue("daily_rent", String(vehicleData.daily_rent));
            setValue("availability_status", vehicleData.availability_status);
            setValue("seating_capacity", vehicleData.seating_capacity);
            setValue("fuel_type", vehicleData.fuel_type);
            setValue("transmission", vehicleData.transmission);
            setValue("category", vehicleData.category);
            setValue("location", vehicleData.location);
        } else {
            reset(); 
        }
    }, [vehicleData, setValue, reset]);

    const onSubmit: SubmitHandler<VehicleSchemaType> = async (data) => {
        setIsLoading(true);
        setError("");

        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value.toString());
        });

        // images.forEach((image, index) => {
        //     formData.append(`images[${index}]`, image);
        // });


        try {
            const response = vehicleData 
            ? await api.put(`/vehicles/update/${vehicleData.id}/`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            : await api.post("/vehicles/create/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            vehicleData ? toast.success(response.data.message || "Vehicle updated successfully!") : toast.success(response.data.message || "Vehicle created successfully!");
            reset();
            // setImages([]);
            onSuccess();
            onClose();
        } catch (err: any) {
            console.log("Error", err)
            const errorMessage = err.response?.data?.message || "Failed to create vehicle.";
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const modalBgColor = currentTheme === 'dark' ? 'bg-black' : 'bg-white';

    return (
        <Modal opened={opened} onClose={onClose} title="Create New Vehicle"
            centered
            classNames={{
                content: `transition-colors duration-300 ${modalBgColor}`,
                header: `${modalBgColor}`,
            }}>
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

            <form onSubmit={handleSubmit(onSubmit)} className="px-[15px]">
                <div className="grid grid-cols-1 gap-4">
                    <TextInput label="Brand" {...register("brand")} error={errors.brand?.message} placeholder="Enter vehicle brand" />
                    <TextInput label="Model" {...register("model")} error={errors.model?.message} placeholder="Enter vehicle model" />
                    <NumberInput
                        label="Year"
                        error={errors.year?.message}
                        placeholder="Enter manufacturing year"
                        value={watch("year") || undefined}
                        onChange={(value) => setValue("year", Number(value) || 0)}
                        min={1900}
                        max={new Date().getFullYear()}
                    />

                    <TextInput label="Registration Number" {...register("registration_number")} error={errors.registration_number?.message} placeholder="Enter registration number" />
                    <TextInput label="Daily Rent" {...register("daily_rent")} error={errors.daily_rent?.message} placeholder="Enter daily rent amount" />
                    <Select
                        label="Availability"
                        data={[
                            { value: "true", label: "Available" },
                            { value: "false", label: "Not Available" },
                        ]}
                        value={watch("availability_status")?.toString() || ""}
                        onChange={(value) => setValue("availability_status", value === "true")}
                        error={errors.availability_status?.message}
                        placeholder="Select availability status"
                    />
                    <NumberInput
                        label="Seating Capacity"
                        error={errors.seating_capacity?.message}
                        placeholder="Enter seating capacity"
                        value={watch("seating_capacity") || undefined}
                        onChange={(value) => setValue("seating_capacity", Number(value) || 0)}
                        min={0}
                        max={8}
                    />
                    <Select
                        label="Fuel Type"
                        data={[
                            { value: "Petrol", label: "Petrol" },
                            { value: "Diesel", label: "Diesel" },
                            { value: "Electric", label: "Electric" },
                        ]}
                        value={watch("fuel_type") || ""}
                        onChange={(value) => setValue("fuel_type", value as "Petrol" | "Diesel" | "Electric")}
                        error={errors.fuel_type?.message}
                        placeholder="Select fuel type"
                    />
                    <Select
                        label="Transmission"
                        data={[
                            { value: "Automatic", label: "Automatic" },
                            { value: "Manual", label: "Manual" },
                        ]}
                        value={watch("transmission") || ""}
                        onChange={(value) => setValue("transmission", value as "Automatic" | "Manual")}
                        error={errors.transmission?.message}
                        placeholder="Select transmission type"
                    />
                    <Select
                        label="Category"
                        data={[
                            { value: "SUV", label: "SUV" },
                            { value: "Sedan", label: "Sedan" },
                            { value: "Hatchback", label: "Hatchback" },
                        ]}
                        value={watch("category") || ""}
                        onChange={(value) => setValue("category", value as "SUV" | "Sedan" | "Hatchback")}
                        error={errors.category?.message}
                        placeholder="Select vehicle category"
                    />
                    <TextInput label="Location" {...register("location")} error={errors.location?.message} placeholder="Enter location" />
                    {/* <FileInput
                        label="Images"
                        placeholder="Upload vehicle images"
                        multiple
                        accept="image/*"
                        onChange={(files) => {
                            setImages(files || []); 
                        }}
                        error={images.length === 0 && "At least one image is required"}
                    /> */}
                </div>

                <Button type="submit" fullWidth color="blue" mt="md" loading={isLoading}>
                    {vehicleData ? "Update Vehicle" : "Create Vehicle"}
                </Button>
            </form>
        </Modal>
    );
};

export default CreateVehicleModal;