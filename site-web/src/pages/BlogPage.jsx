import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const CATEGORIES = ['Tous', 'Actualités', 'Doublage', 'Voix-off', 'Coulisses', 'Formation', 'Cinéma africain'];

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ─── Skeleton card ────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10 animate-pulse">
      <div className="h-52 bg-surface-container-high" />
      <div className="p-6 flex flex-col gap-3">
        <div className="h-4 w-20 bg-surface-container-high rounded-full" />
        <div className="h-6 w-3/4 bg-surface-container-high rounded-xl" />
        <div className="h-4 w-full bg-surface-container-high rounded-lg" />
        <div className="h-4 w-2/3 bg-surface-container-high rounded-lg" />
        <div className="h-4 w-24 bg-surface-container-high rounded-full mt-2" />
      </div>
    </div>
  );
}

/* ─── Article card ─────────────────────────────────────── */
function ArticleCard({ article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group bg-surface-container-low rounded-3xl overflow-hidden border border-outline-variant/10 hover:border-outline-variant/40 transition-all duration-300 hover:shadow-lg hover:shadow-black/20 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden bg-surface-container-high">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/20">article</span>
          </div>
        )}
        <span className="absolute top-4 left-4 bg-primary/90 text-on-primary text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
          {article.category}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-on-background leading-snug mb-2 group-hover:text-primary transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-on-surface-variant text-sm leading-relaxed flex-1 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-outline-variant/10">
          <span className="text-xs text-on-surface-variant">{formatDate(article.publishedAt)}</span>
          <span className="flex items-center gap-1 text-secondary text-sm font-bold group-hover:gap-2 transition-all duration-200">
            Lire <span className="material-symbols-outlined text-base">arrow_forward</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main page ────────────────────────────────────────── */
export default function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tous');

  useEffect(() => {
    async function fetchArticles() {
      try {
        const q = query(
          collection(db, 'articles'),
          where('published', '==', true),
          orderBy('publishedAt', 'desc')
        );
        const snap = await getDocs(q);
        setArticles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Erreur chargement articles:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const filtered = activeCategory === 'Tous'
    ? articles
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="pt-36 pb-20 px-8 md:px-20">
        <div className="max-w-4xl">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm mb-6 block">
            Actualités & Inspirations
          </span>
          <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-6 text-on-background">
            Blog —{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Voix du Continent
            </span>
          </h1>
          <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed font-light">
            Plongez dans l'univers du son, du doublage et du cinéma africain. Coulisses, conseils et actualités du Studio Voix d'Afrique.
          </p>
        </div>
      </section>

      {/* ─── Category filters ─────────────────────────────── */}
      <section className="px-8 md:px-20 pb-12">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface-variant border border-outline-variant/20 hover:border-primary/50 hover:text-on-background'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ─── Articles grid ────────────────────────────────── */}
      <section className="px-8 md:px-20 pb-32">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-6">edit_note</span>
            <h3 className="text-2xl font-bold text-on-surface-variant mb-3">
              {activeCategory === 'Tous' ? "Aucun article pour l'instant" : `Aucun article dans "${activeCategory}"`}
            </h3>
            <p className="text-on-surface-variant/60 max-w-md">
              Revenez bientôt — de nouveaux contenus arrivent régulièrement.
            </p>
            {activeCategory !== 'Tous' && (
              <button
                onClick={() => setActiveCategory('Tous')}
                className="mt-6 text-secondary font-bold hover:underline"
              >
                Voir tous les articles
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(article => <ArticleCard key={article.id} article={article} />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
