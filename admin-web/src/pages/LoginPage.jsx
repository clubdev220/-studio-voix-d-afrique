import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function LoginPage() {
  const navigate = useNavigate();
  const { currentUser, isAdmin, loading } = useAuth();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState(null);
  const [busy,     setBusy]     = useState(false);

  // Already logged in as admin → redirect
  useEffect(() => {
    if (!loading && currentUser && isAdmin) navigate('/', { replace: true });
  }, [currentUser, isAdmin, loading, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      // Verify admin role
      const snap = await getDoc(doc(db, 'users', cred.user.uid));
      if (!snap.exists() || snap.data().role !== 'admin') {
        await auth.signOut();
        setError('Ce compte n\'a pas les droits d\'administration.');
        return;
      }
      navigate('/', { replace: true });
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Email ou mot de passe incorrect.');
      } else {
        setError('Erreur de connexion. Réessayez.');
      }
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary-container rounded-2xl flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-on-primary-container text-3xl">graphic_eq</span>
          </div>
          <h1 className="text-2xl font-black text-on-surface" style={{ fontFamily: 'Space Grotesk' }}>
            Studio Voix d'Afrique
          </h1>
          <p className="text-on-surface-variant text-sm mt-1">Interface d'administration</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-7 space-y-5">
          {error && (
            <div className="bg-error/10 border border-error/30 rounded-xl p-3 text-error text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@studiovoixdafrique.com"
              className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full bg-primary-container text-on-primary-container font-black py-3.5 rounded-xl hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {busy
              ? <><span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> Connexion…</>
              : 'Se connecter'
            }
          </button>
        </form>

        <p className="text-center text-on-surface-variant text-xs mt-6">
          Accès réservé au personnel du studio
        </p>
      </div>
    </div>
  );
}
