/**
 * Booking Service
 * Handles all booking-related operations: Firestore CRUD, email notifications, and slot management
 *
 * Two EmailJS accounts are used:
 *   - Contact form  → VITE_EMAILJS_SERVICE_ID        (ContactPage.jsx)
 *   - Reservations  → VITE_EMAILJS_BOOKING_SERVICE_ID (this file)
 */

import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
  updateDoc,
  doc
} from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from './firebase';
import { getServiceById, calculateTotalPrice, calculateDepositAmount, CURRENCY } from './services';

// ─── EmailJS — Compte RÉSERVATION ────────────────────────────────────────────
const BOOKING_SERVICE_ID = import.meta.env.VITE_EMAILJS_BOOKING_SERVICE_ID;
const BOOKING_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_BOOKING_PUBLIC_KEY;
const TEMPLATE_CLIENT    = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_CLIENT;
const TEMPLATE_STUDIO    = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_STUDIO;

// ─── Informations Studio ─────────────────────────────────────────────────────
const STUDIO_NAME    = "Studio Voix d'Afrique";
const STUDIO_EMAIL   = import.meta.env.VITE_STUDIO_EMAIL   || 'contact@studiovoixdafrique.com';
const STUDIO_PHONE   = import.meta.env.VITE_STUDIO_PHONE   || '+226 67 56 56 91';
const STUDIO_ADDRESS = import.meta.env.VITE_STUDIO_ADDRESS || 'Ouagadougou, Burkina Faso';

/** True only when booking EmailJS credentials are fully configured */
function isEmailConfigured() {
  return Boolean(BOOKING_SERVICE_ID && BOOKING_PUBLIC_KEY && TEMPLATE_CLIENT && TEMPLATE_STUDIO);
}

// ─── Firestore ────────────────────────────────────────────────────────────────

/**
 * Create a new booking in Firestore, then send both emails in parallel.
 * @param {Object} data - Booking data
 * @returns {Promise<string>} - Booking ID
 */
export async function createBooking(data) {
  try {
    // Validate required fields
    if (!data.userId || !data.serviceId || !data.date || !data.startTime || !data.duration) {
      throw new Error('Informations de réservation manquantes');
    }

    // Get service details
    const service = getServiceById(data.serviceId);
    if (!service) {
      throw new Error('Service non trouvé');
    }

    // Calculate prices
    const totalPrice   = calculateTotalPrice(service, data.duration);
    const depositAmount = calculateDepositAmount(totalPrice);

    // Build booking document
    const bookingData = {
      userId:             data.userId,
      serviceId:          data.serviceId,
      serviceName:        service.name,
      date:               Timestamp.fromDate(new Date(data.date)),
      startTime:          data.startTime,
      duration:           data.duration,
      totalPrice,
      depositAmount,
      projectType:        data.projectType        || null,
      projectDescription: data.projectDescription || null,
      clientName:         data.clientName,
      clientEmail:        data.clientEmail,
      clientPhone:        data.clientPhone        || null,
      clientCity:         data.clientCity         || null,
      clientCountry:      data.clientCountry      || null,
      status:             'pending',
      createdAt:          Timestamp.now(),
      updatedAt:          Timestamp.now(),
      notes:              data.notes              || null
    };

    // Write to Firestore first
    const docRef = await addDoc(collection(db, 'bookings'), bookingData);
    console.log('✓ Réservation créée:', docRef.id);

    // Prepare enriched booking object for emails
    const bookingForEmail = {
      ...bookingData,
      id:   docRef.id,
      date: new Date(data.date), // plain Date for formatDateFR()
    };

    // Send both emails in parallel — never block the booking if email fails
    await Promise.allSettled([
      sendBookingClientConfirmEmail(bookingForEmail),
      sendBookingStudioNotifyEmail(bookingForEmail),
    ]);

    return docRef.id;
  } catch (error) {
    console.error('❌ Erreur création réservation:', error);
    throw error;
  }
}

/**
 * Get all bookings for a user (newest first)
 * @param {string} uid - User ID
 * @returns {Promise<Array>}
 */
