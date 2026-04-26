import React from 'react';
import ServiceDetailLayout from '../components/ServiceDetailLayout.jsx';

const SERVICE = {
  badge: 'Finition Premium',
  titleLine1: 'Post-production',
  titleLine2: 'Audio',
  accentClass: 'text-primary',
  description: "Transformez vos enregistrements bruts en œuvres sonores de haute définition. Mixage, mastering et sound design aux standards des plus grandes productions internationales.",
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJtxmZx4_zo7BTODMvaLMzwc4tNYF6xRH8ICbwFaTDvivKUcPIC_UGG5d8CRP28_SpmQatqJ1A9-NcEbHcyx9mYAUjAcJKoWhR0VTMrx9SJwHhPOBuJg8d7jdfgjMcJGJmckmZiXS6Ll-zHiy0b6Pqoi6bFW3GXLvPhQ0CEBo7BSlEaS0eSGN6sxkOq3O9e3WqxKFoNOYassyqrzWJ9T0ijx2iUlCq3EbnIDrNL0y2QI4hdda_spy0Q_asUjlxog2QkuPgISXOaYo',
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

  processImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_IZ9VgjOieVZIBUrqdDNVoUKYSh0ieMNLzTihmxfAOpv3owRuyy5yWp8R4in3q-ucx4MNUSnTRQbbd7g-KEN8I6tMxgqYCA440oAGC-nB1Djm1C4jvB2RbYJvVVnbQ2jH-SdQDBFb-eee8BN1zMJkwmMVtb-ZjCf-Ij_ueCeV2BiQ_h_FjP2QqMO3cbbDDiosSrgbbD7BydJTOPRd0mqEZ0fH8_czERp1v0f83-HMAiInipZJIgOaxC9O7LsmPKlQxk5tQjJLLUA',
  processImageAlt: 'Prise de vue cinématographique en studio',

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
