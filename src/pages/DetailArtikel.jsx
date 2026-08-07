import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/detail-artikel.css';

// Gambar statis untuk sidebar (bisa dibuat dinamis nanti jika ada API-nya)
import relatedImg1 from '../assets/images/detail-artikel/sayuran-organik.jpeg';
import relatedImg2 from '../assets/images/detail-artikel/edukasi-petugas.jpeg';

export default function DetailArtikel({ activePage, onNavigate, onDarurat }) {
  const [artikel, setArtikel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetailArtikel = async () => {
      // 1. Ambil ID artikel yang dititipkan di brankas browser
      const articleId = localStorage.getItem('active_article_id');

      if (!articleId) {
        setError('Artikel tidak ditemukan atau ID tidak valid.');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // 2. Tembak API berdasarkan ID tersebut
        const response = await axios.get(`http://127.0.0.1:8000/api/artikels/${articleId}`);
        setArtikel(response.data.data);
      } catch (err) {
        console.error('Gagal mengambil detail artikel:', err);
        setError('Gagal memuat isi artikel dari server.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetailArtikel();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    return `http://127.0.0.1:8000/storage/${path}`;
  };

  // Fungsi untuk mendapatkan inisial nama (misal: "Kader Melati" -> "KM")
  const getInitials = (name) => {
    if (!name) return 'A';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

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

            {/* Status Handling */}
            {isLoading && <div style={{ padding: '40px 0' }}>Memuat isi artikel... ⏳</div>}
            {error && <div style={{ padding: '40px 0', color: 'red' }}>{error}</div>}

            {/* Konten Artikel Dinamis */}
            {!isLoading && !error && artikel && (
              <>
                <h1 className="detail-artikel-title">{artikel.judul}</h1>

                <div className="detail-artikel-meta">
                  <div className="meta-author-avatar">{getInitials(artikel.penulis?.name)}</div>
                  <div className="meta-author-info">
                    <span className="meta-author-name">{artikel.penulis?.name || 'Admin Posyandu'}</span>
                    <span className="meta-author-role" style={{ textTransform: 'capitalize' }}>
                      {artikel.penulis?.role || 'Pengelola'}
                    </span>
                  </div>
                  <span className="meta-dot">•</span>
                  <span className="meta-date">{formatDate(artikel.published_at)}</span>
                  <span className="meta-dot">•</span>
                  <span className="meta-readtime">{artikel.kategori}</span>
                </div>

                {/* Karena kita belum menggunakan HTML Editor di backend, kita render teks biasa */}
                {/* Gunakan pre-wrap agar enter/baris baru dari database tetap terbaca */}
                <div
                  className="detail-artikel-paragraph"
                  style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}
                >
                  {artikel.isi_artikel}
                </div>

                {artikel.path_foto && (
                  <div className="detail-artikel-closing-img" style={{ marginTop: '32px' }}>
                    <img src={getImageUrl(artikel.path_foto)} alt={artikel.judul} />
                    <span className="closing-img-tag">{artikel.kategori}</span>
                  </div>
                )}
              </>
            )}
          </article>

          {/* Sidebar Column (Statik untuk saat ini) */}
          <aside className="detail-artikel-sidebar">
            <div className="related-articles-card">
              <h3 className="sidebar-title">ARTIKEL TERKAIT</h3>

              <a href="#artikel" className="related-article-item" onClick={(e) => e.preventDefault()}>
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

              <a href="#artikel" className="related-article-item" onClick={(e) => e.preventDefault()}>
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