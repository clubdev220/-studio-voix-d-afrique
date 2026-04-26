import React from 'react';
import ServiceDetailLayout from '../components/ServiceDetailLayout.jsx';

const SERVICE = {
  badge: 'Finition Premium',
  titleLine1: 'Post-production',
  titleLine2: 'Audio',
  accentClass: 'text-primary',
  description: "Transformez vos enregistrements bruts en œuvres sonores de haute définition. Mixage, mastering et sound design aux standards des plus grandes productions internationales.",
  heroImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
  heroImageAlt: "Console de mixage professionnelle",

  features: [
    {
      icon: 'equalizer',
      title: 'Mixage Professionnel',
      description: "Balance, spatialisation et traitement dynamique réalisés sur des consoles et plugins de référence pour un rendu cinématographique.",
    },
    {
      icon: 'workspace_premium',
      title: 'Mastering Certifié',
      description: "Normalisation aux standards LUFS des plateformes streaming (Spotify, YouTube, Netflix, Canal+), TV et radio.",
    },
    {
      icon: 'graphic_eq',
      title: 'Sound Design',
      description: "Création et intégration d'habillages sonores, d'ambiances et d'effets sonores pour enrichir l'univers de votre projet.",
    },
  ],

  processImage: 'https://images.unsplash.com/photo-1574375927112-8e6ae4a8bd5a?auto=format&fit=crop&w=1200&q=80',
  processImageAlt: 'Visualisation de formes d\'ondes audio',

  process: [
    {
      number: '01',
      title: 'Réception & Analyse',
      description: "Réception de vos fichiers sources, audit de la qualité audio et identification des corrections nécessaires avant le traitement.",
    },
    {
      number: '02',
      title: 'Nettoyage & Correction',
      description: "Suppression des bruits de fond, des parasites, des sibilances et des irrégularités de dynamique pour une base sonore propre.",
    },
    {
      number: '03',
      title: 'Mixage',
      description: "Assemblage, balance et spatialisation de toutes les pistes. Traitement EQ, compression et effets pour un résultat cohérent et impactant.",
    },
    {
      number: '04',
      title: 'Mastering & Livraison',
      description: "Finalisation aux normes de diffusion de votre support cible. Export dans tous les formats requis avec rapport de mastering.",
    },
  ],

  deliverables: [
    { icon: 'audio_file',   label: 'Mix Final HD',           sub: '48kHz / 24bit' },
    { icon: 'library_music', label: 'Masters Multiformats',  sub: 'Streaming / Broadcast' },
    { icon: 'folder_open',  label: 'Session de Projet',      sub: 'ProTools / Logic' },
    { icon: 'receipt_long', label: 'Rapport Technique',      sub: 'LUFS / Specs' },
  ],

  faq: [
    {
      q: "Quels formats de fichiers sources acceptez-vous ?",
      a: "Nous acceptons tous les formats audio (WAV, AIFF, MP3, FLAC, AAC) et les sessions de projet des principaux DAW (ProTools, Logic, Ableton, Reaper, Cubase).",
    },
    {
      q: "Combien de révisions sont possibles ?",
      a: "Deux rounds de révisions sont inclus. Chaque projet inclut une écoute de validation avant livraison finale pour s'assurer de votre satisfaction.",
    },
    {
      q: "Puis-je cibler plusieurs plateformes simultanément ?",
      a: "Oui, nous livrons les masters calibrés pour chaque support : Spotify (-14 LUFS), YouTube (-13 LUFS), Netflix (-27 LUFS, broadcast TV (-23 LUFS) en un seul projet.",
    },
    {
      q: "Travaillez-vous sur de la musique également ?",
      a: "Oui, notre offre couvre le mixage et mastering musical (afrobeat, rap, musique traditionnelle), les bandes originales de films et les jingles publicitaires.",
    },
  ],

  ctaTitle: "Votre son mérite la perfection",
  ctaDescription: "Envoyez vos fichiers sources et recevez un devis détaillé sous 24 heures.",
};

export default function PostProductionPage() {
  return <ServiceDetailLayout service={SERVICE} />;
}
