import React, { useContext, useState } from 'react'
import { Booking } from '../../utils/types'
import { Button, Input, Table, TableData, Text } from '@mantine/core'
import { FiSearch } from 'react-icons/fi'
import UpdateBookingStatusModal from './UpdateBookingStatusModal'
import { UserContext } from '../../hooks/userContext'

type Props = {
  data: Booking[],
  fetchBookings: () => void
}

const BookingTable: React.FC<Props> = ({ data, fetchBookings }) => {
  const [query, setQuery] = useState<string>("");
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>(undefined);
  const { user } = useContext(UserContext);

  const filteredData = data.filter(
    (booking) =>
      booking.user.full_name.toLowerCase().includes(query.toLowerCase()) ||
      booking.vehicle.registration_number.toLowerCase().includes(query.toLowerCase())
  );

  const handleUpdateBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpened(true);
  };

  const tableData: TableData = {
    head: ["User", "Vehicle", "Pickup", "Drop Off", "Booking Date", "Start Date", "End Date", "Total Cost", "Status", "Date Created", "Actions"],
    body: filteredData.map((booking: Booking) => [
      booking.user.full_name,
      booking.vehicle.registration_number,
      booking.pickup_location,
      booking.drop_off_location,
      booking.booking_date,
      booking.start_date,
      booking.end_date,
      booking.total_cost,
      booking.status,
      new Date(booking.created_at).toDateString(),
      user?.role === "admin" && <Button variant="outline" color="blue" onClick={() => handleUpdateBooking(booking)}>
        Update Status
      </Button>
    ]),
  };

  return (
    <div className="mt-5 p-3 border overflow-hidden">
      <div className="w-full min-h-20 border-b flex items-center justify-between p-3">
        <p className="font-semibold">Bookings</p>
        <p className="text-blue-700">Bookings Table</p>
      </div>
      <div className="py-5 sm:w-1/5 w-3/5">
        <Input
          width={50}
          value={query}
          placeholder="Search bookings..."
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

      <UpdateBookingStatusModal
        opened={opened}
        onClose={() => setOpened(false)}
        bookingData={selectedBooking}
        onSuccess={() => {
          setOpened(false);
          fetchBookings();
        }}
      />
    </div>
  )
}

export default BookingTable