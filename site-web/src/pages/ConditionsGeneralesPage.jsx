import React from 'react';
import LegalLayout from '../components/LegalLayout.jsx';

const SECTIONS = [
  {
    heading: '1. Objet et champ d\'application',
    paragraphs: [
      "Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des prestations de services proposées par Studio Voix d'Afrique à ses clients, qu'ils soient des particuliers ou des professionnels.",
      "Toute réservation ou commande de prestation implique l'acceptation pleine et entière des présentes CGV. Studio Voix d'Afrique se réserve le droit de les modifier à tout moment ; les CGV applicables sont celles en vigueur à la date de la réservation.",
    ],
  },
  {
    heading: '2. Description des services',
    paragraphs: [
      "Studio Voix d'Afrique propose les prestations suivantes :",
    ],
    list: [
      "Doublage et vocalisation : synchronisation de voix sur image, adaptation culturelle et linguistique.",
      "Voice-over et narration : enregistrement de voix-off pour publicités, documentaires, e-learning et supports institutionnels.",
      "Enregistrement de podcasts : production complète ou partielle d'épisodes de podcast.",
      "Post-production audio : mixage, mastering, sound design et nettoyage audio.",
      "Location de studio : mise à disposition des espaces et équipements du studio pour sessions autonomes ou assistées.",
    ],
  },
  {
    heading: '3. Tarifs',
    paragraphs: [
      "Les tarifs applicables sont ceux en vigueur au moment de la réservation, tels que communiqués par Studio Voix d'Afrique lors du devis. Tous les prix sont exprimés en Francs CFA (FCFA) et s'entendent hors taxes.",
      "Studio Voix d'Afrique se réserve le droit de modifier ses tarifs à tout moment. Les tarifs modifiés s'appliquent uniquement aux nouvelles commandes passées après la date de modification.",
    ],
  },
  {
    heading: '4. Réservation et confirmation',
    paragraphs: [
      "La réservation d'une session peut être effectuée en ligne via le formulaire de réservation du site ou directement par téléphone/e-mail.",
      "La réservation est considérée comme définitivement confirmée à réception :",
    ],
    list: [
      "De l'e-mail de confirmation automatique envoyé par le studio.",
      "Et, pour les projets d'un montant supérieur à 50 000 FCFA, du versement d'un acompte de 30 % du montant total.",
    ],
  },
  {
    heading: '5. Modalités de paiement',
    paragraphs: [
      "Le paiement des prestations peut être effectué par les moyens suivants :",
    ],
    list: [
      "Espèces, remises en main propre au studio.",
      "Mobile Money (Orange Money, Moov Money).",
      "Virement bancaire (coordonnées communiquées sur devis).",
    ],
  },
  {
    heading: '6. Annulation et remboursement',
    paragraphs: [
      "Les conditions d'annulation sont les suivantes :",
    ],
    list: [
      "Annulation plus de 48 heures avant la session : remboursement intégral de l'acompte.",
      "Annulation entre 24 et 48 heures avant la session : remboursement de 50 % de l'acompte.",
      "Annulation moins de 24 heures avant la session ou absence non signalée : l'acompte reste acquis au studio.",
      "Report de session : possible gratuitement jusqu'à 48 heures avant, sous réserve des disponibilités.",
    ],
  },
  {
    heading: '7. Exécution des prestations',
    paragraphs: [
      "Studio Voix d'Afrique s'engage à exécuter les prestations commandées avec le soin et la diligence d'un professionnel du secteur audio.",
      "Le client est tenu de fournir tous les éléments nécessaires à la bonne exécution de la prestation (scripts, fichiers sources, vidéos) dans les délais convenus. Tout retard imputable au client pourra entraîner un décalage des délais de livraison sans que la responsabilité du studio ne puisse être engagée.",
      "Un round de corrections est inclus dans chaque prestation. Les révisions supplémentaires feront l'objet d'une facturation complémentaire.",
    ],
  },
  {
    heading: '8. Propriété intellectuelle des livrables',
    paragraphs: [
      "À complet paiement de la prestation, le client acquiert les droits d'utilisation des livrables (enregistrements audio, mixages finaux) pour les usages définis dans le devis.",
      "Studio Voix d'Afrique conserve le droit de mentionner la prestation dans son portfolio et à des fins de communication, sauf opposition écrite explicite du client.",
      "Les compositions originales, arrangements musicaux et éléments sonores créés de toutes pièces par le studio restent la propriété intellectuelle de Studio Voix d'Afrique, sauf cession expresse et écrite.",
    ],
  },
  {
    heading: '9. Responsabilité',
    paragraphs: [
      "Studio Voix d'Afrique est tenu d'une obligation de moyens et non de résultat. Sa responsabilité ne pourra être engagée en cas de force majeure, de défaillance des équipements imputable à un événement extérieur, ou de retard imputable au client.",
      "En tout état de cause, la responsabilité de Studio Voix d'Afrique est limitée au montant de la prestation effectivement réglée par le client.",
    ],
  },
  {
    heading: '10. Confidentialité',
    paragraphs: [
      "Studio Voix d'Afrique s'engage à traiter avec la plus stricte confidentialité toutes les informations, contenus et documents communiqués par le client dans le cadre des prestations. Ces informations ne seront en aucun cas divulguées à des tiers sans l'accord préalable écrit du client.",
    ],
  },
  {
    heading: '11. Droit applicable et litiges',
    paragraphs: [
      "Les présentes CGV sont soumises au droit burkinabè. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, les parties s'efforceront de trouver une solution amiable.",
      "À défaut de règlement amiable dans un délai de 30 jours, tout litige sera soumis à la compétence exclusive des tribunaux de Ouagadougou, Burkina Faso.",
    ],
    contact: [
      "Pour toute réclamation : contact@voixdafrique.studio",
      "Téléphone : +226 67 56 56 91",
      "Studio Voix d'Afrique — Ouagadougou, Burkina Faso",
    ],
  },
];

export default function ConditionsGeneralesPage() {
  return (
    <LegalLayout
      badge="Conditions contractuelles"
      title="Conditions Générales de Vente"
      updated="Avril 2026"
      sections={SECTIONS}
    />
  );
}
