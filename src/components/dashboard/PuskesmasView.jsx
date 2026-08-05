import React from 'react';

export default function PuskesmasView() {
  return (
    <>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="form-field" style={{ maxWidth: '320px' }}><label>Pilih Posyandu</label>
          <select>
            <option>Posyandu Melati</option><option>Posyandu Rukun Lestari</option><option>Posyandu Mawar</option>
            <option>Posyandu Bina Putra</option><option>Posyandu Nusa Indah</option><option>Posyandu Cempaka</option>
            <option>Posyandu Tunas Mulya</option><option>Posyandu Surya</option><option>Posyandu Terkini</option>
          </select>
        </div>
      </div>
      <div className="card">
        <div className="section-head">
          <h3>Laporan Bulanan Bidang Kesehatan — Posyandu Melati, Juli 2026</h3>
          <span className="badge badge-green">Siap Diekspor</span>
        </div>
        <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', fontWeight: 500, marginBottom: '14px' }}>Rekap per kelompok sasaran mengikuti format resmi SIP. Ekspor bersifat per-Posyandu (AUTH-4), terpisah dari ekspor gabungan SuperAdmin.</p>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>Kelompok Sasaran</th><th>Diperiksa</th><th>Target</th><th>Cakupan</th></tr>
            </thead>
            <tbody>
              <tr><td>Bayi & Balita</td><td>42</td><td>42</td><td style={{ fontWeight: 800, color: 'var(--green-deep)' }}>100%</td></tr>
              <tr><td>Remaja</td><td>16</td><td>20</td><td style={{ fontWeight: 800, color: 'var(--orange-deep)' }}>80%</td></tr>
              <tr><td>Ibu Hamil</td><td>6</td><td>10</td><td style={{ fontWeight: 800, color: 'var(--magenta-deep)' }}>60%</td></tr>
              <tr><td>Orang Tua & Lansia</td><td>18</td><td>20</td><td style={{ fontWeight: 800, color: 'var(--green-deep)' }}>90%</td></tr>
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <div className="export-row">
            <button className="export-btn"><svg className="ic ic-sm"><use href="#i-file" /></svg>PDF</button>
            <button className="export-btn"><svg className="ic ic-sm"><use href="#i-file" /></svg>Word</button>
            <button className="export-btn"><svg className="ic ic-sm"><use href="#i-grid" /></svg>Excel</button>
          </div>
        </div>
      </div>
    </>
  );
}
