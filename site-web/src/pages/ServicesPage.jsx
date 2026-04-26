import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

/* ─── Services Page ────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />
      <main className="pt-24">

        {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
        <section className="relative h-[819px] flex items-center px-8 md:px-20 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <img
              alt="Professional recording studio setup"
              className="w-full h-full object-cover grayscale opacity-40 scale-110"
              src="https://images.unsplash.com/photo-1598653244849-4f476c1571ba?auto=format&fit=crop&w=1920&q=80"
              style={{ filter: 'grayscale(1) brightness(0.55)' }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-4xl">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
              Expertise Sonore
            </span>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 text-on-background">
              Nos Services —{' '}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                De la Voix à l'Émotion
              </span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed font-light">
              Nous façonnons des expériences auditives qui transcendent les frontières. Du doublage à la
              post-production, chaque vibration est capturée avec une précision absolue.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════ SERVICES GRID ═══════════════════════════════ */}
        <section className="px-8 md:px-20 py-32 bg-surface-container-lowest">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Doublage — large card */}
            <div className="md:col-span-8 group relative bg-surface-container-low rounded-3xl p-10 overflow-hidden min-h-[400px] flex flex-col justify-end transition-all duration-500 hover:bg-surface-container-high border border-outline-variant/10">
              <div className="absolute top-10 right-10 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                <span
                  className="material-symbols-outlined text-6xl text-primary"
                  style={{ fontVariationSettings: "'wght' 100", fontSize: '5rem' }}
                >
                  translate
                </span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Doublage</h3>
              <p className="text-on-surface-variant mb-6 max-w-md leading-relaxed">
                Donnez une voix locale à vos contenus internationaux. Nos comédiens capturent l'essence et
                l'émotion pour une immersion totale.
              </p>
              <Link to="/services/doublage" className="flex items-center gap-2 text-secondary font-bold hover:gap-4 transition-all duration-300">
                En savoir plus{' '}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>

            {/* Voice-over */}
            <div className="md:col-span-4 bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/10 hover:bg-surface-container-high transition-all duration-300">
              <div>
                <span className="material-symbols-outlined text-4xl text-secondary mb-8 block">mic</span>
                <h3 className="text-2xl font-bold mb-4">Voice-over</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Narration publicitaire, institutionnelle ou documentaire. Une clarté exceptionnelle pour
                  porter votre message.
                </p>
              </div>
              <Link to="/services/voix-off" className="text-secondary font-bold text-sm mt-8 flex items-center gap-2">
                En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Podcast */}
            <div className="md:col-span-4 bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/10 hover:bg-surface-container-high transition-all duration-300">
              <div>
                <span className="material-symbols-outlined text-4xl text-tertiary mb-8 block">podcasts</span>
                <h3 className="text-2xl font-bold mb-4">Podcast</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Enregistrement et réalisation de podcasts premium. Un son cristallin pour fidéliser votre
                  audience.
                </p>
              </div>
              <Link to="/services/podcast" className="text-secondary font-bold text-sm mt-8 flex items-center gap-2">
                En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Post-production */}
            <div className="md:col-span-4 bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/10 hover:bg-surface-container-high transition-all duration-300">
              <div>
                <span className="material-symbols-outlined text-4xl text-primary mb-8 block">equalizer</span>
                <h3 className="text-2xl font-bold mb-4">Post-production</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Mixage, sound design et mastering. La touche finale qui transforme un enregistrement en
                  œuvre d'art.
                </p>
              </div>
              <Link to="/services/post-production" className="text-secondary font-bold text-sm mt-8 flex items-center gap-2">
                En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

            {/* Location Studio */}
            <div className="md:col-span-4 bg-surface-container-low rounded-3xl p-10 flex flex-col justify-between border border-outline-variant/10 hover:bg-surface-container-high transition-all duration-300">
              <div>
                <span className="material-symbols-outlined text-4xl text-on-surface mb-8 block">meeting_room</span>
                <h3 className="text-2xl font-bold mb-4">Location Studio</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Espaces acoustiques traités et équipements haut de gamme à votre disposition pour vos
                  projets.
                </p>
              </div>
              <Link to="/services/location-studio" className="text-secondary font-bold text-sm mt-8 flex items-center gap-2">
                En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════ PROCESS ═══════════════════════════════ */}
        <section className="px-8 md:px-20 py-32 bg-surface-dim">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <h2 className="text-5xl font-bold tracking-tight">
                Notre Processus{' '}
                <br />
                <span className="text-primary/60">Créatif</span>
              </h2>
              <p className="text-on-surface-variant max-w-md">
                Un flux de travail optimisé pour garantir une qualité constante et un respect rigoureux de
                vos délais.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

              {/* Step 01 */}
              <div className="relative group">
                <div className="w-16 h-16 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-container text-2xl font-bold mb-8 relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                  01
                </div>
                <h4 className="text-xl font-bold mb-4">Brief &amp; Casting</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Analyse de vos besoins et sélection rigoureuse de la voix ou de l'ambiance sonore idéale
                  pour votre projet.
                </p>
              </div>

              {/* Step 02 */}
              <div className="relative group">
                <div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center text-on-secondary-container text-2xl font-bold mb-8 relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                  02
                </div>
                <h4 className="text-xl font-bold mb-4">Production</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Session dirigée dans nos studios équipés des dernières technologies pour une performance
                  optimale.
                </p>
              </div>

              {/* Step 03 */}
              <div className="relative group">
                <div className="w-16 h-16 rounded-2xl bg-tertiary-container flex items-center justify-center text-on-tertiary-container text-2xl font-bold mb-8 relative z-10 transition-transform duration-300 group-hover:-translate-y-2">
                  03
                </div>
                <h4 className="text-xl font-bold mb-4">Finalisation</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Nettoyage, mixage et livraison de fichiers haute définition prêts pour la diffusion sur
                  tous supports.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════ CTA ═══════════════════════════════ */}
        <section className="px-8 py-20">
          <div
            className="bg-primary-container rounded-[3rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative"
            style={{ boxShadow: '0 0 32px 0 rgba(58, 113, 85, 0.2)' }}
          >
            {/* Gradient overlay */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-secondary/20 to-transparent pointer-events-none" />

            {/* Text */}
            <div className="relative z-10 max-w-xl text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-on-primary-container mb-6">
                Besoin d'une expertise spécifique ?
              </h2>
              <p className="text-on-primary-container/80 text-lg mb-8">
                Parlons de votre prochain projet et voyons comment nous pouvons donner vie à vos idées.
              </p>
              <button className="bg-on-primary-container text-primary-container px-10 py-4 rounded-full font-bold text-lg hover:bg-secondary hover:text-on-secondary-container transition-all duration-300">
                Contactez-nous
              </button>
            </div>

            {/* Spinning icon */}
            <div className="relative z-10 hidden lg:block">
              <div
                className="w-64 h-64 rounded-full border-4 border-dashed border-on-primary-container/20 flex items-center justify-center"
                style={{ animation: 'spin 20s linear infinite' }}
              >
                <span
                  className="material-symbols-outlined text-on-primary-container/30"
                  style={{ fontSize: '5rem', fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 48" }}
                >
                  record_voice_over
                </span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
