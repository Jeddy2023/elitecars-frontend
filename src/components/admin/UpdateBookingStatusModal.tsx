import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Modal, Select, Button, LoadingOverlay, Alert } from "@mantine/core";
import { MdError } from "react-icons/md";
import { toast } from "react-hot-toast";
import { api } from "../../api/axios";
import { Booking } from "../../utils/types";
import { useTheme } from "../../hooks/ThemeContext";

interface UpdateBookingStatusModalProps {
    opened: boolean;
    onClose: () => void;
    onSuccess: () => void;
    bookingData?: Booking;
}

interface BookingStatusForm {
    status: string;
}

const UpdateBookingStatusModal: React.FC<UpdateBookingStatusModalProps> = ({
    opened,
    onClose,
    onSuccess,
    bookingData
}) => {
    const { handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<BookingStatusForm>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const { getCurrentTheme } = useTheme();
    const currentTheme = getCurrentTheme();

    useEffect(() => {
        if (bookingData) {
            setValue("status", bookingData.status);
        } else {
            reset();
        }
    }, [bookingData, setValue, reset]);

    const onSubmit: SubmitHandler<BookingStatusForm> = async (data) => {
        setIsLoading(true);
        setError("");

        try {
            const response = await api.put(`/bookings/update-status/${bookingData?.id}/`, { status: data.status });
            toast.success(response.data.message || "Booking status updated successfully!");
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error("Error updating booking status", err);
            const errorMessage = err.response?.data?.message || "Failed to update booking status.";
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const modalBgColor = currentTheme === 'dark' ? 'bg-black' : 'bg-white';

    return (
        <Modal opened={opened} onClose={onClose} title="Update Booking Status" centered
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

            <form onSubmit={handleSubmit(onSubmit)}>
                <Select
                    label="Booking Status"
                    data={[
                        { value: "Pending", label: "Pending" },
                        { value: "Confirmed", label: "Confirmed" },
                        { value: "Completed", label: "Completed" },
                        { value: "Cancelled", label: "Cancelled" },
                    ]}
                    value={watch("status") || ""}
                    onChange={(value) => setValue("status", value!)}
                    placeholder="Select booking status"
                    error={errors.status?.message}
                />

                <Button type="submit" fullWidth color="blue" mt="md" loading={isLoading}>
                    Update Status
                </Button>
            </form>
        </Modal>
    );
};

export default UpdateBookingStatusModal;
