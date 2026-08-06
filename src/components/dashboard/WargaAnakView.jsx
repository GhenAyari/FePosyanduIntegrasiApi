import React, { useState } from 'react';
import { WARGA_DB } from '../../utils/mockData';

export default function WargaAnakView({ userAuth }) {
  const [currentAnakIdx, setCurrentAnakIdx] = useState(0);

  // Fallback to default Warga data (herman) if anak array is missing in userAuth
  const defaultWarga = WARGA_DB['herman'];
  const anakList = (userAuth && userAuth.anak && userAuth.anak.length > 0) ? userAuth.anak : defaultWarga.anak;
  const currentAnak = anakList[currentAnakIdx] || anakList[0];
  const lansiaBumil = (userAuth && userAuth.anggotaLansiaBumil !== undefined) ? userAuth.anggotaLansiaBumil : defaultWarga.anggotaLansiaBumil;

  const tileColors = [
    ['var(--cyan-bg)', 'var(--cyan-deep)'],
    ['var(--orange-bg)', 'var(--orange-deep)'],
    ['var(--violet-bg)', 'var(--violet-deep)']
  ];

  return (
    <>
      <div className="callout" style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <i className="bi bi-lock-fill" style={{ fontSize: '16px' }}></i>
        <span>Akun Warga bersifat read-only — data hanya untuk dilihat, tidak dapat diubah.</span>
      </div>

      <div className="grid grid-2" style={{ gridTemplateColumns: '.9fr 1.3fr' }}>
        {/* Menu Anak */}
        <div className="card">
          <div className="section-head"><h3>Menu Anak</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {anakList.map((a, i) => {
              const c = tileColors[i % tileColors.length];
              const isSelected = i === currentAnakIdx;
              return (
                <div
                  key={i}
                  className={`card pad-sm ${isSelected ? 'row-highlight' : ''}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', transition: '.15s' }}
                  onClick={() => setCurrentAnakIdx(i)}
                >
                  <div className="bidang-icon-tile" style={{ background: c[0], color: c[1] }}>
                    <i className="bi bi-person-fill" style={{ fontSize: '18px' }}></i>
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '12.5px', margin: 0 }}>{a.nama}</p>
                    <p style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600, margin: 0 }}>{a.usia} · {a.gender}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Riwayat Pemeriksaan Anak */}
        <div className="card">
          <div className="section-head">
            <h3>Riwayat Pemeriksaan — {currentAnak?.nama}</h3>
            <span className="badge badge-cyan" style={{ background: 'var(--cyan-bg)', color: 'var(--cyan-deep)' }}>Read-only</span>
          </div>
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
                {currentAnak?.riwayat && currentAnak.riwayat.length > 0 ? (
                  currentAnak.riwayat.map((r, i) => (
                    <tr key={i}>
                      <td>{r.bulan}</td>
                      <td>{r.bb}</td>
                      <td>{r.tb}</td>
                      <td><span className="badge badge-green">{r.status}</span></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--ink-soft)', fontWeight: 600 }}>Belum ada data pemeriksaan.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600, marginTop: '10px' }}>
            Hanya menampilkan bulan-bulan anak benar-benar diperiksa di Posyandu.
          </p>
        </div>
      </div>

      {/* Riwayat Anggota Keluarga Lain (Lansia/Bumil) */}
      <div className="card" style={{ marginTop: '16px' }}>
        <div className="section-head">
          <h3>Riwayat Kesehatan Anggota Keluarga Lain (Lansia/Bumil)</h3>
          <span className="badge badge-cyan" style={{ background: 'var(--cyan-bg)', color: 'var(--cyan-deep)' }}>Read-only</span>
        </div>
        {lansiaBumil ? (
          <div>
            <p style={{ fontSize: '11.5px', color: 'var(--ink-soft)', fontWeight: 700, marginBottom: '8px' }}>
              {lansiaBumil.nama} · {lansiaBumil.jenis === 'bumil' ? 'Ibu Hamil (LILA)' : 'Lansia (Tensi)'}
            </p>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Bulan</th>
                    <th>{lansiaBumil.jenis === 'bumil' ? 'LILA' : 'Ukuran'}</th>
                    <th>Tensi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {lansiaBumil.riwayat?.map((r, i) => (
                    <tr key={i}>
                      <td>{r.bulan}</td>
                      <td>{r.ukuran}</td>
                      <td>{r.tensi}</td>
                      <td><span className="badge badge-green">{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 600 }}>
            Akun keluarga Anda belum terhubung dengan data anggota Lansia/Ibu Hamil. Hubungi Kader Posyandu bila ingin menghubungkan.
          </p>
        )}
      </div>
    </>
  );
}
