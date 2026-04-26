import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-950 w-full rounded-t-3xl py-16 px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">

        {/* Brand */}
        <div className="md:col-span-1">
          <span className="text-xl font-black text-emerald-500 mb-6 block">Studio Voix d'Afrique</span>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Expertise sonore, excellence technique et immersion culturelle au service des créateurs de contenus du monde entier.
          </p>
          <div className="flex gap-4">
            {['brand_awareness', 'social_leaderboard', 'share'].map(icon => (
              <a
                key={icon}
                href="#"
                className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all"
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
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
            {['Mentions Légales', 'Confidentialité', 'Conditions Générales'].map(item => (
              <li key={item}>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-all">{item}</a>
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
              { icon: 'call',        text: '+226 25 XX XX XX' },
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
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-400 text-xs">© 2026 Studio Voix d'Afrique. Tous droits réservés.</p>
        <span className="text-emerald-500 text-xs font-bold tracking-widest">OUAGADOUGOU • PARIS • ABIDJAN</span>
      </div>
    </footer>
  );
}
