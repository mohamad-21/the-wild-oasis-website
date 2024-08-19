"use client";

import React, { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservationAction } from "../actions";

function ReservationsList({ bookings }) {
  const [bookingsState, optimisticDelete] = useOptimistic(bookings,
    (currentBookings, bookingId) => currentBookings.filter(booking => booking.id !== bookingId));

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservationAction(bookingId);
  }

  return (
    <ul className="space-y-6">
      {bookingsState.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} onDelete={handleDelete} />
      ))}
    </ul>
  )
}

export default ReservationsList;
