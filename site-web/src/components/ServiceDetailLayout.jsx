import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';

/* ─── FAQ Item ──────────────────────────────────────────────── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-outline-variant/15 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-surface-container-high transition-colors"
      >
        <span className="font-medium text-on-background text-sm">{question}</span>
        <span className={`material-symbols-outlined text-on-surface-variant flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96' : 'max-h-0'}`}>
        <p className="px-6 pb-5 text-sm text-on-surface-variant leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

/* ─── Main Layout ───────────────────────────────────────────── */
export default function ServiceDetailLayout({ service }) {
  const { openBooking } = useBooking();
  const {
    badge,
    titleLine1,
    titleLine2,
    accentClass,
    description,
    heroImage,
    heroImageAlt,
    features,
    processImage,
    processImageAlt,
    process,
    deliverables,
    faq,
    ctaTitle,
    ctaDescription,
  } = service;

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />

      {/* ═══ HERO ════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Fond avec gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={heroImageAlt}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[480px]">
            {/* Content */}
            <div>
              {badge && (
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant border border-outline-variant/30 px-4 py-1.5 rounded-full mb-6">
                  {badge}
                </span>
              )}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight">
                {titleLine1 && <span className="text-on-background block">{titleLine1}</span>}
                {titleLine2 && <span className={`${accentClass} block`}>{titleLine2}</span>}
              </h1>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xl">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={openBooking}
                  className="inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-7 py-3.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform text-sm"
                >
                  <span className="material-symbols-outlined text-base">calendar_month</span>
                  Réserver pour ce service
                </button>
                <Link
                  to="/portfolio"
                  className="inline-flex items-center justify-center gap-2 border border-outline-variant/30 text-on-surface px-7 py-3.5 rounded-full font-medium hover:bg-surface-container-low transition-colors text-sm"
                >
                  Voir le portfolio
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="hidden lg:block">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-outline-variant/10">
                <img
                  src={heroImage}
                  alt={heroImageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-background/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ POURQUOI NOUS ══════════════════════════════════ */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-8 h-px bg-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Pourquoi choisir notre expertise ?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-7 hover:border-outline-variant/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary text-xl">{feat.icon}</span>
                </div>
                <h3 className="font-bold text-on-background mb-2">{feat.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESSUS ══════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-outline-variant/10">
              <img
                src={processImage}
                alt={processImageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent" />
            </div>
            {/* Steps */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-10">
                Le Processus <span className="text-primary">Studio</span>
              </h2>
              <div className="flex flex-col gap-6">
                {process.map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-on-surface-variant">{step.number}</span>
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-on-background mb-1">{step.title}</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ LIVRABLES ══════════════════════════════════════ */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Ce que vous recevez</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {deliverables.map((item, i) => (
              <div
                key={i}
                className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-6 flex flex-col items-center text-center gap-3 hover:border-outline-variant/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                </div>
                <div>
                  <p className="font-bold text-on-background text-sm">{item.label}</p>
                  <p className="text-xs text-on-surface-variant/60 uppercase tracking-wider mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ════════════════════════════════════════════ */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-8 md:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Questions Fréquentes</h2>
          <div className="flex flex-col gap-3">
            {faq.map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ════════════════════════════════════════════ */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{ctaTitle}</h2>
          <p className="text-on-surface-variant mb-8">{ctaDescription}</p>
          <button
            onClick={openBooking}
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            Réserver pour ce service
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
