import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { auth } from "../auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin }) {
  const session = await auth();
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(cabin.id);

  return (
    <div className="grid lg:grid-cols-2 lg:w-full w-max mx-auto min-h-[400px] gap-4 border border-primary-700">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  )
}

export default Reservation;
