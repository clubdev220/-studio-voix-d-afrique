import React from 'react';
import ServiceDetailLayout from '../components/ServiceDetailLayout.jsx';

const SERVICE = {
  badge: 'Audio Numérique',
  titleLine1: 'Podcast &',
  titleLine2: 'Enregistrement',
  accentClass: 'text-tertiary',
  description: "Créez un podcast qui fidélise et inspire. De la prise de son à la diffusion, nous gérons chaque étape pour que votre contenu sonne professionnel dès le premier épisode.",
  heroImage: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=1200&q=80',
  heroImageAlt: "Microphone de studio pour enregistrement podcast",

  features: [
    {
      icon: 'podcasts',
      title: 'Son Cristallin',
      description: "Enregistrement en cabine insonorisée avec microphones de référence. Chaque mot est capturé avec une clarté et une chaleur professionnelles.",
    },
    {
      icon: 'cut',
      title: 'Montage & Réalisation',
      description: "Suppression des silences, erreurs et bruits parasites. Habillage musical, jingles intro/outro et intégration d'extraits sonores.",
    },
    {
      icon: 'rss_feed',
      title: 'Prêt à Diffuser',
      description: "Export calibré pour toutes les plateformes : Spotify, Apple Podcasts, Deezer, YouTube. Fichiers normalisés aux standards LUFS requis.",
    },
  ],

  processImage: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?auto=format&fit=crop&w=1200&q=80',
  processImageAlt: 'Cabine acoustique traitée pour l\'enregistrement',

  process: [
    {
      number: '01',
      title: 'Conception & Brief',
      description: "Définition du format (interview, solo, table ronde), de la durée cible, du ton éditorial et de la charte sonore de votre podcast.",
    },
    {
      number: '02',
      title: 'Enregistrement',
      description: "Session en studio avec accueil de vos invités. Configuration multi-micro, monitoring en temps réel et direction technique pour un résultat optimal.",
    },
    {
      number: '03',
      title: 'Montage & Post-prod',
      description: "Editing, nettoyage audio, equalisation, compression et intégration des habillages musicaux. Rendu cohérent du premier au dernier épisode.",
    },
    {
      number: '04',
      title: 'Livraison & Diffusion',
      description: "Export aux formats MP3/AAC optimisés, métadonnées complètes (titre, description, artwork) et guide de publication sur vos plateformes cibles.",
    },
  ],

  deliverables: [
    { icon: 'audio_file',   label: 'Épisode Mixé',           sub: 'MP3 / WAV HD' },
    { icon: 'image',        label: 'Artwork Cover',           sub: '3000×3000 px' },
    { icon: 'music_note',   label: 'Habillage Sonore',       sub: 'Intro / Outro' },
    { icon: 'rss_feed',     label: 'Flux RSS Prêt',          sub: 'Multi-plateformes' },
  ],

  faq: [
    {
      q: "Combien d'épisodes puis-je enregistrer en une session ?",
      a: "En général, une session de 3 heures permet d'enregistrer 2 à 3 épisodes de 20–30 minutes. Nous recommandons d'enregistrer plusieurs épisodes en batch pour optimiser le coût et la cohérence sonore.",
    },
    {
      q: "Puis-je accueillir des invités en remote (à distance) ?",
      a: "Oui, nous intégrons les connexions Zoom, Riverside.fm ou Cleanfeed directement dans notre chaîne de mixage pour des interviews à distance avec une qualité maximale.",
    },
    {
      q: "Proposez-vous un service de création de podcast de A à Z ?",
      a: "Absolument. Notre offre complète inclut le conseil éditorial, la charte graphique, l'habillage sonore, l'enregistrement, le montage et la mise en ligne sur toutes les plateformes.",
    },
    {
      q: "Faut-il amener son propre matériel ?",
      a: "Non, tout le matériel est fourni (microphones, casques, interface audio). Vous n'avez besoin que de vos idées et de vos invités.",
    },
  ],

  ctaTitle: "Votre podcast commence ici",
  ctaDescription: "Donnez vie à votre concept. Réservez votre première session et lancez-vous.",
};

export default function PodcastPage() {
  return <ServiceDetailLayout service={SERVICE} />;
}
