import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase.js';
import ServicesPage from './pages/ServicesPage.jsx';
import StudioPage from './pages/StudioPage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ArticlePage from './pages/ArticlePage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ClientDashboardPage from './pages/ClientDashboardPage.jsx';
import DoublagePage from './pages/DoublagePage.jsx';
import VoixOffPage from './pages/VoixOffPage.jsx';
import PodcastPage from './pages/PodcastPage.jsx';
import PostProductionPage from './pages/PostProductionPage.jsx';
import LocationStudioPage from './pages/LocationStudioPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { useBooking } from './contexts/BookingContext.jsx';

/* ─── Home Page ──────────────────────────────────────────────────────── */
function HomePage() {
  const { openBooking } = useBooking();



  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    // Pas d'orderBy dans la requête pour éviter d'exiger un index composite.
    // Le tri se fait côté client sur le champ `order` (ou par défaut sur le titre).
    const q = query(
      collection(db, 'portfolio_projects'),
      where('published', '==', true)
    );
    getDocs(q)
      .then(snap => {
        const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        // Trier par `order` (croissant) si le champ existe, sinon par titre
        all.sort((a, b) => {
          const oa = a.order ?? 9999;
          const ob = b.order ?? 9999;
          return oa !== ob ? oa - ob : (a.title ?? '').localeCompare(b.title ?? '');
        });
        setProjects(all.slice(0, 3));
      })
      .catch(() => setProjects([]))
      .finally(() => setLoadingProjects(false));
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* ═══════════════════════════════════════════
          NAVIGATION
      ═══════════════════════════════════════════ */}
      <Navbar />


      <main>
        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/dqcac9ugv/image/upload/q_auto/f_auto/v1777158827/Capture_d_%C3%A9cran_2026-04-25_190551_ylwhab.png"
              alt="Cinematic interior view of a professional dark recording studio"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute inset-0 hero-gradient" />
          </div>

          <div className="container mx-auto px-8 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] mb-6 tracking-tighter text-on-background">
                L'Excellence Sonore au&nbsp;Cœur de l'Afrique
              </h1>
              <p className="text-xl md:text-2xl text-on-surface-variant font-light mb-10 max-w-2xl leading-relaxed">
                Le premier studio de doublage et post-production audio à Ouagadougou, au service du monde francophone.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button
                  id="cta-hero-services"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-bold text-lg sonic-glow transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Découvrir nos services
                  <span className="material-symbols-outlined">east</span>
                </button>
                <button
                  id="cta-hero-portfolio"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border border-outline-variant/30 text-on-surface px-8 py-4 rounded-full font-bold text-lg hover:bg-surface-variant transition-all duration-300 flex items-center justify-center"
                >
                  Voir le Portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Wave decoration */}
          <div className="absolute bottom-10 left-0 w-full opacity-10 pointer-events-none">
            <svg className="w-full h-40" viewBox="0 0 1440 320">
              <path d="M0,192L48,176C96,160,192,128,288,112C384,96,480,96,576,128C672,160,768,224,864,224C960,224,1056,160,1152,144C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" fill="#99d3b2" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SERVICES — Bento Grid
        ═══════════════════════════════════════════ */}
        <section id="services" className="py-32 bg-surface-container-lowest">
          <div className="container mx-auto px-8">
            <div className="mb-16 text-center max-w-2xl mx-auto">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Nos Expertises</span>
              <h2 className="text-4xl md:text-5xl font-bold">L'Art du Son Magnifié</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Card 1 – Doublage (large) */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-xl bg-surface-container-low p-8 h-[400px] flex flex-col justify-end border-none">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <span className="material-symbols-outlined" style={{ fontSize: '9rem' }}>mic_external_on</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">Doublage</h3>
                  <p className="text-on-surface-variant mb-6 max-w-sm">Localisez vos contenus avec une précision émotionnelle et culturelle inégalée pour le public francophone.</p>
                  <a href="#" className="text-primary flex items-center gap-2 font-bold group/link">
                    En savoir plus <span className="material-symbols-outlined group-hover/link:translate-x-2 transition-transform">arrow_forward</span>
                  </a>
                </div>
              </div>

              {/* Card 2 – Voice-over */}
              <div className="group relative overflow-hidden rounded-xl bg-surface-container-high p-8 h-[400px] flex flex-col border-none">
                <span className="material-symbols-outlined text-secondary text-4xl mb-6">record_voice_over</span>
                <h3 className="text-2xl font-bold mb-4">Voice-over</h3>
                <p className="text-on-surface-variant text-sm mb-6">Des voix de caractère pour vos documentaires, publicités et films d'entreprise.</p>
                <div className="mt-auto">
                  <img
                    src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80"
                    alt="Microphone à condensateur de studio professionnel"
                    className="w-full h-32 object-cover rounded-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                    style={{ filter: 'grayscale(1) brightness(0.55)' }}
                  />
                </div>
              </div>

              {/* Card 3 – Podcast */}
              <div className="group relative overflow-hidden rounded-xl bg-surface-container-high p-8 h-[400px] flex flex-col border-none">
                <span className="material-symbols-outlined text-tertiary text-4xl mb-6">podcasts</span>
                <h3 className="text-2xl font-bold mb-4">Podcast</h3>
                <p className="text-on-surface-variant text-sm mb-6">Production exécutive et réalisation sonore pour des podcasts qui captivent l'audience.</p>
                <div className="mt-auto border-t border-outline-variant/10 pt-4">
                  <div className="flex gap-1 h-8 items-end">
                    {[4, 8, 6, 3, 7].map((h, i) => (
                      <div key={i} className="audio-bar" style={{ width: '4px', background: '#cbbeff', height: `${h * 4}px`, borderRadius: '9999px' }} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 4 – Post-production (full width) */}
              <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container p-12 flex flex-col md:flex-row items-center gap-12 border-none">
                <div className="flex-1">
                  <span className="text-primary font-bold mb-4 block">Finition Premium</span>
                  <h3 className="text-3xl font-bold mb-4">Post-production Audio</h3>
                  <p className="text-on-surface-variant text-lg">
                    Mixage, mastering et sound design haute définition pour une immersion sonore totale. Nous donnons à votre projet la dimension qu'il mérite.
                  </p>
                </div>
                <div className="flex-1 w-full h-48 md:h-64 bg-surface-container-high rounded-xl relative overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/dqcac9ugv/image/upload/q_auto/f_auto/v1777159043/Capture_d_%C3%A9cran_2026-04-25_191659_yalwee.png"
                    alt="Sound engineer at a professional mixing desk"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            WHY CHOOSE US
        ═══════════════════════════════════════════ */}
        <section className="py-32 bg-surface">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                {
                  icon: 'workspace_premium', color: 'text-primary', bg: 'bg-primary/10',
                  title: 'Expertise Certifiée',
                  desc: "Une équipe de directeurs artistiques et d'ingénieurs du son formés aux standards internationaux du doublage.",
                },
                {
                  icon: 'graphic_eq', color: 'text-secondary', bg: 'bg-secondary/10',
                  title: 'Innovation Technologique',
                  desc: 'Équipement de pointe et workflow optimisé pour garantir une qualité sonore pure et cristalline.',
                },
                {
                  icon: 'public', color: 'text-tertiary', bg: 'bg-tertiary/10',
                  title: 'Profondeur Culturelle',
                  desc: "Une connaissance intime des nuances linguistiques et culturelles de l'Afrique francophone.",
                },
              ].map(({ icon, color, bg, title, desc }) => (
                <div key={title} className="text-center">
                  <div className={`w-20 h-20 ${bg} rounded-full flex items-center justify-center mx-auto mb-8`}>
                    <span className={`material-symbols-outlined text-4xl ${color}`}>{icon}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-4">{title}</h4>
                  <p className="text-on-surface-variant leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            STUDIO SHOWCASE
        ═══════════════════════════════════════════ */}
        <section id="studio" className="py-20">
          <div className="container mx-auto px-8">
            <div className="relative rounded-3xl overflow-hidden h-[600px] flex items-center group">
              <img
                src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1920&q=80"
                alt="Cabine vocale avec traitement acoustique professionnel"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ filter: 'grayscale(1) brightness(0.55)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
              <div className="relative z-10 px-12 md:px-20 max-w-2xl">
                <h2 className="text-5xl font-bold mb-6">Un sanctuaire pour la voix</h2>
                <p className="text-xl text-on-surface mb-8 leading-relaxed">
                  Nos cabines sont conçues pour capturer chaque souffle, chaque nuance et chaque émotion avec une fidélité absolue.
                </p>
                <button
                  id="btn-visite-virtuelle"
                  className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold transition-all hover:shadow-[0_0_20px_rgba(153,211,178,0.4)] hover:scale-105"
                >
                  Visite virtuelle
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FEATURED PROJECTS
        ═══════════════════════════════════════════ */}
        <section id="portfolio" className="py-32 bg-surface-container-low">
          <div className="container mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Portfolio</span>
                <h2 className="text-4xl md:text-5xl font-bold">Projets Récents</h2>
              </div>
              <Link to="/portfolio" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group">
                Tous nos projets <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Skeleton loading */}
              {loadingProjects && Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video rounded-2xl bg-surface-container-high mb-6" />
                  <div className="h-5 bg-surface-container-high rounded-lg w-3/4 mb-3" />
                  <div className="h-4 bg-surface-container rounded-lg w-1/2" />
                </div>
              ))}

              {/* Real project cards */}
              {!loadingProjects && projects.map(p => (
                <Link
                  key={p.id}
                  to={`/portfolio/${p.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6">
                    {p.imageUrl ? (
                      <img
                        src={p.imageUrl}
                        alt={p.imageAlt ?? p.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                        <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '3rem' }}>image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="material-symbols-outlined text-white" style={{ fontSize: '4rem', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48" }}>play_circle</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                  <p className="text-on-surface-variant">{p.category}</p>
                </Link>
              ))}

              {/* Empty state (no projects published yet) */}
              {!loadingProjects && projects.length === 0 && (
                <div className="md:col-span-3 text-center py-16 text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl mb-3 block">folder_open</span>
                  <p>Les projets arrivent bientôt.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            TESTIMONIAL
        ═══════════════════════════════════════════ */}
        <section className="py-32 bg-surface">
          <div className="container mx-auto px-8">
            <div className="bg-surface-container-high rounded-3xl p-12 md:p-20 relative overflow-hidden">
              <div className="absolute top-10 left-10 opacity-5">
                <span className="material-symbols-outlined" style={{ fontSize: '12rem', fontVariationSettings: "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 48" }}>format_quote</span>
              </div>
              <div className="relative z-10">
                <div className="max-w-3xl">
                  <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-12 italic">
                    "Studio Voix d'Afrique a transformé notre vision. Leur attention aux détails lors du doublage de notre documentaire a apporté une authenticité que nous ne pensions pas possible à ce niveau de rapidité."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-3xl">mic</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Amara Keïta</h4>
                      <p className="text-primary">Productrice Executive, Sahel Media Group</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            FINAL CTA
        ═══════════════════════════════════════════ */}
        <section id="about" className="py-32 bg-background relative overflow-hidden">
          <div className="container mx-auto px-8 text-center relative z-10">
            <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight">Prêt à donner vie à votre son ?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                id="cta-footer-reserver"
                onClick={openBooking}
                className="bg-secondary text-on-secondary px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 sonic-glow"
              >
                Réserver une session
              </button>
              <button
                id="cta-footer-contact"
                className="bg-surface-container-highest text-on-surface px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 hover:bg-surface-bright"
              >
                Nous contacter
              </button>
            </div>
          </div>
          {/* Decorative blobs */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-secondary/5 blur-[150px] pointer-events-none" />
        </section>
      </main>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}

/* ─── Root App (Router shell) ────────────────────────────────────────── */
export default function App() {
  return (
    <Routes>
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/doublage" element={<DoublagePage />} />
      <Route path="/services/voix-off" element={<VoixOffPage />} />
      <Route path="/services/podcast" element={<PodcastPage />} />
      <Route path="/services/post-production" element={<PostProductionPage />} />
      <Route path="/services/location-studio" element={<LocationStudioPage />} />
      <Route path="/studio" element={<StudioPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:slug" element={<ArticlePage />} />
      <Route path="/connexion" element={<AuthPage />} />
      <Route path="/inscription" element={<AuthPage mode="register" />} />
      <Route
        path="/mon-espace"
        element={
          <ProtectedRoute>
            <ClientDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
