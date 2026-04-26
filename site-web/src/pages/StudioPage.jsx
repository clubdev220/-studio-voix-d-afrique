import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';

/* ── filtre appliqué à toutes les images (N&B + sombre) ──────── */
const IMG_FILTER = { filter: 'grayscale(1) brightness(0.55)' };

/* ─── Equipment Card ─────────────────────────────────────────── */
const EquipCard = ({ src, name, desc, tags, tagColor = 'text-primary', featured = false }) => (
  <div className={`bg-surface-container-low rounded-xl p-8 hover:bg-surface-container-high transition-all group border border-outline-variant/10 ${featured ? 'md:scale-105 shadow-2xl z-10' : ''}`}>
    <div className="aspect-square mb-8 overflow-hidden rounded-lg">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        style={IMG_FILTER}
      />
    </div>
    <h3 className="text-2xl font-bold mb-2">{name}</h3>
    <p className="text-on-surface-variant text-sm mb-4">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className={`px-3 py-1 bg-surface-container-highest rounded-full text-xs font-bold ${tagColor}`}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

/* ─── Space Gallery Card ─────────────────────────────────────── */
const SpaceCard = ({ src, title, subtitle, className = '' }) => (
  <div className={`relative rounded-3xl overflow-hidden group ${className}`}>
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
      style={IMG_FILTER}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-sm text-slate-300">{subtitle}</p>
    </div>
  </div>
);

/* ─── Studio Page ────────────────────────────────────────────── */
export default function StudioPage() {
  const { openBooking } = useBooking();
  const spacesRef = useRef(null);

  const scrollToSpaces = () => {
    spacesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main>

        {/* ══════════════════ HERO ══════════════════ */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <img
              alt="Console de mixage professionnelle"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80"
              style={IMG_FILTER}
            />
          </div>

          <div className="relative z-20 max-w-5xl">
            <span className="inline-block text-secondary font-bold tracking-[0.2em] mb-4 text-sm uppercase">
              L'Excellence Sonore
            </span>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 max-w-3xl" style={{ fontFamily: 'Space Grotesk' }}>
              Immersion au cœur de la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                création
              </span>
              .
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10">
              Découvrez un sanctuaire acoustique où la technologie de pointe rencontre l'âme de l'Afrique. Un espace conçu pour les artistes exigeants.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={scrollToSpaces}
                className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all flex items-center gap-2"
                style={{ boxShadow: '0 0 32px 0 rgba(216, 90, 27, 0.15)' }}
              >
                Découvrir les espaces
                <span className="material-symbols-outlined">arrow_downward</span>
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════ ARSENAL TECHNIQUE ══════════════════ */}
        <section className="py-24 px-8 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                  L'Arsenal Technique
                </h2>
                <p className="text-on-surface-variant text-lg">
                  Une sélection rigoureuse d'équipements analogiques et numériques pour sculpter votre son avec une précision chirurgicale.
                </p>
              </div>
              <span className="text-primary font-bold text-5xl opacity-20 hidden md:block">01</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <EquipCard
                src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80"
                name="Neumann U87 Ai"
                desc="Le standard mondial pour les voix. Clarté exceptionnelle et présence naturelle."
                tags={['Large Diaphragme', 'Multi-polaire']}
              />
              <EquipCard
                src="https://images.unsplash.com/photo-1598653244849-4f476c1571ba?auto=format&fit=crop&w=800&q=80"
                name="SSL Origin 32"
                desc="Console analogique de 32 canaux offrant le son classique SSL avec un flux de travail moderne."
                tags={['Pure Drive', 'Analogique']}
                tagColor="text-secondary"
                featured
              />
              <EquipCard
                src="https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=800&q=80"
                name="Royer R-121"
                desc="Ruban de référence. Idéal pour capturer la chaleur des instruments acoustiques."
                tags={['Ruban', 'Figure-8']}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════ ATMOSPHÈRE & ESPACES ══════════════════ */}
        <section ref={spacesRef} className="py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Atmosphère &amp; Espaces
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl">
                Chaque pièce a été traitée acoustiquement pour offrir une réponse fréquentielle parfaite, tout en préservant une vibration créative unique.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6" style={{ gridTemplateRows: 'repeat(2, 380px)' }}>
              <SpaceCard
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
                title="La Régie A"
                subtitle="Précision monitoring & confort de production"
                className="md:col-span-2 md:row-span-2"
              />
              <SpaceCard
                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=800&q=80"
                title="Cabine Voix"
                subtitle="Isolation totale & acoustique mate"
                className="md:col-span-2"
              />
              <SpaceCard
                src="https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80"
                title="Grand Plateau"
                subtitle="Idéal pour les ensembles"
                className="md:col-span-1"
              />
              <SpaceCard
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                title="Lounge"
                subtitle="Détente & brainstorming"
                className="md:col-span-1"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════ SAVOIR-FAIRE ══════════════════ */}
        <section className="py-24 px-8 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            {/* Left – text */}
            <div className="w-full md:w-1/2">
              <span className="inline-block text-secondary font-bold tracking-[0.2em] mb-4 text-sm uppercase">
                Savoir-faire
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
                L'accompagnement <br />par des passionnés.
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: 'equalizer',
                    title: 'Ingénierie de pointe',
                    text: `Nos ingénieurs du son maîtrisent l'équilibre délicat entre technique rigoureuse et intuition artistique.`,
                  },
                  {
                    icon: 'groups',
                    title: 'Collaboration créative',
                    text: `Nous ne nous contentons pas d'enregistrer. Nous vous aidons à extraire le meilleur de votre performance.`,
                  },
                  {
                    icon: 'verified',
                    title: 'Qualité Master',
                    text: 'Un rendu final prêt pour la distribution mondiale sur toutes les plateformes de streaming.',
                  },
                ].map(({ icon, title, text }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-primary/20 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">{icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{title}</h4>
                      <p className="text-on-surface-variant">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – photo mosaic */}
            <div className="w-full md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  alt="Console de mixage analogique en studio"
                  src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80"
                  className="rounded-2xl w-full h-64 object-cover mt-8"
                  style={IMG_FILTER}
                />
                <img
                  alt="Égaliseur et potentiomètres d'une régie professionnelle"
                  src="https://images.unsplash.com/photo-1574375927112-8e6ae4a8bd5a?auto=format&fit=crop&w=600&q=80"
                  className="rounded-2xl w-full h-64 object-cover"
                  style={IMG_FILTER}
                />
                <img
                  alt="Microphone à ruban en cabine d'enregistrement"
                  src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80"
                  className="rounded-2xl w-full h-64 object-cover"
                  style={IMG_FILTER}
                />
                <img
                  alt="Équipement audio haute fidélité"
                  src="https://images.unsplash.com/photo-1574027542338-98e75acfd385?auto=format&fit=crop&w=600&q=80"
                  className="rounded-2xl w-full h-64 object-cover -mt-8"
                  style={IMG_FILTER}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ══════════════════ CTA RÉSERVATION ══════════════════ */}
        <section className="py-24 px-8">
          <div
            className="max-w-5xl mx-auto bg-primary-container rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden"
            style={{ boxShadow: '0 0 64px 0 rgba(58, 113, 85, 0.2)' }}
          >
            <div className="absolute inset-0 opacity-10">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1598653244849-4f476c1571ba?auto=format&fit=crop&w=1200&q=80"
                className="w-full h-full object-cover"
                style={IMG_FILTER}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-on-primary-container" style={{ fontFamily: 'Space Grotesk' }}>
                Prêt à donner vie <br />à votre son&nbsp;?
              </h2>
              <p className="text-xl text-on-primary-container/80 mb-12 max-w-2xl mx-auto">
                Que vous soyez un artiste solo ou un groupe complet, notre équipe est prête à vous accueillir pour votre prochain chef-d'œuvre.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={openBooking}
                  className="bg-secondary text-on-secondary px-10 py-5 rounded-full font-bold text-xl hover:brightness-110 active:scale-95 transition-all"
                  style={{ boxShadow: '0 0 32px 0 rgba(216, 90, 27, 0.25)' }}
                >
                  Réserver une session
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all">
                  Planifier une visite
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
