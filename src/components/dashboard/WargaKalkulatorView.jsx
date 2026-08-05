import React, { useState } from 'react';

export default function WargaKalkulatorView() {
  const [tab, setTab] = useState('balita');

  return (
    <>
      <div className="callout" style={{ marginBottom: '16px' }}>
        <svg className="ic"><use href="#i-alert" /></svg>
        <span>Kalkulator mandiri, lebih lengkap dari kalkulator publik — hasil hanya membantu interpretasi awal, bukan pengganti penilaian ahli gizi/tenaga medis/bidan. Input tidak disimpan ke server.</span>
      </div>

      <div className="tabs" style={{ marginBottom: '16px' }}>
        <button className={`tab-btn ${tab === 'hamil' ? 'active' : ''}`} onClick={() => setTab('hamil')}>Ibu Hamil</button>
        <button className={`tab-btn ${tab === 'balita' ? 'active' : ''}`} onClick={() => setTab('balita')}>Bayi & Balita</button>
        <button className={`tab-btn ${tab === 'umum' ? 'active' : ''}`} onClick={() => setTab('umum')}>Umum</button>
      </div>

      <div className="card">
        <p style={{ fontSize: '13px', fontWeight: 600 }}>
          {tab === 'balita' ? 'Fitur: Status Gizi, KMS Digital (Tren), Jadwal Imunisasi, Tumbuh Kembang (KPSP)' : ''}
          {tab === 'hamil' ? 'Fitur: Usia Kehamilan & HPL, Perkembangan Janin, Kenaikan BB, IMT & LILA' : ''}
          {tab === 'umum' ? 'Fitur: IMT & Berat Badan Ideal, Kalkulator Kalori' : ''}
        </p>
        <div style={{ marginTop: '14px' }}>
          {/* Untuk mempersingkat implementasi, fitur rinci dapat mengadopsi struktur form yang ada pada HTML, 
              namun logic perhitungannya dapat dilakukan secara dinamis di sini. */}
          <div className="result-box">
            <div>
              <div className="r-num">Mode Prototipe</div>
              <div className="r-label">Silakan implementasikan formula kalkulator berdasarkan HTML JS engine.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
