import React, { useState } from 'react';
import IconSprite from '../components/common/IconSprite';
import logo from '../assets/images/common/logo-header.jpeg';
import userAvatarFallback from '../assets/images/common/kristin-cooper.jpeg';

// Import views (we will create these)
import DashboardHome from '../components/dashboard/DashboardHome';
import KesehatanView from '../components/dashboard/KesehatanView';
import PengaduanView from '../components/dashboard/PengaduanView';
import LaporanView from '../components/dashboard/LaporanView';
import ProfilView from '../components/dashboard/ProfilView';
import DaftarView from '../components/dashboard/DaftarView';
import ArtikelView from '../components/dashboard/ArtikelView';
import KelolaWargaView from '../components/dashboard/KelolaWargaView';
import KelolaMakananView from '../components/dashboard/KelolaMakananView';
import PuskesmasView from '../components/dashboard/PuskesmasView';
import AdminDashboardView from '../components/dashboard/AdminDashboardView';
import AdminAnalitikView from '../components/dashboard/AdminAnalitikView';
import AdminEksporView from '../components/dashboard/AdminEksporView';
import WargaAnakView from '../components/dashboard/WargaAnakView';
import WargaKalkulatorView from '../components/dashboard/WargaKalkulatorView';
import WargaKieView from '../components/dashboard/WargaKieView';
import WargaKontakView from '../components/dashboard/WargaKontakView';
import WargaPasswordView from '../components/dashboard/WargaPasswordView';
import DashboardNavbar from '../components/dashboard/DashboardNavbar';

const NAV = {
  kader: [
    {
      group: 'Menu Utama', items: [
        { id: 'dashboard', label: 'Beranda', ico: 'bi bi-house-door-fill' },
        { id: 'kesehatan', label: 'Pencatatan Kesehatan', ico: 'bi bi-activity' },
        { id: 'pengaduan', label: 'Formulir & Pengaduan', ico: 'bi bi-megaphone-fill' },
      ]
    },
    {
      group: 'Lainnya', items: [
        { id: 'kelolawarga', label: 'Kelola Warga', ico: 'bi bi-people-fill' },
        { id: 'kelola-makanan', label: 'Kelola Data Makanan', ico: 'bi bi-egg-fried' },
        { id: 'artikel', label: 'Artikel & Berita', ico: 'bi bi-journal-text' },
        { id: 'laporan', label: 'Riwayat Laporan', ico: 'bi bi-file-earmark-text-fill' },
      ]
    }
  ],
  ketua: [
    {
      group: 'Menu Utama', items: [
        { id: 'dashboard', label: 'Beranda', ico: 'bi bi-house-door-fill' },
        { id: 'kesehatan', label: 'Pencatatan Kesehatan', ico: 'bi bi-activity' },
        { id: 'pengaduan', label: 'Formulir & Pengaduan', ico: 'bi bi-megaphone-fill' },
        { id: 'laporan', label: 'Rekap & Laporan', ico: 'bi bi-file-earmark-text-fill' },
      ]
    },
    {
      group: 'Kelola Posyandu', items: [
        { id: 'profil', label: 'Profil & Sarana', ico: 'bi bi-building' },
        { id: 'daftar', label: 'Daftar 9 Posyandu', ico: 'bi bi-geo-alt-fill' },
        { id: 'kelolawarga', label: 'Kelola Warga', ico: 'bi bi-people-fill' },
        { id: 'kelola-makanan', label: 'Kelola Data Makanan', ico: 'bi bi-egg-fried' },
        { id: 'artikel', label: 'Artikel & Berita', ico: 'bi bi-journal-text' },
      ]
    }
  ],
  puskesmas: [
    {
      group: 'Menu Utama', items: [
        { id: 'puskesmas-dashboard', label: 'Laporan per Posyandu', ico: 'bi bi-file-earmark-medical-fill' },
      ]
    }
  ],
  superadmin: [
    {
      group: 'Menu Utama', items: [
        { id: 'superadmin-dashboard', label: 'Transparansi Pelaporan', ico: 'bi bi-house-door-fill' },
        { id: 'superadmin-analitik', label: 'Dashboard Analitik 6 Bidang', ico: 'bi bi-bar-chart-line-fill' },
        { id: 'superadmin-ekspor', label: 'Ekspor Gabungan 9 Posyandu', ico: 'bi bi-file-earmark-excel-fill' },
      ]
    }
  ],
  warga: [
    {
      group: 'Menu Utama', items: [
        { id: 'warga-anak', label: 'Rapor Kesehatan Keluarga', ico: 'bi bi-person-heart' },
        { id: 'warga-kalkulator', label: 'Kalkulator Kesehatan', ico: 'bi bi-calculator-fill' },
        { id: 'warga-kie', label: 'Portal KIE Khusus', ico: 'bi bi-journal-bookmark-fill' },
        { id: 'warga-kontak', label: 'Kontak Posyandu', ico: 'bi bi-telephone-fill' },
      ]
    },
    {
      group: 'Akun', items: [
        { id: 'warga-password', label: 'Ganti Password', ico: 'bi bi-key-fill' },
      ]
    }
  ]
};

