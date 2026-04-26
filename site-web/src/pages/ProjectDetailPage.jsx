import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { AudioPlayer } from '../components/AudioPlayer.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';

/* ─── Category accent styles ────────────────────────────────── */
const categoryStyle = {
  'Doublage':     { badge: 'text-secondary border-secondary/30 bg-secondary/10',  text: 'text-secondary'  },
  'Voice-over':   { badge: 'text-secondary border-secondary/30 bg-secondary/10',  text: 'text-secondary'  },
  'Podcast':      { badge: 'text-tertiary  border-tertiary/30  bg-tertiary/10',   text: 'text-tertiary'   },
  'Post-prod':    { badge: 'text-primary   border-primary/30   bg-primary/10',    text: 'text-primary'    },
};

/* ─── Meta card ─────────────────────────────────────────────── */
const MetaCard = ({ label, value, accent }) => (
  <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/10">
    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">
      {label}
    </p>
    <p className={`font-bold text-sm ${accent ?? 'text-on-surface'}`}>{value}</p>
  </div>
);

/* ─── Loading ────────────────────────────────────────────────── */
const Loading = () => (
  <div className="bg-background min-h-screen">
    <Navbar />
    <div className="flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

/* ─── Not Found ──────────────────────────────────────────────── */
const NotFound = () => (
  <div className="bg-background min-h-screen text-on-background">
    <Navbar />
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-on-surface-variant">
      <span className="material-symbols-outlined" style={{ fontSize: '4rem' }}>search_off</span>
      <h1 className="text-2xl font-bold text-on-surface">Projet introuvable</h1>
      <p className="text-sm">Ce projet n'existe pas ou a été retiré du portfolio.</p>
      <Link
        to="/portfolio"
        className="mt-4 flex items-center gap-2 text-primary font-bold hover:underline"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Retour au portfolio
      </Link>
    </div>
  </div>
);

/* ═══════════════════ PROJECT DETAIL PAGE ════════════════════ */
export default function ProjectDetailPage() {
  const { slug }        = useParams();
  const { openBooking } = useBooking();
  const [project,  setProject]  = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setProject(null);
    setNotFound(false);

    const q = query(
      collection(db, 'portfolio_projects'),
      where('slug', '==', slug),
      where('published', '==', true),
      limit(1)
    );

    getDocs(q)
      .then(snap => {
        if (snap.empty) { setNotFound(true); }
        else { setProject({ id: snap.docs[0].id, ...snap.docs[0].data() }); }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)  return <Loading />;
  if (notFound) return <NotFound />;

  const style      = categoryStyle[project.category] ?? { badge: 'text-primary border-primary/30 bg-primary/10', text: 'text-primary' };
  const metaItems  = [
    project.client   && { label: 'Client',   value: project.client,   accent: null },
    project.year     && { label: 'Année',     value: project.year,     accent: null },
    project.duration && { label: 'Durée',     value: project.duration, accent: null },
    project.category && { label: 'Service',   value: project.category, accent: style.text },
  ].filter(Boolean);

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main className="pt-20">

        {/* ── HERO IMAGE ─────────────────────────────────────── */}
        <div className="relative h-[55vh] min-h-[380px] overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.imageAlt ?? project.title}
            className="w-full h-full object-cover"
          />
          {/* Gradient fade to background */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />

          {/* Back button */}
          <div className="absolute top-8 left-8 md:left-20 z-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:bg-black/50"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Portfolio
            </Link>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-8 right-8 md:right-20 z-10">
              <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary text-[10px] font-black uppercase tracking-widest">
                Featured
              </span>
            </div>
          )}
        </div>

        {/* ── CONTENT ────────────────────────────────────────── */}
        <div className="px-8 md:px-20 -mt-20 relative z-10 pb-32">
          <div className="max-w-3xl mx-auto">

            {/* Category badge */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border mb-5 ${style.badge}`}>
              {project.category}
            </span>

            {/* Title */}
            <h1
              className="text-4xl md:text-6xl font-bold leading-tight mb-8"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              {project.title}
            </h1>

            {/* Meta grid */}
            {metaItems.length > 0 && (
              <div className={`grid grid-cols-2 ${metaItems.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-3 mb-8`}>
                {metaItems.map(m => (
                  <MetaCard key={m.label} label={m.label} value={m.value} accent={m.accent} />
                ))}
              </div>
            )}

            {/* Audio player */}
            {project.audioPreviewUrl && (
              <div className="mb-8">
                <AudioPlayer url={project.audioPreviewUrl} />
              </div>
            )}

            {/* Description */}
            {project.description && (
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                {project.description}
              </p>
            )}

            {/* Tags */}
            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-sm font-medium border border-outline-variant/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* ── CTA ── */}
            <div className="pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="font-bold text-on-surface mb-1">Vous avez un projet similaire ?</p>
                <p className="text-sm text-on-surface-variant">
                  Réservez une session et discutons de vos besoins.
                </p>
              </div>
              <button
                onClick={openBooking}
                className="shrink-0 flex items-center gap-2 bg-primary text-on-primary font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all"
              >
                <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                Réserver une session
              </button>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
