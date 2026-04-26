/**
 * Services Configuration
 * Defines all available booking services with pricing, descriptions, and metadata
 */

export const CURRENCY = 'FCFA';
export const DEPOSIT_PERCENTAGE = 0.40; // 40% deposit required

export const SERVICES = [
  {
    id: 'doublage',
    name: 'Doublage',
    description: 'Synchronisation de voix sur image pour films, séries et contenus audiovisuels',
    icon: 'movie',
    pricePerHour: 25000,      // 25,000 FCFA/h
    minDuration: 1,            // Minimum 1 hour
    category: 'production'
  },
  {
    id: 'podcast',
    name: 'Podcast & Narration',
    description: 'Enregistrement et montage de podcasts, narrations et contenus audio',
    icon: 'podcasts',
    pricePerHour: 15000,       // 15,000 FCFA/h
    minDuration: 1,
    category: 'production'
  },
  {
    id: 'post-production',
    name: 'Post-Production Audio',
    description: 'Mixing, mastering et post-production sonore pour vos projets',
    icon: 'tune',
    pricePerHour: 20000,       // 20,000 FCFA/h
    minDuration: 1,
    category: 'production'
  },
  {
    id: 'location',
    name: 'Location de Studio',
    description: 'Accès au studio professionnel avec équipement complet',
    icon: 'mic_external_on',
    pricePerHour: 35000,       // 35,000 FCFA/h
    minDuration: 2,            // Minimum 2 hours for studio rental
    category: 'facility'
  },
  {
    id: 'consultation',
    name: 'Consultation',
    description: 'Conseil technique et artistique pour vos projets audiovisuels',
    icon: 'support_agent',
    pricePerHour: 10000,       // 10,000 FCFA/h
    minDuration: 1,
    category: 'consultation'
  }
];

/**
 * Utility function to get service by ID
 */
export function getServiceById(serviceId) {
  return SERVICES.find(s => s.id === serviceId);
}

/**
 * Utility function to format price
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('fr-FR').format(Math.round(amount)) + ' ' + CURRENCY;
}

/**
 * Utility function to calculate total price
 */
export function calculateTotalPrice(service, duration) {
  if (!service || !duration) return 0;
  return service.pricePerHour * duration;
}

/**
 * Utility function to calculate deposit amount
 */
export function calculateDepositAmount(totalPrice) {
  return Math.ceil(totalPrice * DEPOSIT_PERCENTAGE);
}
