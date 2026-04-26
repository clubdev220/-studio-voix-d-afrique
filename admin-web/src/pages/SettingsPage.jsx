import React, { useState, useEffect } from 'react';
import { getStudioConfig, saveStudioConfig } from '../lib/adminService.js';

const DAYS = [
  { key: 'monday',    label: 'Lundi'    },
  { key: 'tuesday',   label: 'Mardi'    },
  { key: 'wednesday', label: 'Mercredi' },
  { key: 'thursday',  label: 'Jeudi'    },
  { key: 'friday',    label: 'Vendredi' },
  { key: 'saturday',  label: 'Samedi'   },
  { key: 'sunday',    label: 'Dimanche' },
];

const DEFAULT_CONFIG = {
  openingTime:  '08:00',
  closingTime:  '18:00',
  openDays: { monday: true, tuesday: true, wednesday: true, thursday: true, friday: true, saturday: true, sunday: false },
  minBookingHours: 2,
  maxBookingHours: 8,
  studioName:    'Studio Voix d\'Afrique',
  studioPhone:   '+226 67 56 56 91',
  studioAddress: 'Ouagadougou, Burkina Faso',
};

export default function SettingsPage() {
  const [config,  setConfig]  = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    getStudioConfig()
      .then(data => {
        if (data) setConfig(prev => ({ ...prev, ...data, openDays: { ...prev.openDays, ...(data.openDays ?? {}) } }));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function setField(key, value) {
    setConfig(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function toggleDay(day) {
    setConfig(prev => ({
      ...prev,
      openDays: { ...prev.openDays, [day]: !prev.openDays[day] },
    }));
    setSaved(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await saveStudioConfig(config);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError('Erreur lors de la sauvegarde. Réessayez.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 animate-fade-in max-w-2xl">

      {/* ── Horaires ── */}
      <section className="bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">schedule</span>
            <h2 className="font-bold text-on-surface">Horaires d'ouverture</h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Ces horaires définissent les créneaux disponibles à la réservation.</p>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
              Ouverture
            </label>
            <input
              type="time"
              value={config.openingTime}
              onChange={e => setField('openingTime', e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
              Fermeture
            </label>
            <input
              type="time"
              value={config.closingTime}
              onChange={e => setField('closingTime', e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>
      </section>

      {/* ── Durée min/max ── */}
      <section className="bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">timer</span>
            <h2 className="font-bold text-on-surface">Durée de réservation</h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Durée minimale et maximale qu'un client peut réserver.</p>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
              Durée min. (heures)
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={config.minBookingHours}
              onChange={e => setField('minBookingHours', Number(e.target.value))}
              className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
              Durée max. (heures)
            </label>
            <input
              type="number"
              min="1"
              max="24"
              value={config.maxBookingHours}
              onChange={e => setField('maxBookingHours', Number(e.target.value))}
              className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>
      </section>

      {/* ── Jours d'ouverture ── */}
      <section className="bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">calendar_month</span>
            <h2 className="font-bold text-on-surface">Jours d'ouverture</h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Sélectionnez les jours où le studio accepte des réservations.</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DAYS.map(({ key, label }) => {
              const active = config.openDays?.[key] ?? false;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleDay(key)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    active
                      ? 'bg-primary/10 border-primary/40 text-primary'
                      : 'border-outline-variant/20 text-on-surface-variant hover:border-primary/30 hover:text-on-surface'
                  }`}
                >
                  <span className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-all shrink-0 ${
                    active ? 'bg-primary border-primary' : 'border-outline-variant/40'
                  }`}>
                    {active && <span className="material-symbols-outlined text-on-primary" style={{ fontSize: '12px' }}>check</span>}
                  </span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Coordonnées studio ── */}
      <section className="bg-surface-container-low border border-outline-variant/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-outline-variant/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">business</span>
            <h2 className="font-bold text-on-surface">Informations du studio</h2>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Ces infos apparaissent dans les emails envoyés aux clients.</p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
              Nom du studio
            </label>
            <input
              type="text"
              value={config.studioName}
              onChange={e => setField('studioName', e.target.value)}
              className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                value={config.studioPhone}
                onChange={e => setField('studioPhone', e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                Adresse
              </label>
              <input
                type="text"
                value={config.studioAddress}
                onChange={e => setField('studioAddress', e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Save button ── */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary-container text-on-primary-container font-black px-8 py-3.5 rounded-xl hover:brightness-110 transition-all disabled:opacity-60 flex items-center gap-2"
        >
          {saving
            ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Enregistrement…</>
            : <><span className="material-symbols-outlined text-lg">save</span> Enregistrer les paramètres</>
          }
        </button>

        {saved && (
          <div className="flex items-center gap-2 text-sm font-bold text-primary animate-fade-in">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Paramètres sauvegardés
          </div>
        )}

        {error && (
          <p className="text-sm text-error font-medium">{error}</p>
        )}
      </div>
    </form>
  );
}
