import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProfilHeroBanner from '../components/profil/ProfilHeroBanner';
import ChairmanCard from '../components/profil/ChairmanCard';
import BasicContactCard from '../components/profil/BasicContactCard';
import CoreTasksCard from '../components/profil/CoreTasksCard';
import StrategicFunctionsCard from '../components/profil/StrategicFunctionsCard';
import StrukturKepengurusanSection from '../components/profil/StrukturKepengurusanSection';
import PosyanduLocationsSection from '../components/profil/PosyanduLocationsSection';

export default function ProfilPosyandu({ activePage = 'profil', onNavigate, onDarurat }) {
  return (
    <div className="profil-wrapper">
      <Header activePage={activePage} onNavigate={onNavigate} onDarurat={onDarurat} />

      <main className="profil-container">
        {/* Top Hero Section */}
        <section className="profil-section">
          <ProfilHeroBanner />
        </section>

        {/* Chairman & Contact Info Grid */}
        <section className="profil-section grid-2-col">
          <ChairmanCard />
          <BasicContactCard />
        </section>

        {/* Core Tasks & Strategic Functions Grid */}
        <section className="profil-section grid-2-col">
          <CoreTasksCard />
          <StrategicFunctionsCard />
        </section>

        {/* Struktur Kepengurusan */}
        <section className="profil-section">
          <StrukturKepengurusanSection />
        </section>

        {/* Posyandu Locations Grid */}
        <section className="profil-section">
          <PosyanduLocationsSection />
        </section>
      </main>

      <Footer />

    </div>
  );
}
