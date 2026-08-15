import React from 'react';

export default function DashboardHome({ role, onViewChange }) {
  return (
    <div style={{ animation: 'fadein 0.4s ease' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--violet-deep)', margin: '0 0 4px 0', fontSize: '24px' }}>Beranda Analitik Posyandu</h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: 0, fontWeight: 500 }}>Ringkasan terpadu pencatatan kesehatan, pengaduan masyarakat, dan rekapitulasi kegiatan bulanan.</p>
      </div>

      {/* =========================================
          1. KARTU STATISTIK UTAMA (HERO STATS)
          ========================================= */}
      <div className="grid grid-4" style={{ marginBottom: '24px', gap: '16px' }}>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)', border: 'none', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.1)' }}>
          <div className="ico" style={{ background: '#0284c7', color: '#fff' }}><i className="bi bi-people-fill" style={{ fontSize: '18px' }}></i></div>
          <div className="num" style={{ color: '#0369a1' }}>142</div>
          <div className="label" style={{ color: '#075985', fontWeight: 600 }}>Total Warga Sasaran</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)', border: 'none', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.1)' }}>
          <div className="ico" style={{ background: '#ea580c', color: '#fff' }}><i className="bi bi-activity" style={{ fontSize: '18px' }}></i></div>
          <div className="num" style={{ color: '#c2410c' }}>86%</div>
          <div className="label" style={{ color: '#9a3412', fontWeight: 600 }}>Kehadiran Pemeriksaan</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: 'none', boxShadow: '0 4px 12px rgba(219, 39, 119, 0.1)' }}>
          <div className="ico" style={{ background: '#db2777', color: '#fff' }}><i className="bi bi-megaphone-fill" style={{ fontSize: '18px' }}></i></div>
          <div className="num" style={{ color: '#be185d' }}>5</div>
          <div className="label" style={{ color: '#9d174d', fontWeight: 600 }}>Pengaduan Baru (Warga)</div>
        </div>
        <div className="stat-card" style={{ background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)', border: 'none', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.1)' }}>
          <div className="ico" style={{ background: '#16a34a', color: '#fff' }}><i className="bi bi-file-earmark-check-fill" style={{ fontSize: '18px' }}></i></div>
          <div className="num" style={{ color: '#15803d' }}>Aman</div>
          <div className="label" style={{ color: '#166534', fontWeight: 600 }}>Status Register Bulanan</div>
        </div>
      </div>

      {/* =========================================
          2. ZONA TENGAH: KESEHATAN VS PENGADUAN
          ========================================= */}
      <div className="grid grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
        
        {/* KIRI: PROGRES KESEHATAN */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="section-head" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--cyan-deep)' }}><i className="bi bi-heart-pulse-fill me-2"></i>Pencatatan Kesehatan</h3>
              <span className="badge badge-cyan">Agustus 2026</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Bayi & Balita</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0ea5e9' }}>42 / 42 (100%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e0f2fe', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: '#0ea5e9', borderRadius: '4px' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Remaja</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b' }}>16 / 20 (80%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#ffedd5', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '80%', height: '100%', background: '#f59e0b', borderRadius: '4px' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Ibu Hamil</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#d946ef' }}>6 / 10 (60%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#fae8ff', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '60%', height: '100%', background: '#d946ef', borderRadius: '4px' }}></div>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Orang Tua & Lansia</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981' }}>18 / 20 (90%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#dcfce7', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '90%', height: '100%', background: '#10b981', borderRadius: '4px' }}></div>
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ marginTop: '24px', width: '100%', justifyContent: 'center', borderColor: 'var(--cyan-deep)', color: 'var(--cyan-deep)' }} onClick={() => onViewChange('kesehatan')}>
            Lanjutkan Pengisian Data Kesehatan <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>

        {/* KANAN: IDENTIFIKASI & PENGADUAN LINGKUNGAN */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div>
            <div className="section-head" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--magenta-deep)' }}><i className="bi bi-buildings-fill me-2"></i>Lingkungan & Pengaduan</h3>
              <span className="badge badge-magenta">5 Bidang Non-Kesehatan</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-book-fill"></i></div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Pendidikan</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b' }}>2 Form / 0 Aduan</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-droplet-fill"></i></div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Pekerjaan Umum</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444' }}>1 Form / 3 Aduan</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-house-door-fill"></i></div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>Perumahan Rakyat</span>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444' }}>0 Form / 2 Aduan</span>
              </div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ marginTop: '24px', width: '100%', justifyContent: 'center', borderColor: 'var(--magenta-deep)', color: 'var(--magenta-deep)' }} onClick={() => onViewChange('pengaduan')}>
            Tinjau Formulir & Pengaduan <i className="bi bi-arrow-right ms-2"></i>
          </button>
        </div>

      </div>

      {/* =========================================
          3. ZONA BAWAH: BUKU REGISTER & AKTIVITAS
          ========================================= */}
      <div className="grid grid-2" style={{ gap: '24px', marginBottom: '24px' }}>
        
        {/* KIRI: STATUS BUKU REGISTER F1/F2 */}
        <div className="card">
          <div className="section-head">
            <h3><i className="bi bi-journal-check me-2" style={{ color: 'var(--violet-deep)' }}></i>Status Register Bulanan (F1/F2)</h3>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', background: '#f5f3ff', borderRadius: '8px', border: '1px solid #e879f9' }}>
            <div style={{ fontSize: '40px', color: '#c026d3' }}><i className="bi bi-folder-check"></i></div>
            <div>
              <h4 style={{ margin: '0 0 4px 0', color: '#86198f', fontSize: '15px' }}>Buku Register Agustus Belum Disimpan</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#a21caf', lineHeight: '1.4' }}>Pencatatan harian kesehatan sudah hampir lengkap. Silakan kompilasi data menjadi Laporan 46 Kolom bulan ini.</p>
            </div>
          </div>
          <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }} onClick={() => onViewChange('rekap-kegiatan')}>
            Buat Rekap Register Bulanan Sekarang
          </button>
        </div>

        {/* KANAN: AKTIVITAS TERBARU */}
        <div className="card">
          <div className="section-head">
            <h3>Aktivitas Terbaru Sistem</h3>
            <span className="link" style={{ fontSize: '13px' }}>Lihat log</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0ea5e9', marginTop: '6px' }}></div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#334155', margin: '0 0 2px 0' }}>Data pemeriksaan Ananda Fitri disimpan</p>
                <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Kesehatan (Balita) · 10 menit lalu</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#db2777', marginTop: '6px' }}></div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#334155', margin: '0 0 2px 0' }}>Pengaduan infrastruktur jalan masuk dari Bu Sari</p>
                <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Pekerjaan Umum · 1 jam lalu</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', marginTop: '6px' }}></div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#334155', margin: '0 0 2px 0' }}>Artikel "Tips Cegah Stunting" dipublikasikan</p>
                <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>Berita Posyandu · Kemarin, 14:30</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================
          4. ZONA KHUSUS KETUA POSYANDU (SPM 6 BIDANG)
          ========================================= */}
      {role === 'ketua' && (
        <div className="card" style={{ borderTop: '4px solid var(--violet-deep)' }}>
          <div className="section-head" style={{ marginBottom: '20px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0' }}>Pantauan Transparansi SPM 6 Bidang</h3>
              <p style={{ fontSize: '13px', color: '#64748b', margin: 0, fontWeight: 500 }}>Indikator kesiapan pelaporan triwulanan (Standar Pelayanan Minimal Desa).</p>
            </div>
            <span className="badge badge-violet">Triwulan III (Jul - Sep)</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            <div style={{ border: '1px solid #e0f2fe', background: '#f0f9ff', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <i className="bi bi-heart-pulse-fill" style={{ fontSize: '20px', color: '#0284c7' }}></i>
              <div style={{ fontSize: '12px', fontWeight: 700, margin: '8px 0', color: '#0f172a' }}>Kesehatan</div>
              <span className="badge badge-green" style={{ fontSize: '10px' }}>Siap</span>
            </div>
            <div style={{ border: '1px solid #fef3c7', background: '#fffbeb', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <i className="bi bi-book-fill" style={{ fontSize: '20px', color: '#d97706' }}></i>
              <div style={{ fontSize: '12px', fontWeight: 700, margin: '8px 0', color: '#0f172a' }}>Pendidikan</div>
              <span className="badge badge-green" style={{ fontSize: '10px' }}>Siap</span>
            </div>
            <div style={{ border: '1px solid #ffedd5', background: '#fff7ed', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <i className="bi bi-cone-striped" style={{ fontSize: '20px', color: '#ea580c' }}></i>
              <div style={{ fontSize: '12px', fontWeight: 700, margin: '8px 0', color: '#0f172a' }}>Pekerjaan Umum</div>
              <span className="badge badge-orange" style={{ fontSize: '10px' }}>Proses</span>
            </div>
            <div style={{ border: '1px solid #dcfce7', background: '#f0fdf4', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <i className="bi bi-house-heart-fill" style={{ fontSize: '20px', color: '#16a34a' }}></i>
              <div style={{ fontSize: '12px', fontWeight: 700, margin: '8px 0', color: '#0f172a' }}>Perumahan Rakyat</div>
              <span className="badge badge-orange" style={{ fontSize: '10px' }}>Proses</span>
            </div>
            <div style={{ border: '1px solid #f3e8ff', background: '#faf5ff', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <i className="bi bi-shield-fill-check" style={{ fontSize: '20px', color: '#9333ea' }}></i>
              <div style={{ fontSize: '12px', fontWeight: 700, margin: '8px 0', color: '#0f172a' }}>Trantibumlinmas</div>
              <span className="badge badge-rose" style={{ fontSize: '10px' }}>Kosong</span>
            </div>
            <div style={{ border: '1px solid #fce7f3', background: '#fdf2f8', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
              <i className="bi bi-people-fill" style={{ fontSize: '20px', color: '#db2777' }}></i>
              <div style={{ fontSize: '12px', fontWeight: 700, margin: '8px 0', color: '#0f172a' }}>Sosial</div>
              <span className="badge badge-rose" style={{ fontSize: '10px' }}>Kosong</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}