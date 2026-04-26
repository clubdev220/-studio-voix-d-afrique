import React from 'react';
import LegalLayout from '../components/LegalLayout.jsx';

const SECTIONS = [
  {
    heading: '1. Éditeur du site',
    paragraphs: [
      "Le site internet www.voixdafrique.studio est édité par la société Studio Voix d'Afrique, entreprise en cours d'immatriculation au Registre du Commerce et du Crédit Mobilier (RCCM) de Ouagadougou, Burkina Faso.",
    ],
    contact: [
      "Dénomination sociale : Studio Voix d'Afrique",
      "Forme juridique : Entreprise individuelle / SARL (en cours de constitution)",
      "Siège social : Ouagadougou, Burkina Faso",
      "Téléphone : +226 67 56 56 91",
      "E-mail : contact@voixdafrique.studio",
      "Directeur de publication : Abdoul Hamid COMPAORÉ",
    ],
  },
  {
    heading: '2. Hébergement',
    paragraphs: [
      "Le site est hébergé sur des serveurs sécurisés. Les services Firebase (authentification, base de données Firestore) sont fournis par Google LLC, dont le siège social est situé 1600 Amphitheatre Parkway, Mountain View, CA 94043, États-Unis.",
    ],
    contact: [
      "Hébergeur applicatif : Google Firebase (Google LLC)",
      "Site : https://firebase.google.com",
    ],
  },
  {
    heading: '3. Propriété intellectuelle',
    paragraphs: [
      "L'ensemble des éléments constituant le site (textes, graphiques, logiciels, photographies, images, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses) sont la propriété exclusive de Studio Voix d'Afrique ou font l'objet d'une licence d'utilisation accordée au bénéfice de Studio Voix d'Afrique.",
      "Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Studio Voix d'Afrique.",
    ],
  },
  {
    heading: '4. Données personnelles',
    paragraphs: [
      "Studio Voix d'Afrique collecte des données personnelles dans le cadre de la gestion des réservations et des demandes de contact. Ces données sont traitées conformément à notre Politique de Confidentialité disponible sur ce site.",
      "Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à l'adresse : contact@voixdafrique.studio.",
    ],
  },
  {
    heading: '5. Cookies',
    paragraphs: [
      "Le site utilise des cookies techniques nécessaires à son bon fonctionnement (authentification Firebase, sessions utilisateurs). Aucun cookie publicitaire ou de traçage tiers n'est déposé sans votre consentement explicite.",
    ],
  },
  {
    heading: '6. Liens hypertextes',
    paragraphs: [
      "Le site peut contenir des liens vers des sites externes. Studio Voix d'Afrique n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou aux pratiques de confidentialité qui y sont appliquées.",
    ],
  },
  {
    heading: '7. Responsabilité',
    paragraphs: [
      "Studio Voix d'Afrique met tout en œuvre pour assurer l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, l'éditeur ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à la disposition sur ce site.",
      "En conséquence, Studio Voix d'Afrique décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.",
    ],
  },
  {
    heading: '8. Droit applicable',
    paragraphs: [
      "Le présent site et ses mentions légales sont soumis au droit burkinabè. Tout litige relatif à l'utilisation du site sera soumis à la compétence exclusive des tribunaux de Ouagadougou, Burkina Faso.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      badge="Document légal"
      title="Mentions Légales"
      updated="Avril 2026"
      sections={SECTIONS}
    />
  );
}
