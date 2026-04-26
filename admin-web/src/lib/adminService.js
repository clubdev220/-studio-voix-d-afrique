/**
 * Admin Service — all Firestore operations and email sending for the admin app.
 * Shares the same Firebase project and EmailJS booking account as site-web.
 */
import {
  collection, doc, getDoc, getDocs, updateDoc, setDoc,
  query, where, orderBy, onSnapshot, Timestamp
} from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from './firebase.js';

// ─── EmailJS (same booking account as site-web) ──────────────
const BOOKING_SERVICE_ID = import.meta.env.VITE_EMAILJS_BOOKING_SERVICE_ID;
const BOOKING_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_BOOKING_PUBLIC_KEY;
const TEMPLATE_CLIENT    = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE_CLIENT;

const STUDIO_NAME    = "Studio Voix d'Afrique";
const STUDIO_EMAIL   = import.meta.env.VITE_STUDIO_EMAIL   || 'contact@lesvoixdafriques.com';
const STUDIO_PHONE   = import.meta.env.VITE_STUDIO_PHONE   || '+226 67 56 56 91';
const STUDIO_ADDRESS = import.meta.env.VITE_STUDIO_ADDRESS || 'Ouagadougou, Burkina Faso';
const CURRENCY = 'FCFA';

function isEmailConfigured() {
  return Boolean(BOOKING_SERVICE_ID && BOOKING_PUBLIC_KEY && TEMPLATE_CLIENT);
}

// ─── Helpers ─────────────────────────────────────────────────
export function formatDateFR(date) {
  const d = date instanceof Date ? date : (date?.toDate ? date.toDate() : new Date(date));
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}
export function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount ?? 0)) + ' ' + CURRENCY;
}

// ─── Bookings ─────────────────────────────────────────────────

/**
 * Real-time listener — all bookings ordered by creation date desc.
 * @param {function} onData - callback(bookings[])
 * @param {function} onError - callback(error)
 * @returns unsubscribe function
 */
export function subscribeAllBookings(onData, onError) {
  const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
  return onSnapshot(q,
    snap => onData(snap.docs.map(d => ({ id: d.id, ...d.data() }))),
    onError
  );
}

/**
 * Update booking status.
 * @param {string} bookingId
 * @param {'pending'|'confirmed'|'cancelled'|'completed'} newStatus
 */
export async function updateBookingStatus(bookingId, newStatus) {
  const valid = ['pending', 'confirmed', 'cancelled', 'completed'];
  if (!valid.includes(newStatus)) throw new Error(`Statut invalide: ${newStatus}`);
  await updateDoc(doc(db, 'bookings', bookingId), {
    status: newStatus,
    updatedAt: Timestamp.now(),
  });
}

// ─── Clients ──────────────────────────────────────────────────

/**
 * Fetch all users with role='client'.
 * @returns {Promise<Array>}
 */
export async function getAllClients() {
  const q = query(collection(db, 'users'), where('role', '==', 'client'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch all bookings for a given client UID.
 * @param {string} uid
 * @returns {Promise<Array>}
 */
export async function getClientBookings(uid) {
  const q = query(
    collection(db, 'bookings'),
    where('userId', '==', uid),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ─── Studio Config ────────────────────────────────────────────

/**
 * Fetch studio config (opening hours, open days).
 * @returns {Promise<Object|null>}
 */
export async function getStudioConfig() {
  const snap = await getDoc(doc(db, 'config', 'studio'));
  return snap.exists() ? snap.data() : null;
}

/**
 * Save studio config.
 * @param {Object} data - { openingTime, closingTime, openDays[] }
 */
export async function saveStudioConfig(data) {
  await setDoc(doc(db, 'config', 'studio'), { ...data, updatedAt: Timestamp.now() }, { merge: true });
}

// ─── Stats ────────────────────────────────────────────────────

/**
 * Compute dashboard stats from a bookings array.
 * @param {Array} bookings - all bookings
 * @returns {{ pending, confirmedMonth, revenueMonth, totalClients }}
 */
export function computeStats(bookings) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear  = now.getFullYear();

  let pending        = 0;
  let confirmedMonth = 0;
  let revenueMonth   = 0;
  const clientSet    = new Set();

  bookings.forEach(b => {
    if (b.status === 'pending') pending++;
    if (b.userId) clientSet.add(b.userId);

    const date = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      if (b.status === 'confirmed' || b.status === 'completed') {
        confirmedMonth++;
        revenueMonth += b.totalPrice ?? 0;
      }
    }
  });

  return {
    pending,
    confirmedMonth,
    revenueMonth,
    totalClients: clientSet.size,
  };
}

// ─── Email ────────────────────────────────────────────────────

/**
 * Send confirmation email to client when admin confirms a booking.
 * Uses the same EmailJS template as site-web (TEMPLATE_CLIENT).
 * @param {Object} booking
 */
export async function sendBookingConfirmedEmail(booking) {
  if (!isEmailConfigured()) {
    console.warn('⚠️ EmailJS non configuré — email ignoré');
    return;
  }

  const dateObj = booking.date?.toDate ? booking.date.toDate() : new Date(booking.date);

  const params = {
    to_email:         booking.clientEmail,
    to_name:          booking.clientName,
    service_name:     booking.serviceName,
    booking_date:     formatDateFR(dateObj),
    booking_time:     booking.startTime,
    booking_duration: `${booking.duration}h`,
    total_price:      formatPrice(booking.totalPrice),
    deposit_amount:   formatPrice(booking.depositAmount),
    deposit_percent:  '40%',
    studio_name:      STUDIO_NAME,
    studio_phone:     STUDIO_PHONE,
    studio_address:   STUDIO_ADDRESS,
    studio_email:     STUDIO_EMAIL,
  };

  await emailjs.send(BOOKING_SERVICE_ID, TEMPLATE_CLIENT, params, {
    publicKey: BOOKING_PUBLIC_KEY,
  });
  console.log('✓ Email de confirmation envoyé au client');
}
