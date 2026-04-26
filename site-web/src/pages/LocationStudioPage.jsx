import React from 'react';
import ServiceDetailLayout from '../components/ServiceDetailLayout.jsx';

const SERVICE = {
  badge: 'Espace Pro',
  titleLine1: 'Location de',
  titleLine2: 'Studio',
  accentClass: 'text-tertiary',
  description: "Un espace acoustique traité aux normes professionnelles, équipé du meilleur matériel. Votre créativité n'attend plus que l'environnement qui lui correspond.",
  heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyvGQil_KLUrWsf8630eseRmcblP6Usj4EABDLHKh7YXVS-zYPBN5XRGH1ajb4IlbFjMDzytcj9ZnYyn_5KbE5cbBObCevljoGbW2cTzlfJ_4buxUXruu_9ECh-Oybww9Ocgys6lEOekdzNEifSfjEpM3nx3Hanhl5wE-QPFvGBsqbh7-W0OTpCCwBz3AkTPLXxAgnJOezFxyJDeoEVFeBqSpHZhsHk-2xbajdqbzWXCixMaFVbt4CIv-0vFL0yOEk0qyqOIroGoM',
  heroImageAlt: "Cabine d'enregistrement professionnelle",

  features: [
    {
      icon: 'mic_external_on',
      title: 'Équipement Haut de Gamme',
      description: "Microphones à condensateur de référence (Neumann, AKG), préamplis Neve, interface Apogee. Tout le matériel dont vous avez besoin.",
    },
    {
      icon: 'noise_control_off',
      title: 'Acoustique Traitée',
      description: "Cabine d'isolation phonique traitée aux normes NRC 0.95, salle de contrôle calibrée pour un monitoring précis et fiable.",
    },
    {
      icon: 'support_agent',
      title: 'Ingénieur Disponible',
      description: "Un ingénieur du son peut être mis à disposition pour opérer le matériel et vous conseiller techniquement tout au long de la session.",
    },
  ],

  processImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5FDo5KCO69hpbfoDJgRxmCBMBOM0mkz_oi3wRrQG5GLO6b3gimTDU_lUYFub8Rhj5tOhRRcL5wUVMVc3hFOQ8_0EJylqFUtTRpCxmg6P3pKt5KPACjohYnbphnBC-B6m9pXrUimGBCBezzmqpF8O5bU8NRLUF2CD9joS0En9mMPNtP2Q2eUwhqaWHf7AoZfHlScdQnldpbm5wSmKzWAv_IZxljcSa8YUczznjXHQkfGd-1WBlTWl0veBZDWX14RgZRta-rQaYj7w',
  processImageAlt: 'Podcasteur en session d\'enregistrement',

  process: [
    {
      number: '01',
      title: 'Réservation',
      description: "Choisissez votre créneau via notre système de réservation en ligne. Confirmation immédiate et rappel 24 h avant votre session.",
    },
    {
      number: '02',
      title: 'Briefing Technique',
      description: "À votre arrivée, notre équipe prend 15 minutes pour configurer le studio selon vos besoins spécifiques (micro, position, monitoring).",
    },
    {
      number: '03',
      title: 'Session de Travail',
      description: "Vous disposez du studio pour votre projet. Accès complet à tous les équipements. Possibilité d'adjonction d'ingénieur à tout moment.",
    },
    {
      number: '04',
      title: 'Export & Départ',
      description: "Export de vos enregistrements bruts sur clé USB ou transfert sécurisé WeTransfer. Vos fichiers sont prêts à la post-production.",
    },
  ],

  deliverables: [
    { icon: 'hard_drive',   label: 'Enregistrements Bruts', sub: 'WAV 96kHz / 32bit' },
    { icon: 'folder_zip',   label: 'Archive Sécurisée',     sub: 'Cloud + clé USB' },
    { icon: 'receipt_long', label: 'Rapport de Session',    sub: 'Paramètres & notes' },
    { icon: 'headset_mic',  label: 'Monitoring Calibré',    sub: 'Pendant la session' },
  ],

  faq: [
    {
      q: "Quelle est la durée de location minimale ?",
      a: "La durée minimale est de 2 heures. Pour les projets longs, nous proposons des forfaits journée (8h) et semaine à tarif préférentiel.",
    },
    {
      q: "L'ingénieur du son est-il inclus dans le prix ?",
      a: "La location seule n'inclut pas d'ingénieur. Vous pouvez ajouter un ingénieur du son à 15 000 FCFA/h supplémentaires, ou utiliser le studio en autonomie.",
    },
    {
      q: "Puis-je apporter mon propre matériel ?",
      a: "Oui, vous pouvez connecter vos équipements (ordinateur, contrôleurs MIDI, instruments) à notre système. Vérifiez la compatibilité lors de la réservation.",
    },
    {
      q: "Le studio est-il disponible la nuit ou le week-end ?",
      a: "Nous ouvrons du lundi au samedi de 8h à 20h. Des sessions nocturnes (20h–2h) peuvent être organisées sur demande avec majoration de 30%.",
    },
  ],

  ctaTitle: "Réservez votre créneau",
  ctaDescription: "Disponibilités en temps réel. Confirmé immédiatement, annulable jusqu'à 48 h avant.",
};

export default function LocationStudioPage() {
  return <ServiceDetailLayout service={SERVICE} />;
}
