import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase.js';
import Navbar from '../components/Navbar.jsx';

const googleProvider = new GoogleAuthProvider();

/* ─── Champ de saisie réutilisable ────────────────────────── */
function Field({ label, type = 'text', value, onChange, placeholder, required, autoComplete }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-surface-container-high border-2 border-outline-variant/20 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-primary/60 transition-colors text-on-surface placeholder:text-on-surface-variant/40"
      />
    </div>
  );
}

/* ─── Bouton Google ───────────────────────────────────────── */
function GoogleButton({ onClick, loading }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 bg-surface-container-high border-2 border-outline-variant/20 hover:border-outline-variant/60 rounded-2xl px-5 py-3.5 font-semibold text-on-surface transition-all duration-200 disabled:opacity-50"
    >
      {/* Google logo SVG */}
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>
      Continuer avec Google
    </button>
  );
}

/* ─── Divider ─────────────────────────────────────────────── */
function Divider() {
  return (
    <div className="flex items-center gap-4 my-2">
      <div className="flex-1 h-px bg-outline-variant/20" />
      <span className="text-xs text-on-surface-variant/60 font-medium">ou</span>
      <div className="flex-1 h-px bg-outline-variant/20" />
    </div>
  );
}

/* ─── Mode : Connexion ────────────────────────────────────── */
function LoginForm({ onGoogle, googleLoading }) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GoogleButton onClick={() => onGoogle(from)} loading={googleLoading} />
      <Divider />
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="vous@exemple.com"
        required
        autoComplete="email"
      />
      <Field
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        required
        autoComplete="current-password"
      />
      {error && <p className="text-sm text-error bg-error/10 rounded-xl px-4 py-3">{error}</p>}
      <Link
        to="/connexion?mode=reset"
        className="text-xs text-on-surface-variant hover:text-primary transition-colors self-end"
      >
        Mot de passe oublié ?
      </Link>
      <button
        type="submit"
        disabled={loading || !email || !password}
        className="w-full py-4 bg-primary text-on-primary font-bold rounded-full disabled:opacity-40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="w-5 h-5 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
        ) : (
          <>Se connecter <span className="material-symbols-outlined text-base">login</span></>
        )}
      </button>
      <p className="text-sm text-center text-on-surface-variant">
        Pas encore de compte ?{' '}
        <Link to="/inscription" className="text-primary font-bold hover:underline">
          Créer un compte
        </Link>
      </p>
    </form>
  );
}

/* ─── Mode : Inscription ──────────────────────────────────── */
function RegisterForm({ onGoogle, googleLoading }) {
  const navigate = useNavigate();
  const from = '/mon-espace';

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', city: '', country: 'Burkina Faso', password: '', confirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (form.password.length < 6) {
      setError('Le mot de passe doit comporter au moins 6 caractères.');
      return;
    }
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(user, { displayName: form.fullName });
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        city: form.city,
        country: form.country,
        role: 'client',
        createdAt: serverTimestamp(),
      });
      navigate(from, { replace: true });
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <GoogleButton onClick={() => onGoogle(from)} loading={googleLoading} />
      <Divider />
      <Field label="Nom complet" value={form.fullName} onChange={set('fullName')} placeholder="Koné Fatimata" required autoComplete="name" />
      <Field label="Email" type="email" value={form.email} onChange={set('email')} placeholder="vous@exemple.com" required autoComplete="email" />
      <Field label="Téléphone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+226 XX XX XX XX" autoComplete="tel" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Ville" value={form.city} onChange={set('city')} placeholder="Ouagadougou" />
        <Field label="Pays" value={form.country} onChange={set('country')} placeholder="Burkina Faso" />
      </div>
      <Field label="Mot de passe" type="password" value={form.password} onChange={set('password')} placeholder="Min. 6 caractères" required autoComplete="new-password" />
      <Field label="Confirmer le mot de passe" type="password" value={form.confirm} onChange={set('confirm')} placeholder="••••••••" required autoComplete="new-password" />
      {error && <p className="text-sm text-error bg-error/10 rounded-xl px-4 py-3">{error}</p>}
      <button
        type="submit"
        disabled={loading || !form.fullName || !form.email || !form.password || !form.confirm}
        className="w-full py-4 bg-primary text-on-primary font-bold rounded-full disabled:opacity-40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="w-5 h-5 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
        ) : (
          <>Créer mon compte <span className="material-symbols-outlined text-base">person_add</span></>
        )}
      </button>
      <p className="text-sm text-center text-on-surface-variant">
        {"Déjà un compte ? "}
        <Link to="/connexion" className="text-primary font-bold hover:underline">Se connecter</Link>
      </p>
    </form>
  );
}

