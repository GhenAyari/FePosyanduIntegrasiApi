import React from 'react';

export default function KelolaWargaView({ posyandu }) {
  return (
    <div className="grid grid-2">
      <div className="card">
        <div className="section-head">
          <h3>Daftar Akun Warga</h3>
          <span className="badge badge-violet">3 Keluarga Terdaftar</span>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>Nama Warga</th><th>No. KK</th><th>Jml Anak</th><th></th></tr>
            </thead>
            <tbody>
              <tr><td>Bapak Herman</td><td>6472051234560001</td><td>2</td><td><button className="btn btn-sm btn-outline">Reset Password</button></td></tr>
              <tr><td>Ibu Sari Wulandari</td><td>6472051234560002</td><td>1</td><td><button className="btn btn-sm btn-outline">Reset Password</button></td></tr>
              <tr><td>Bapak Anwar</td><td>6472051234560003</td><td>3</td><td><button className="btn btn-sm btn-outline">Reset Password</button></td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <svg className="ic ic-sm"><use href="#i-alert" /></svg>Reset password dilakukan langsung oleh Kader/Ketua; sampaikan password baru ke warga secara tatap muka.
        </p>
      </div>

      <div className="card">
        <div className="section-head"><h3>Buat Akun Warga Baru</h3></div>
        <div className="form-field" style={{ marginBottom: '12px' }}><label>Nama Lengkap</label><input placeholder="mis. Bapak Herman" /></div>
        <div className="form-field" style={{ marginBottom: '12px' }}><label>NIK</label><input placeholder="16 digit NIK (jadi password awal)" /></div>
        <div className="form-field" style={{ marginBottom: '12px' }}><label>No. KK</label><input placeholder="16 digit No. KK" /></div>
        <div className="form-field" style={{ marginBottom: '12px' }}><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
        <div className="form-field" style={{ marginBottom: '4px' }}><label>Data Anak (bisa lebih dari 1)</label></div>
        <div className="form-grid" style={{ marginBottom: '8px' }}>
          <div className="form-field"><input placeholder="Nama anak" /></div>
          <div className="form-field"><input type="date" /></div>
        </div>
        <button className="btn btn-outline btn-sm" style={{ marginBottom: '14px' }}><svg className="ic ic-sm"><use href="#i-plus" /></svg>Tambah Anak Lain</button>
        <button className="btn btn-violet" style={{ width: '100%', justifyContent: 'center' }}>Buat Akun Warga</button>
      </div>
    </div>
  );
}
