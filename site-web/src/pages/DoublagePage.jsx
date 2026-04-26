import React from 'react';
import ServiceDetailLayout from '../components/ServiceDetailLayout.jsx';

const SERVICE = {
  badge: 'Service de Prestige',
  titleLine1: 'Doublage &',
  titleLine2: 'Vocalisation',
  accentClass: 'text-orange-400',
  description: "Donnez une voix authentique à vos contenus internationaux. Nous traduisons l'émotion, le rythme et l'essence culturelle pour le public africain et mondial.",
  heroImage: 'https://images.unsplash.com/photo-1598653244849-4f476c1571ba?auto=format&fit=crop&w=1200&q=80',
  heroImageAlt: "Console de mixage professionnelle en studio",

  features: [
    {
      icon: 'language',
      title: 'Adaptation Culturelle',
      description: "Au-delà de la traduction, nous adaptons les expressions et l'humour pour une résonance locale parfaite auprès du public africain.",
    },
    {
      icon: 'mic',
      title: 'Casting Premium',
      description: "Accès à un catalogue de voix professionnelles variées, des timbres institutionnels aux voix de caractère expressives.",
    },
    {
      icon: 'sync',
      title: 'Précision Technique',
      description: "Synchronisation labiale (Lip-sync) millimétrée et mixage multicanal aux normes internationales de diffusion.",
    },
  ],

  processImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
  processImageAlt: 'Régie de mixage professionnelle',

  process: [
    {
      number: '01',
      title: 'Analyse & Script',
      description: "Traduction et adaptation du texte original pour respecter les contraintes de temps et de rythme (Lip-syncing).",
    },
    {
      number: '02',
      title: 'Casting Vocal',
      description: "Sélection des talents dont le timbre et l'intention correspondent parfaitement aux personnages ou au message.",
    },
    {
      number: '03',
      title: 'Enregistrement Dirigé',
      description: "Session supervisée par un directeur artistique pour garantir l'excellence de la performance émotionnelle.",
    },
    {
      number: '04',
      title: 'Post-Production',
      description: "Nettoyage, mixage et mastering pour une intégration transparente avec l'audio original ou la nouvelle bande-son.",
    },
  ],

  deliverables: [
    { icon: 'audio_file',  label: 'Masters Audio HD',         sub: 'WAV / AIFF' },
    { icon: 'movie',       label: 'Vidéo Prête-à-diffuser',   sub: '4K / FULL HD' },
    { icon: 'description', label: 'Scripts Adaptés',          sub: 'Multi-format' },
    { icon: 'verified',    label: 'Droits Complets',           sub: 'Utilisation illimitée' },
  ],

  faq: [
    {
      q: "Quels sont vos délais moyens pour un doublage ?",
      a: "Pour un court-métrage (10–20 min), comptez 3 à 5 jours ouvrés. Pour un long-métrage, 2 à 4 semaines selon la complexité et le nombre de personnages.",
    },
    {
      q: "Puis-je assister à la séance d'enregistrement ?",
      a: "Absolument. Nous encourageons les clients à être présents ou connectés en remote pour valider les performances en temps réel.",
    },
    {
      q: "Proposez-vous des traductions en langues africaines ?",
      a: "Oui, nous travaillons avec des traducteurs et comédiens natifs pour le mooré, le dioula, le fulfuldé et plusieurs autres langues d'Afrique de l'Ouest.",
    },
    {
      q: "Quel format de fichier source acceptez-vous ?",
      a: "Nous acceptons tous les formats vidéo standards (MP4, MOV, MXF, ProRes) ainsi que les scripts Word, PDF ou Final Draft.",
    },
  ],

  ctaTitle: "Prêt à donner de la voix ?",
  ctaDescription: "Discutons de votre projet et trouvons l'identité sonore qui vous démarquera.",
};

export default function DoublagePage() {
  return <ServiceDetailLayout service={SERVICE} />;
}