export async function getUserBookings(uid) {
  try {
    if (!uid) throw new Error('User ID manquant');

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('❌ Erreur récupération réservations:', error);
    throw error;
  }
}

/**
 * Get busy time slots for a specific date
 * @param {Date} date
 * @returns {Promise<Array>} - [{startTime, endTime, startInMinutes, endInMinutes, duration}]
 */
export async function getBusySlots(date) {
  try {
    if (!date) return [];

    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    const q = query(
      collection(db, 'bookings'),
      where('date', '>=', Timestamp.fromDate(dayStart)),
      where('date', '<=', Timestamp.fromDate(dayEnd)),
      where('status', '!=', 'cancelled')
    );

    const snapshot = await getDocs(q);
    const busySlots = [];

    snapshot.docs.forEach(d => {
      const booking = d.data();
      const [hours, minutes] = booking.startTime.split(':').map(Number);
      const startInMinutes   = hours * 60 + minutes;
      const endInMinutes     = startInMinutes + booking.duration * 60;

      busySlots.push({
        startTime: booking.startTime,
        endTime:   formatMinutesToTime(endInMinutes),
        startInMinutes,
        endInMinutes,
        duration: booking.duration
      });
    });

    return busySlots.sort((a, b) => a.startInMinutes - b.startInMinutes);
  } catch (error) {
    console.error('❌ Erreur récupération créneaux occupés:', error);
    return [];
  }
}

/**
 * Check if a time slot is available
 * @param {Date} date
 * @param {string} startTime - "HH:MM"
 * @param {number} duration  - hours
 * @returns {Promise<boolean>}
 */
export async function isSlotAvailable(date, startTime, duration) {
  try {
    const busySlots = await getBusySlots(date);
    if (busySlots.length === 0) return true;

    const [hours, minutes]         = startTime.split(':').map(Number);
    const requestedStartInMinutes  = hours * 60 + minutes;
    const requestedEndInMinutes    = requestedStartInMinutes + duration * 60;

    for (const slot of busySlots) {
      if (requestedStartInMinutes < slot.endInMinutes && requestedEndInMinutes > slot.startInMinutes) {
        return false; // overlap
      }
    }

    return true;
  } catch (error) {
    console.error('❌ Erreur vérification disponibilité:', error);
    return false;
  }
}

/**
 * Update booking status (admin only)
 * @param {string} bookingId
 * @param {string} newStatus - pending | confirmed | cancelled | completed
 */
