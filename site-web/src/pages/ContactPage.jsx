import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

/* ─── Custom map marker ──────────────────────────────────── */
const studioIcon = L.divIcon({
  className: '',
  html: `
    <div style="
      width:44px; height:44px;
      background:#3A7155;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid #fff;
      box-shadow:0 4px 16px rgba(0,0,0,0.35);
      display:flex; align-items:center; justify-content:center;
    ">
      <div style="
        transform:rotate(45deg);
        color:#fff;
        font-size:18px;
        font-family:'Material Symbols Outlined';
        line-height:1;
      ">mic</div>
    </div>`,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -48],
});

/* ─── Contact info item ──────────────────────────────────── */
const InfoItem = ({ icon, label, value, href, color = 'text-primary' }) => (
  <a
    href={href ?? '#'}
    className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group"
  >
    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
      <span className={`material-symbols-outlined ${color}`}>{icon}</span>
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{label}</p>
      <p className="text-on-surface font-medium">{value}</p>
    </div>
  </a>
);

/* ─── Social button ──────────────────────────────────────── */
const SocialBtn = ({ icon, label, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-5 py-3 rounded-full border border-outline-variant/20 hover:border-primary/30 hover:bg-surface-container transition-all duration-200 group"
  >
    <span className={`material-symbols-outlined text-xl ${color}`}>{icon}</span>
    <span className="text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">{label}</span>
  </a>
);

/* ═══════════════════════ CONTACT PAGE ═══════════════════════ */
export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(false);

  const requestTypes = [
    'Question générale',
    'Demande de devis',
    'Réservation de studio',
    'Partenariat',
    'Autre',
  ];

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSendError(false);
    try {
      // 1. Sauvegarder dans Firestore (historique)
      await addDoc(collection(db, 'contact_submissions'), {
        ...form,
        createdAt: serverTimestamp(),
      });

      // 2. Notification email → studio
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_STUDIO,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone || 'Non renseigné',
          request_type: form.type,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // 3. Email de confirmation → visiteur
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_VISITOR,
        {
          to_name: form.name,
          reply_to: form.email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
    } catch (err) {
      console.error('Erreur envoi formulaire:', err);
      setSendError(true);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', type: '', message: '' });
    setSubmitted(false);
    setSendError(false);
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main className="pt-24">

        {/* ══════════ HERO ══════════ */}
        <section className="px-8 md:px-20 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 py-1 px-4 mb-8 rounded-full border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase">
              <span className="material-symbols-outlined text-base">mail</span>
              Contact
            </span>
            <h1
              className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Prêt à lancer<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                votre projet ?
              </span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Doublage, voix-off, podcast ou post-production — notre équipe est prête à donner vie à votre vision au cœur de Ouagadougou.
            </p>
          </div>
        </section>

        {/* ══════════ MAIN CONTENT ══════════ */}
        <section className="px-8 md:px-20 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* ── Left: Contact info ── */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Nos coordonnées</h2>
                <p className="text-on-surface-variant text-sm">Contactez-nous directement ou remplissez le formulaire.</p>
              </div>

              <div className="space-y-3">
                <InfoItem
                  icon="phone"
                  label="Téléphone"
                  value="+226 67 56 56 91"
                  href="tel:+22667565691"
                />
                <InfoItem
                  icon="mail"
                  label="Email"
                  value="contact@lesvoixdafriques.com"
                  href="mailto:contact@lesvoixdafriques.com"
                />
                <InfoItem
                  icon="location_on"
                  label="Studio"
                  value="Quartier Tangen, Ouagadougou, Burkina Faso"
                />
                <InfoItem
                  icon="schedule"
                  label="Horaires"
                  value="Lun – Sam : 08h00 – 20h00"
                />
              </div>

              {/* Divider */}
              <div className="pt-4 border-t border-outline-variant/10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-4">
                  Suivez le rythme
                </h3>
                <div className="flex flex-wrap gap-3">
                  <SocialBtn icon="thumb_up"    label="Facebook"   href="https://www.facebook.com/profile.php?id=61581512834141" color="text-primary" />
                  <SocialBtn icon="podcasts"    label="Instagram"  href="https://www.instagram.com/studiovoixdafrique/" color="text-secondary" />
                  <SocialBtn icon="play_circle" label="YouTube"    href="https://www.youtube.com/@StudioVoixAfrique" color="text-error" />
                  <SocialBtn icon="music_note"  label="TikTok"     href="https://www.tiktok.com/@studio.voix.dafrique" color="text-tertiary" />
                  <SocialBtn icon="work"        label="LinkedIn"   href="https://www.linkedin.com/in/studio-voix-d-afrique-09548938b/" color="text-primary" />
                  <SocialBtn icon="alternate_email" label="X / Twitter" href="https://x.com/voix_dafrique" color="text-on-surface-variant" />
                </div>
                <p className="mt-4 text-xs text-on-surface-variant leading-relaxed">
                  Rejoignez notre communauté créative et découvrez les coulisses de nos sessions.
                </p>
              </div>

              {/* Response time badge */}
              <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                <p className="text-sm text-on-surface-variant">
                  <span className="font-bold text-primary">Réponse sous 24h</span> — Nous traitons toutes les demandes rapidement.
                </p>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="lg:col-span-3">
              <div className="bg-surface-container-low rounded-3xl p-8 md:p-10 border border-outline-variant/10">
                {submitted ? (
                  /* Success state */
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk' }}>
                      Message envoyé !
                    </h3>
                    <p className="text-on-surface-variant mb-8 max-w-sm">
                      Merci pour votre demande. Notre équipe vous contactera dans les 24 heures.
                    </p>
                    <button
                      onClick={resetForm}
                      className="px-8 py-3 rounded-full border border-outline-variant hover:bg-surface-container transition-all font-medium"
                    >
                      Envoyer une autre demande
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk' }}>
                        Envoyez-nous un message
                      </h2>
                      <p className="text-on-surface-variant text-sm">Tous les champs marqués * sont obligatoires.</p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="Votre nom"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full bg-surface-container rounded-xl px-4 py-3 text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/40 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="votre@email.com"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full bg-surface-container rounded-xl px-4 py-3 text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/40 text-sm"
                        />
                      </div>
                    </div>

                    {/* Phone + Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="+226 XX XX XX XX"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full bg-surface-container rounded-xl px-4 py-3 text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/40 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                          Type de demande *
                        </label>
                        <select
                          name="type"
                          required
                          value={form.type}
                          onChange={handleChange}
                          className="w-full bg-surface-container rounded-xl px-4 py-3 text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-sm appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Choisir...</option>
                          {requestTypes.map(t => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">
                        Décrivez votre projet *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="Parlez-nous de votre projet, vos besoins, le délai souhaité..."
                        value={form.message}
                        onChange={handleChange}
                        className="w-full bg-surface-container rounded-xl px-4 py-3 text-on-surface border border-outline-variant/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-on-surface-variant/40 text-sm resize-none"
                      />
                    </div>

                    {/* Error banner */}
                    {sendError && (
                      <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-error/10 border border-error/20 text-sm">
                        <span className="material-symbols-outlined text-error text-base shrink-0">error</span>
                        <p className="text-on-surface">
                          Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement à{' '}
                          <a href="mailto:contact@lesvoixdafriques.com" className="text-primary underline">
                            contact@lesvoixdafriques.com
                          </a>.
                        </p>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-3 bg-primary text-on-primary font-bold py-4 rounded-xl hover:brightness-110 disabled:opacity-60 transition-all duration-200"
                      style={{ boxShadow: '0 0 24px 0 rgba(58, 113, 85, 0.2)' }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Envoi en cours…
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined">send</span>
                          Envoyer la demande
                        </>
                      )}
                    </button>

                    <p className="text-xs text-on-surface-variant/60 text-center">
                      En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
                    </p>
                  </form>
                )}
              </div>
            </div>

          </div>
        </section>

        {/* ══════════ MAP / LOCALISATION ══════════ */}
        <section className="px-8 md:px-20 pb-24">
          <div className="rounded-3xl overflow-hidden bg-surface-container-low border border-outline-variant/10 relative">
            <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-outline-variant/10">
              <div>
                <h2 className="text-xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk' }}>Nous trouver</h2>
                <p className="text-on-surface-variant text-sm">Quartier Tangen, Ouagadougou, Burkina Faso</p>
              </div>
              <a
                href="https://www.google.com/maps/search/Tangen+Ouagadougou"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-container text-sm font-medium transition-all whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-primary text-base">map</span>
                Ouvrir dans Maps
              </a>
            </div>
            <div style={{ height: '320px' }}>
              <MapContainer
                center={[12.3670, -1.4900]}
                zoom={15}
                style={{ height: '320px', width: '100%' }}
                scrollWheelZoom={false}
                attributionControl={true}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                />
                <Marker position={[12.3670, -1.4900]} icon={studioIcon}>
                  <Popup>
                    <div style={{ fontFamily: 'Manrope, sans-serif', minWidth: '160px' }}>
                      <strong style={{ color: '#3A7155', fontSize: '14px' }}>Studio Voix d'Afrique</strong><br />
                      <span style={{ fontSize: '12px', color: '#555' }}>Quartier Tangen, Ouagadougou</span>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
