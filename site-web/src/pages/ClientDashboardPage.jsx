import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';
import Navbar from '../components/Navbar.jsx';

/* ─── Helpers ─────────────────────────────────────────────── */
function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatPrice(n) {
  return new Intl.NumberFormat('fr-FR').format(n) + ' FCFA';
}

/* ─── Badge statut ────────────────────────────────────────── */
const STATUS = {
  pending:   { label: 'En attente',  icon: 'schedule',      color: 'bg-tertiary/15 text-tertiary border-tertiary/30' },
  confirmed: { label: 'Confirmée',   icon: 'check_circle',  color: 'bg-primary/15 text-primary border-primary/30'   },
  cancelled: { label: 'Annulée',     icon: 'cancel',        color: 'bg-error/15 text-error border-error/30'         },
  completed: { label: 'Terminée',    icon: 'done_all',      color: 'bg-secondary/15 text-secondary border-secondary/30' },
};

function StatusBadge({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${s.color}`}>
      <span className="material-symbols-outlined text-sm">{s.icon}</span>
      {s.label}
    </span>
  );
}

/* ─── Card réservation ────────────────────────────────────── */
function BookingCard({ booking }) {
  return (
    <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-outline-variant/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-xl">mic_external_on</span>
        </div>
        <div>
          <p className="font-bold text-on-background">{booking.serviceName}</p>
          <p className="text-sm text-on-surface-variant mt-0.5">
            {formatDate(booking.date)} · {booking.time} · {booking.duration}h
          </p>
          {booking.projectType && (
            <p className="text-xs text-on-surface-variant/60 mt-1">{booking.projectType}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:items-end gap-2 sm:shrink-0">
        <StatusBadge status={booking.status} />
        <p className="text-sm font-bold text-on-surface">{formatPrice(booking.totalPrice)}</p>
        {booking.depositAmount && booking.status === 'pending' && (
          <p className="text-xs text-on-surface-variant">Acompte : {formatPrice(booking.depositAmount)}</p>
        )}
      </div>
    </div>
  );
}

const PAGE_SIZE = 5;

/* ─── Pagination ──────────────────────────────────────────── */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build page numbers array with ellipsis logic
  function getPages() {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = [];
    // Always show first and last
    // Show ± 1 around current page
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '…') {
        pages.push('…');
      }
    }
    return pages;
  }

  return (
    <div className="flex items-center justify-center gap-1 pt-2">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Page précédente"
      >
        <span className="material-symbols-outlined text-base">chevron_left</span>
      </button>

      {/* Pages */}
      {getPages().map((p, i) => (
        p === '…' ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-on-surface-variant/50 text-sm select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-bold transition-colors ${
              p === currentPage
                ? 'bg-primary text-on-primary shadow-sm'
                : 'border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
            }`}
          >
            {p}
          </button>
        )
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-xl border border-outline-variant/20 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Page suivante"
      >
        <span className="material-symbols-outlined text-base">chevron_right</span>
      </button>
    </div>
  );
}

/* ─── Page principale ─────────────────────────────────────── */
export default function ClientDashboardPage() {
  const { currentUser, userProfile, logout } = useAuth();
  const { openBooking } = useBooking();
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!currentUser) return;
    async function fetchBookings() {
      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        const snap = await getDocs(q);
        setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error('Erreur chargement réservations:', err);
      } finally {
        setLoadingBookings(false);
      }
    }
    fetchBookings();
  }, [currentUser]);

  // Pagination calculations
  const totalPages = Math.ceil(bookings.length / PAGE_SIZE);
  const paginatedBookings = bookings.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const displayName = userProfile?.fullName || currentUser?.displayName || currentUser?.email || 'Client';
  const initials = displayName
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />

      <div className="pt-28 pb-20 px-4 sm:px-8 md:px-20 max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary/30"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                {initials}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">Bonjour, {displayName.split(' ')[0]} 👋</h1>
              <p className="text-on-surface-variant text-sm">{currentUser?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-error transition-colors text-sm font-medium"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            Se déconnecter
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Colonne principale : Réservations */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Mes réservations</h2>
              <button
                onClick={openBooking}
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Nouvelle réservation
              </button>
            </div>

            {loadingBookings ? (
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-surface-container-low rounded-2xl h-24 border border-outline-variant/10" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-surface-container-low rounded-3xl border border-outline-variant/10">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">event_busy</span>
                <h3 className="text-lg font-bold mb-2">Aucune réservation</h3>
                <p className="text-on-surface-variant text-sm mb-6 max-w-xs">
                  Vous n'avez pas encore effectué de réservation. Commencez dès maintenant !
                </p>
                <button
                  onClick={openBooking}
                  className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full text-sm font-bold hover:scale-105 transition-transform"
                >
                  <span className="material-symbols-outlined text-base">add</span>
                  Réserver une session
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Compteur */}
                <p className="text-xs text-on-surface-variant">
                  {bookings.length === 1
                    ? '1 réservation'
                    : `${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, bookings.length)} sur ${bookings.length} réservations`}
                </p>

                {/* Cards */}
                <div className="flex flex-col gap-3">
                  {paginatedBookings.map(b => <BookingCard key={b.id} booking={b} />)}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>

          {/* Colonne secondaire : Profil */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Mon profil</h2>
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 flex flex-col gap-4">
              {[
                { label: 'Nom', value: userProfile?.fullName || currentUser?.displayName || '—', icon: 'person' },
                { label: 'Email', value: userProfile?.email || currentUser?.email || '—', icon: 'mail' },
                { label: 'Téléphone', value: userProfile?.phone || '—', icon: 'call' },
                { label: 'Ville', value: userProfile?.city || '—', icon: 'location_on' },
                { label: 'Pays', value: userProfile?.country || '—', icon: 'public' },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-base text-on-surface-variant/60 mt-0.5">{icon}</span>
                  <div>
                    <p className="text-xs text-on-surface-variant/60">{label}</p>
                    <p className="text-sm font-medium text-on-surface">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Liens rapides</p>
              <Link to="/blog" className="flex items-center gap-3 text-sm text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">article</span>
                Blog du studio
              </Link>
              <Link to="/contact" className="flex items-center gap-3 text-sm text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">support_agent</span>
                Contacter le studio
              </Link>
              <Link to="/" className="flex items-center gap-3 text-sm text-on-surface hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-base">home</span>
                Retour au site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
