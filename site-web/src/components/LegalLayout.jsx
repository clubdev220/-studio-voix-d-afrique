import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

/**
 * Mise en page partagée pour les pages légales.
 * @param {string}   badge    – étiquette au-dessus du titre (ex. "Document légal")
 * @param {string}   title    – titre principal de la page
 * @param {string}   updated  – date de dernière mise à jour
 * @param {Array}    sections – [{ heading, paragraphs[], list? }]
 */
export default function LegalLayout({ badge, title, updated, sections }) {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      {/* ── Hero strip ───────────────────────────────────────── */}
      <section className="pt-32 pb-16 px-8 border-b border-outline-variant/10">
        <div className="max-w-4xl mx-auto">
          {badge && (
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant border border-outline-variant/30 px-4 py-1.5 rounded-full mb-6">
              {badge}
            </span>
          )}
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: 'Space Grotesk' }}
          >
            {title}
          </h1>
          {updated && (
            <p className="text-sm text-on-surface-variant">
              Dernière mise à jour&nbsp;: <span className="text-primary font-medium">{updated}</span>
            </p>
          )}
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────── */}
      <main className="py-16 px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="text-xl md:text-2xl font-bold mb-4 pl-4 border-l-4 border-primary text-on-background">
                  {section.heading}
                </h2>
              )}
              <div className="bg-surface-container-low rounded-2xl p-6 md:p-8 space-y-4 border border-outline-variant/10">
                {section.paragraphs?.map((p, j) => (
                  <p key={j} className="text-on-surface-variant leading-relaxed text-sm md:text-base">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="space-y-2 mt-2">
                    {section.list.map((item, k) => (
                      <li key={k} className="flex items-start gap-3 text-on-surface-variant text-sm md:text-base">
                        <span className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0">
                          chevron_right
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.contact && (
                  <div className="mt-4 p-4 bg-surface-container rounded-xl border border-outline-variant/20 space-y-1">
                    {section.contact.map((line, k) => (
                      <p key={k} className="text-sm text-on-surface-variant">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
