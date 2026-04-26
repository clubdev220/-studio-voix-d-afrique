import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function formatDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function readingTime(content) {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

/* ─── Audio player (fichier MP3 depuis Firestore audioUrl) ── */
function AudioPlayer({ url, title, content }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [failed, setFailed] = useState(false);

  function formatTime(s) {
    if (!s || isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) { audio.pause(); } else { audio.play().catch(() => setFailed(true)); }
    setPlaying(!playing);
  }

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
  }

  function handleSeek(e) {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  }

  if (failed) return <TTSPlayer content={content} title={title} />;

  return (
    <div className="flex items-center gap-4 bg-surface-container-low border border-primary/30 rounded-2xl px-5 py-4 w-full">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => { setPlaying(false); setProgress(0); setCurrentTime(0); }}
        onError={() => setFailed(true)}
      />
      <button
        onClick={togglePlay}
        className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-on-primary text-xl">
          {playing ? 'pause' : 'play_arrow'}
        </span>
      </button>
      <div className="flex-1 flex flex-col gap-1.5 min-w-0">
        <p className="text-xs text-on-surface-variant truncate">{title}</p>
        <div
          className="h-1.5 bg-surface-container-high rounded-full cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-on-surface-variant">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── TTS player (Web Speech API) ────────────────────────── */
function TTSPlayer({ content, title }) {
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(() => 'speechSynthesis' in window);
  const uttRef = useRef(null);

  function toggleSpeak() {
    if (!supported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utt = new SpeechSynthesisUtterance(content);
    utt.lang = 'fr-FR';
    utt.rate = 0.95;
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    uttRef.current = utt;
    window.speechSynthesis.speak(utt);
    setSpeaking(true);
  }

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  if (!supported) return null;

  return (
    <button
      onClick={toggleSpeak}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
        speaking
          ? 'bg-primary/20 border-primary text-primary'
          : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:border-primary/50 hover:text-on-background'
      }`}
    >
      <span className="material-symbols-outlined text-base">
        {speaking ? 'stop_circle' : 'volume_up'}
      </span>
      {speaking ? "Arrêter la lecture" : "Écouter l'article"}
    </button>
  );
}

/* ─── States ──────────────────────────────────────────────── */
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-40 text-center px-8">
      <span className="material-symbols-outlined text-7xl text-on-surface-variant/20 mb-6">search_off</span>
      <h2 className="text-3xl font-bold mb-4">Article introuvable</h2>
      <p className="text-on-surface-variant mb-8 max-w-md">Cet article n'existe pas ou a été retiré.</p>
      <Link to="/blog" className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Retour au blog
      </Link>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[400px] bg-surface-container-high w-full" />
      <div className="max-w-3xl mx-auto px-8 md:px-0 py-12 flex flex-col gap-4">
        <div className="h-5 w-24 bg-surface-container-high rounded-full" />
        <div className="h-10 w-3/4 bg-surface-container-high rounded-xl" />
        <div className="h-10 w-1/2 bg-surface-container-high rounded-xl" />
        <div className="h-4 w-40 bg-surface-container-high rounded-full mt-2" />
        <div className="mt-8 flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`h-4 bg-surface-container-high rounded-lg ${i === 3 ? 'w-5/6' : 'w-full'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ────────────────────────────────────────────── */
export default function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const q = query(
          collection(db, 'articles'),
          where('slug', '==', slug),
          where('published', '==', true),
          limit(1)
        );
        const snap = await getDocs(q);
        if (!snap.empty) setArticle({ id: snap.docs[0].id, ...snap.docs[0].data() });
      } catch (err) {
        console.error('Erreur chargement article:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  function handleCopyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const mins = article ? readingTime(article.content) : 0;

  return (
    <div className="min-h-screen bg-background text-on-background">
      <Navbar />

      {/* Back link */}
      <div className="pt-28 px-8 md:px-20 pb-4">
        <Link to="/blog" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium">
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Retour au blog
        </Link>
      </div>

      {loading ? <Skeleton /> : !article ? <NotFound /> : (
        <>
          {/* Cover image */}
          {article.coverImage && (
            <div className="relative h-[400px] md:h-[500px] overflow-hidden mx-8 md:mx-20 rounded-3xl mb-12">
              <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover grayscale-[20%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            </div>
          )}

          {/* Article header */}
          <div className="max-w-3xl mx-auto px-8 md:px-0">
            <span className="inline-block bg-primary/20 text-primary text-sm font-bold px-4 py-1 rounded-full mb-6">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter mb-6">
              {article.title}
            </h1>

            {/* Meta : auteur · date · temps de lecture */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant mb-8 pb-8 border-b border-outline-variant/20">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">person</span>
                {article.author || "Studio Voix d'Afrique"}
              </div>
              <span className="opacity-40">·</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">calendar_today</span>
                {formatDate(article.publishedAt)}
              </div>
              <span className="opacity-40">·</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">schedule</span>
                {mins} min de lecture
              </div>
            </div>

            {/* Lecteur audio */}
            <div className="mb-10 flex flex-col gap-3">
              {article.audioUrl ? (
                <AudioPlayer url={article.audioUrl} title={article.title} content={article.content} />
              ) : (
                <TTSPlayer content={article.content} title={article.title} />
              )}
            </div>

            {/* Content */}
            <div className="text-on-surface leading-relaxed text-lg font-light">
              {article.content
                ? article.content.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-6">{para}</p>
                  ))
                : <p className="text-on-surface-variant italic">Contenu non disponible.</p>
              }
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link to="/blog" className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-medium">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Tous les articles
              </Link>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 bg-surface-container-low border border-outline-variant/20 hover:border-primary/50 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              >
                <span className="material-symbols-outlined text-base">
                  {copied ? 'check_circle' : 'link'}
                </span>
                {copied ? 'Lien copié !' : 'Copier le lien'}
              </button>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
