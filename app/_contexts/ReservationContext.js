"use client";

import { useState, createContext, useContext, useEffect } from "react";

const ReservationContext = createContext();
const initialRange = {
  id: null,
  from: null,
  to: null,
};

export default function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialRange);
  const [showReminder, setShowReminder] = useState(false);
  const resetRange = () => setRange(initialRange);

  useEffect(() => {
    if (range.from || range.to) return setShowReminder(true)
    setShowReminder(false);
  }, [range]);

  return (
    <ReservationContext.Provider value={{
      range,
      setRange,
      resetRange,
      showReminder,
      setShowReminder,
    }}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservation = () => useContext(ReservationContext);