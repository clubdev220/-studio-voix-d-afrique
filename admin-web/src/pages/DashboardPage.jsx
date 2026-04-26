import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { subscribeAllBookings, computeStats, formatDateFR, formatPrice } from '../lib/adminService.js';
import StatCard from '../components/StatCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import BookingDetailsModal from '../components/BookingDetailsModal.jsx';

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const unsub = subscribeAllBookings(
      data => { setBookings(data); setLoading(false); },
      ()   => setLoading(false)
    );
    return unsub;
  }, []);

  const stats  = computeStats(bookings);
  const recent = bookings.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── KPI CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon="schedule"
          label="En attente"
          value={stats.pending}
          sub="Nécessitent une action"
          accent="text-secondary"
          alert={stats.pending > 0}
        />
        <StatCard
          icon="check_circle"
          label="Confirmées ce mois"
          value={stats.confirmedMonth}
          sub={new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(new Date())}
          accent="text-primary"
        />
        <StatCard
          icon="payments"
          label="CA du mois"
          value={formatPrice(stats.revenueMonth)}
          sub="Réservations confirmées"
          accent="text-tertiary"
        />
        <StatCard
          icon="group"
          label="Clients actifs"
          value={stats.totalClients}
          sub="Ayant réservé"
          accent="text-on-surface"
        />
      </div>

      {/* ── RECENT BOOKINGS ── */}
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10">
          <h2 className="font-bold text-on-surface">Dernières réservations</h2>
          <Link to="/bookings" className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            Voir tout <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant gap-2">
            <span className="material-symbols-outlined text-4xl">inbox</span>
            <p className="text-sm">Aucune réservation pour le moment</p>
          </div>
        )}

        {!loading && recent.length > 0 && (
          <div className="divide-y divide-outline-variant/10">
            {recent.map(b => {
              const dateObj = b.date?.toDate ? b.date.toDate() : new Date(b.date);
              return (
                <button
                  key={b.id}
                  onClick={() => setSelected(b)}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-surface-container transition-colors text-left"
                >
                  {/* Service icon */}
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg">mic</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-on-surface text-sm truncate">{b.serviceName}</p>
                    <p className="text-xs text-on-surface-variant">{b.clientName} · {formatDateFR(dateObj)}</p>
                  </div>

                  {/* Amount + status */}
                  <div className="text-right shrink-0 ml-2">
                    <p className="font-bold text-on-surface text-sm">{formatPrice(b.totalPrice)}</p>
                    <div className="mt-1"><StatusBadge status={b.status} showIcon={false} /></div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking details modal */}
      {selected && (
        <BookingDetailsModal
          booking={selected}
          onClose={() => setSelected(null)}
          onStatusChange={() => setSelected(null)}
        />
      )}
    </div>
  );
}
