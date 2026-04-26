/**
 * AudioPlayer — shared audio components used in Portfolio cards and Project detail page.
 *
 * Global singleton: only one audio plays at a time across the entire app.
 */
import React, { useState, useEffect, useRef } from 'react';

// ─── Global audio singleton ───────────────────────────────────────────────────
let _audio  = null;
let _stopFn = null;

function stopAll() {
  if (_audio) { _audio.pause(); _stopFn?.(); }
  _audio = null; _stopFn = null;
}
function registerAudio(audio, stopFn) {
  stopAll();
  _audio = audio; _stopFn = stopFn;
}

// ─── AudioButton — compact circular button for grid cards ────────────────────
export function AudioButton({ url }) {
  const audioRef = useRef(null);
  const [playing,  setPlaying]  = useState(false);
  const [progress, setProgress] = useState(0);

  // Cleanup on unmount / navigation
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio(url);
      a.addEventListener('timeupdate', () => {
        if (a.duration) setProgress((a.currentTime / a.duration) * 100);
      });
      a.addEventListener('ended', () => { setPlaying(false); setProgress(0); });
      audioRef.current = a;
    }
    return audioRef.current;
  };

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const a = getAudio();
    if (playing) {
      a.pause(); setPlaying(false);
    } else {
      registerAudio(a, () => setPlaying(false));
      a.play().catch(() => {});
      setPlaying(true);
    }
  };

  // SVG progress ring
  const R = 19;
  const C = 2 * Math.PI * R;

  return (
    <button
      onClick={toggle}
      aria-label={playing ? 'Pause' : 'Écouter l\'aperçu'}
      className="relative w-11 h-11 flex items-center justify-center flex-shrink-0"
    >
      {/* Ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width="44" height="44" viewBox="0 0 44 44"
        aria-hidden="true"
      >
        <circle cx="22" cy="22" r={R}
          fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        {progress > 0 && (
          <circle cx="22" cy="22" r={R}
            fill="none" stroke="#3A7155" strokeWidth="2"
            strokeDasharray={C}
            strokeDashoffset={C - (progress / 100) * C}
            strokeLinecap="round"
            className="transition-all duration-75"
          />
        )}
      </svg>
      {/* Icon disc */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
        playing
          ? 'bg-primary scale-110'
          : 'bg-black/50 backdrop-blur-sm hover:bg-black/70'
      }`}>
        <span className="material-symbols-outlined text-white" style={{ fontSize: 15 }}>
          {playing ? 'pause' : 'play_arrow'}
        </span>
      </div>
    </button>
  );
}

// ─── AudioPlayer — full bar for detail page ───────────────────────────────────
export function AudioPlayer({ url }) {
  const audioRef       = useRef(null);
  const progressBarRef = useRef(null);
  const [playing,     setPlaying]     = useState(false);
  const [progress,    setProgress]    = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio(url);
      a.addEventListener('timeupdate', () => {
        if (a.duration) {
          setProgress((a.currentTime / a.duration) * 100);
          setCurrentTime(a.currentTime);
        }
      });
      a.addEventListener('loadedmetadata', () => setDuration(a.duration));
      a.addEventListener('ended', () => {
        setPlaying(false); setProgress(0); setCurrentTime(0);
      });
      audioRef.current = a;
    }
    return audioRef.current;
  };

  const toggle = () => {
    const a = getAudio();
    if (playing) { a.pause(); setPlaying(false); }
    else { registerAudio(a, () => setPlaying(false)); a.play().catch(() => {}); setPlaying(true); }
  };

  const seek = (e) => {
    if (!progressBarRef.current) return;
    const rect  = progressBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const a     = getAudio();
    if (a.duration) { a.currentTime = ratio * a.duration; setProgress(ratio * 100); }
  };

  const fmt = (s) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  return (
    <div className="bg-surface-container-low border border-outline-variant/10 rounded-2xl p-5 flex items-center gap-5">
      {/* Play / Pause button */}
      <button
        onClick={toggle}
        aria-label={playing ? 'Pause' : 'Lire l\'aperçu'}
        className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
          playing
            ? 'bg-primary shadow-lg shadow-primary/30'
            : 'bg-surface-container-high hover:bg-primary/20'
        }`}
      >
        <span className={`material-symbols-outlined text-xl ${playing ? 'text-on-primary' : 'text-on-surface'}`}>
          {playing ? 'pause' : 'play_arrow'}
        </span>
      </button>

      {/* Progress bar + times */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-on-surface-variant mb-2">
          Aperçu audio
        </p>
        <div
          ref={progressBarRef}
          onClick={seek}
          role="progressbar"
          aria-valuenow={progress}
          className="relative h-1.5 bg-surface-container-high rounded-full overflow-hidden cursor-pointer group/bar"
        >
          <div
            className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5 text-[11px] text-on-surface-variant">
          <span>{fmt(currentTime)}</span>
          {duration > 0 && <span>{fmt(duration)}</span>}
        </div>
      </div>
    </div>
  );
}
