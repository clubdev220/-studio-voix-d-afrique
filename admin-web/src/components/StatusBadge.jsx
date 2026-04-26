import React from 'react';

const CONFIG = {
  pending:   { label: 'En attente',  icon: 'schedule',      cls: 'bg-secondary/10 text-secondary border-secondary/30' },
  confirmed: { label: 'Confirmée',   icon: 'check_circle',  cls: 'bg-primary/10 text-primary border-primary/30' },
  cancelled: { label: 'Annulée',     icon: 'cancel',        cls: 'bg-error/10 text-error border-error/30' },
  completed: { label: 'Terminée',    icon: 'task_alt',      cls: 'bg-on-surface-variant/10 text-on-surface-variant border-outline-variant/30' },
};

export default function StatusBadge({ status, showIcon = true }) {
  const c = CONFIG[status] ?? CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${c.cls}`}>
      {showIcon && (
        <span className="material-symbols-outlined" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
          {c.icon}
        </span>
      )}
      {c.label}
    </span>
  );
}
