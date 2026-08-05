import React from 'react';

export default function WargaPasswordView() {
  return (
    <div className="card" style={{ maxWidth: '420px' }}>
      <div className="section-head"><h3>Ganti Password</h3></div>
      <div className="form-field" style={{ marginBottom: '12px' }}><label>Password Saat Ini</label><input type="password" placeholder="••••••••" /></div>
      <div className="form-field" style={{ marginBottom: '12px' }}><label>Password Baru</label><input type="password" placeholder="Minimal 6 karakter" /></div>
      <div className="form-field" style={{ marginBottom: '16px' }}><label>Ulangi Password Baru</label><input type="password" placeholder="Ulangi password baru" /></div>
      <button className="btn btn-violet" style={{ width: '100%', justifyContent: 'center' }}>Simpan Password Baru</button>
    </div>
  );
}
