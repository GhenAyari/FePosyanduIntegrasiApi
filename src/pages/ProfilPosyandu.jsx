import React, { useState, useEffect } from 'react'; // 1. Tambahkan useState dan useEffect
import axios from 'axios'; // 2. Tambahkan import axios
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProfilHeroBanner from '../components/profil/ProfilHeroBanner';
import ChairmanCard from '../components/profil/ChairmanCard';
import BasicContactCard from '../components/profil/BasicContactCard';
import CoreTasksCard from '../components/profil/CoreTasksCard';
import StrategicFunctionsCard from '../components/profil/StrategicFunctionsCard';
import StrukturKepengurusanSection from '../components/profil/StrukturKepengurusanSection';
import PosyanduLocationsSection from '../components/profil/PosyanduLocationsSection';

export default function ProfilPosyandu() {
  // Siapkan state penampung data dan status loading
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect akan otomatis berjalan saat halaman dibuka
  useEffect(() => {
    // Tembak URL API Laravel persis seperti yang kamu lakukan di Bruno
    axios.get('http://127.0.0.1:8000/api/profil-posyandu')
      .then(response => {
        // Masukkan isi "data" dari JSON ke dalam state profil
        setProfil(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Gagal mengambil data API:", error);
        setLoading(false);
      });
  }, []); // Array kosong artinya hanya dieksekusi sekali saat load halaman

  // Tampilan saat data masih ditarik dari backend
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Memuat data dari server... ⏳</h2>
      </div>
    );
  }

  // Tampilan jika API gagal atau data kosong
  if (!profil) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
        <h2>Gagal memuat profil Posyandu. Pastikan server aktif!</h2>
      </div>
    );
  }

  return (
    <div className="profil-wrapper">
      {/* 3. PERBAIKAN: Berikan string langsung "profil" dan hilangkan variabel yang belum ada */}
      <Header activePage="profil" />

      <main className="profil-container">
        {/* Top Hero Section */}
        <section className="profil-section">
          <ProfilHeroBanner data={profil} />
        </section>

        {/* Chairman & Contact Info Grid */}
        <section className="profil-section grid-2-col">
          <ChairmanCard />
          {/* Nanti data API "profil" bisa kamu masukkan ke dalam komponen ini */}
          <BasicContactCard data={profil} />
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
          <PosyanduLocationsSection data={profil} />
        </section>
      </main>

      <Footer />
    </div>
  );
}