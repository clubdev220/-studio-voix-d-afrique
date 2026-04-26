import React from 'react';

export default function StatCard({ icon, label, value, sub, accent = 'text-primary', alert = false }) {
  return (
    <div className={`bg-surface-container-low rounded-2xl p-6 border flex items-start gap-4 transition-all ${
      alert ? 'border-secondary/40 shadow-lg shadow-secondary/5' : 'border-outline-variant/10'
    }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
        alert ? 'bg-secondary/15' : 'bg-surface-container-high'
      }`}>
        <span className={`material-symbols-outlined text-2xl ${alert ? 'text-secondary' : accent}`}>
          {icon}
        </span>
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">{label}</p>
        <p className={`text-3xl font-black leading-none ${alert ? 'text-secondary' : 'text-on-surface'}`}
           style={{ fontFamily: 'Space Grotesk' }}>
          {value}
        </p>
        {sub && <p className="text-xs text-on-surface-variant mt-1">{sub}</p>}
      </div>
      {alert && (
        <span className="ml-auto shrink-0 w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
      )}
    </div>
  );
}
