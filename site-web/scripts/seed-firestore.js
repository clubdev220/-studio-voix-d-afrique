// Run: node scripts/seed-firestore.js
// Populates Firestore collection "portfolio_projects" with 6 sample projects.

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyASRnyFMcuWGNuNBtI4MtZSv1uQ9Y2sQOk',
  authDomain: 'mobile-claw-94f8b.firebaseapp.com',
  databaseURL: 'https://mobile-claw-94f8b-default-rtdb.firebaseio.com',
  projectId: 'mobile-claw-94f8b',
  storageBucket: 'mobile-claw-94f8b.firebasestorage.app',
  messagingSenderId: '747209596903',
  appId: '1:747209596903:web:a46841fb88e313885ae742',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

const projects = [
  {
    title: "L'Écho de la Savane",
    description: "Doublage complet en 5 langues pour une série documentaire récompensée au FESPACO, explorant la faune du Burkina Faso.",
    category: 'Doublage',
    client: 'FESPACO',
    year: 2024,
    duration: '6 épisodes × 26 min',
    tags: ['doublage', '5 langues', 'série', 'documentaire'],
    slug: 'echo-de-la-savane',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPUEqFtt_oYA5KG8v_r52lOUSsCoNfDMHVlC_oUS0YxeryJE4U4pDN3QaNlWk4ViYsqoW8cM6Hxe01o8AN9B_v40bVg6_JbRLiwPL9O8dTGFt4VoNEgB21VFNa2WEvQfeqXpYAOiGKoBYd2qvrbjWQ4pGecIRJXJMu8dTz8dWgJ9ZUcmlBQ1Fj12miQYSrK44yjff7K5y2S7wyxUwQCtYg13_2pRCXyyU7a6U6zldKIfpr9rj13-cUGorCpYuU8gmR4-AltGGHn1c',
    imageAlt: 'Studio professionnel avec éclairage LED violet et vert sur panneaux acoustiques',
    featured: true,
    published: true,
    order: 1,
    audioPreviewUrl: '',
  },
  {
    title: 'Histoires de Cité',
    description: "Série narrative hebdomadaire explorant l'urbanisme moderne à Ouagadougou, entre tradition et modernité.",
    category: 'Podcast',
    client: 'RFI Afrique',
    year: 2024,
    duration: '24 épisodes × 30 min',
    tags: ['podcast', 'narration', 'urbain'],
    slug: 'histoires-de-cite',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8yxolMiGT2dKMrCBZTlAiLG0FYQXcG3K3J8JhyT-MBF1UfUTbPzO96BHPzWQ4NlkrGJb1rkSGF4CWKVfPjyxj0nGUVHRijXrL-eKJ0DJNMB5n8R9UARJW0K7M8Mh7wNH3XA3Ybs9ihlXOAnwBPnkb0eBl5lFiIxLPM1FMqPGbC4C9JqCOCMJT7L3LY4Yj-TZzMEMGFB6vNhAFhHEnHPxfFAVRPv5TxJeHbEFo7X7XU8JIqcOhA',
    imageAlt: 'Microphone professionnel en studio avec fond sombre',
    featured: false,
    published: true,
    order: 2,
    audioPreviewUrl: '',
  },
  {
    title: 'Safaricom TV Spot',
    description: "Voix off dynamique pour la campagne estivale 2023, diffusée sur Canal+ Afrique et les principales chaînes régionales.",
    category: 'Voice-over',
    client: 'Safaricom',
    year: 2023,
    duration: '30 secondes',
    tags: ['voix-off', 'publicité', 'TV'],
    slug: 'safaricom-tv-spot',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQP7_oEixQjDlbJ_5eKd2Vm0VFxv8LGJGvhqBR3qS_jvQtLiCUAGNqWz_iZGZ-5LcZk9oQnMjV3hzKG7hE2jnVjFqzfR4nKG3jz_fv4l1FKIrTJlMBOgk7t6Vwr5kYkZOSNw8Iu1c-lVMRJVyWRGRYHrL0UQnVPxpVl8aOiJk9BtGpNT0wqFN_EiS37i_p7fK5IimJvBq6J3uE5L5YlFoX0mJj-rnXOgOXJj-kIwMo7KVhxFNwQ',
    imageAlt: 'Comédien de doublage en cabine avec casque audio',
    featured: false,
    published: true,
    order: 3,
    audioPreviewUrl: '',
  },
  {
    title: 'Cinéma Moderne — Aube',
    description: "Design sonore et mixage 5.1 pour le court-métrage Aube, primé au Festival Écrans Noirs à Yaoundé.",
    category: 'Post-prod',
    client: 'ISIS-Studio École',
    year: 2024,
    duration: '18 minutes',
    tags: ['post-production', 'mixage 5.1', 'court-métrage'],
    slug: 'cinema-moderne-aube',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBtGH3B5PYNQ7mA5rW8mRyXIqkCR7h2VLVzRrOC0-Wl9jZK7kJpjlJ05eXMYoLmZA4oF_zJSCUDvqEdIrJhriD_CXB7jkxsO7TnW4ueTGcxJFW2kILPiH3ZW0MaTp6tGS0-Cm6J8OgDJbqzVk6q8wSHFxlgRJ-lePOm1I9cQFXs-q-8P6lXFDGb3bqINXr8KdOiHoG0vR-oAPPFoMn_IH5P2q1OqPFxkQ7RVAIZq1JHR0qfXp2g38A',
    imageAlt: 'Console de mixage audio avec écrans de monitoring',
    featured: false,
    published: true,
    order: 4,
    audioPreviewUrl: '',
  },
  {
    title: 'Le Griot Numérique',
    description: "Doublage en mooré et dioula d'une série animée éducative pour les écoles primaires burkinabè, financée par l'UNICEF.",
    category: 'Doublage',
    client: 'Canal+ Afrique',
    year: 2023,
    duration: '13 épisodes × 11 min',
    tags: ['doublage', 'animation', 'mooré', 'dioula'],
    slug: 'griot-numerique',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2jJRHx5Lk_QIjdI5OB1pqThMmHFV7NzRaNvZL2QnCGc-GHPZ3mwXvB3QZFdx9BBLB5sJJv01XiYKHnqNbwPT9R59_g-IIa0C0J4lz3x7RkQdOoJvSSN0dHFGLlCaHv-j6GOdUE1X-HaOiexqF80d-xGFE6MJV3AMXzqVGW8f0-g_u7JdH0P9vR8b0tSGHReTvEHdOQQg4DM0lVx5dkDFR5LIFRoFGODvgCHOQvjFOAXOsxZSxoLQ',
    imageAlt: 'Illustration animée colorée avec microphone',
    featured: false,
    published: true,
    order: 5,
    audioPreviewUrl: '',
  },
  {
    title: 'Voix du Sahel',
    description: "Campagne de sensibilisation avec voix off en français et fulfuldé pour les populations rurales du nord Burkina Faso.",
    category: 'Voice-over',
    client: 'UNICEF Burkina Faso',
    year: 2024,
    duration: '5 spots × 60 sec',
    tags: ['voix-off', 'fulfuldé', 'sensibilisation', 'ONG'],
    slug: 'voix-du-sahel',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBdmevqfRJUvIK7PLqQh3FXHY1pBRgWG8WQfJ22gHkuOYMhCJIllqhPJGGxJqUWKb14i2Yh12oqsWJg6MDhAHMvNb2IVT-l5DL5_B5GPe0YzYV8gJCLCbrIXHqcTbBWFRg_h8bAGP2AuUnHOX3IWFNUb6qUWKtABmMa3j9TW5UuUfNiC0c16rYYSY7a28HCTOoFU6fMcWaZkHMWJuqLcIH6sJdlvBUCJDaV65WPblFJIaIuPLcVByA',
    imageAlt: 'Enregistrement voix off en studio avec ingénieur son',
    featured: false,
    published: true,
    order: 6,
    audioPreviewUrl: '',
  },
];

async function clearCollection() {
  const snap = await getDocs(collection(db, 'portfolio_projects'));
  const deletes = snap.docs.map(doc => deleteDoc(doc.ref));
  await Promise.all(deletes);
  console.log(`🗑  Cleared ${snap.docs.length} existing documents.`);
}

async function seed() {
  console.log('🌱 Seeding Firestore collection: portfolio_projects\n');
  await clearCollection();

  for (const project of projects) {
    const ref = await addDoc(collection(db, 'portfolio_projects'), project);
    console.log(`✅ Added: "${project.title}" (${ref.id})`);
  }

  console.log(`\n🎉 Done! ${projects.length} projects added to Firestore.`);
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
