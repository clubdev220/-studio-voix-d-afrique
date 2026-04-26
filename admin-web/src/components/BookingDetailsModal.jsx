import React, { useState } from 'react';
import StatusBadge from './StatusBadge.jsx';
import ConfirmDialog from './ConfirmDialog.jsx';
import { updateBookingStatus, sendBookingConfirmedEmail, formatDateFR, formatPrice } from '../lib/adminService.js';

export default function BookingDetailsModal({ booking, onClose, onStatusChange }) {
  const [loading,  setLoading]  = useState(false);
  const [dialog,   setDialog]   = useState(null); // { action: 'confirm' | 'cancel' }
  const [error,    setError]    = useState(null);

  if (!booking) return null;

  const dateObj = booking.date?.toDate ? booking.date.toDate() : new Date(booking.date);
  const balance = (booking.totalPrice ?? 0) - (booking.depositAmount ?? 0);

  async function handleConfirm() {
    setLoading(true); setError(null);
    try {
      await updateBookingStatus(booking.id, 'confirmed');
      await sendBookingConfirmedEmail(booking).catch(() => {}); // non-blocking
      onStatusChange?.();
      setDialog(null);
      onClose();
    } catch (e) {
      setError('Erreur lors de la confirmation.');
    } finally { setLoading(false); }
  }

  async function handleCancel() {
    setLoading(true); setError(null);
    try {
      await updateBookingStatus(booking.id, 'cancelled');
      onStatusChange?.();
      setDialog(null);
      onClose();
    } catch (e) {
      setError('Erreur lors de l\'annulation.');
    } finally { setLoading(false); }
  }

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div
          className="bg-surface-container-low border border-outline-variant/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-outline-variant/10">
            <div>
              <h2 className="text-xl font-bold text-on-surface">{booking.serviceName}</h2>
              <p className="text-xs text-on-surface-variant mt-0.5">ID: {booking.id?.slice(0,12)}…</p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={booking.status} />
              <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-all">
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>
          </div>

          <div className="p-6 space-y-5">
            {error && (
              <div className="bg-error/10 border border-error/30 rounded-xl p-3 text-error text-sm">{error}</div>
            )}

            {/* Session */}
            <Section title="Session" icon="event">
              <Row label="Date"    value={formatDateFR(dateObj)} />
              <Row label="Heure"   value={booking.startTime} />
              <Row label="Durée"   value={`${booking.duration}h`} />
            </Section>

            {/* Tarification */}
            <Section title="Tarification" icon="payments">
              <Row label="Total"        value={formatPrice(booking.totalPrice)} bold />
              <Row label="Acompte (40%)" value={formatPrice(booking.depositAmount)} accent="text-secondary" />
              <Row label="Solde restant" value={formatPrice(balance)} />
            </Section>

            {/* Client */}
            <Section title="Client" icon="person">
              <Row label="Nom"   value={booking.clientName} />
              <Row label="Email" value={
                <a href={`mailto:${booking.clientEmail}`} className="text-primary hover:underline">{booking.clientEmail}</a>
              } />
              <Row label="Tél"   value={
                booking.clientPhone
                  ? <a href={`tel:${booking.clientPhone}`} className="text-primary hover:underline">{booking.clientPhone}</a>
                  : <span className="text-on-surface-variant">—</span>
              } />
            </Section>

            {/* Projet */}
            {(booking.projectType || booking.projectDescription) && (
              <Section title="Projet" icon="folder_open">
                {booking.projectType        && <Row label="Type"        value={booking.projectType} />}
                {booking.projectDescription && <Row label="Description" value={booking.projectDescription} multiline />}
                {booking.notes              && <Row label="Notes"       value={booking.notes} multiline />}
              </Section>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3 flex-wrap">
            {booking.status === 'pending' && (
              <>
                <button
                  onClick={() => setDialog({ action: 'confirm' })}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-bold py-3 rounded-xl hover:brightness-110 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Confirmer
                </button>
                <button
                  onClick={() => setDialog({ action: 'cancel' })}
                  className="flex-1 flex items-center justify-center gap-2 bg-error/10 text-error border border-error/20 font-bold py-3 rounded-xl hover:bg-error/20 transition-all"
                >
                  <span className="material-symbols-outlined text-sm">cancel</span>
                  Annuler
                </button>
              </>
            )}
            {booking.status === 'confirmed' && (
              <button
                onClick={() => setDialog({ action: 'cancel' })}
                className="flex items-center gap-2 text-error text-sm font-bold hover:underline"
              >
                <span className="material-symbols-outlined text-sm">cancel</span>
                Annuler la réservation
              </button>
            )}
            <button onClick={onClose} className="ml-auto text-on-surface-variant text-sm hover:text-on-surface transition-colors">
              Fermer
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={dialog?.action === 'confirm'}
        title="Confirmer la réservation ?"
        message={`La réservation de ${booking.clientName} pour ${booking.serviceName} sera confirmée et un email lui sera envoyé.`}
        confirmLabel="Oui, confirmer"
        confirmClass="bg-primary-container text-on-primary-container"
        onConfirm={handleConfirm}
        onCancel={() => setDialog(null)}
        loading={loading}
      />
      <ConfirmDialog
        open={dialog?.action === 'cancel'}
        title="Annuler la réservation ?"
        message="Cette action est irréversible. La réservation passera au statut Annulée."
        confirmLabel="Oui, annuler"
        confirmClass="bg-error text-on-error"
        onConfirm={handleCancel}
        onCancel={() => setDialog(null)}
        loading={loading}
      />
    </>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-surface-container rounded-xl overflow-hidden border border-outline-variant/10">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-high border-b border-outline-variant/10">
        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: 16 }}>{icon}</span>
        <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{title}</p>
      </div>
      <div className="divide-y divide-outline-variant/10">{children}</div>
    </div>
  );
}

function Row({ label, value, bold, accent, multiline }) {
  return (
    <div className={`flex ${multiline ? 'flex-col gap-1' : 'items-center justify-between'} px-4 py-2.5`}>
      <span className="text-xs text-on-surface-variant shrink-0">{label}</span>
      <span className={`text-sm ${bold ? 'font-bold text-on-surface' : accent ?? 'text-on-surface'} ${multiline ? '' : 'text-right ml-4'}`}>
        {value}
      </span>
    </div>
  );
}
