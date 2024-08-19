"use client";

import { updateReservationAction } from "../actions";
import { useFormStatus } from 'react-dom';
import SpinnerMini from "./SpinnerMini";;

function EditReservationForm({ cabin, booking }) {
  const { maxCapacity } = cabin;
  const { id: bookingId, numGuests, guestId, observations } = booking;

  return (
    <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col" action={updateReservationAction}>
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          required
          defaultValue={numGuests}
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={observations}
        />
      </div>

      <input type="hidden" name="guestId" value={guestId} />
      <input type="hidden" name="bookingId" value={bookingId} />

      <div className="flex justify-end items-center gap-6">
        <Submit />
      </div>
    </form>
  )
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" disabled={pending}>
      {pending ? (<div className="flex items-center gap-3"><SpinnerMini /> Updating...</div>) : 'Update Reservation'}
    </button>
  )
}

export default EditReservationForm;