const TITLES = {
  dashboard: ['Beranda', 'Ringkasan kegiatan bulan ini'],
  kesehatan: ['Pencatatan Kesehatan', 'Input hasil pemeriksaan 4 kelompok sasaran'],
  pengaduan: ['Formulir & Pengaduan', 'Identifikasi, pengaduan & rekap 5 bidang non-kesehatan'],
  laporan: ['Laporan', 'Susun, tinjau & ekspor laporan Posyandu'],
  'kelola-makanan': ['Kelola Data Makanan', 'Tambah, ubah, atau hapus daftar makanan untuk Kalkulator Kalori'],
  profil: ['Profil & Sarana Posyandu', 'Kelola data profil & sarana yang dapat diperbarui sewaktu-waktu'],
  daftar: ['Daftar Posyandu', 'Referensi 9 Posyandu di Desa Loa Duri Ulu'],
  artikel: ['Artikel & Berita', 'Tulis dan kelola informasi untuk warga desa'],
  kelolawarga: ['Kelola Warga', 'Buat akun & kelola data keluarga warga terdaftar'],
  'puskesmas-dashboard': ['Laporan Bulanan Kesehatan per Posyandu', 'Tinjau & ekspor laporan salah satu dari 9 Posyandu'],
  'superadmin-dashboard': ['Transparansi Progres Pelaporan', 'Status laporan bulanan Kesehatan & 3 bulanan 9 Posyandu'],
  'superadmin-analitik': ['Dashboard Analitik 6 Bidang SPM', 'Tren bulanan/triwulanan & keaktifan kehadiran warga lintas Posyandu'],
  'superadmin-ekspor': ['Ekspor Gabungan 9 Posyandu', 'Ekspor rekap gabungan format khusus internal Puskesmas'],
  'warga-anak': ['Rapor Kesehatan Keluarga', 'Riwayat pemeriksaan anak (read-only)'],
  'warga-kalkulator': ['Kalkulator Kesehatan', '4 jenis kalkulator mandiri — lebih lengkap dari kalkulator publik'],
  'warga-kie': ['Portal KIE Khusus', 'Materi edukasi literasi digital & kesiapsiagaan bencana'],
  'warga-kontak': ['Kontak Posyandu', 'Hubungi Posyandu Anda'],
  'warga-password': ['Ganti Password', 'Perbarui kata sandi akun Anda kapan saja'],
};

const ROLE_AVATARS = { kader: 'K', ketua: 'KP', puskesmas: 'PK', superadmin: 'PD', warga: 'W' };
const ROLE_HOME = { kader: 'dashboard', ketua: 'dashboard', puskesmas: 'puskesmas-dashboard', superadmin: 'superadmin-dashboard', warga: 'warga-anak' };

