import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/artikel.css';

// Image imports
import heroBgImg from '../assets/images/common/hero-artikel.png';
import featuredImg from '../assets/images/artikel/featured-nutrisi.jpeg';
import authorImg from '../assets/images/artikel/author-sarah.jpeg';
import vaksinasiImg from '../assets/images/artikel/card-vaksinasi.jpeg';
import mentalImg from '../assets/images/artikel/card-mental.jpeg';
import mpasiImg from '../assets/images/artikel/card-mpasi.jpeg';
import pertumbuhanImg from '../assets/images/artikel/hero-family.jpeg';

const topikList = ['Semua Topik', 'Nutrisi', 'Vaksinasi', 'Kesehatan Mental', 'Kehamilan'];

export default function ArtikelKesehatan({ activePage, onNavigate, onDarurat }) {
  const [activeTopik, setActiveTopik] = useState('Semua Topik');

  return (
    <div className="artikel-page">
      <Header activePage={activePage} onNavigate={onNavigate} onDarurat={onDarurat} />

      <main className="artikel-main">
        {/* Hero Banner */}
        <section className="artikel-hero">
          <div className="artikel-hero-bg">
            <img src={heroBgImg} alt="Health background" />
          </div>
          <div className="artikel-hero-content">
            <h1 className="artikel-hero-title">Pusat Pengetahuan Kesehatan Masyarakat</h1>
            <p className="artikel-hero-subtitle">
              Artikel yang ditinjau oleh ahli tentang kesehatan ibu, nutrisi anak, dan
              perkembangan awal yang disesuaikan untuk masyarakat Loa Duri Ulu.
            </p>
            <div className="artikel-hero-actions">
              <button className="btn-cari">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65 7.925 12.8833 7.2333 13 6.5 13 4.6833 13 3.1458 12.3708 1.8875 11.1125 0.6292 9.8542 0 8.3167 0 6.5 0 4.6833 0.6292 3.1458 1.8875 1.8875 3.1458 0.6292 4.6833 0 6.5 0 8.3167 0 9.8542 0.6292 11.1125 1.8875 12.3708 3.1458 13 4.6833 13 6.5 13 7.2333 12.8833 7.925 12.65 8.575 12.4167 9.225 12.1 9.8 11.7L18 16.6 16.6 18V18M6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875 10.5625 8.8125 11 7.75 11 6.5 11 5.25 10.5625 4.1875 9.6875 3.3125 8.8125 2.4375 7.75 2 6.5 2 5.25 2 4.1875 2.4375 3.3125 3.3125 2.4375 4.1875 2 5.25 2 6.5 2 7.75 2.4375 8.8125 3.3125 9.6875 4.1875 10.5625 5.25 11 6.5 11V11"
                    fill="white"
                  />
                </svg>
                Cari di Perpustakaan
              </button>
              <button className="btn-kategori">Lihat Semua Kategori</button>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <div className="artikel-filter-bar">
          <div className="topik-chips">
            {topikList.map((topik) => (
              <button
                key={topik}
                className={`chip ${activeTopik === topik ? 'active' : 'inactive'}`}
                onClick={() => setActiveTopik(topik)}
              >
                {topik}
              </button>
            ))}
          </div>
          <button className="sort-btn">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path d="M0 12V10H6V12H0V12M0 7V5H12V7H0V7M0 2V0H18V2H0V2" fill="#42474e" />
            </svg>
            Terbaru
          </button>
        </div>

        {/* Articles Grid */}
        <div className="artikel-grid">
          {/* Featured Article - 8 cols, row 1 */}
          <div className="featured-article-wrapper">
            <article className="featured-article-card">
              <div className="featured-article-image">
                <img src={featuredImg} alt="Nutrisi Optimal 1000 Hari Pertama" />
              </div>
              <div className="featured-article-body">
                <div className="featured-article-meta">
                  <span className="artikel-category-badge">Nutrisi</span>
                  <div className="artikel-read-time">
                    <svg width="13" height="13" viewBox="0 0 13.3 13.3" fill="none">
                      <path
                        d="M8.8667 9.8L9.8 8.8667 7.3333 6.4V3.3333H6V6.9333L8.8667 9.8V9.8M6.6667 13.3333C5.7444 13.3333 4.8778 13.1583 4.0667 12.8083 3.2556 12.4583 2.55 11.9833 1.95 11.3833 1.35 10.7833 0.875 10.0778 0.525 9.2667 0.175 8.4556 0 7.5889 0 6.6667 0 5.7444 0.175 4.8778 0.525 4.0667 0.875 3.2556 1.35 2.55 1.95 1.95 2.55 1.35 3.2556 0.875 4.0667 0.525 4.8778 0.175 5.7444 0 6.6667 0 7.5889 0 8.4556 0.175 9.2667 0.525 10.0778 0.875 10.7833 1.35 11.3833 1.95 11.9833 2.55 12.4583 3.2556 12.8083 4.0667 13.1583 4.8778 13.3333 5.7444 13.3333 6.6667 13.3333Z"
                        fill="#42474e"
                      />
                    </svg>
                    Baca 6 mnt
                  </div>
                </div>

                <div className="featured-article-title-block">
                  <h2 className="featured-article-title">
                    Nutrisi Optimal untuk 1.000 Hari Pertama
                  </h2>
                </div>

                <div className="featured-article-excerpt-block">
                  <p className="featured-article-excerpt">
                    Temukan bagaimana fondasi untuk kesehatan dan perkembangan seumur hidup anak
                    dibangun selama jendela kritis dari kehamilan hingga ulang tahun kedua mereka.
                    Panduan komprehensif dari ahli gizi kami.
                  </p>
                </div>

                <div className="featured-article-footer">
                  <div className="author-info">
                    <img src={authorImg} alt="Dr. Sarah Wijaya" className="author-avatar" />
                    <span className="author-name">Dr. Sarah Wijaya</span>
                  </div>
                  <a
                    href="#detail-artikel"
                    className="baca-artikel-link"
                    onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('detail-artikel'); }}
                  >
                    Baca Artikel
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12.175 9H0V7H12.175L6.575 1.4 8 0 16 8 8 16 6.575 14.6 12.175 9V9"
                        fill="#37618b"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Vaksinasi Card - 4 cols, row 1 */}
          <div className="article-card-wrapper span-4">
            <article className="article-card">
              <div className="article-card-img">
                <img src={vaksinasiImg} alt="Jadwal Vaksinasi Bayi 2024" />
              </div>
              <div className="article-card-body">
                <p className="article-category-label">IMUNISASI</p>
                <h3 className="article-card-title">Jadwal Vaksinasi Bayi 2026</h3>
                <p className="article-card-excerpt">
                  Tetap perbarui jadwal vaksin yang direkomendasikan untuk melindungi buah hati…
                </p>
                <div className="article-card-footer">
                  <span className="article-date">12 Mei 2026</span>
                  <span className="bookmark-icon">
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
                      <path
                        d="M0 18V2C0 1.45 0.1958 0.9792 0.5875 0.5875 0.9792 0.1958 1.45 0 2 0H12C12.55 0 13.0208 0.1958 13.4125 0.5875 13.8042 0.9792 14 1.45 14 2V18L7 15 0 18V18M2 14.95L7 12.8 12 14.95V2H2V14.95Z"
                        fill="#37618b"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </article>
          </div>

          {/* Kesehatan Mental Card - 4 cols, row 2 */}
          <div className="article-card-wrapper span-4">
            <article className="article-card">
              <div className="article-card-img large">
                <img src={mentalImg} alt="Memahami Kesejahteraan Pascapersalinan" />
              </div>
              <div className="article-card-body">
                <p className="article-card-category-colored">Kesehatan Mental</p>
                <h3 className="article-card-title small">Memahami Kesejahteraan Pascapersalinan</h3>
                <p className="article-card-excerpt">
                  Panduan bagi ibu baru dan sistem pendukung mereka dalam menavigasi perjalanan…
                </p>
              </div>
            </article>
          </div>

          {/* MPASI Card - 4 cols, row 2 */}
          <div className="article-card-wrapper span-4">
            <article className="article-card">
              <div className="article-card-img large">
                <img src={mpasiImg} alt="Resep MPASI Buatan Rumah yang Sehat" />
              </div>
              <div className="article-card-body">
                <p className="article-card-category-colored">Nutrisi</p>
                <h3 className="article-card-title small">Resep MPASI Buatan Rumah yang Sehat</h3>
                <p className="article-card-excerpt">
                  Resep padat nutrisi yang mudah dibuat di rumah dengan bahan lokal dari Loa Duri
                  Ulu.
                </p>
              </div>
            </article>
          </div>

          {/* Pertumbuhan Card - 4 cols, row 2 */}
          <div className="article-card-wrapper span-4">
            <article className="article-card">
              <div className="article-card-img large">
                <img src={pertumbuhanImg} alt="Memantau Grafik Pertumbuhan Bayi" />
              </div>
              <div className="article-card-body">
                <p className="article-card-category-colored">Pertumbuhan</p>
                <h3 className="article-card-title small">Memantau Grafik Pertumbuhan Bayi</h3>
                <p className="article-card-excerpt">
                  Mengapa KMS (Kartu Menuju Sehat) sangat penting bagi perkembangan balita Anda.
                </p>
              </div>
            </article>
          </div>
        </div>

      </main>

      <Footer />

    </div>
  );
}
