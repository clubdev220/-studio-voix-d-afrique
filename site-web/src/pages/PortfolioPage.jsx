import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import Navbar from '../components/Navbar.jsx';
import { AudioButton } from '../components/AudioPlayer.jsx';
import Footer from '../components/Footer.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';

/* ─── Constants ─────────────────────────────────────────── */
const CATEGORIES = ['All', 'Doublage', 'Voice-over', 'Podcast', 'Post-prod'];
const PAGE_SIZE = 6;

/* ─── Category → accent colour ──────────────────────────── */
const categoryColor = {
  Doublage:     'text-secondary',
  'Voice-over': 'text-secondary',
  Podcast:      'text-tertiary',
  'Post-prod':  'text-primary',
};
const categoryBg = {
  Doublage:     'bg-secondary/10 text-secondary border-secondary/20',
  'Voice-over': 'bg-secondary/10 text-secondary border-secondary/20',
  Podcast:      'bg-tertiary/10 text-tertiary border-tertiary/20',
  'Post-prod':  'bg-primary/10 text-primary border-primary/20',
};

/* ─── Tag chip ───────────────────────────────────────────── */
const TagChip = ({ tag }) => (
  <span className="inline-block px-2 py-0.5 rounded-full bg-surface-container-highest/80 text-on-surface-variant text-[10px] font-medium tracking-wide border border-outline-variant/20">
    {tag}
  </span>
);

/* ─── Skeleton Card ─────────────────────────────────────── */
const SkeletonCard = ({ className = '' }) => (
  <div className={`rounded-xl bg-surface-container animate-pulse ${className}`} />
);

/* ─── Featured Card (large, 8 cols) ─────────────────────── */
const FeaturedCard = ({ project }) => (
  <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-surface-container h-[520px]">
    <img
      src={project.imageUrl}
      alt={project.imageAlt}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent p-10 flex flex-col justify-end">
      {/* Top-left badges */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-[10px] font-black uppercase tracking-widest">
          Featured
        </span>
        {project.duration && (
          <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur text-on-surface-variant text-[10px] font-medium border border-outline-variant/20">
            {project.duration}
          </span>
        )}
      </div>

      {/* Top-right: audio button */}
      {project.audioPreviewUrl && (
        <div className="absolute top-5 right-6">
          <AudioButton url={project.audioPreviewUrl} />
        </div>
      )}

      <span className={`font-bold tracking-widest text-xs uppercase mb-2 ${categoryColor[project.category] ?? 'text-primary'}`}>
        {project.category}
      </span>
      <h3 className="text-4xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk' }}>{project.title}</h3>
      <p className="text-on-surface-variant max-w-md line-clamp-2 text-sm mb-4">
        {project.description}
      </p>

      {/* Meta row */}
      <div className="flex items-center gap-4 mb-4">
        {project.client && (
          <span className="flex items-center gap-1.5 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-sm">business</span>
            {project.client}
          </span>
        )}
        {project.year && (
          <span className="flex items-center gap-1.5 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-sm">calendar_today</span>
            {project.year}
          </span>
        )}
      </div>

      {/* Tags */}
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.slice(0, 4).map(tag => <TagChip key={tag} tag={tag} />)}
        </div>
      )}

      <Link
        to={`/portfolio/${project.slug}`}
        className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-200 w-fit"
      >
        Voir le projet{' '}
        <span className="material-symbols-outlined">arrow_forward</span>
      </Link>
    </div>
  </div>
);

/* ─── Secondary Card (4 cols, tall) ─────────────────────── */
const SecondaryCard = ({ project }) => (
  <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container h-[520px]">
    <img
      src={project.imageUrl}
      alt={project.imageAlt}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent p-8 flex flex-col justify-end">
      {/* Top row: duration left, audio button right */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
        {project.duration ? (
          <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur text-on-surface-variant text-[10px] font-medium border border-outline-variant/20">
            {project.duration}
          </span>
        ) : <span />}
        {project.audioPreviewUrl && <AudioButton url={project.audioPreviewUrl} />}
      </div>

      <span className={`font-bold tracking-widest text-xs uppercase mb-2 ${categoryColor[project.category] ?? 'text-primary'}`}>
        {project.category}
      </span>
      <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }}>{project.title}</h3>
      <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">{project.description}</p>

      <div className="flex items-center gap-3 mb-3">
        {project.client && (
          <span className="text-on-surface-variant text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">business</span>
            {project.client}
          </span>
        )}
        {project.year && (
          <span className="text-on-surface-variant text-xs">{project.year}</span>
        )}
      </div>

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map(tag => <TagChip key={tag} tag={tag} />)}
        </div>
      )}

      <Link
        to={`/portfolio/${project.slug}`}
        className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-4 transition-all duration-200 w-fit"
      >
        Voir le projet <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </div>
  </div>
);

