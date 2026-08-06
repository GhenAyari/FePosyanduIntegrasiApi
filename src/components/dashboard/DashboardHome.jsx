import React from 'react';

export default function DashboardHome({ role, onViewChange }) {
  return (
    <>
      <div className="grid grid-4" style={{ marginBottom: '18px' }}>
        <div className="stat-card" style={{ background: 'var(--cyan-bg)' }}>
          <div className="ico" style={{ background: 'var(--cyan-deep)' }}><i className="bi bi-calendar-event" style={{ fontSize: '18px', color: '#fff' }}></i></div>
          <div className="num">3 Agu</div>
          <div className="label">Jadwal rutin bulan ini</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--orange-bg)' }}>
          <div className="ico" style={{ background: 'var(--orange-deep)' }}><i className="bi bi-emoji-smile" style={{ fontSize: '18px', color: '#fff' }}></i></div>
          <div className="num">42</div>
          <div className="label">Balita tercatat bulan ini</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--magenta-bg)' }}>
          <div className="ico" style={{ background: 'var(--magenta-deep)' }}><i className="bi bi-megaphone" style={{ fontSize: '18px', color: '#fff' }}></i></div>
          <div className="num">5</div>
          <div className="label">Pengaduan menunggu tindak lanjut</div>
        </div>
        <div className="stat-card" style={{ background: 'var(--green-bg)' }}>
          <div className="ico" style={{ background: 'var(--green-deep)' }}><i className="bi bi-check-lg" style={{ fontSize: '18px', color: '#fff' }}></i></div>
          <div className="num">2/3</div>
          <div className="label">Laporan bulan ini terkirim</div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="section-head">
            <h3>Status Rekap Kegiatan Bulan Ini</h3>
            <span className="badge badge-orange"><span className="badge-dot"></span>Belum Direkap</span>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', fontWeight: 500, marginBottom: '14px' }}>
            Data pemeriksaan 4 kelompok sasaran sudah masuk. Lakukan rekap sebelum tanggal jatuh tempo laporan ke Puskesmas.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Bayi & Balita</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}>
                <div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '100%' }}></div></div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)' }}>42/42</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Remaja</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}>
                <div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '80%', background: 'linear-gradient(90deg,var(--orange-deep),var(--orange))' }}></div></div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)' }}>16/20</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Ibu Hamil</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}>
                <div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '60%', background: 'linear-gradient(90deg,var(--magenta-deep),var(--magenta))' }}></div></div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)' }}>6/10</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 600 }}>Orang Tua & Lansia</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}>
                <div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '90%', background: 'linear-gradient(90deg,var(--green-deep),var(--green))' }}></div></div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--ink-soft)' }}>18/20</span>
              </div>
            </div>
          </div>
          <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }} onClick={() => onViewChange('kesehatan')}>
            Lanjutkan Pencatatan
          </button>
        </div>

        <div className="card">
          <div className="section-head">
            <h3>Aktivitas Terbaru</h3>
            <span className="link">Lihat semua</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="bidang-icon-tile" style={{ background: 'var(--cyan-bg)', color: 'var(--cyan-deep)' }}><i className="bi bi-emoji-smile"></i></div>
              <div><p style={{ fontSize: '12.5px', fontWeight: 700 }}>Data pemeriksaan Ananda Fitri disimpan</p><p style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600 }}>Bayi & Balita · 10 menit lalu</p></div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="bidang-icon-tile" style={{ background: 'var(--magenta-bg)', color: 'var(--magenta-deep)' }}><i className="bi bi-megaphone"></i></div>
              <div><p style={{ fontSize: '12.5px', fontWeight: 700 }}>Pengaduan RTLH Bu Sari tersimpan</p><p style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600 }}>Perumahan Rakyat · 1 jam lalu</p></div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div className="bidang-icon-tile" style={{ background: 'var(--green-bg)', color: 'var(--green-deep)' }}><i className="bi bi-journal-text"></i></div>
              <div><p style={{ fontSize: '12.5px', fontWeight: 700 }}>Artikel "Tips Cegah Stunting" dipublikasikan</p><p style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600 }}>Artikel & Berita · Kemarin</p></div>
            </div>
          </div>
        </div>
      </div>

      {role === 'ketua' && (
        <div id="ketuaDashboardExtra" style={{ marginTop: '16px' }}>
          <div className="card">
            <div className="section-head">
              <h3>Rekap 6 Bidang — Kesiapan Laporan 3 Bulanan</h3>
              <span className="badge badge-violet">Periode Mei–Jul 2026</span>
            </div>
            <div className="grid rekap-6-grid">
              <div className="card pad-sm" style={{ textAlign: 'center', background: 'var(--cyan-bg)', border: 'none' }}><i className="bi bi-activity" style={{ fontSize: '20px', color: 'var(--cyan-deep)' }}></i><p style={{ fontSize: '11.5px', fontWeight: 700, marginTop: '6px' }}>Kesehatan</p><span className="badge badge-green" style={{ marginTop: '6px' }}>Siap</span></div>
              <div className="card pad-sm" style={{ textAlign: 'center', background: 'var(--orange-bg)', border: 'none' }}><i className="bi bi-journal-text" style={{ fontSize: '20px', color: 'var(--orange-deep)' }}></i><p style={{ fontSize: '11.5px', fontWeight: 700, marginTop: '6px' }}>Pendidikan</p><span className="badge badge-green" style={{ marginTop: '6px' }}>Siap</span></div>
              <div className="card pad-sm" style={{ textAlign: 'center', background: 'var(--magenta-bg)', border: 'none' }}><i className="bi bi-droplet-fill" style={{ fontSize: '20px', color: 'var(--magenta-deep)' }}></i><p style={{ fontSize: '11.5px', fontWeight: 700, marginTop: '6px' }}>Pekerjaan Umum</p><span className="badge badge-orange" style={{ marginTop: '6px' }}>Proses</span></div>
              <div className="card pad-sm" style={{ textAlign: 'center', background: 'var(--green-bg)', border: 'none' }}><i className="bi bi-house-door-fill" style={{ fontSize: '20px', color: 'var(--green-deep)' }}></i><p style={{ fontSize: '11.5px', fontWeight: 700, marginTop: '6px' }}>Perumahan</p><span className="badge badge-orange" style={{ marginTop: '6px' }}>Proses</span></div>
              <div className="card pad-sm" style={{ textAlign: 'center', background: 'var(--violet-bg)', border: 'none' }}><i className="bi bi-shield-fill-check" style={{ fontSize: '20px', color: 'var(--violet-deep)' }}></i><p style={{ fontSize: '11.5px', fontWeight: 700, marginTop: '6px' }}>Trantibumlinmas</p><span className="badge badge-rose" style={{ marginTop: '6px' }}>Belum</span></div>
              <div className="card pad-sm" style={{ textAlign: 'center', background: 'var(--rose-bg)', border: 'none' }}><i className="bi bi-heart-fill" style={{ fontSize: '20px', color: 'var(--rose-deep)' }}></i><p style={{ fontSize: '11.5px', fontWeight: 700, marginTop: '6px' }}>Sosial</p><span className="badge badge-rose" style={{ marginTop: '6px' }}>Belum</span></div>
            </div>
            <button className="btn btn-soft" style={{ marginTop: '16px' }} onClick={() => onViewChange('laporan')}>
              Buka Rekapitulasi 3 Bulanan <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