export default function DashboardApp({ userAuth, onLogout }) {
  if (!userAuth) {
    onLogout();
    return null;
  }

  const role = userAuth.role || 'kader';
  // Tangkap nama posyandu dengan aman (jika superadmin, nama posyandu kosong)
  const namaPosyandu = userAuth.posyandu ? userAuth.posyandu.nama : '';
  const posyanduName = role === 'superadmin' ? 'Admin Loa Duri Ulu' : role === 'puskesmas' ? 'Petugas Puskesmas' : role === 'warga' ? `Warga Posyandu ${userAuth.posyandu}` : role === 'ketua' ? `Ketua Posyandu ${userAuth.posyandu}` : `Kader Posyandu ${userAuth.posyandu}`;
  const [currentView, setCurrentView] = useState(ROLE_HOME[role]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavClick = (id) => {
    setCurrentView(id);
    setSidebarOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardHome role={role} onViewChange={handleNavClick} />;
      case 'kesehatan': return <KesehatanView />;
      case 'pengaduan': return <PengaduanView />;
      case 'laporan': return <LaporanView role={role} />;
      case 'profil': return <ProfilView />;
      case 'daftar': return <DaftarView />;
      case 'artikel': return <ArtikelView />;
      case 'kelolawarga': return <KelolaWargaView posyandu={namaPosyandu} />;
      case 'kelola-makanan': return <KelolaMakananView />;
      case 'puskesmas-dashboard': return <PuskesmasView />;
      case 'superadmin-dashboard': return <AdminDashboardView />;
      case 'superadmin-analitik': return <AdminAnalitikView />;
      case 'superadmin-ekspor': return <AdminEksporView />;
      case 'warga-anak': return <WargaAnakView userAuth={userAuth} />;
      case 'warga-kalkulator': return <WargaKalkulatorView />;
      case 'warga-kie': return <WargaKieView />;
      case 'warga-kontak': return <WargaKontakView posyandu={namaPosyandu} />;
      case 'warga-password': return <WargaPasswordView />;
      default: return <DashboardHome role={role} onViewChange={handleNavClick} />;
    }
  };

  return (
    <div id="app" style={{ display: 'block' }}>
      <IconSprite />
      <div className="shell">
        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
          <div className="brand">
            <div className="mark"><img src={logo} alt="Logo Posyandu" /></div>
            <div>
              <div className="brand-name">
                {userAuth.posyandu ? `Posyandu ${userAuth.posyandu.nama}` : 'Posyandu LDU'}
              </div>
              <div className="brand-sub">Loa Duri Ulu</div>
            </div>
          </div>

          <div id="navContainer">
            {NAV[role]?.map(group => (
              <React.Fragment key={group.group}>
                <div className="nav-group-label">{group.group}</div>
                {group.items.map(item => (
                  <div
                    key={item.id}
                    className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="ico"><i className={item.ico} style={{ fontSize: '14px' }}></i></span>
                    {item.label}
                  </div>
                ))}
              </React.Fragment>
            ))}
            <div className="sidebar-foot">
              <button className="logout-btn" onClick={onLogout}>
                <i className="bi bi-box-arrow-right" style={{ fontSize: '15px' }}></i>
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        <div className={`sidebar-backdrop ${sidebarOpen ? 'show' : ''}`} onClick={() => setSidebarOpen(false)}></div>

        {/* MAIN */}
        <div className="main">
          <DashboardNavbar
            title={TITLES[currentView] ? TITLES[currentView][0] : 'Beranda'}
            desc={TITLES[currentView] ? TITLES[currentView][1] : ''}
            userAuth={userAuth}
            role={role}
            onOpenSidebar={() => setSidebarOpen(true)}
          />

          <div className="content">
            <div className="view active" style={{ animation: 'fadein .25s ease' }}>
              {renderView()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
