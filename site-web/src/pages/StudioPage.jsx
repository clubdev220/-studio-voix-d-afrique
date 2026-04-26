import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';

/* ─── Shared Footer ────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-slate-950 w-full rounded-t-3xl pt-16 pb-8 px-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
      <div className="space-y-6">
        <div className="text-xl font-black text-emerald-500" style={{ fontFamily: 'Space Grotesk' }}>
          Studio Voix d'Afrique
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Le carrefour de l'excellence sonore et de l'âme africaine. Créez sans limites dans un environnement d'exception.
        </p>
        <div className="flex gap-4">
          {[
            { icon: 'public', label: 'Website' },
            { icon: 'podcasts', label: 'Podcasts' },
            { icon: 'video_library', label: 'Videos' },
          ].map(({ icon, label }) => (
            <a
              key={icon}
              href="#"
              aria-label={label}
              className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-500 hover:border-emerald-500 transition-all"
            >
              <span className="material-symbols-outlined text-sm">{icon}</span>
            </a>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-white font-bold mb-6">Navigation</h5>
        <ul className="space-y-4">
          <li><Link to="/services" className="text-slate-400 hover:text-orange-400 text-sm transition-all">Services</Link></li>
          <li><Link to="/studio" className="text-emerald-400 text-sm transition-all">Studio</Link></li>
          <li><a href="#" className="text-slate-400 hover:text-orange-400 text-sm transition-all">Portfolio</a></li>
          <li><a href="#" className="text-slate-400 hover:text-orange-400 text-sm transition-all">Blog</a></li>
        </ul>
      </div>

      <div>
        <h5 className="text-white font-bold mb-6">Légal &amp; Contact</h5>
        <ul className="space-y-4">
          {['About', 'Mentions Légales', 'Confidentialité', 'Contact'].map((item) => (
            <li key={item}>
              <a href="#" className="text-slate-400 hover:text-orange-400 text-sm transition-all">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50">
        <h5 className="text-white font-bold mb-4">Newsletter</h5>
        <p className="text-slate-400 text-xs mb-4">Recevez nos dernières actualités et offres exclusives.</p>
        <div className="relative">
          <input
            type="email"
            placeholder="Votre email"
            className="w-full bg-slate-950 border-none rounded-full py-3 px-4 text-sm text-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <button className="absolute right-1 top-1 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center hover:bg-emerald-400 transition-colors">
            <span className="material-symbols-outlined text-sm text-black">send</span>
          </button>
        </div>
      </div>
    </div>

    <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
      <p>© 2024 Studio Voix d'Afrique. Tous droits réservés.</p>
      <div className="flex gap-8">
        <p>Abidjan, Côte d'Ivoire</p>
        <p>+225 00 00 00 00 00</p>
      </div>
    </div>
  </footer>
);

/* ─── Equipment Card ────────────────────────────────────── */
const EquipCard = ({ src, name, desc, tags, tagColor = 'text-primary', featured = false }) => (
  <div className={`bg-surface-container-low rounded-xl p-8 hover:bg-surface-container-high transition-all group border border-outline-variant/10 ${featured ? 'md:scale-105 shadow-2xl z-10' : ''}`}>
    <div className="aspect-square mb-8 overflow-hidden rounded-lg">
      <img
        src={src}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <h3 className="text-2xl font-bold mb-2">{name}</h3>
    <p className="text-on-surface-variant text-sm mb-4">{desc}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className={`px-3 py-1 bg-surface-container-highest rounded-full text-xs font-bold ${tagColor}`}>
          {tag}
        </span>
      ))}
    </div>
  </div>
);

