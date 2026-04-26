import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { SERVICES, formatPrice, calculateTotalPrice, calculateDepositAmount } from '../lib/services.js';
import { createBooking, getBusySlots, isSlotAvailable } from '../lib/bookingService.js';

const STEPS = [
  { id: 1, label: 'Service', icon: 'local_offer' },
  { id: 2, label: 'Date', icon: 'calendar_month' },
  { id: 3, label: 'Heure', icon: 'schedule' },
  { id: 4, label: 'Détails', icon: 'description' },
  { id: 5, label: 'Confirmation', icon: 'check_circle' }
];

const HOURS = Array.from({ length: 10 }, (_, i) => {
  const hour = 8 + i; // 8:00 to 17:00
  return `${String(hour).padStart(2, '0')}:00`;
});

const DURATIONS = [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8];

export default function BookingWizard({ isOpen, onClose }) {
  const { currentUser, userProfile, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Form state
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [busySlots, setBusySlots] = useState([]);
  const [projectType, setProjectType] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Check auth on mount
  useEffect(() => {
    if (!loading && !currentUser) {
      setShowAuthModal(true);
    }
  }, [currentUser, loading]);

  // Fetch busy slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchBusySlots(selectedDate);
    }
  }, [selectedDate]);

  // Get total price
  const service = selectedService ? SERVICES.find(s => s.id === selectedService) : null;
  const totalPrice = service && selectedDuration ? calculateTotalPrice(service, selectedDuration) : 0;
  const depositAmount = totalPrice ? calculateDepositAmount(totalPrice) : 0;

  async function fetchBusySlots(date) {
    try {
      const slots = await getBusySlots(date);
      setBusySlots(slots);
    } catch (err) {
      console.error('Erreur chargement créneaux:', err);
      setBusySlots([]);
    }
  }

  function isTimeSlotAvailable(time, duration) {
    if (busySlots.length === 0) return true;

    const [hours, minutes] = time.split(':').map(Number);
    const startInMinutes = hours * 60 + minutes;
    const endInMinutes = startInMinutes + (duration * 60);

    for (const slot of busySlots) {
      if (startInMinutes < slot.endInMinutes && endInMinutes > slot.startInMinutes) {
        return false;
      }
    }
    return true;
  }

  function canProceedToNextStep() {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedDate !== null;
      case 3:
        return selectedTime !== null && isTimeSlotAvailable(selectedTime, selectedDuration);
      case 4:
        return true; // Details are optional
      case 5:
        return true; // Final confirmation
      default:
        return false;
    }
  }

  function nextStep() {
    if (canProceedToNextStep()) {
      setError(null);
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  }

  function prevStep() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  }

  async function submitBooking() {
    try {
      setError(null);
      setIsSubmitting(true);

      if (!currentUser) {
        setError('Vous devez être connecté');
        return;
      }

      // Verify slot is still available
      const available = await isSlotAvailable(selectedDate, selectedTime, selectedDuration);
      if (!available) {
        setError('Ce créneau n\'est plus disponible. Veuillez choisir un autre horaire.');
        return;
      }

      // Create booking
      const bookingId = await createBooking({
        userId: currentUser.uid,
        serviceId: selectedService,
        date: selectedDate.toISOString().split('T')[0],
        startTime: selectedTime,
        duration: selectedDuration,
        projectType,
        projectDescription,
        clientName: userProfile?.fullName || currentUser.displayName || '',
        clientEmail: currentUser.email,
        clientPhone: userProfile?.phone || '',
        clientCity: userProfile?.city || '',
        clientCountry: userProfile?.country || ''
      });

      // Success!
      setSuccessMessage(`Réservation créée avec succès! Numéro: ${bookingId}`);
      setTimeout(() => {
        resetWizard();
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Erreur soumission:', err);
      setError(err.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetWizard() {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime('09:00');
    setSelectedDuration(1);
    setProjectType('');
    setProjectDescription('');
    setError(null);
    setSuccessMessage(null);
    setBusySlots([]);
  }

  if (!isOpen) return null;
  if (loading) return null;

  // Show auth required message if not authenticated
  if (!currentUser) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-surface rounded-3xl shadow-2xl max-w-md w-full">
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
            <h2 className="text-xl font-bold text-on-background">Authentification requise</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl text-primary">lock</span>
            </div>
            <h3 className="text-lg font-bold text-on-background mb-2">Connexion requise</h3>
            <p className="text-on-surface-variant text-sm mb-6">
              Pour réserver une session, veuillez d'abord vous connecter ou créer un compte.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="/connexion"
                className="bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform inline-block text-center"
              >
                Se connecter
              </a>
              <a
                href="/inscription"
                className="bg-surface-container-high text-on-surface px-6 py-3 rounded-full font-bold text-sm hover:bg-surface-container-highest transition-colors inline-block text-center border border-outline-variant/20"
              >
                Créer un compte
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col lg:flex-row">
        {/* Sidebar Steps */}
        <div className="w-full lg:w-56 bg-surface-container-low border-b lg:border-b-0 lg:border-r border-outline-variant/20 p-6 flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-on-surface-variant">Progression</h3>
          <div className="flex lg:flex-col gap-2">
            {STEPS.map((step) => (
              <button
                key={step.id}
                onClick={() => {
                  if (step.id < currentStep) setCurrentStep(step.id);
                }}
                disabled={step.id > currentStep}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                  currentStep === step.id
                    ? 'bg-primary text-on-primary'
                    : step.id < currentStep
                    ? 'bg-primary/15 text-primary hover:bg-primary/25'
                    : 'text-on-surface-variant opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-base">{step.icon}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
            <h2 className="text-xl font-bold text-on-background">
              {STEPS[currentStep - 1].label}
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {error && (
              <div className="mb-4 p-4 bg-error/15 border border-error/30 rounded-xl text-error text-sm flex items-start gap-3">
                <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">error</span>
                <span>{error}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-4 bg-primary/15 border border-primary/30 rounded-xl text-primary text-sm flex items-start gap-3">
                <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">check_circle</span>
                <span>{successMessage}</span>
              </div>
            )}

            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <p className="text-on-surface-variant text-sm mb-6">Sélectionnez le service que vous souhaitez réserver.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES.map((svc) => (
                    <button
                      key={svc.id}
                      onClick={() => setSelectedService(svc.id)}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${
                        selectedService === svc.id
                          ? 'border-primary bg-primary/10'
                          : 'border-outline-variant/20 bg-surface-container-low hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary text-2xl">{svc.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-on-background">{svc.name}</h4>
                          <p className="text-xs text-on-surface-variant mt-1">{svc.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-on-surface-variant">Min: {svc.minDuration}h</span>
                        <span className="font-bold text-primary">{formatPrice(svc.pricePerHour)}/h</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Date Selection */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-on-surface-variant text-sm mb-6">Choisissez la date de votre réservation.</p>
                <input
                  type="date"
                  value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-on-background focus:outline-none focus:border-primary transition-colors"
                />
                {selectedDate && (
                  <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <p className="text-sm text-on-background font-medium">
                      {selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Time & Duration */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-on-background mb-3">Heure de début</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-on-background focus:outline-none focus:border-primary transition-colors"
                  >
                    {HOURS.map((hour) => (
                      <option key={hour} value={hour} disabled={!isTimeSlotAvailable(hour, selectedDuration)}>
                        {hour} {!isTimeSlotAvailable(hour, selectedDuration) ? '(occupé)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-background mb-3">Durée (heures)</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {DURATIONS.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        disabled={service && duration < service.minDuration}
                        className={`p-2 rounded-lg text-sm font-bold transition-colors ${
                          selectedDuration === duration
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        {duration}h
                      </button>
                    ))}
                  </div>
                  {service && selectedDuration < service.minDuration && (
                    <p className="text-xs text-error mt-2">Minimum {service.minDuration}h requis</p>
                  )}
                </div>

                {busySlots.length > 0 && (
                  <div className="p-3 bg-tertiary/10 border border-tertiary/20 rounded-xl">
                    <p className="text-xs font-medium text-tertiary">Créneaux occupés ce jour:</p>
                    <div className="text-xs text-on-surface-variant mt-1 space-y-0.5">
                      {busySlots.map((slot, i) => (
                        <p key={i}>• {slot.startTime} - {slot.endTime}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Project Details */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <p className="text-on-surface-variant text-sm mb-6">Donnez plus de détails sur votre projet (optionnel).</p>
                <div>
                  <label className="block text-sm font-medium text-on-background mb-2">Type de projet</label>
                  <input
                    type="text"
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    placeholder="Ex: Documentaire, Série web, Film, etc."
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-on-background placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-background mb-2">Description du projet</label>
                  <textarea
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    placeholder="Décrivez votre projet, vos besoins spécifiques..."
                    rows={5}
                    className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant/20 rounded-xl text-on-background placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-surface-container-low rounded-2xl p-6 space-y-4">
                  <h3 className="font-bold text-on-background flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">summarize</span>
                    Résumé de votre réservation
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Service:</span>
                      <span className="font-medium text-on-background">{service?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Date:</span>
                      <span className="font-medium text-on-background">
                        {selectedDate?.toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Heure:</span>
                      <span className="font-medium text-on-background">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Durée:</span>
                      <span className="font-medium text-on-background">{selectedDuration}h</span>
                    </div>
                    {projectType && (
                      <div className="flex justify-between">
                        <span className="text-on-surface-variant">Type de projet:</span>
                        <span className="font-medium text-on-background">{projectType}</span>
                      </div>
                    )}

                    <div className="border-t border-outline-variant/20 pt-3 mt-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-on-surface-variant">Tarif horaire:</span>
                        <span className="font-medium text-on-background">{formatPrice(service?.pricePerHour)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-on-surface-variant">Sous-total:</span>
                        <span className="font-medium text-on-background">{formatPrice(totalPrice)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-primary/15 border border-primary/30 rounded-xl p-4">
                    <div className="text-sm mb-1">
                      <span className="text-on-surface-variant">Acompte à verser (40%):</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">{formatPrice(depositAmount)}</div>
                    <p className="text-xs text-on-surface-variant mt-2">
                      Le solde sera dû avant la session. Modalités de paiement à confirmer.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-secondary/10 border border-secondary/20 rounded-xl">
                  <input type="checkbox" id="agree" className="mt-1 cursor-pointer" required />
                  <label htmlFor="agree" className="text-xs text-on-surface-variant cursor-pointer">
                    Je confirme que j'ai bien lu les conditions de réservation et j'accepte les modalités de paiement.
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Footer - Navigation Buttons */}
          <div className="border-t border-outline-variant/20 p-6 flex gap-3 justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-outline-variant/20 rounded-full font-bold text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>

            {currentStep < STEPS.length ? (
              <button
                onClick={nextStep}
                disabled={!canProceedToNextStep()}
                className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={submitBooking}
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary text-on-primary rounded-full font-bold hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    Création...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">check</span>
                    Confirmer la réservation
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
