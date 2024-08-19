"use client";

import Image from "next/image";
import { useReservation } from "../_contexts/ReservationContext";
import { createBookingAction } from "../actions";
import { useFormStatus } from 'react-dom';
import SpinnerMini from "./SpinnerMini";
import { differenceInDays } from "date-fns";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const numNights = differenceInDays(range.to, range.from) || null;

  async function handleCreateBooking(formData) {
    const numGuests = formData.get('numGuests');
    if (!numGuests || !range.from || !range.to) return alert('Please make sure that selected dates and number of guests');
    const observations = formData.get('observations');
    const data = {
      startDate: range.from,
      endDate: range.to,
      numNights,
      numGuests,
      observations,
      cabinPrice: numNights * (cabin.regularPrice - cabin.discount),
      totalPrice: numNights * (cabin.regularPrice - cabin.discount),
      extrasPrice: 0,
      status: 'unconfirmed',
      hasBreakfast: false,
      isPaid: false,
      cabinId: cabin.id,
      guestId: user.guestId
    }

    await createBookingAction(data);
    resetRange();
  }

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-2 items-center'>
          <Image
            width={35}
            height={35}
            // Important to display google profile images
            referrerPolicy='no-referrer'
            className='rounded-full'
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>
      {(range.from || range.to) && (
        <p>from {String(range.from)} {range.to && 'to ' + String(range.to)}</p>
      )}
      <form className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col' action={handleCreateBooking}>
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: cabin.maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='flex justify-end items-center gap-6'>
          {!range.from || !range.to ? (
            <p className='text-primary-300 text-base'>Start by selecting dates</p>
          ) : (
            <Submit />
          )}
        </div>
      </form>
    </div>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300" disabled={pending}>
      {pending ? (<div className="flex items-center gap-3"><SpinnerMini /> Reserving...</div>) : 'Reserve now'}
    </button>
  )
}

export default ReservationForm;
