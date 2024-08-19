"use server";

import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./_lib/data-service";
import { supabase } from "./_lib/supabase";

export async function updateGuestAction(formData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update your profile');
  const [nationality, countryFlag] = formData.get('nationality').split('%');
  const nationalID = formData.get('nationalID');
  const updateData = { nationality, countryFlag, nationalID };

  if (!/^[0-9]{6,12}$/.test(nationalID)) throw new Error('National Id is not valid');
  const { data, error } = await supabase
    .from('guests')
    .update(updateData)
    .eq('id', session.user.guestId)
  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  revalidatePath('/account/profile');
}

export async function updateReservationAction(formData) {
  const session = await auth();
  const bookingId = formData.get('bookingId');
  const guestId = formData.get('guestId');
  const numGuests = formData.get('numGuests');
  const observations = formData.get('observations');

  if (session.user.guestId != guestId) throw new Error('You are not allowed to edit this reservation');

  const { error } = await supabase
    .from('bookings')
    .update({ numGuests, observations })
    .eq('id', bookingId)

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }

  revalidatePath('/account/reservations', "layout");
  redirect('/account/reservations');
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in to update your profile');
  const guestBookingIds = (await getBookings(session.user.guestId)).map(booking => booking.id);
  if (!guestBookingIds.includes(bookingId)) throw new Error('You are not allowed to delete this booking');

  const { error } = await supabase.from('bookings').delete().eq('id', bookingId);
  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath('/account/reservations');
}

export async function createBookingAction(newBooking) {
  const { error } = await supabase
    .from('bookings')
    .insert([newBooking])
  // So that the newly created object gets returned!

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  revalidatePath(`/cabins/${newBooking.cabinId}`);
  redirect('/cabins/thankyou');
}

export async function signInAction() {
  await signIn('google', {
    redirectTo: '/account'
  })
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' })
}