import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/artikel.css';

// Gambar statis hanya untuk Hero Banner
import heroBgImg from '../assets/images/common/hero-artikel.png';
import authorImg from '../assets/images/artikel/author-sarah.jpeg'; // Bisa dipakai sebagai fallback avatar penulis

const topikList = ['Semua Topik', 'Nutrisi', 'Vaksinasi', 'Kesehatan Mental', 'Kehamilan', 'Pendidikan'];

export default function ArtikelKesehatan({ activePage, onNavigate, onDarurat }) {
  const [activeTopik, setActiveTopik] = useState('Semua Topik');

  // State baru untuk menampung data API
  const [artikels, setArtikels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mengambil data dari Laravel saat komponen pertama kali dirender
  useEffect(() => {
    const fetchArtikels = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/api/artikels');
        setArtikels(response.data.data);
      } catch (err) {
        console.error('Gagal mengambil data artikel:', err);
        setError('Gagal memuat artikel dari server. Pastikan server Laravel sedang berjalan.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtikels();
  }, []);

  // Fungsi bantuan untuk memformat tanggal (misal: "7 Agustus 2026")
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Fungsi bantuan untuk membuat URL gambar utuh dari path Laravel
  const getImageUrl = (path) => {
    if (!path) return ''; // Bisa diganti dengan URL placeholder jika gambar kosong
    return `http://127.0.0.1:8000/storage/${path}`;
  };

  // Logika Filter: Menyaring artikel berdasarkan topik yang diklik
  const filteredArtikels = artikels.filter(artikel => {
    if (activeTopik === 'Semua Topik') return true;
    return artikel.kategori.toLowerCase() === activeTopik.toLowerCase();
  });

  // Memisahkan artikel pertama (Featured) dan sisanya (Reguler)
  const featuredArticle = filteredArtikels.length > 0 ? filteredArtikels[0] : null;
  const regularArticles = filteredArtikels.length > 1 ? filteredArtikels.slice(1) : [];

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

        {/* Status Handling: Loading & Error */}
        {isLoading && <div style={{ padding: '40px', textAlign: 'center' }}>Memuat artikel dari server... ⏳</div>}
        {error && <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>}
        {!isLoading && !error && filteredArtikels.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center' }}>Belum ada artikel untuk topik ini.</div>
        )}

        {/* Articles Grid */}
        {!isLoading && !error && (
          <div className="artikel-grid">

            {/* Featured Article - Artikel Pertama */}
            {featuredArticle && (
              <div className="featured-article-wrapper">
                <article className="featured-article-card">
                  <div className="featured-article-image">
                    <img src={getImageUrl(featuredArticle.path_foto)} alt={featuredArticle.judul} />
                  </div>
                  <div className="featured-article-body">
                    <div className="featured-article-meta">
                      <span className="artikel-category-badge">{featuredArticle.kategori}</span>
                      <div className="artikel-read-time">
                        <svg width="13" height="13" viewBox="0 0 13.3 13.3" fill="none">
                          <path d="M8.8667 9.8L9.8 8.8667 7.3333 6.4V3.3333H6V6.9333L8.8667 9.8V9.8M6.6667 13.3333C5.7444 13.3333 4.8778 13.1583 4.0667 12.8083 3.2556 12.4583 2.55 11.9833 1.95 11.3833 1.35 10.7833 0.875 10.0778 0.525 9.2667 0.175 8.4556 0 7.5889 0 6.6667 0 5.7444 0.175 4.8778 0.525 4.0667 0.875 3.2556 1.35 2.55 1.95 1.95 2.55 1.35 3.2556 0.875 4.0667 0.525 4.8778 0.175 5.7444 0 6.6667 0 7.5889 0 8.4556 0.175 9.2667 0.525 10.0778 0.875 10.7833 1.35 11.3833 1.95 11.9833 2.55 12.4583 3.2556 12.8083 4.0667 13.1583 4.8778 13.3333 5.7444 13.3333 6.6667 13.3333Z" fill="#42474e" />
                        </svg>
                        {formatDate(featuredArticle.published_at)}
                      </div>
                    </div>

                    <div className="featured-article-title-block">
                      <h2 className="featured-article-title">
                        {featuredArticle.judul}
                      </h2>
                    </div>

                    <div className="featured-article-excerpt-block">
                      <p className="featured-article-excerpt" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {featuredArticle.isi_artikel}
                      </p>
                    </div>

                    <div className="featured-article-footer">
                      <div className="author-info">
                        <img src={authorImg} alt="Avatar Penulis" className="author-avatar" />
                        <span className="author-name">{featuredArticle.penulis?.name || 'Admin Posyandu'}</span>
                      </div>
                      {/* TODO: Modifikasi agar mengirim ID/Slug saat pindah halaman */}
                      <a
                        href="#detail-artikel"
                        className="baca-artikel-link"
                        onClick={(e) => {
                          e.preventDefault();
                          localStorage.setItem('active_article_id', featuredArticle.id);
                          onNavigate && onNavigate('detail-artikel');
                        }}
                      >
                        Baca Artikel
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12.175 9H0V7H12.175L6.575 1.4 8 0 16 8 8 16 6.575 14.6 12.175 9V9" fill="#37618b" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            )}

            {/* Sisa Artikel Lainnya (Reguler) */}
            {regularArticles.map((artikel) => (
              <div className="article-card-wrapper span-4" key={artikel.id}>
                <article className="article-card">
                  <div className="article-card-img large">
                    <img src={getImageUrl(artikel.path_foto)} alt={artikel.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="article-card-body">
                    <p className="article-card-category-colored">{artikel.kategori}</p>
                    <h3 className="article-card-title small" style={{ marginBottom: '8px' }}>{artikel.judul}</h3>
                    <p className="article-card-excerpt" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', marginBottom: '16px' }}>
                      {artikel.isi_artikel}
                    </p>
                    <div className="article-card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="article-date" style={{ fontSize: '12px', color: '#73777f' }}>
                        {formatDate(artikel.published_at)}
                      </span>
                      <span className="bookmark-icon" style={{ cursor: 'pointer' }} onClick={() => {
                        localStorage.setItem('active_article_id', artikel.id); // Simpan ID
                        onNavigate && onNavigate('detail-artikel')
                      }}>
                        Baca &rarr;
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))
            }

          </div >
        )}

      </main >
      <Footer />
    </div >
  );
}