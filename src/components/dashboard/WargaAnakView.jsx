import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WargaAnakView() {
  const [currentAnakIdx, setCurrentAnakIdx] = useState(0);
  
  // State Data dari Database
  const [anakList, setAnakList] = useState([]);
  const [lansiaBumil, setLansiaBumil] = useState(null);
  
  // State Status
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const tileColors = [
    ['var(--cyan-bg)', 'var(--cyan-deep)'],
    ['var(--orange-bg)', 'var(--orange-deep)'],
    ['var(--violet-bg)', 'var(--violet-deep)']
  ];

  useEffect(() => {
    const fetchRaporKeluarga = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/warga/rapor-keluarga', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        const data = response.data.data;
        setAnakList(data.anak || []);
        setLansiaBumil(data.anggotaLansiaBumil || null);
      } catch (error) {
        console.error("Gagal menarik rapor:", error);
        setErrorMsg('Gagal memuat rapor kesehatan keluarga.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRaporKeluarga();
  }, []);

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>Membuka Rapor Kesehatan Keluarga... ⏳</div>;
  }

  const currentAnak = anakList[currentAnakIdx] || null;

  return (
    <div style={{ animation: 'fadein 0.4s ease' }}>
      <div className="callout" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="bi bi-lock-fill" style={{ fontSize: '16px' }}></i>
        <span>Akun Warga bersifat read-only — data langsung diambil dari rekapitulasi Kader Posyandu.</span>
      </div>

      {errorMsg && (
        <div style={{ padding: '12px', marginBottom: '16px', borderRadius: '6px', backgroundColor: '#fde8e8', color: '#c81e1e' }}>
          {errorMsg}
        </div>
      )}

      <div className="grid grid-2" style={{ gridTemplateColumns: '.9fr 1.3fr' }}>
        {/* === Menu Anak === */}
        <div className="card">
          <div className="section-head"><h3>Rapor Bayi & Balita</h3></div>
          
          {anakList.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {anakList.map((a, i) => {
                const c = tileColors[i % tileColors.length];
                const isSelected = i === currentAnakIdx;
                return (
                  <div
                    key={i}
                    className={`card pad-sm ${isSelected ? 'row-highlight' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: '.15s', border: isSelected ? `1px solid ${c[1]}` : '1px solid #e2e8f0' }}
                    onClick={() => setCurrentAnakIdx(i)}
                  >
                    <div className="bidang-icon-tile" style={{ background: c[0], color: c[1] }}>
                      <i className="bi bi-person-fill" style={{ fontSize: '18px' }}></i>
                    </div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '13px', margin: 0, color: '#334155' }}>{a.nama}</p>
                      <p style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600, margin: 0 }}>{a.usia} · {a.gender}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '13px' }}>
              Belum ada data bayi/balita di keluarga Anda.
            </div>
          )}
        </div>

        {/* === Riwayat Pemeriksaan Anak === */}
        <div className="card">
          <div className="section-head">
            <h3>Riwayat Pemeriksaan — {currentAnak ? currentAnak.nama : 'Pilih Anak'}</h3>
            <span className="badge badge-cyan" style={{ background: 'var(--cyan-bg)', color: 'var(--cyan-deep)' }}>Read-only</span>
          </div>
          
          {currentAnak ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Bulan</th>
                    <th>Berat Badan</th>
                    <th>Tinggi Badan</th>
                    <th>Status Gizi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAnak.riwayat && currentAnak.riwayat.length > 0 ? (
                    currentAnak.riwayat.map((r, i) => (
                      <tr key={i}>
                        <td><b>{r.bulan}</b></td>
                        <td>{r.bb}</td>
                        <td>{r.tb}</td>
                        <td>
                          <span className={`badge ${r.status.includes('Normal') ? 'badge-green' : 'badge-orange'}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: '#64748b', padding: '16px' }}>Anak ini belum pernah diperiksa di Posyandu.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginTop: '10px' }}>
                Menampilkan hasil penimbangan dari yang paling terbaru.
              </p>
            </div>
          ) : (
             <div style={{ textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '13px' }}>Pilih profil anak di sebelah kiri untuk melihat rapor pertumbuhannya.</div>
          )}
        </div>
      </div>

      {/* === Riwayat Anggota Keluarga Lain (Lansia/Bumil) === */}
      <div className="card" style={{ marginTop: '16px' }}>
        <div className="section-head">
          <h3>Rapor Kesehatan Orang Tua & Ibu Hamil</h3>
          <span className="badge badge-cyan" style={{ background: 'var(--cyan-bg)', color: 'var(--cyan-deep)' }}>Read-only</span>
        </div>
        
        {lansiaBumil ? (
          <div>
            <p style={{ fontSize: '13px', color: '#334155', fontWeight: 700, marginBottom: '12px' }}>
              Data Pemeriksaan: <span style={{ color: 'var(--violet-deep)' }}>{lansiaBumil.nama}</span> — {lansiaBumil.jenis === 'bumil' ? 'Ibu Hamil' : 'Lansia'}
            </p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Bulan Periksa</th>
                    <th>{lansiaBumil.jenis === 'bumil' ? 'Ukuran LILA' : 'Berat Badan'}</th>
                    <th>Tekanan Darah (Tensi)</th>
                    <th>Status Evaluasi</th>
                  </tr>
                </thead>
                <tbody>
                  {lansiaBumil.riwayat && lansiaBumil.riwayat.length > 0 ? (
                    lansiaBumil.riwayat.map((r, i) => (
                      <tr key={i}>
                        <td><b>{r.bulan}</b></td>
                        <td>{r.ukuran}</td>
                        <td>{r.tensi}</td>
                        <td>
                          <span className={`badge ${r.status.includes('Normal') ? 'badge-green' : 'badge-orange'}`}>
                            {r.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: '#64748b', padding: '16px' }}>Belum ada data pemeriksaan.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '12.5px', color: '#64748b', fontWeight: 500, padding: '10px 0' }}>
            Akun Anda belum memiliki data Rapor Lansia atau Ibu Hamil. 
            Hal ini terjadi apabila anggota keluarga belum melakukan pemeriksaan.
          </p>
        )}
      </div>
    </div>
  );
}