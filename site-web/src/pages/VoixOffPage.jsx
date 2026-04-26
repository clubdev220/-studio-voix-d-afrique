import React from 'react';
import ServiceDetailLayout from '../components/ServiceDetailLayout.jsx';

const SERVICE = {
  badge: 'Narration & Publicité',
  titleLine1: 'Voix-off &',
  titleLine2: 'Narration',
  accentClass: 'text-secondary',
  description: "Des voix qui captivent, informent et inspirent. De la publicité au documentaire, nous donnons à vos contenus la dimension émotionnelle qu'ils méritent.",
  heroImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
  heroImageAlt: "Microphone de studio professionnel",

  features: [
    {
      icon: 'record_voice_over',
      title: 'Bibliothèque de Voix',
      description: "Plus de 30 comédiens de voix référencés : voix masculines, féminines, jeunes, seniors, institutionnelles ou chalureuses.",
    },
    {
      icon: 'bolt',
      title: 'Livraison Rapide',
      description: "Délais express disponibles. Une voix-off simple peut être enregistrée, mixée et livrée en moins de 24 heures.",
    },
    {
      icon: 'tune',
      title: 'Formats Multiples',
      description: "Livraison dans tous les formats requis : TV, radio, web, podcast, e-learning, IVR. Compatibilité totale garantie.",
    },
  ],

  processImage: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=1200&q=80',
  processImageAlt: 'Microphone en cabine de prise de voix',

  process: [
    {
      number: '01',
      title: 'Brief & Script',
      description: "Réception de votre script, analyse du ton souhaité (institutionnel, chaleureux, dynamique) et sélection du casting vocal.",
    },
    {
      number: '02',
      title: 'Sélection de Voix',
      description: "Nous vous soumettons 2 à 3 options de voix correspondant à votre brief pour validation avant enregistrement.",
    },
    {
      number: '03',
      title: 'Enregistrement',
      description: "Session d'enregistrement en cabine insonorisée avec retours en temps réel. Plusieurs prises pour garantir la meilleure performance.",
    },
    {
      number: '04',
      title: 'Mixage & Livraison',
      description: "Nettoyage audio, égalisation et normalisation aux standards de diffusion. Livraison dans vos formats en 24 à 48 h.",
    },
  ],

  deliverables: [
    { icon: 'audio_file',  label: 'Fichiers Audio HD',       sub: 'WAV / MP3 / AAC' },
    { icon: 'layers',      label: 'Versions Alternatives',   sub: 'Durées & tons variés' },
    { icon: 'description', label: 'Script Finalisé',         sub: 'Avec timecodes' },
    { icon: 'headphones',  label: 'Écoute Illimitée',        sub: 'Révisions incluses' },
  ],

  faq: [
    {
      q: "Combien de temps pour une voix-off de 30 secondes ?",
      a: "Pour un script court (30–60 secondes), comptez 4 à 8 heures ouvrées de l'enregistrement à la livraison finale. Un service express est disponible.",
    },
    {
      q: "Combien de révisions sont incluses ?",
      a: "Deux rounds de révisions sont inclus dans chaque prestation. Au-delà, chaque révision supplémentaire est facturée à un tarif horaire réduit.",
    },
    {
      q: "Puis-je fournir mon propre script ?",
      a: "Oui, et c'est souvent préférable. Si vous n'en avez pas, notre équipe peut rédiger un script adapté à votre cible pour un supplément de 5 000 FCFA.",
    },
    {
      q: "Travaillez-vous avec des accents régionaux ?",
      a: "Oui, nous avons des comédiens maîtrisant les accents burkinabè, ivoirien, sénégalais, camerounais, et le français international neutre.",
    },
  ],

  ctaTitle: "Votre message mérite la meilleure voix",
  ctaDescription: "Partagez votre script et nous vous proposons les talents idéaux sous 24 heures.",
};

export default function VoixOffPage() {
  return <ServiceDetailLayout service={SERVICE} />;
}