/* ─── Regular Card (4 cols) ─────────────────────────────── */
const RegularCard = ({ project }) => (
  <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-surface-container h-[400px]">
    <img
      src={project.imageUrl}
      alt={project.imageAlt}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent p-8 flex flex-col justify-end">
      {/* Audio button top-right */}
      {project.audioPreviewUrl && (
        <div className="absolute top-5 right-5">
          <AudioButton url={project.audioPreviewUrl} />
        </div>
      )}

      <span className={`font-bold tracking-widest text-xs uppercase mb-2 ${categoryColor[project.category] ?? 'text-primary'}`}>
        {project.category}
        {project.year && <span className="ml-2 text-on-surface-variant font-normal normal-case tracking-normal">· {project.year}</span>}
      </span>
      <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }}>{project.title}</h3>
      <p className="text-on-surface-variant text-sm line-clamp-2 mb-3">{project.description}</p>

      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 2).map(tag => <TagChip key={tag} tag={tag} />)}
          {project.tags.length > 2 && (
            <span className="inline-block px-2 py-0.5 rounded-full bg-surface-container-highest/80 text-on-surface-variant text-[10px] font-medium border border-outline-variant/20">
              +{project.tags.length - 2}
            </span>
          )}
        </div>
      )}

      <Link
        to={`/portfolio/${project.slug}`}
        className="flex items-center gap-2 text-primary font-bold text-sm hover:gap-4 transition-all duration-200 w-fit opacity-0 group-hover:opacity-100"
      >
        Voir le projet <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </Link>
    </div>
  </div>
);