/* ─── Space Gallery Card ─────────────────────────────────── */
const SpaceCard = ({ src, title, subtitle, className = '' }) => (
  <div className={`relative rounded-3xl overflow-hidden group ${className}`}>
    <img
      src={src}
      alt={title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-sm text-slate-300">{subtitle}</p>
    </div>
  </div>
);

/* ─── Studio Page ────────────────────────────────────────── */
export default function StudioPage() {
  const { openBooking } = useBooking();
  const spacesRef = useRef(null);

  // Scroll to spaces section when "Découvrir les espaces" is clicked
  const scrollToSpaces = () => {
    spacesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main>

        {/* ══════════════════ HERO ══════════════════ */}
        <section className="relative min-h-screen flex items-center pt-32 pb-20 px-8 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <img
              alt="Studio d'enregistrement professionnel avec console vintage et éclairage ambiant chaleureux"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3DVtdAeCpbHWIiDd5AIt3NwOK7MpRFKDl_cDtLWCYa0AH2ABpGUq5TcmmER4QGYyyvslyDelj5w-YnY-ZLP3kOky_Z4tSR-m3oIZuRStY5yfUaytcp5wVCfWCko27ca6UlgXFek9GBc8ntbE3i7Xw_X5BnZOYitHsA3LZeIor7uWr9QBprOob-Xc709LCMQ5ztRNxNDTit6eQdXmWcmY1pX-GoZfeD73A79f0J14LHJldFXZO8jRr0dXjrAZk1Rr0vmffzrwfJ9k"
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-5xl">
            <span className="inline-block text-secondary font-bold tracking-[0.2em] mb-4 text-sm uppercase">
              L'Excellence Sonore
            </span>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 max-w-3xl" style={{ fontFamily: 'Space Grotesk' }}>
              Immersion au cœur de la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                création
              </span>
              .
            </h1>
            <p className="text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10">
              Découvrez un sanctuaire acoustique où la technologie de pointe rencontre l'âme de l'Afrique. Un espace conçu pour les artistes exigeants.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={scrollToSpaces}
                className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-bold text-lg hover:brightness-110 transition-all flex items-center gap-2"
                style={{ boxShadow: '0 0 32px 0 rgba(216, 90, 27, 0.15)' }}
              >
                Découvrir les espaces
                <span className="material-symbols-outlined">arrow_downward</span>
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════ ARSENAL TECHNIQUE ══════════════════ */}
        <section className="py-24 px-8 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                  L'Arsenal Technique
                </h2>
                <p className="text-on-surface-variant text-lg">
                  Une sélection rigoureuse d'équipements analogiques et numériques pour sculpter votre son avec une précision chirurgicale.
                </p>
              </div>
              <span className="text-primary font-bold text-5xl opacity-20 hidden md:block">01</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <EquipCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCewwc-JxnsqNfoAYb20MnvH-nz8oga8xLRCFtPnN8sMrlBIbD1oeoihsYfZwGuVyX8Atg-Yg41_WEY41GItmP0N__0wBu0-2Bx28pitQYObbEd58QY3q6noyhdVYQ3C6KFeFZmJyY_gNXYXEM8JI3sCdkkyszH7Rh2xnGfmiOfskwLgC9vJBc68IZm_4VofuZIC7qcWQR3iRtSdCzND7uRoh3Xzy8YfAXjt4Ml4HDIHuSu6b-nynKMEbf5oUpYXkDxcSdIDzQlPLc"
                name="Neumann U87 Ai"
                desc="Le standard mondial pour les voix. Clarté exceptionnelle et présence naturelle."
                tags={['Large Diaphragme', 'Multi-polaire']}
              />
              <EquipCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiweFj3P2d366AC_e2pbes5ceO7ykgL9Wm-Ecp8gKfOuxGF1_5vjTpw1xLZ2MXEPQvt8NoiVfjV0JMkfCz0tM-81mu9qXQtd1taEjYPRgRsE0hI4qT2334Qt-eSrv5e7SoIvHailyFdgwSdniqBLbW-GxXlMd2AM-bapwzuDgwXkjjYCHBSV58NB7vDJEJnEow3DyM2MPPQYH0wV6L9HHnV6GYuUrJuh0xcL6RTCgG1k_G04zwmRVgRo0i8E7jekCyZApJpH4kdUM"
                name="SSL Origin 32"
                desc="Console analogique de 32 canaux offrant le son classique SSL avec un flux de travail moderne."
                tags={['Pure Drive', 'Analogique']}
                tagColor="text-secondary"
                featured
              />
              <EquipCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3lTfZlGtupPYdP7fZ-d_6uP1_UdMcTw7-BrmrS502A_g-aZonVtyQlmdX6siqY-C__HMfM5724jzgR5oP_ss_U8KjMXJLBWa38JGu-FQXlj9O8hdSubAi7ZZnSz7ejBpVNuugWTYfNZUED_fncew-8rt72wl0U5wRxiph4sgdNqKFIGums5Ju7jCaXzH6LQorVG9My_6lTydEA7oYZkAxtyHeh3h4stvb_5CSgeH_lVg7esdGGY7sYv8pjs39krAQGbx8z2tagQs"
                name="Royer R-121"
                desc="Ruban de référence. Idéal pour capturer la chaleur des instruments acoustiques."
                tags={['Ruban', 'Figure-8']}
              />
            </div>
          </div>
        </section>

        {/* ══════════════════ ATMOSPHÈRE & ESPACES ══════════════════ */}
        <section ref={spacesRef} className="py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Atmosphère &amp; Espaces
              </h2>
              <p className="text-on-surface-variant text-lg max-w-2xl">
                Chaque pièce a été traitée acoustiquement pour offrir une réponse fréquentielle parfaite, tout en préservant une vibration créative unique.
              </p>
            </div>

            {/* Gallery grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6" style={{ gridTemplateRows: 'repeat(2, 380px)' }}>
              {/* Control Room — spans 2 cols × 2 rows */}
              <SpaceCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCao8_JWImwWfEkcEwEevT5YWeCsRR84EGxlD1qSoWcKXQtFGbOyefJh7RImqiwYkG06uS0paahXOuBtIxO1WmTMnSggx7YgQ7u7nekSa4HWr4_wH4Ld-QMyeSS35_7pZvKnwosa6sDJm6Ekt9zzF9142NglUM6r_HnJ3b5yXBSWlmcwoi0I1du1h17XDL7Mo-hMgs1ZIKfjLNvbhvsvW03PpXSOC0iU2yQxXM3sVX2pOFRDrTBFTWL3UVCwF-IjJtBnkZWM4w50R8"
                title="La Régie A"
                subtitle="Précision monitoring & confort de production"
                className="md:col-span-2 md:row-span-2"
              />
              {/* Vocal Booth */}
              <SpaceCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiE1_Z-hgOaq_uEXZgLa3M6muhyNKSYDaOdGz7HsUt-YDdti-c5anAbMG5P0grAhr5Z8MrnjMhQUbKkJ588AuyJqJ2nVoxUZT725WnzFkklBm5lr4I8tk4f2WmikDLzSIT3edMzYpeKrA-41LMGcGdcdWK18zahgZFa3mYeCjLcknBM1wRdcTJkVzbIlXls4JG_kCPs_--VYvkfL7ANpnz_sToiCWN5nZGVCqSFOsrXM9U4ltCInpOVeA5Tl1jX3ezRLcicdF_obg"
                title="Cabine Voix"
                subtitle="Isolation totale & acoustique mate"
                className="md:col-span-2"
              />
              {/* Live Room */}
              <SpaceCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw0yKay1m_jFIu8oiPFY4PTMnoVdxrM221tQdLcrX40LyKNQ-Gl2_viaMEEFsnaIORb1SzodBv3wj2nlUA15HB__LhMvxPnrbmN6U_5D0PLSZYx0aE1HsY_PImrY9Zaw1iFJYroOjDriL-UzC7pnJ6NyzRIAHHT4mb3I4HsgwKnyVxG5fMqpLEalgW-YPG8B-1VNekU5Rn7rGBSkDRWCdGWGBq9ks8j068wPnBZ51KlqKHrIna6fRQuTZrB1AmrpWUvULsGHpf3V8"
                title="Grand Plateau"
                subtitle="Idéal pour les ensembles"
                className="md:col-span-1"
              />
              {/* Lounge */}
              <SpaceCard
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkZl5BMXwASNYSswV1mukCfmVtLqANJxxGoLllb6ibl0_BpKpp4Hs7_BHmnS931vhsWyu8-egBDBS_fDFQjQeZDw1ZWyQ95sha627eiq8kxOk0nNyzpU3iIf2L37Rz94qUDfA_T6_QXFzX3asltNGA5qt1J8XewxZpXZJHVyrQgJyAFEXFYPsCdm1dzJT8hgO9LumfCe-AimxUHBoO4_zFyuKMgUgU-VCzKUvGVG9g04UFQ2Hnu3YjC-4niS1FIWi7x7QjlhNOLKY"
                title="Lounge"
                subtitle="Détente & brainstorming"
                className="md:col-span-1"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════ SAVOIR-FAIRE ══════════════════ */}
        <section className="py-24 px-8 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
            {/* Left – text */}
            <div className="w-full md:w-1/2">
              <span className="inline-block text-secondary font-bold tracking-[0.2em] mb-4 text-sm uppercase">
                Savoir-faire
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
                L'accompagnement <br />par des passionnés.
              </h2>

              <div className="space-y-8">
                {[
                  {
                    icon: 'equalizer',
                    title: 'Ingénierie de pointe',
                    text: `Nos ingénieurs du son maîtrisent l'équilibre délicat entre technique rigoureuse et intuition artistique.`,
                  },
                  {
                    icon: 'groups',
                    title: 'Collaboration créative',
                    text: `Nous ne nous contentons pas d'enregistrer. Nous vous aidons à extraire le meilleur de votre performance.`,
                  },
                  {
                    icon: 'verified',
                    title: 'Qualité Master',
                    text: 'Un rendu final prêt pour la distribution mondiale sur toutes les plateformes de streaming.',
                  },
                ].map(({ icon, title, text }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-primary/20 rounded-xl flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">{icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{title}</h4>
                      <p className="text-on-surface-variant">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – photo mosaic */}
            <div className="w-full md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  alt="Ingénieur du son ajustant les réglages sur une grande console de mixage"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhm0y95-7aU2VPoSYqJMdpJ6Td13-qZ5OVmtbsiSQEtn_ZApXasIg6D_3Xygf6rcA3ISlM1i8VpVlmrBh3-5amhRQ-6hiZGQXjkRrErfLo2jmF3-raUzuW7W6xMfDJDEDgnwbvPMuRP-yH6I9M_vUTb59d1_kGS8sCr4v3ECgZg7AyehpE1Ixy_fxZjSI2S78GWKZkwRpt3VHiSFRnjMJV4hvi2RtH4_LsDz9YRShFm8JM1oCM1GqLqfhzXQ15yK_5aISZngyAKlg"
                  className="rounded-2xl w-full h-64 object-cover mt-8"
                />
                <img
                  alt="Mains réglant un équipement audio professionnel"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxOO7fOAGj8zM9jKS2Cg4Gfxtj1wRhgI0DfruX2XBvxC_m7IaCiYL4neTJbD85BxQ4HdyX0zQhkX_aOA7SxVlPixoE30PcNF6wlm8Spc1EmosWYkIjj7Fy5DbGft0r4MQ32T2hpUap4aGXirKKn-kA-IyJxUHHXydKdNMNVg1UE6NV4ZGkyhr9IJern8u8iw2B1G1St_p0EZANnvevmlciMHVToVlPfFwonWmD_mfP5TCN1RprlP87NaQ2MP274oBHHsxcWuzZTGM"
                  className="rounded-2xl w-full h-64 object-cover"
                />
                <img
                  alt="Musicien jouant d'un instrument dans un studio d'enregistrement"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdkfqle3FOhcjXnjDmugyZkbddTKUcsTRiFOGseQ7SW7pUnV9OReGbmYt0u0uZ8-S84JZikUTpD_DEbs90T97QnfgvXAWgPa2_QXvY6Hp-N1Wp5rjk4G0LGJ3Unm_0u-Jf8Nyv6djHdRSIlgyjAOiCR-d2exvDv0Qn6b2Wbt8_D22NgBeSH2OQYu2rY5O58z-1e9-2UV7kSfdz9Pouq1gTAFpWm_qXlrw-ErbTt5pTa6qQRjQgZREoqLSMZU7oP118hWt_tFpvGqw"
                  className="rounded-2xl w-full h-64 object-cover"
                />
                <img
                  alt="Équipe créative collaborant devant des moniteurs audio dans un studio"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLIyithkGBpZ-kcgdGW6MeHLfBPtjGzUPT6LhF6erdOK4iLjPWAAuz0ya3anR-7bK-qR6N-R_MqIIqzxuSMZMKGar_IKj2myqSvHCh1sT8gACWk23jVKrmNfS5iXvyaInVCcGBfgmk2pGzawn7Cf7SopDyujCxT-VOCcNtBCkAc48-8Hdg-8Dn0nnxlWb3lIRCRCxjg-nrNcgPCsieOpIWGbDAtpqi23WI1hS2Uaa-sSGX8kysfJoK6NaHJ4QdcdzY-YTQNhk62vU"
                  className="rounded-2xl w-full h-64 object-cover -mt-8"
                />
              </div>
              {/* Glow orbs */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </section>

        {/* ══════════════════ CTA RÉSERVATION ══════════════════ */}
        <section className="py-24 px-8">
          <div
            className="max-w-5xl mx-auto bg-primary-container rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden"
            style={{ boxShadow: '0 0 64px 0 rgba(58, 113, 85, 0.2)' }}
          >
            {/* Subtle background image */}
            <div className="absolute inset-0 opacity-10">
              <img
                alt=""
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCsV-L6dJnPRMmbSKFjofFGOTlsGZWPVZNDh-_SeiE8rdI_124fGRLBbHXJ87nqOMRoWiDcU3bsMhONB8kSuvQqAs9uWDrL1ygmnYKPvyJ5GX0bGNT2poIf3Cie9C_8YrBOzCFKf4U64_2FyjjZ9NkqwDlcV0eFfcBKdnNvcqxEh0t_hX16hCIy0wh_q4Kmrjtc0efwpXc0LuLhoXW24FZQKhxXYMBwvsAghmS9mjzFObl3HIoZK60gnqG3vShi25hbqL8OVEJq9Y"
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-on-primary-container" style={{ fontFamily: 'Space Grotesk' }}>
                Prêt à donner vie <br />à votre son&nbsp;?
              </h2>
              <p className="text-xl text-on-primary-container/80 mb-12 max-w-2xl mx-auto">
                Que vous soyez un artiste solo ou un groupe complet, notre équipe est prête à vous accueillir pour votre prochain chef-d'œuvre.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={openBooking}
                  className="bg-secondary text-on-secondary px-10 py-5 rounded-full font-bold text-xl hover:brightness-110 active:scale-95 transition-all"
                  style={{ boxShadow: '0 0 32px 0 rgba(216, 90, 27, 0.25)' }}
                >
                  Réserver une session
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all">
                  Planifier une visite
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
