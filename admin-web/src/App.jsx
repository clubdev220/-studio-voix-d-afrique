import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider }     from './contexts/AuthContext.jsx';
import AdminGuard           from './components/AdminGuard.jsx';
import Layout               from './components/Layout.jsx';
import LoginPage            from './pages/LoginPage.jsx';
import DashboardPage        from './pages/DashboardPage.jsx';
import BookingsPage         from './pages/BookingsPage.jsx';
import ClientsPage          from './pages/ClientsPage.jsx';
import SettingsPage         from './pages/SettingsPage.jsx';
import { subscribeAllBookings } from './lib/adminService.js';

// Wrapper that injects live pending count into Layout
function AppShell() {
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const unsub = subscribeAllBookings(
      data => setPendingCount(data.filter(b => b.status === 'pending').length),
      ()   => {}
    );
    return unsub;
  }, []);

  return (
    <Layout pendingCount={pendingCount} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AdminGuard />}>
          <Route element={<AppShell />}>
            <Route path="/"          element={<DashboardPage />} />
            <Route path="/bookings"  element={<BookingsPage />} />
            <Route path="/clients"   element={<ClientsPage />} />
            <Route path="/settings"  element={<SettingsPage />} />
          </Route>
        </Route>

        {/* Catch-all → dashboard */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </AuthProvider>
  );
}
