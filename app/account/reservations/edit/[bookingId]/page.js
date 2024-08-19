import EditReservationForm from "@/app/_components/EditReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
  const { bookingId } = params;
  const booking = await getBooking(bookingId);
  const cabin = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>
      <EditReservationForm booking={booking} cabin={cabin} />
    </div>
  );
}