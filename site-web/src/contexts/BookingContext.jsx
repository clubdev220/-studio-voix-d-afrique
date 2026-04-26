import React, { createContext, useContext, useState } from 'react';
import BookingWizard from '../components/BookingWizard.jsx';

const BookingContext = createContext(null);

/**
 * BookingProvider
 * Provides global booking modal state accessible from any component.
 * Renders BookingWizard once at the app root level.
 */
export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  function openBooking() {
    setIsOpen(true);
  }

  function closeBooking() {
    setIsOpen(false);
  }

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking }}>
      {children}
      <BookingWizard isOpen={isOpen} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}

/**
 * useBooking hook
 * Access the booking modal state from any component.
 */
export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking doit être utilisé dans un BookingProvider');
  }
  return ctx;
}
