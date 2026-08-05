import React, { useState } from 'react';

export default function WargaAnakView({ userAuth }) {
  const [currentAnakIdx, setCurrentAnakIdx] = useState(0);

  if (!userAuth || !userAuth.anak) {
    return <div className="card"><p>Data keluarga tidak ditemukan.</p></div>;
  }

  const anakList = userAuth.anak;
  const currentAnak = anakList[currentAnakIdx];
  const lansiaBumil = userAuth.anggotaLansiaBumil;

  const tileColors = [['var(--cyan-bg)', 'var(--cyan-deep)'], ['var(--orange-bg)', 'var(--orange-deep)'], ['var(--violet-bg)', 'var(--violet-deep)']];

  return (
    <>
      <div className="callout" style={{ marginBottom: '16px' }}>
        <svg className="ic"><use href="#i-lock" /></svg><span>Akun Warga bersifat read-only — data hanya untuk dilihat, tidak dapat diubah.</span>
      </div>
      <div className="grid grid-2">
        <div className="card">
          <div className="section-head"><h3>Menu Anak</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {anakList.map((a, i) => {
              const c = tileColors[i % tileColors.length];
              return (
                <div key={i} className={`card pad-sm ${i === currentAnakIdx ? 'row-highlight' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setCurrentAnakIdx(i)}>
                  <div className="bidang-icon-tile" style={{ background: c[0], color: c[1] }}><svg className="ic ic-sm"><use href="#i-baby" /></svg></div>
                  <div><p style={{ fontWeight: 700, fontSize: '12.5px' }}>{a.nama}</p><p style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600 }}>{a.usia} · {a.gender}</p></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card">
          <div className="section-head">
            <h3>Riwayat Pemeriksaan — {currentAnak?.nama}</h3>
            <span className="badge badge-cyan" style={{ background: 'var(--cyan-bg)', color: 'var(--cyan-deep)' }}>Read-only</span>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead><tr><th>Bulan</th><th>Berat Badan</th><th>Tinggi Badan</th><th>Status Gizi</th></tr></thead>
              <tbody>
                {currentAnak?.riwayat?.map((r, i) => (
                  <tr key={i}><td>{r.bulan}</td><td>{r.bb}</td><td>{r.tb}</td><td><span className="badge badge-green">{r.status}</span></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600, marginTop: '10px' }}>Hanya menampilkan bulan-bulan anak benar-benar diperiksa di Posyandu.</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '16px' }}>
        <div className="section-head">
          <h3>Riwayat Kesehatan Anggota Keluarga Lain (Lansia/Bumil)</h3>
          <span className="badge badge-cyan" style={{ background: 'var(--cyan-bg)', color: 'var(--cyan-deep)' }}>Read-only</span>
        </div>
        {lansiaBumil ? (
          <div>
            <p style={{ fontSize: '11.5px', color: 'var(--ink-soft)', fontWeight: 700, marginBottom: '8px' }}>{lansiaBumil.nama} · {lansiaBumil.jenis === 'bumil' ? 'Ibu Hamil (LILA)' : 'Lansia (Tensi)'}</p>
            <div className="table-responsive">
              <table className="table">
                <thead><tr><th>Bulan</th><th>{lansiaBumil.jenis === 'bumil' ? 'LILA' : 'Ukuran'}</th><th>Tensi</th><th>Status</th></tr></thead>
                <tbody>
                  {lansiaBumil.riwayat?.map((r, i) => (
                    <tr key={i}><td>{r.bulan}</td><td>{r.ukuran}</td><td>{r.tensi}</td><td><span className="badge badge-green">{r.status}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 600 }}>Akun keluarga Anda belum terhubung dengan data anggota Lansia/Ibu Hamil. Hubungi Kader Posyandu bila ingin menghubungkan.</p>
        )}
      </div>
    </>
  );
}