/* ─── Stats Bar ─────────────────────────────────────────── */
const StatsBar = ({ projects }) => {
  const totalProjects = projects.length;
  const activeCategories = new Set(projects.map(p => p.category)).size;
  const years = projects.map(p => p.year).filter(Boolean);
  const yearsOfActivity = years.length
    ? Math.max(...years) - Math.min(...years) + 1
    : 1;

  const stats = [
    { icon: 'folder_special', value: totalProjects, label: 'Projets réalisés' },
    { icon: 'category',       value: activeCategories, label: 'Catégories' },
    { icon: 'schedule',       value: `${yearsOfActivity}+`, label: 'Années d\'activité' },
  ];

  return (
    <div className="px-8 md:px-20 py-8 border-b border-outline-variant/10">
      <div className="flex flex-wrap items-center justify-start gap-10 md:gap-20">
        {stats.map(({ icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">{icon}</span>
            </div>
            <div>
              <div className="text-2xl font-black text-on-surface" style={{ fontFamily: 'Space Grotesk' }}>
                {value}
              </div>
              <div className="text-xs text-on-surface-variant">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════ PORTFOLIO PAGE ═══════════════════════ */
export default function PortfolioPage() {
  const { openBooking } = useBooking();
  const [activeCategory, setActiveCategory] = useState('All');
  const [allProjects, setAllProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ── Fetch once — all published projects ─────────────── */
  const fetchAllProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const snap = await getDocs(
        query(collection(db, 'portfolio_projects'), where('published', '==', true))
      );
      const docs = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setAllProjects(docs);
    } catch (err) {
      console.error('Firestore error:', err);
      setError('Impossible de charger les projets.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAllProjects(); }, [fetchAllProjects]);

  /* ── Reset visible count on category change ──────────── */
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [activeCategory]);

  /* ── Derived data ─────────────────────────────────────── */
  const filtered = activeCategory === 'All'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  const projects     = filtered.slice(0, visibleCount);
  const hasMore      = visibleCount < filtered.length;
  const loadMore     = () => setVisibleCount(c => c + PAGE_SIZE);

  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === 'All'
      ? allProjects.length
      : allProjects.filter(p => p.category === cat).length;
    return acc;
  }, {});

  /* ── Bento layout ─────────────────────────────────────── */
  const featured     = projects.find(p => p.featured) ?? projects[0] ?? null;
  const rest         = projects.filter(p => p !== featured);
  const secondCard   = rest[0] ?? null;
  const regularCards = rest.slice(1);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main className="pt-24">

        {/* ══════════ HERO ══════════ */}
        <section className="relative min-h-[580px] flex items-center px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <img
              alt="Console de mixage et panneaux acoustiques en studio"
              src="https://images.unsplash.com/photo-1574375927112-8e6ae4a8bd5a?auto=format&fit=crop&w=1920&q=80"
              className="w-full h-full object-cover opacity-35"
              style={{ filter: 'grayscale(1) brightness(0.55)' }}
            />
          </div>
          <div className="relative z-20 max-w-4xl">
            <span className="inline-block py-1 px-4 mb-6 rounded-full border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase">
              Portfolio d'Excellence
            </span>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-on-surface to-on-surface-variant" style={{ fontFamily: 'Space Grotesk' }}>
              Nos Réalisations —{' '}<br />
              Quand le Son Rencontre l'Image
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed">
              Explorez nos projets emblématiques : de la narration documentaire aux doublages de films internationaux, chaque onde sonore est sculptée avec passion.
            </p>
          </div>
        </section>

        {/* ══════════ STATS BAR ══════════ */}
        {allProjects.length > 0 && <StatsBar projects={allProjects} />}

        {/* ══════════ CATEGORY FILTERS ══════════ */}
        <section className="px-8 md:px-20 py-10 sticky top-[72px] z-40 bg-background/80 backdrop-blur-md border-b border-outline-variant/10">
          <div className="flex flex-wrap items-center gap-3">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat] ?? 0;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container scale-105'
                      : 'border border-outline-variant hover:border-secondary text-on-surface-variant hover:text-secondary'
                  }`}
                >
                  {cat}
                  {count > 0 && (
                    <span className={`text-xs rounded-full px-1.5 py-0.5 font-medium ${
                      isActive ? 'bg-on-secondary-container/20' : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ══════════ BENTO GRID ══════════ */}
        <section className="px-8 md:px-20 py-12 pb-24">
          {/* Error state */}
          {error && (
            <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant gap-4">
              <span className="material-symbols-outlined text-5xl text-error">wifi_off</span>
              <p className="text-lg">{error}</p>
              <button
                onClick={() => fetchProjects(activeCategory)}
                className="mt-4 px-6 py-2 rounded-full border border-outline-variant hover:bg-surface-container transition-all"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <SkeletonCard className="md:col-span-8 h-[520px]" />
              <SkeletonCard className="md:col-span-4 h-[520px]" />
              <SkeletonCard className="md:col-span-4 h-[400px]" />
              <SkeletonCard className="md:col-span-4 h-[400px]" />
              <SkeletonCard className="md:col-span-4 h-[400px]" />
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant gap-4">
              <span className="material-symbols-outlined text-6xl">search_off</span>
              <p className="text-lg">Aucun projet dans cette catégorie.</p>
            </div>
          )}

          {/* Projects grid */}
          {!loading && !error && projects.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {featured && <FeaturedCard project={featured} />}
                {secondCard && <SecondaryCard project={secondCard} />}
                {regularCards.map((project) => (
                  <RegularCard key={project.id} project={project} />
                ))}
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="mt-20 flex justify-center">
                  <button
                    onClick={loadMore}
                    className="group flex flex-col items-center gap-4"
                  >
                    <span className="text-on-surface-variant font-bold tracking-widest uppercase text-xs group-hover:text-primary transition-colors">
                      Charger plus de projets
                    </span>
                    <div className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:border-primary">
                      <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary">add</span>
                    </div>
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="px-8 md:px-20 py-24 mb-24">
          <div className="bg-surface-container-low rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
                Prêt à donner de la voix à votre vision ?
              </h2>
              <p className="text-xl text-on-surface-variant mb-12">
                Chaque projet est unique. Discutons de la manière dont nous pouvons élever votre production sonore vers de nouveaux sommets.
              </p>
              <div className="flex flex-wrap gap-6">
                <button
                  onClick={openBooking}
                  className="bg-primary text-on-primary font-black px-10 py-5 rounded-full hover:brightness-110 transition-all uppercase tracking-tighter"
                  style={{ boxShadow: '0 0 32px 0 rgba(58, 113, 85, 0.15)' }}
                >
                  Démarrer un projet
                </button>
                <button className="bg-transparent border border-outline-variant text-on-surface font-bold px-10 py-5 rounded-full hover:bg-surface-variant transition-all">
                  Voir nos tarifs
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
