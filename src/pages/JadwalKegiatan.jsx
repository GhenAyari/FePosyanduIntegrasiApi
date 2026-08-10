import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/jadwal.css';

const LocationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 16 20" fill="none">
    <path
      d="M8 10C8.55 10 9.0208 9.8042 9.4125 9.4125 9.8042 9.0208 10 8.55 10 8C10 7.45 9.8042 6.9792 9.4125 6.5875 9.0208 6.1958 8.55 6 8 6C7.45 6 6.9792 6.1958 6.5875 6.5875 6.1958 6.9792 6 7.45 6 8C6 8.55 6.1958 9.0208 6.5875 9.4125 6.9792 9.8042 7.45 10 8 10ZM8 17.35C10.0333 15.4833 11.5417 13.7875 12.525 12.2625 13.5083 10.7375 14 9.3833 14 8.2C14 6.3833 13.4208 4.8958 12.2625 3.7375 11.1042 2.5792 9.6833 2 8 2C6.3167 2 4.8958 2.5792 3.7375 3.7375 2.5792 4.8958 2 6.3833 2 8.2C2 9.3833 2.4917 10.7375 3.475 12.2625 4.4583 13.7875 5.9667 15.4833 8 17.35ZM8 20C5.3167 17.7167 3.3125 15.5958 1.9875 13.6375 0.6625 11.6792 0 9.8667 0 8.2C0 5.7 0.8042 3.7083 2.4125 2.225 4.0208 0.7417 5.8833 0 8 0C10.1167 0 11.9792 0.7417 13.5875 2.225 15.1958 3.7083 16 5.7 16 8.2C16 9.8667 15.3375 11.6792 14.0125 13.6375 12.6875 15.5958 10.6833 17.7167 8 20Z"
      fill="#235078"
    />
  </svg>
);

export default function JadwalKegiatan({ activePage, onNavigate, onDarurat }) {
  const [posyanduList, setPosyanduList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/profil-posyandu')
      .then(res => {
        setPosyanduList(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="jadwal-page">
      <Header activePage={activePage} onNavigate={onNavigate} onDarurat={onDarurat} />

      <main className="jadwal-main">
        <div className="jadwal-header-block">
          <h1 className="jadwal-title">Jadwal Kegiatan Posyandu</h1>
          <p className="jadwal-subtitle">
            Informasi lokasi dan jadwal rutin pelayanan kesehatan masyarakat di Loa Duri Ulu.
          </p>
        </div>

        <div className="jadwal-cards-grid">
          {loading ? (
            <div style={{ textAlign: 'center', width: '100%', padding: '40px', gridColumn: '1 / -1' }}>
              <h3>Memuat jadwal dari server...</h3>
            </div>
          ) : (
            posyanduList.map((loc) => (
              <div className="jadwal-location-card" key={loc.id}>
                <div className="jadwal-card-header">
                  <div className="jadwal-icon-box">
                    <LocationIcon />
                  </div>
                  <div className="jadwal-card-heading">
                    <h3 className="jadwal-loc-name">Posyandu {loc.nama}</h3>
                    <span className="jadwal-wilayah-badge">Wilayah Loa Duri Ulu</span>
                  </div>
                </div>

                <div className="jadwal-card-info-block">
                  <span className="jadwal-info-label">Alamat Lengkap</span>
                  <p className="jadwal-info-value">{loc.alamat || 'Belum diatur'}</p>
                </div>

                <div className="jadwal-card-info-block bordered">
                  <span className="jadwal-info-label">Jadwal Kegiatan Rutin</span>
                  <p className="jadwal-info-value">
                    {/* Mengambil langsung dari relasi jadwal */}
                    {loc.jadwal?.keterangan_waktu ? `${loc.jadwal.keterangan_waktu} setiap bulan` : 'Belum diatur'}
                  </p>
                </div>
              </div>
            ))
          )}

          {/* Persiapan Pemeriksaan Note Card */}
          <div className="jadwal-note-card">
            <div className="jadwal-note-icon-box">
              <svg width="24" height="24" viewBox="0 0 18 16" fill="none">
                <path
                  d="M2 16C1.45 16 0.9792 15.8042 0.5875 15.4125 0.1958 15.0208 0 14.55 0 14V2C0 1.45 0.1958 0.9792 0.5875 0.5875 0.9792 0.1958 1.45 0 2 0H10C10.55 0 11.0208 0.1958 11.4125 0.5875 11.8042 0.9792 12 1.45 12 2V6H16C16.55 6 17.0208 6.1958 17.4125 6.5875 17.8042 6.9792 18 7.45 18 8V14C18 14.55 17.8042 15.0208 17.4125 15.4125 17.0208 15.8042 16.55 16 16 16H2Z"
                  fill="#db2777"
                />
              </svg>
            </div>
            <h3 className="jadwal-note-title">Persiapan Pemeriksaan</h3>
            <p className="jadwal-note-desc">
              Mohon ingat untuk membawa buku kesehatan anak (KMS) atau kartu ibu hamil saat
              mengunjungi lokasi Posyandu sesuai jadwal yang tertera.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}