/* ─── Mode : Réinitialisation ─────────────────────────────── */
function ResetForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      setError(mapFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <span className="material-symbols-outlined text-6xl text-primary">mark_email_read</span>
        <div>
          <h3 className="text-xl font-bold mb-2">Email envoyé !</h3>
          <p className="text-on-surface-variant text-sm max-w-xs">
            Un lien de réinitialisation a été envoyé à <strong>{email}</strong>. Vérifiez vos spams si nécessaire.
          </p>
        </div>
        <Link to="/connexion" className="text-primary font-bold hover:underline text-sm">
          Retour à la connexion
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-on-surface-variant text-sm leading-relaxed">
        Saisissez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
      </p>
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="vous@exemple.com"
        required
        autoComplete="email"
      />
      {error && <p className="text-sm text-error bg-error/10 rounded-xl px-4 py-3">{error}</p>}
      <button
        type="submit"
        disabled={loading || !email}
        className="w-full py-4 bg-primary text-on-primary font-bold rounded-full disabled:opacity-40 hover:scale-[1.02] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <span className="w-5 h-5 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
        ) : (
          <>Envoyer le lien <span className="material-symbols-outlined text-base">send</span></>
        )}
      </button>
      <Link to="/connexion" className="text-sm text-center text-on-surface-variant hover:text-primary transition-colors">
        ← Retour à la connexion
      </Link>
    </form>
  );
}

/* ─── Helper : messages d'erreur lisibles ─────────────────── */
function mapFirebaseError(code) {
  const map = {
    'auth/invalid-email':            'Adresse email invalide.',
    'auth/user-not-found':           'Aucun compte associé à cet email.',
    'auth/wrong-password':           'Mot de passe incorrect.',
    'auth/invalid-credential':       'Email ou mot de passe incorrect.',
    'auth/email-already-in-use':     'Cet email est déjà utilisé.',
    'auth/weak-password':            'Le mot de passe est trop faible (6 caractères min).',
    'auth/too-many-requests':        'Trop de tentatives. Réessayez plus tard.',
    'auth/network-request-failed':   'Erreur réseau. Vérifiez votre connexion.',
    'auth/popup-closed-by-user':     'La fenêtre Google a été fermée.',
  };
  return map[code] || 'Une erreur est survenue. Réessayez.';
}

/* ─── Page principale ─────────────────────────────────────── */
export default function AuthPage({ mode: propMode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive mode from URL or prop
  const params = new URLSearchParams(location.search);
  const urlMode = params.get('mode');
  const mode = propMode || urlMode || (location.pathname === '/inscription' ? 'register' : 'login');

  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState('');

  async function handleGoogle(redirectTo = '/') {
    setGoogleError('');
    setGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Write/merge profile if first-time Google sign-in
      const profileRef = doc(db, 'users', user.uid);
      await setDoc(profileRef, {
        uid: user.uid,
        fullName: user.displayName || '',
        email: user.email || '',
        phone: '',
        city: '',
        country: '',
        role: 'client',
        createdAt: serverTimestamp(),
      }, { merge: true });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setGoogleError(mapFirebaseError(err.code));
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  const titles = {
    login:          { title: 'Bon retour', subtitle: 'Connectez-vous pour accéder à votre espace.' },
    register:       { title: 'Créer un compte', subtitle: "Rejoignez Studio Voix d'Afrique." },
    reset:          { title: 'Mot de passe oublié', subtitle: 'Réinitialisez votre mot de passe par email.' },
  };
  const { title, subtitle } = titles[mode] || titles.login;

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />

      <div className="pt-28 pb-20 px-4 flex items-start justify-center min-h-screen">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium mb-6"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Retour au site
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
            <p className="text-on-surface-variant text-sm">{subtitle}</p>
          </div>

          {/* Card */}
          <div className="bg-surface-container-low border border-outline-variant/10 rounded-3xl p-8 shadow-xl shadow-black/20">
            {googleError && (
              <p className="text-sm text-error bg-error/10 rounded-xl px-4 py-3 mb-4">{googleError}</p>
            )}
            {mode === 'login'    && <LoginForm    onGoogle={handleGoogle} googleLoading={googleLoading} />}
            {mode === 'register' && <RegisterForm onGoogle={handleGoogle} googleLoading={googleLoading} />}
            {mode === 'reset'    && <ResetForm />}
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-on-surface-variant/40 mt-6">
            Studio Voix d'Afrique — Ouagadougou, Burkina Faso
          </p>
        </div>
      </div>
    </div>
  );
}
