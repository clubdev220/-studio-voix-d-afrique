import React, { useState, useEffect } from 'react';
import StatusBadge from './StatusBadge.jsx';
import { getClientBookings, formatDateFR, formatPrice } from '../lib/adminService.js';

export default function ClientHistoryModal({ client, onClose }) {
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    if (!client) return;
    getClientBookings(client.uid ?? client.id)
      .then(data => setBookings(data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [client]);

  if (!client) return null;

  const initials = (client.displayName ?? client.clientName ?? '?')
    .split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const confirmed = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed');
  const totalSpent = confirmed.reduce((acc, b) => acc + (b.totalPrice ?? 0), 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-surface-container-low border border-outline-variant/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-outline-variant/10">
          <h2 className="text-xl font-bold">Historique client</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-all">
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile card */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-lg font-black shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-on-surface text-lg">{client.displayName ?? '—'}</p>
              <a href={`mailto:${client.email}`} className="text-primary text-sm hover:underline block">{client.email}</a>
              {client.phone && (
                <a href={`tel:${client.phone}`} className="text-on-surface-variant text-sm">{client.phone}</a>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="Réservations" value={bookings.length} />
            <MiniStat label="Confirmées" value={confirmed.length} accent="text-primary" />
            <MiniStat label="CA client" value={formatPrice(totalSpent)} accent="text-secondary" />
          </div>

          {/* Booking timeline */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Historique des réservations</p>
            {loading && (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            {!loading && bookings.length === 0 && (
              <p className="text-center text-on-surface-variant text-sm py-8">Aucune réservation</p>
            )}
            {!loading && bookings.length > 0 && (
              <div className="space-y-2">
                {bookings.map(b => {
                  const dateObj = b.date?.toDate ? b.date.toDate() : new Date(b.date);
                  return (
                    <div key={b.id} className="flex items-center justify-between bg-surface-container rounded-xl px-4 py-3 border border-outline-variant/10">
                      <div>
                        <p className="font-bold text-on-surface text-sm">{b.serviceName}</p>
                        <p className="text-xs text-on-surface-variant">{formatDateFR(dateObj)} · {b.startTime} · {b.duration}h</p>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <p className="text-sm font-bold text-on-surface">{formatPrice(b.totalPrice)}</p>
                        <StatusBadge status={b.status} showIcon={false} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, accent = 'text-on-surface' }) {
  return (
    <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/10 text-center">
      <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{label}</p>
      <p className={`text-xl font-black ${accent}`} style={{ fontFamily: 'Space Grotesk' }}>{value}</p>
    </div>
  );
}
