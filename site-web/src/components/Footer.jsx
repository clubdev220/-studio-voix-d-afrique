import React from 'react';
import { Link } from 'react-router-dom';

/* ── Icônes réseaux sociaux ───────────────────────────────── */
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconTikTok = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.83 1.56V6.8a4.85 4.85 0 0 1-1.06-.11z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const SOCIALS = [
  { label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61581512834141', Icon: IconFacebook  },
  { label: 'Instagram', href: 'https://www.instagram.com/studiovoixdafrique/',           Icon: IconInstagram },
  { label: 'TikTok',    href: 'https://www.tiktok.com/@studio.voix.dafrique',            Icon: IconTikTok   },
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/studio-voix-d-afrique-09548938b/', Icon: IconLinkedIn },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 w-full rounded-t-3xl py-16 px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">

        {/* Brand */}
        <div className="md:col-span-1">
          <span className="text-xl font-black text-emerald-500 mb-6 block">Studio Voix d'Afrique</span>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Expertise sonore, excellence technique et immersion culturelle au service des créateurs de contenus du monde entier.
          </p>
          <div className="flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="text-white font-bold mb-6">Navigation</h5>
          <ul className="space-y-4 text-sm">
            {[
              { label: 'Services',   to: '/services'  },
              { label: 'Studio',     to: '/studio'    },
              { label: 'Portfolio',  to: '/portfolio' },
              { label: 'Blog',       to: '/blog'      },
              { label: 'À Propos',   to: '/about'     },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-slate-400 hover:text-orange-400 transition-all">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Légal */}
        <div>
          <h5 className="text-white font-bold mb-6">Légal</h5>
          <ul className="space-y-4 text-sm">
            {[
              { label: 'Mentions Légales',     to: '/mentions-legales'      },
              { label: 'Confidentialité',       to: '/confidentialite'       },
              { label: 'Conditions Générales', to: '/conditions-generales'  },
            ].map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className="text-slate-400 hover:text-orange-400 transition-all">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-white font-bold mb-6">Contact</h5>
          <ul className="space-y-4 text-sm">
            {[
              { icon: 'location_on', text: 'Ouagadougou, Burkina Faso' },
              { icon: 'mail',        text: 'contact@voixdafrique.studio' },
              { icon: 'call',        text: import.meta.env.VITE_STUDIO_PHONE || '+226 67 56 56 91' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-slate-400">
                <span className="material-symbols-outlined text-emerald-500">{icon}</span>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-xs">© 2026 Studio Voix d'Afrique. Tous droits réservés.</p>
        <p className="text-slate-400 text-xs">Ouagadougou, Burkina Faso</p>
      </div>
    </footer>
  );
}
