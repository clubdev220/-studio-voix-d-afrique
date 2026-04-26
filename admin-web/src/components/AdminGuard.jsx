import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function AdminGuard() {
  const { currentUser, isAdmin, loading, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) return <Navigate to="/login" replace />;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 text-center px-4">
        <span className="material-symbols-outlined text-error" style={{ fontSize: '4rem' }}>lock</span>
        <h1 className="text-2xl font-bold text-on-surface">Accès refusé</h1>
        <p className="text-on-surface-variant max-w-sm">
          Ce compte n'a pas les droits d'administration. Connectez-vous avec un compte admin.
        </p>
        <button
          onClick={logout}
          className="px-6 py-3 bg-surface-container-low border border-outline-variant rounded-xl font-bold text-on-surface hover:bg-surface-container transition-all"
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  return <Outlet />;
}
