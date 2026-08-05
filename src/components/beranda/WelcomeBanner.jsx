import React from 'react';
import heroImg from '../../assets/images/common/hero-beranda.png';

export default function WelcomeBanner({ onNavigate }) {
  return (
    <section className="welcome-banner">

      <div className="welcome-illustration">
        <img
          src={heroImg}
          alt="Ilustrasi tenaga medis"
          className="welcome-img"
        />
      </div>

      <div className="welcome-content">

        <h1 className="welcome-title">
          Selamat Datang di Portal Layanan Kesehatan
          <br />
          Masyarakat Loa Duri Ulu
        </h1>

        <p className="welcome-description">
          Portal informasi kesehatan untuk warga Loa Duri Ulu.
          Mari periksa layanan, artikel edukasi,
          dan jadwal imunisasi.
        </p>

        <div className="welcome-actions">

          <button
            className="btn-primary"
            onClick={() => onNavigate && onNavigate('jadwal')}
          >
            Lihat Jadwal
          </button>

          <button
            className="btn-outline"
            onClick={() => onNavigate && onNavigate('artikel')}
          >
            Blog Kesehatan
          </button>

        </div>

      </div>

    </section>
  );
}