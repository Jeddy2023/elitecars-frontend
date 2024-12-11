import React, { useEffect, useState } from 'react'
import BookingTable from './BookingTable'
import { Loader } from '@mantine/core'
import toast from 'react-hot-toast'
import { api } from '../../api/axios'
import { Booking } from '../../utils/types'

type Props = {}

const BookingManagement: React.FC<Props> = ({ }) => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const res = await api.get("/bookings/get-bookings-admin/");
            console.log(res)
            setBookings(res?.data);
        } catch (err: any) {
            console.log(err)
            toast.error(err?.response?.data?.message || 'Error fetching bookings, please refesh the page');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center p-5">
                <h1 className="font-semibold">Manage Bookings</h1>
                <p className="text-gray-500 text-sm">Admin &gt; manage-bookings</p>
            </div>
            {loading ? (
                <div className="min-h-screen grid place-items-center">
                    <Loader size={50} />
                </div>
            )
                : <BookingTable data={bookings} fetchBookings={fetchBookings} />}
        </div>
    )
}

export default BookingManagement