import React, { useState, useEffect } from 'react';
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

  // Darurat button → navigate to kontak page
  const handleOpenDarurat = () => {
    handleNavigate('kontak');
  };

  const pageProps = { activePage, onNavigate: handleNavigate, onDarurat: handleOpenDarurat };

  return (
    <>
      {activePage === 'login' ? (
        <Login onNavigate={handleNavigate} onLogin={(user) => { setUserAuth(user); handleNavigate('dashboard'); }} />
      ) : activePage === 'dashboard' ? (
        <DashboardApp userAuth={userAuth} onLogout={() => { setUserAuth(null); handleNavigate('login'); }} />
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
