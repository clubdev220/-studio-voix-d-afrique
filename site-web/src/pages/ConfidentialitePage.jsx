import React from 'react';
import LegalLayout from '../components/LegalLayout.jsx';

const SECTIONS = [
  {
    heading: '1. Responsable du traitement',
    paragraphs: [
      "Studio Voix d'Afrique est responsable du traitement de vos données personnelles collectées via ce site internet.",
    ],
    contact: [
      "Studio Voix d'Afrique",
      "Ouagadougou, Burkina Faso",
      "E-mail : contact@voixdafrique.studio",
      "Téléphone : +226 67 56 56 91",
    ],
  },
  {
    heading: '2. Données collectées',
    paragraphs: [
      "Nous collectons uniquement les données strictement nécessaires aux finalités décrites ci-après. Ces données sont fournies directement par vous lors de vos interactions avec le site.",
    ],
    list: [
      "Formulaire de contact : nom, prénom, adresse e-mail, message.",
      "Formulaire de réservation : nom, prénom, adresse e-mail, numéro de téléphone, type de service souhaité, date et heure de la réservation, message éventuel.",
      "Création de compte client : adresse e-mail et mot de passe (authentification Firebase).",
      "Données de navigation : adresse IP, type de navigateur, pages consultées (via Firebase Analytics, de manière anonymisée).",
    ],
  },
  {
    heading: '3. Finalité du traitement',
    paragraphs: [
      "Vos données sont collectées pour les finalités suivantes :",
    ],
    list: [
      "Gestion et confirmation de vos réservations de sessions studio.",
      "Réponse à vos demandes de contact et devis.",
      "Gestion de votre espace client (historique des réservations, notifications).",
      "Envoi de confirmations et rappels par e-mail via le service EmailJS.",
      "Amélioration de l'expérience utilisateur et du service.",
    ],
  },
  {
    heading: '4. Base légale du traitement',
    paragraphs: [
      "Le traitement de vos données repose sur les bases légales suivantes :",
    ],
    list: [
      "Exécution d'un contrat : traitement nécessaire à la prise en charge de votre réservation.",
      "Intérêt légitime : amélioration continue de nos services.",
      "Consentement : envoi de communications marketing (si vous y avez expressément consenti).",
    ],
  },
  {
    heading: '5. Durée de conservation',
    paragraphs: [
      "Vos données sont conservées pendant les durées suivantes :",
    ],
    list: [
      "Données de réservation : 3 ans à compter de la dernière réservation, conformément aux obligations comptables et contractuelles.",
      "Données de contact : 1 an à compter de votre dernière prise de contact.",
      "Données de compte client : jusqu'à la suppression de votre compte ou 2 ans d'inactivité.",
    ],
  },
  {
    heading: '6. Destinataires des données',
    paragraphs: [
      "Vos données sont exclusivement destinées aux équipes de Studio Voix d'Afrique. Elles peuvent toutefois être transmises aux prestataires techniques suivants, dans le strict cadre de leurs missions :",
    ],
    list: [
      "Google Firebase (authentification, base de données, hébergement) — Google LLC, États-Unis.",
      "EmailJS (envoi d'e-mails de confirmation) — EmailJS Ltd, Royaume-Uni.",
    ],
  },
  {
    heading: '7. Vos droits',
    paragraphs: [
      "Vous disposez des droits suivants concernant vos données personnelles :",
    ],
    list: [
      "Droit d'accès : obtenir une copie des données vous concernant.",
      "Droit de rectification : corriger des données inexactes ou incomplètes.",
      "Droit à l'effacement (droit à l'oubli) : demander la suppression de vos données.",
      "Droit à la limitation du traitement : restreindre temporairement l'utilisation de vos données.",
      "Droit à la portabilité : recevoir vos données dans un format structuré.",
      "Droit d'opposition : vous opposer à un traitement basé sur l'intérêt légitime.",
    ],
  },
  {
    heading: '8. Exercice de vos droits',
    paragraphs: [
      "Pour exercer vos droits ou pour toute question relative à la protection de vos données personnelles, contactez-nous par e-mail ou courrier postal. Nous nous engageons à répondre dans un délai de 30 jours.",
    ],
    contact: [
      "E-mail : contact@voixdafrique.studio",
      "Objet du message : « Exercice de droits RGPD »",
      "Courrier : Studio Voix d'Afrique – Protection des données, Ouagadougou, Burkina Faso",
    ],
  },
  {
    heading: '9. Sécurité',
    paragraphs: [
      "Studio Voix d'Afrique met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, divulgation, modification ou destruction. Les communications entre votre navigateur et nos serveurs sont chiffrées via le protocole HTTPS.",
    ],
  },
  {
    heading: '10. Cookies et traceurs',
    paragraphs: [
      "Le site utilise uniquement des cookies techniques indispensables à son fonctionnement (gestion de la session d'authentification Firebase). Aucun cookie publicitaire tiers n'est utilisé.",
      "Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela pourrait affecter le bon fonctionnement de votre espace client.",
    ],
  },
  {
    heading: '11. Modifications de la politique',
    paragraphs: [
      "Studio Voix d'Afrique se réserve le droit de modifier la présente politique de confidentialité à tout moment. La date de dernière mise à jour est indiquée en haut de cette page. Nous vous encourageons à la consulter régulièrement.",
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      badge="Protection des données"
      title="Politique de Confidentialité"
      updated="Avril 2026"
      sections={SECTIONS}
    />
  );
}
