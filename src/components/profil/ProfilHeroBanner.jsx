import React from 'react';
import heroBgPattern from '../../assets/images/profil/hero-bg-pattern.jpeg';

// 1. Tambahkan { data } untuk menerima lemparan props dari induknya
export default function ProfilHeroBanner({ data }) {

  // 2. Keamanan ekstra
  if (!data) return null;

  return (
    <div className="profil-hero-card">
      <div className="hero-bg-wrapper">
        <img src={heroBgPattern} alt="Decoration Pattern" className="hero-bg-img" />
      </div>
      <div className="hero-content">
        <div className="hero-title-row">
          <span className="hero-title-main">Profil </span>
          {/* 3. Teks statis diganti dengan data nama dari MySQL */}
          <span className="hero-badge">{data.nama}</span>
        </div>
        <p className="hero-quote">
          {/* 4. Nama di dalam kalimat sambutan juga dibuat dinamis */}
          "Selamat datang di halaman resmi {data.nama}. Kami berkomitmen memberikan pelayanan kesehatan primer yang berkualitas, proaktif, dan berkelanjutan bagi ibu hamil, bayi, balita, serta seluruh anggota keluarga untuk mewujudkan generasi sehat dan berkualitas."
        </p>
        <p className="hero-desc">
          Garda terdepan pelayanan kesehatan masyarakat desa, menerapkan transformasi pelayanan kesehatan primer melalui 6 SPM agar setiap warga mendapatkan hak dasarnya secara merata.
        </p>
      </div>
    </div>
  );
}