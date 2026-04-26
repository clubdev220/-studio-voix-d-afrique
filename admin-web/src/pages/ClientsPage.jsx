import React, { useState, useEffect } from 'react';
import { getAllClients, getClientBookings } from '../lib/adminService.js';
import ClientHistoryModal from '../components/ClientHistoryModal.jsx';

export default function ClientsPage() {
  const [clients,  setClients]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState('');
  const [selected, setSelected] = useState(null);
  // booking counts per client
  const [counts,   setCounts]   = useState({});

  useEffect(() => {
    getAllClients()
      .then(async data => {
        setClients(data);
        // fetch booking counts in parallel
        const results = await Promise.allSettled(
          data.map(c => getClientBookings(c.uid ?? c.id))
        );
        const map = {};
        data.forEach((c, i) => {
          const uid = c.uid ?? c.id;
          map[uid] = results[i].status === 'fulfilled' ? results[i].value.length : 0;
        });
        setCounts(map);
      })
      .catch(() => setClients([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = clients.filter(c =>
    !search ||
    (c.displayName ?? '').toLowerCase().includes(search.toLowerCase()) ||
    (c.email ?? '').toLowerCase().includes(search.toLowerCase())
  );

  const initials = (name) => (name ?? '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Search */}
      <div className="relative max-w-sm">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
        <input
          type="text"
          placeholder="Rechercher par nom ou email…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl pl-10 pr-4 py-2.5 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors text-sm"
        />
      </div>

      {/* Client list */}
      <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden">
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant gap-2">
            <span className="material-symbols-outlined text-5xl">person_search</span>
            <p className="text-sm">{search ? 'Aucun résultat' : 'Aucun client enregistré'}</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <>
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 border-b border-outline-variant/10">
              {['', 'Client', 'Email', 'Téléphone', 'Ville', 'Réservations', ''].map((h, i) => (
                <div key={i} className={`text-[10px] font-bold uppercase tracking-widest text-on-surface-variant ${
                  i === 0 ? 'col-span-1' : i === 1 ? 'col-span-2' : i === 2 ? 'col-span-3' : i === 3 ? 'col-span-2' : i === 4 ? 'col-span-2' : i === 5 ? 'col-span-1' : 'col-span-1'
                }`}>{h}</div>
              ))}
            </div>

            <div className="divide-y divide-outline-variant/10">
              {filtered.map(c => {
                const uid = c.uid ?? c.id;
                const bookingCount = counts[uid] ?? '—';
                return (
                  <button
                    key={uid}
                    onClick={() => setSelected(c)}
                    className="w-full flex items-center gap-4 px-4 py-4 hover:bg-surface-container transition-colors text-left"
                  >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-sm font-black shrink-0">
                      {initials(c.displayName)}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-on-surface text-sm truncate">{c.displayName ?? '—'}</p>
                      <p className="text-xs text-on-surface-variant truncate">{c.email}</p>
                    </div>

                    {/* Meta (desktop) */}
                    <div className="hidden md:flex items-center gap-8 shrink-0 text-sm text-on-surface-variant">
                      <span className="w-32 truncate">{c.phone ?? '—'}</span>
                      <span className="w-24 truncate">{c.city ?? '—'}</span>
                      <span className="w-16 text-center">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                          {bookingCount}
                        </span>
                      </span>
                    </div>

                    <span className="material-symbols-outlined text-on-surface-variant text-sm shrink-0">chevron_right</span>
                  </button>
                );
              })}
            </div>

            {/* Count */}
            <div className="px-4 py-3 border-t border-outline-variant/10">
              <p className="text-xs text-on-surface-variant">{filtered.length} client{filtered.length > 1 ? 's' : ''}</p>
            </div>
          </>
        )}
      </div>

      {selected && (
        <ClientHistoryModal client={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
