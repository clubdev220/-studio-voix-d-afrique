import React, { useState, useEffect } from 'react';
import { subscribeAllBookings, formatDateFR, formatPrice } from '../lib/adminService.js';
import StatusBadge from '../components/StatusBadge.jsx';
import BookingDetailsModal from '../components/BookingDetailsModal.jsx';

const FILTERS = ['Tous', 'pending', 'confirmed', 'cancelled', 'completed'];
const FILTER_LABELS = { 'Tous': 'Tous', pending: 'En attente', confirmed: 'Confirmées', cancelled: 'Annulées', completed: 'Terminées' };
const PAGE_SIZE = 10;

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('Tous');
  const [page,     setPage]     = useState(1);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const unsub = subscribeAllBookings(
      data => { setBookings(data); setLoading(false); },
      ()   => setLoading(false)
    );
    return unsub;
  }, []);

  // Reset page on filter change
  useEffect(() => setPage(1), [filter]);

  const filtered = filter === 'Tous' ? bookings : bookings.filter(b => b.status === filter);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const page_data  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const counts = FILTERS.reduce((acc, f) => {
    acc[f] = f === 'Tous' ? bookings.length : bookings.filter(b => b.status === f).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-1.5 ${
              filter === f
                ? 'bg-primary/10 text-primary border border-primary/30'
                : 'border border-outline-variant/20 text-on-surface-variant hover:border-primary/30 hover:text-primary'
            }`}
          >
            {FILTER_LABELS[f]}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === f ? 'bg-primary/20' : 'bg-surface-container'}`}>
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden">
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant gap-2">
            <span className="material-symbols-outlined text-5xl">search_off</span>
            <p className="text-sm">Aucune réservation dans cette catégorie</p>
          </div>
        )}

        {!loading && page_data.length > 0 && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant/10">
                    {['Service', 'Client', 'Date', 'Heure', 'Durée', 'Montant', 'Statut', ''].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {page_data.map(b => {
                    const dateObj = b.date?.toDate ? b.date.toDate() : new Date(b.date);
                    return (
                      <tr
                        key={b.id}
                        onClick={() => setSelected(b)}
                        className="hover:bg-surface-container cursor-pointer transition-colors"
                      >
                        <td className="px-4 py-3.5 font-bold text-on-surface text-sm">{b.serviceName}</td>
                        <td className="px-4 py-3.5 text-sm">
                          <p className="font-medium text-on-surface">{b.clientName}</p>
                          <p className="text-xs text-on-surface-variant">{b.clientEmail}</p>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-on-surface-variant">{formatDateFR(dateObj)}</td>
                        <td className="px-4 py-3.5 text-sm text-on-surface-variant">{b.startTime}</td>
                        <td className="px-4 py-3.5 text-sm text-on-surface-variant">{b.duration}h</td>
                        <td className="px-4 py-3.5 text-sm font-bold text-on-surface">{formatPrice(b.totalPrice)}</td>
                        <td className="px-4 py-3.5"><StatusBadge status={b.status} /></td>
                        <td className="px-4 py-3.5">
                          <button
                            onClick={e => { e.stopPropagation(); setSelected(b); }}
                            className="text-xs text-primary font-bold hover:underline"
                          >
                            Détails
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-outline-variant/10">
              {page_data.map(b => {
                const dateObj = b.date?.toDate ? b.date.toDate() : new Date(b.date);
                return (
                  <button
                    key={b.id}
                    onClick={() => setSelected(b)}
                    className="w-full flex items-start gap-4 p-4 text-left hover:bg-surface-container transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <StatusBadge status={b.status} showIcon={false} />
                      </div>
                      <p className="font-bold text-on-surface text-sm">{b.serviceName}</p>
                      <p className="text-xs text-on-surface-variant">{b.clientName} · {formatDateFR(dateObj)}</p>
                    </div>
                    <p className="font-black text-on-surface text-sm shrink-0">{formatPrice(b.totalPrice)}</p>
                  </button>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t border-outline-variant/10">
                <p className="text-xs text-on-surface-variant">
                  {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} sur {filtered.length}
                </p>
                <div className="flex gap-1">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center disabled:opacity-30 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="w-8 h-8 rounded-lg hover:bg-surface-container flex items-center justify-center disabled:opacity-30 transition-all"
                  >
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

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
