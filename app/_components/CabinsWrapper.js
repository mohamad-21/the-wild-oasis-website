"use client";

import React from "react";
import ReservationReminder from "./ReservationReminder";
import { useReservation } from "@/app/_contexts/ReservationContext";

function CabinsWrapper({ children }) {
  console.log(process.env.GOOGLE_KEY)
  const { showReminder } = useReservation();
  return (
    <>
      {children}
      {showReminder && <ReservationReminder />}
    </>
  )
}

export default CabinsWrapper;
