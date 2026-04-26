import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';

const navLinks = [
  { label: 'Services',  to: '/services' },
  { label: 'Studio',    to: '/studio'   },
  { label: 'Portfolio', to: '/portfolio'},
  { label: 'Blog',      to: '/blog'     },
  { label: 'À Propos',  to: '/about'    },
  { label: 'Contact',   to: '/contact'  },
];

export default function Navbar({ onBookingOpen }) {
  const { currentUser, userProfile, logout } = useAuth();
  const { openBooking } = useBooking();

  // Use context-level openBooking, fallback to prop for backwards compatibility
  const handleBookingOpen = () => {
    openBooking();
    if (onBookingOpen) onBookingOpen();
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const displayName = userProfile?.fullName || currentUser?.displayName || currentUser?.email || '';
  const initials = displayName
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${isScrolled
          ? 'bg-surface/80 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'bg-surface/60 backdrop-blur-xl'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className="flex items-center gap-2 group">
            <img
              src="/assets/Icon.svg"
              alt="Studio Voix d'Afrique"
              className="h-20 w-20 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold text-emerald-400 font-headline tracking-tight hidden sm:block">
              Studio Voix d'Afrique
            </span>
          </NavLink>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'text-orange-500 font-bold border-b-2 border-orange-500 pb-0.5 transition-colors duration-300 text-sm'
                  : 'text-slate-300 hover:text-orange-400 transition-colors duration-300 font-medium text-sm'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* CTA Réserver */}
          <button
            id="cta-nav-reserver"
            onClick={handleBookingOpen}
            className="hidden sm:block bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-bold transition-transform hover:scale-105 active:scale-95 duration-200 text-sm"
          >
            Réserver une session
          </button>

          {/* Auth zone */}
          {currentUser ? (
            /* Avatar + dropdown */
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(v => !v)}
                className="flex items-center gap-2 group"
                aria-label="Menu utilisateur"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={displayName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-primary/40 group-hover:border-primary transition-colors"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/20 border-2 border-primary/40 group-hover:border-primary flex items-center justify-center text-primary text-sm font-bold transition-colors">
                    {initials}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-52 bg-surface-container-low border border-outline-variant/20 rounded-2xl shadow-xl shadow-black/30 py-2 z-50">
                  <div className="px-4 py-2 border-b border-outline-variant/10 mb-1">
                    <p className="text-sm font-bold text-on-background truncate">{displayName || 'Mon compte'}</p>
                    <p className="text-xs text-on-surface-variant truncate">{currentUser.email}</p>
                  </div>
                  <Link
                    to="/mon-espace"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-base text-on-surface-variant">dashboard</span>
                    Mon espace
                  </Link>
                  <button
                    onClick={() => { setDropdownOpen(false); logout(); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Bouton Connexion */
            <Link
              to="/connexion"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-on-surface-variant hover:text-primary transition-colors border border-outline-variant/20 hover:border-primary/40 px-4 py-2 rounded-full"
            >
              <span className="material-symbols-outlined text-base">person</span>
              Connexion
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed top-[72px] left-0 right-0 z-40 bg-surface-container-low border-b border-outline-variant/20 py-6 px-8 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map(({ label, to }) => (
              <NavLink
                key={label}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? 'text-orange-500 font-bold transition-colors py-2'
                    : 'text-on-surface hover:text-primary transition-colors font-medium py-2'
                }
              >
                {label}
              </NavLink>
            ))}
            <div className="border-t border-outline-variant/10 pt-4 flex flex-col gap-3">
              <button
                onClick={() => { setMenuOpen(false); handleBookingOpen(); }}
                className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold text-sm"
              >
                Réserver une session
              </button>
              {currentUser ? (
                <>
                  <Link
                    to="/mon-espace"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-sm text-on-surface font-medium py-2"
                  >
                    <span className="material-symbols-outlined text-base">dashboard</span>
                    Mon espace
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); logout(); }}
                    className="flex items-center gap-2 text-sm text-error font-medium py-2"
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Se déconnecter
                  </button>
                </>
              ) : (
                <Link
                  to="/connexion"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-on-surface font-medium py-2"
                >
                  <span className="material-symbols-outlined text-base">person</span>
                  Connexion
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
