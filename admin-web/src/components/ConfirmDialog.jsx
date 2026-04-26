import React from 'react';

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirmer', confirmClass = 'bg-primary text-on-primary', onConfirm, onCancel, loading = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-surface-container-low border border-outline-variant/20 rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-fade-in">
        <h3 className="text-xl font-bold text-on-surface mb-3">{title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-8">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-all text-sm font-bold disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 flex items-center gap-2 ${confirmClass}`}
          >
            {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
