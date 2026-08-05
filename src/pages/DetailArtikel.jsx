import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/detail-artikel.css';

import closingImg from '../assets/images/detail-artikel/hero-ibu-bayi.jpeg';
import relatedImg1 from '../assets/images/detail-artikel/sayuran-organik.jpeg';
import relatedImg2 from '../assets/images/detail-artikel/edukasi-petugas.jpeg';

export default function DetailArtikel({ activePage, onNavigate, onDarurat }) {
  return (
    <div className="detail-artikel-page">
      <Header activePage={activePage} onNavigate={onNavigate} onDarurat={onDarurat} />

      <main className="detail-artikel-main">
        <button type="button" className="back-link" onClick={() => onNavigate && onNavigate('artikel')}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3.825 9H16V7H3.825L9.425 1.4 8 0 0 8 8 16 9.425 14.6 3.825 9V9" fill="currentColor" />
          </svg>
          Kembali ke Artikel
        </button>

        <div className="detail-artikel-layout">
          {/* Main Column */}
          <article className="detail-artikel-body">
            <h1 className="detail-artikel-title">
              Nutrisi Optimal untuk Bayi: Panduan Pertumbuhan Tahun Pertama
            </h1>

            <div className="detail-artikel-meta">
              <div className="meta-author-avatar">SA</div>
              <div className="meta-author-info">
                <span className="meta-author-name">Dr. Siti Aminah</span>
                <span className="meta-author-role">Ahli Nutrisi Anak</span>
              </div>
              <span className="meta-dot">•</span>
              <span className="meta-date">24 Oktober 2026</span>
              <span className="meta-dot">•</span>
              <span className="meta-readtime">8 menit baca</span>
            </div>

            <p className="detail-artikel-intro">
              Memastikan anak Anda menerima nutrisi yang tepat selama dua belas bulan pertama
              adalah fondasi bagi kesehatan seumur hidup. Di Posyandu Loa Duri Ulu, kami
              memprioritaskan edukasi ibu tentang menyusui dan nutrisi tambahan.
            </p>

            <h2 className="detail-artikel-heading">Pentingnya ASI Eksklusif</h2>
            <p className="detail-artikel-paragraph">
              Selama enam bulan pertama, air susu ibu menyediakan keseimbangan ideal nutrisi dan
              antibodi. ASI lebih dari sekadar makanan; ini adalah &ldquo;vaksinasi&rdquo; pertama
              bayi terhadap penyakit umum di masyarakat.
            </p>

            <blockquote className="detail-artikel-quote">
              &ldquo;Ibu yang sehat membesarkan komunitas yang sehat. Nutrisi bukan hanya soal
              berat badan—ini tentang perkembangan otak dan potensi masa depan.&rdquo;
            </blockquote>

            <h2 className="detail-artikel-heading">Transisi ke Makanan Padat (MPASI)</h2>
            <p className="detail-artikel-paragraph">
              Setelah enam bulan, bayi memerlukan makanan pendamping ASI (MPASI). Kami
              merekomendasikan memulai dengan sayuran lokal yang dihaluskan dan bubur kaya zat
              besi. Sangat penting untuk memperkenalkan satu jenis makanan baru pada satu waktu
              untuk memantau kemungkinan alergi.
            </p>

            <ul className="detail-artikel-list">
              <li>
                <strong>6-8 Bulan:</strong> Dua sampai tiga kali makan sehari berupa bubur kental
                atau makanan yang dilumatkan dengan baik.
              </li>
              <li>
                <strong>9-11 Bulan:</strong> Tiga sampai empat kali makan sehari berupa makanan
                yang dicincang halus atau dilumatkan.
              </li>
              <li>
                <strong>12+ Bulan:</strong> Transisi ke makanan bergizi yang biasa dikonsumsi
                keluarga.
              </li>
            </ul>

            <div className="detail-artikel-closing-img">
              <img src={closingImg} alt="Ibu dan bayi di klinik" />
              <span className="closing-img-tag">Nutrisi &amp; Pertumbuhan</span>
            </div>
          </article>

          {/* Sidebar Column */}
          <aside className="detail-artikel-sidebar">
            <div className="related-articles-card">
              <h3 className="sidebar-title">ARTIKEL TERKAIT</h3>

              <a href="#artikel" className="related-article-item">
                <div className="related-article-img">
                  <img src={relatedImg1} alt="Sayuran segar organik" />
                </div>
                <div className="related-article-info">
                  <p className="related-article-title">
                    Pentingnya Jadwal Imunisasi Anak untuk Pencegahan Penyakit
                  </p>
                  <span className="related-article-readtime">5 menit baca</span>
                </div>
              </a>

              <a href="#artikel" className="related-article-item">
                <div className="related-article-img">
                  <img src={relatedImg2} alt="Petugas kesehatan memberikan edukasi" />
                </div>
                <div className="related-article-info">
                  <p className="related-article-title">
                    Kebiasaan Tidur yang Aman untuk Bayi Baru Lahir: Panduan Orang Tua
                  </p>
                  <span className="related-article-readtime">4 menit baca</span>
                </div>
              </a>
            </div>

            <div className="progress-cta-card">
              <h3 className="progress-cta-title">Pantau Progres</h3>
              <p className="progress-cta-desc">
                Gunakan kalkulator pertumbuhan kami untuk melacak status nutrisi anak Anda secara
                rutin.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => onNavigate && onNavigate('kalkulator')}
              >
                Buka Kalkulator
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
