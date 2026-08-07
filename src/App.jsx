import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Tambahkan ini untuk memanggil API
import Beranda from './pages/Beranda';
import ProfilPosyandu from './pages/ProfilPosyandu';
import ArtikelKesehatan from './pages/ArtikelKesehatan';
import DetailArtikel from './pages/DetailArtikel';
import JadwalKegiatan from './pages/JadwalKegiatan';
import KalkulatorKesehatan from './pages/KalkulatorKesehatan';
import KontakDarurat from './pages/KontakDarurat';
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';

function App() {
  const getPageFromHash = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'profil') return 'profil';
    if (hash === 'artikel') return 'artikel';
    if (hash === 'detail-artikel') return 'detail-artikel';
    if (hash === 'jadwal') return 'jadwal';
    if (hash === 'kalkulator') return 'kalkulator';
    if (hash === 'kontak') return 'kontak';
    if (hash === 'login') return 'login';
    if (hash === 'dashboard') return 'dashboard';
    return 'beranda';
  };

  const [activePage, setActivePage] = useState(getPageFromHash());
  const [userAuth, setUserAuth] = useState(null); // Stores logged in user data

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    window.location.hash = pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDarurat = () => {
    handleNavigate('kontak');
  };

  // --- FUNGSI BARU UNTUK LOGOUT ---
  const handleLogout = async () => {
    try {
      // 1. Ambil token dari brankas browser
      const token = localStorage.getItem('auth_token');

      // 2. Jika token ada, beritahu Laravel untuk menghancurkannya
      if (token) {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}` // Kirim token sebagai tiket otorisasi
          }
        });
      }
    } catch (error) {
      console.error("Gagal logout dari server:", error);
    } finally {
      // 3. Apapun yang terjadi (berhasil/gagal ke API), tetap bersihkan data lokal
      localStorage.removeItem('auth_token'); // Hapus token dari brankas
      setUserAuth(null);                     // Hapus data user dari memori React
      handleNavigate('login');               // Arahkan kembali ke halaman login
    }
  };

  const pageProps = { activePage, onNavigate: handleNavigate, onDarurat: handleOpenDarurat };

  return (
    <>
      {activePage === 'login' ? (
        <Login onNavigate={handleNavigate} onLogin={(user) => { setUserAuth(user); handleNavigate('dashboard'); }} />
      ) : activePage === 'dashboard' ? (
        < DashboardApp userAuth={userAuth} onLogout={handleLogout} />
      ) : activePage === 'profil' ? (
        <ProfilPosyandu {...pageProps} />
      ) : activePage === 'artikel' ? (
        <ArtikelKesehatan {...pageProps} />
      ) : activePage === 'detail-artikel' ? (
        <DetailArtikel {...pageProps} />
      ) : activePage === 'jadwal' ? (
        <JadwalKegiatan {...pageProps} />
      ) : activePage === 'kalkulator' ? (
        <KalkulatorKesehatan {...pageProps} />
      ) : activePage === 'kontak' ? (
        <KontakDarurat {...pageProps} />
      ) : (
        <Beranda {...pageProps} />
      )}
    </>
  );
}

export default App;