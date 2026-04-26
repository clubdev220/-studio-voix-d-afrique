import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import { useBooking } from '../contexts/BookingContext.jsx';

/* ═══════════════════════ ABOUT PAGE ═══════════════════════ */
export default function AboutPage() {
  const { openBooking } = useBooking();

  const team = [
    {
      name: 'Abdoul Hamid COMPAORÉ',
      role: 'Co-fondateur & Technicien',
      specialty: 'Qualité Sonore & Post-Production',
      bio: "Expert en ingénierie sonore, Abdoul Hamid garantit l'excellence technique de chaque production. Responsable de la qualité acoustique, du mixage et du mastering, il façonne le son qui donne vie aux histoires.",
      photo: '/assets/team/abdoul.jpg',
      icon: 'settings',
      color: 'primary',
    },
    {
      name: 'Aziz LANKOANDÉ',
      role: 'Co-fondateur & Réalisateur',
      specialty: 'Direction Artistique & Projets Audio',
      bio: "Réalisateur visionnaire, Aziz supervise la direction artistique de chaque projet. Sa maîtrise du langage cinématographique et sa sensibilité musicale font de lui l'âme créative du studio.",
      photo: '/assets/team/aziz.jpg',
      icon: 'mic',
      color: 'secondary',
      contact: '67 56 56 91',
    },
    {
      name: 'David Modeste OUANGRAWA',
      role: 'Co-fondateur & Administrateur',
      specialty: 'Relation Client & Développement Commercial',
      bio: "Pilier commercial du studio, David développe les partenariats stratégiques et accompagne chaque client de la première prise de contact jusqu'à la livraison finale du projet.",
      photo: '/assets/team/david.jpg',
      icon: 'handshake',
      color: 'tertiary',
    },
  ];

  const values = [
    { icon: 'star', title: 'Excellence Sonore', desc: "Chaque production respecte les standards internationaux tout en portant l'authenticité africaine." },
    { icon: 'language', title: 'Plurilinguisme', desc: "Nous valorisons le français, le mooré, le dioula et le fulfuldé — les langues qui font notre identité." },
    { icon: 'diversity_3', title: 'Impact Local', desc: 'Former les talents burkinabè et créer des emplois durables dans le secteur audiovisuel.' },
    { icon: 'bolt', title: 'Innovation Continue', desc: "Intégrer les dernières technologies tout en restant enracinés dans notre héritage culturel." },
  ];

  const stats = [
    { value: '4+', label: 'Services professionnels', icon: 'category' },
    { value: '3', label: 'Langues locales maîtrisées', icon: 'translate' },
    { value: '12M', label: 'FCFA investis', icon: 'payments' },
    { value: '#1', label: 'Studio doublage au Burkina', icon: 'workspace_premium' },
  ];

  const timeline = [
    {
      period: "L'Origine",
      title: 'Une vision audacieuse',
      desc: "Constat d'un vide dans l'industrie audiovisuelle burkinabè : malgré le prestige du FESPACO, aucun studio de doublage professionnel n'existait au Burkina Faso.",
      icon: 'lightbulb',
    },
    {
      period: 'La Fondation',
      title: 'Premier studio de doublage',
      desc: "Création de Studio Voix d'Afrique par trois associés passionnés, avec un investissement initial de 12 000 000 FCFA en fonds propres pour acquérir un équipement de niveau international.",
      icon: 'foundation',
    },
    {
      period: "Aujourd'hui",
      title: 'Un studio, mille voix',
      desc: 'Doublage, voix-off, podcasts, post-production — SVA répond aux besoins des créateurs africains avec des services compétitifs face aux studios internationaux.',
      icon: 'rocket_launch',
    },
  ];

  const colorClass = {
    primary: { icon: 'bg-primary/10 text-primary', border: 'border-primary/20 hover:border-primary/40' },
    secondary: { icon: 'bg-secondary/10 text-secondary', border: 'border-secondary/20 hover:border-secondary/40' },
    tertiary: { icon: 'bg-tertiary/10 text-tertiary', border: 'border-tertiary/20 hover:border-tertiary/40' },
  };

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />

      <main className="pt-24">

        {/* ══════════ HERO ══════════ */}
        <section className="relative min-h-[70vh] flex items-center px-8 md:px-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent z-10" />
            <img
              src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80"
              alt="Console de mixage Studio Voix d'Afrique"
              className="w-full h-full object-cover opacity-30"
              style={{ filter: 'grayscale(1) brightness(0.55)' }}
            />
          </div>
          <div className="relative z-20 max-w-4xl">
            <span className="inline-flex items-center gap-2 py-1 px-4 mb-8 rounded-full border border-primary/20 text-primary text-sm font-semibold tracking-wider uppercase">
              <span className="material-symbols-outlined text-base">info</span>
              À Propos
            </span>
            <h1
              className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-on-surface to-on-surface-variant"
              style={{ fontFamily: 'Space Grotesk' }}
            >
              Donner un Souffle<br />
              à l'Identité Sonore<br />
              <span className="text-primary">Africaine</span>
            </h1>
            <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              Premier studio de doublage et de post-production audio au Burkina Faso — nous capturons l'essence des talents africains pour les transformer en chefs-d'œuvre sonores, alliant héritage culturel et précision technique.
            </p>
          </div>
        </section>

        {/* ══════════ MISSION & VISION ══════════ */}
        <section className="px-8 md:px-20 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low rounded-3xl p-10 border border-outline-variant/10 relative overflow-hidden group hover:border-primary/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-2xl">flag</span>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Notre Mission</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Fournir des services de production audio de haute qualité aux créateurs de contenu, entreprises, agences publicitaires et médias africains — tout en valorisant les langues locales et la culture burkinabè face aux studios internationaux coûteux.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-3xl p-10 border border-outline-variant/10 relative overflow-hidden group hover:border-secondary/20 transition-all duration-300">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/10 transition-colors" />
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-secondary text-2xl">visibility</span>
              </div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>Notre Vision</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Devenir le leader du doublage et de la post-production audio en Afrique francophone — un carrefour incontournable de la création audio panafricaine où chaque voix, chaque histoire, trouve sa résonance parfaite sur les plateformes mondiales.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════ STATS ══════════ */}
        <section className="px-8 md:px-20 py-16 bg-surface-container-low/50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon }) => (
              <div key={label} className="flex flex-col items-center text-center p-6 rounded-2xl bg-background/40">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary">{icon}</span>
                </div>
                <div className="text-4xl font-black text-on-surface mb-1" style={{ fontFamily: 'Space Grotesk' }}>{value}</div>
                <div className="text-sm text-on-surface-variant text-center">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ NOTRE ODYSSÉE ══════════ */}
        <section className="px-8 md:px-20 py-24">
          <div className="mb-16">
            <span className="inline-block py-1 px-4 mb-4 rounded-full border border-outline-variant/30 text-on-surface-variant text-xs font-semibold tracking-widest uppercase">
              Notre Parcours
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk' }}>
              L'Odyssée Burkinabè
            </h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="hidden md:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-outline-variant/20" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <div key={item.period} className={`flex flex-col md:flex-row items-start gap-8 md:gap-16 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 flex flex-col items-start">
                    <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{item.period}</span>
                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Space Grotesk' }}>{item.title}</h3>
                    <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                  </div>

                  {/* Center icon */}
                  <div className="relative z-10 flex-shrink-0 hidden md:flex w-14 h-14 rounded-full bg-surface-container-high border-2 border-primary/30 items-center justify-center">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  </div>

                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ L'ÉQUIPE ══════════ */}
        <section className="px-8 md:px-20 py-24 bg-surface-container-lowest/50">
          <div className="mb-16">
            <span className="inline-block py-1 px-4 mb-4 rounded-full border border-outline-variant/30 text-on-surface-variant text-xs font-semibold tracking-widest uppercase">
              Les Fondateurs
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk' }}>
              Les Artisans du Son
            </h2>
            <p className="mt-4 text-on-surface-variant max-w-xl">
              Trois passionnés de l'audio et du cinéma africain, réunis par une vision commune : élever la qualité de la production sonore au Burkina Faso et en Afrique francophone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => {
              const c = colorClass[member.color];
              return (
                <div key={member.name} className={`group relative rounded-3xl overflow-hidden border border-outline-variant/10 ${c.border} transition-all duration-300 bg-surface-container-low`}>
                  {/* Photo */}
                  <div className="relative h-80 overflow-hidden bg-surface-container">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback placeholder */}
                    <div className={`absolute inset-0 hidden items-center justify-center ${c.icon}`}>
                      <span className="material-symbols-outlined text-7xl opacity-40">{member.icon}</span>
                    </div>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${c.icon}`}>
                      <span className="material-symbols-outlined text-sm">{member.icon}</span>
                      {member.role}
                    </div>
                    <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Space Grotesk' }}>{member.name}</h3>
                    <p className="text-sm text-on-surface-variant mb-4">{member.specialty}</p>
                    <p className="text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/10 pt-4">
                      {member.bio}
                    </p>
                    {member.contact && (
                      <a href={`tel:${member.contact}`} className="mt-4 inline-flex items-center gap-2 text-sm text-primary hover:underline">
                        <span className="material-symbols-outlined text-base">phone</span>
                        {member.contact}
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════ NOS VALEURS ══════════ */}
        <section className="px-8 md:px-20 py-24">
          <div className="mb-16">
            <span className="inline-block py-1 px-4 mb-4 rounded-full border border-outline-variant/30 text-on-surface-variant text-xs font-semibold tracking-widest uppercase">
              Ce qui nous guide
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk' }}>
              Nos Valeurs
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10 hover:border-primary/20 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <span className="material-symbols-outlined text-primary">{icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Space Grotesk' }}>{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ MARCHÉ & OPPORTUNITÉ ══════════ */}
        <section className="px-8 md:px-20 py-24 bg-surface-container-lowest/50">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block py-1 px-4 mb-4 rounded-full border border-outline-variant/30 text-on-surface-variant text-xs font-semibold tracking-widest uppercase">
              Contexte & Opportunité
            </span>
            <h2 className="text-5xl font-bold tracking-tighter mb-6" style={{ fontFamily: 'Space Grotesk' }}>
              Un Marché en Pleine Expansion
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              Le cinéma burkinabè, reconnu mondialement grâce au FESPACO, manquait d'infrastructure professionnelle pour la maîtrise vocale. SVA comble ce vide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: 'play_circle', title: 'Streaming en hausse', desc: 'Netflix, Spotify, YouTube et Canal+ Afrique génèrent une demande croissante de contenus doublés en langues africaines.', color: 'text-primary' },
              { icon: 'school', title: 'Formation en ligne', desc: "L'essor des plateformes e-learning nécessite des narrations professionnelles en français et en langues locales.", color: 'text-secondary' },
              { icon: 'public', title: 'Marché régional', desc: "Afrique de l'Ouest francophone : 150+ millions de locuteurs et une industrie audiovisuelle en forte croissance.", color: 'text-tertiary' },
            ].map(({ icon, title, desc, color }) => (
              <div key={title} className="p-8 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <span className={`material-symbols-outlined text-4xl ${color} mb-4 block`}>{icon}</span>
                <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'Space Grotesk' }}>{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ CTA ══════════ */}
        <section className="px-8 md:px-20 py-24 mb-16">
          <div className="bg-surface-container-low rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
                Prêt à faire vibrer votre projet ?
              </h2>
              <p className="text-xl text-on-surface-variant mb-12 leading-relaxed">
                L'excellence sonore au cœur du Burkina Faso. Créons ensemble l'audio du futur — un projet qui porte votre voix, votre histoire, votre identité.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button
                  onClick={openBooking}
                  className="bg-primary text-on-primary font-black px-10 py-5 rounded-full hover:brightness-110 transition-all uppercase tracking-tighter"
                  style={{ boxShadow: '0 0 32px 0 rgba(58, 113, 85, 0.2)' }}
                >
                  Démarrer une collaboration
                </button>
                <Link
                  to="/services"
                  className="border border-outline-variant text-on-surface font-bold px-10 py-5 rounded-full hover:bg-surface-variant transition-all"
                >
                  Voir nos services
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
