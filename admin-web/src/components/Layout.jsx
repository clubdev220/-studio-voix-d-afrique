import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const NAV = [
  { to: '/',         icon: 'dashboard',       label: 'Dashboard'       },
  { to: '/bookings', icon: 'calendar_month',  label: 'Réservations'    },
  { to: '/clients',  icon: 'group',           label: 'Clients'         },
  { to: '/settings', icon: 'tune',            label: 'Paramètres'      },
];

const PAGE_TITLES = {
  '/':         'Dashboard',
  '/bookings': 'Réservations',
  '/clients':  'Clients',
  '/settings': 'Paramètres',
};

export default function Layout({ pendingCount = 0 }) {
  const { userProfile, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const title = PAGE_TITLES[location.pathname] ?? 'Admin';
  const initials = (userProfile?.displayName ?? 'A').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── SIDEBAR ── */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-surface-container-lowest border-r border-outline-variant/10 flex flex-col z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 lg:static lg:z-auto lg:transition-none`}>

        {/* Logo */}
        <div className="px-6 py-8 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container text-lg">graphic_eq</span>
            </div>
            <div>
              <p className="text-sm font-black text-on-surface leading-none">Studio Voix</p>
              <p className="text-[10px] text-primary font-bold uppercase tracking-widest">d'Afrique · Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {NAV.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 300" }}>
                    {icon}
                  </span>
                  <span>{label}</span>
                  {label === 'Réservations' && pendingCount > 0 && (
                    <span className="ml-auto bg-secondary text-on-secondary text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {pendingCount}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User + logout */}
        <div className="px-4 py-5 border-t border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-sm font-black shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-on-surface truncate">{userProfile?.displayName ?? 'Admin'}</p>
              <p className="text-[10px] text-on-surface-variant truncate">{userProfile?.email}</p>
            </div>
            <button
              onClick={logout}
              title="Se déconnecter"
              className="w-8 h-8 rounded-lg hover:bg-surface-container-high flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined text-on-surface-variant text-lg">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">

        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-outline-variant/10 px-6 py-4 flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden w-9 h-9 rounded-xl hover:bg-surface-container-high flex items-center justify-center transition-all"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <h1 className="text-xl font-bold text-on-surface" style={{ fontFamily: 'Space Grotesk' }}>
            {title}
          </h1>

          {pendingCount > 0 && (
            <div className="ml-auto flex items-center gap-2 bg-secondary/10 border border-secondary/30 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary text-xs font-bold">{pendingCount} en attente</span>
            </div>
          )}
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