export async function updateBookingStatus(bookingId, newStatus) {
  try {
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Statut invalide: ${newStatus}`);
    }

    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, { status: newStatus, updatedAt: Timestamp.now() });
    console.log(`✓ Réservation ${bookingId} → ${newStatus}`);
  } catch (error) {
    console.error('❌ Erreur mise à jour statut:', error);
    throw error;
  }
}

// ─── Email helpers ────────────────────────────────────────────────────────────

/**
 * Email 1 — Sent to CLIENT on booking creation.
 * Confirms that the studio received the request and reminds the client of the deposit.
 * Template variables: to_email, to_name, service_name, booking_date, booking_time,
 *   booking_duration, total_price, deposit_amount, deposit_percent,
 *   studio_name, studio_phone, studio_address, studio_email
 *
 * @param {Object} booking
 */
export async function sendBookingClientConfirmEmail(booking) {
  try {
    if (!isEmailConfigured()) {
      console.warn('⚠️ EmailJS réservation non configuré — email client ignoré');
      return;
    }

    const templateParams = {
      to_email:         booking.clientEmail,
      to_name:          booking.clientName,
      service_name:     booking.serviceName,
      booking_date:     formatDateFR(booking.date),
      booking_time:     booking.startTime,
      booking_duration: `${booking.duration}h`,
      total_price:      formatPriceForEmail(booking.totalPrice),
      deposit_amount:   formatPriceForEmail(booking.depositAmount),
      deposit_percent:  '40%',
      studio_name:      STUDIO_NAME,
      studio_phone:     STUDIO_PHONE,
      studio_address:   STUDIO_ADDRESS,
      studio_email:     STUDIO_EMAIL,
    };

    await emailjs.send(BOOKING_SERVICE_ID, TEMPLATE_CLIENT, templateParams, {
      publicKey: BOOKING_PUBLIC_KEY,
    });

    console.log('✓ Email de confirmation envoyé au client');
  } catch (error) {
    console.error('❌ Erreur envoi email client:', error);
    // Non-blocking: booking was already saved in Firestore
  }
}

/**
 * Email 2 — Sent to STUDIO on booking creation.
 * Notifies the studio team about the new reservation with full client details.
 * Template variables: to_email, client_name, client_email, client_phone,
 *   service_name, booking_date, booking_time, booking_duration,
 *   total_price, deposit_amount, project_type, project_description, booking_id
 *
 * @param {Object} booking
 */
export async function sendBookingStudioNotifyEmail(booking) {
  try {
    if (!isEmailConfigured()) {
      console.warn('⚠️ EmailJS réservation non configuré — email studio ignoré');
      return;
    }

    const templateParams = {
      to_email:            STUDIO_EMAIL,
      client_name:         booking.clientName,
      client_email:        booking.clientEmail,
      client_phone:        booking.clientPhone        || 'Non renseigné',
      service_name:        booking.serviceName,
      booking_date:        formatDateFR(booking.date),
      booking_time:        booking.startTime,
      booking_duration:    `${booking.duration}h`,
      total_price:         formatPriceForEmail(booking.totalPrice),
      deposit_amount:      formatPriceForEmail(booking.depositAmount),
      project_type:        booking.projectType        || 'Non spécifié',
      project_description: booking.projectDescription || '—',
      booking_id:          booking.id,
    };

    await emailjs.send(BOOKING_SERVICE_ID, TEMPLATE_STUDIO, templateParams, {
      publicKey: BOOKING_PUBLIC_KEY,
    });

    console.log('✓ Email de notification envoyé au studio');
  } catch (error) {
    console.error('❌ Erreur envoi email studio:', error);
  }
}

/**
 * Email 3 — Sent to CLIENT when admin *confirms* a booking.
 * Uses the same booking EmailJS account.
 * Called from the admin app (Phase 3).
 *
 * @param {Object} booking
 */
export async function sendBookingConfirmedEmail(booking) {
  try {
    if (!isEmailConfigured()) {
      console.warn('⚠️ EmailJS réservation non configuré — email confirmation ignoré');
      return;
    }

    const templateParams = {
      to_email:         booking.clientEmail,
      to_name:          booking.clientName,
      service_name:     booking.serviceName,
      booking_date:     formatDateFR(booking.date instanceof Date ? booking.date : booking.date.toDate()),
      booking_time:     booking.startTime,
      booking_duration: `${booking.duration}h`,
      total_price:      formatPriceForEmail(booking.totalPrice),
      deposit_amount:   formatPriceForEmail(booking.depositAmount),
      studio_name:      STUDIO_NAME,
      studio_phone:     STUDIO_PHONE,
      studio_address:   STUDIO_ADDRESS,
      studio_email:     STUDIO_EMAIL,
    };

    // Reuses TEMPLATE_CLIENT — you may create a separate "confirmed" template later
    await emailjs.send(BOOKING_SERVICE_ID, TEMPLATE_CLIENT, templateParams, {
      publicKey: BOOKING_PUBLIC_KEY,
    });

    console.log('✓ Email de confirmation (admin) envoyé au client');
  } catch (error) {
    console.error('❌ Erreur envoi email confirmation admin:', error);
  }
}

// ─── Private helpers ──────────────────────────────────────────────────────────

function formatMinutesToTime(totalMinutes) {
  const hours   = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function formatDateFR(date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day:   'numeric',
    month: 'long',
    year:  'numeric'
  }).format(date);
}

function formatPriceForEmail(amount) {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount)) + ' ' + CURRENCY;
}
