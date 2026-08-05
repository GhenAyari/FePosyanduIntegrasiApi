import React from 'react';

export default function AdminEksporView() {
  return (
    <>
      <div className="card">
        <div className="section-head"><h3>Ekspor Rekap Gabungan 9 Posyandu — Format Internal Puskesmas</h3><span className="badge badge-violet">Juli 2026</span></div>
        <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', fontWeight: 500, marginBottom: '16px' }}>Rekap gabungan seluruh 9 Posyandu bidang Kesehatan, terpisah dari ekspor per-Posyandu oleh Petugas Puskesmas.</p>
        <table className="table">
          <tbody>
            <tr><th>Indikator</th><th>Total 9 Posyandu</th></tr>
            <tr><td>Balita Ditimbang</td><td style={{ fontWeight: 800 }}>378</td></tr>
            <tr><td>Cakupan Imunisasi Lengkap</td><td style={{ fontWeight: 800 }}>86%</td></tr>
            <tr><td>Bawah Garis Merah (BGM)</td><td style={{ fontWeight: 800 }}>9</td></tr>
            <tr><td>Ibu Hamil Diperiksa</td><td style={{ fontWeight: 800 }}>74</td></tr>
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <div className="export-row">
            <button className="export-btn"><svg className="ic ic-sm"><use href="#i-file" /></svg>PDF</button>
            <button className="export-btn"><svg className="ic ic-sm"><use href="#i-file" /></svg>Word</button>
            <button className="export-btn"><svg className="ic ic-sm"><use href="#i-grid" /></svg>Excel</button>
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: '16px' }}>
        <div className="section-head"><h3>Referensi Profil & Sarana 9 Posyandu</h3></div>
        <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', fontWeight: 500 }}>Dapat dibuka sebagai referensi saat meninjau laporan.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          <button className="btn btn-sm btn-outline">Melati</button><button className="btn btn-sm btn-outline">Rukun Lestari</button>
          <button className="btn btn-sm btn-outline">Mawar</button><button className="btn btn-sm btn-outline">Bina Putra</button>
          <button className="btn btn-sm btn-outline">Nusa Indah</button><button className="btn btn-sm btn-outline">Cempaka</button>
          <button className="btn btn-sm btn-outline">Tunas Mulya</button><button className="btn btn-sm btn-outline">Surya</button>
          <button className="btn btn-sm btn-outline">Terkini</button>
        </div>
      </div>
    </>
  );
}
