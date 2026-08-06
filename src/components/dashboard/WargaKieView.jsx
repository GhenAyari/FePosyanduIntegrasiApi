import React from 'react';

export default function WargaKieView() {
  return (
    <div className="grid grid-2">
      <div className="article-card">
        <div className="article-thumb" style={{ background: 'var(--cyan-bg)', color: 'var(--cyan-deep)' }}><i className="bi bi-journal-bookmark-fill" style={{ fontSize: '24px' }}></i></div>
        <div className="article-body"><span className="article-cat" style={{ color: 'var(--cyan-deep)' }}>Literasi Digital</span><p className="article-title">Panduan Orang Tua Mendampingi Anak Bermain Gawai</p></div>
      </div>
      <div className="article-card">
        <div className="article-thumb" style={{ background: 'var(--orange-bg)', color: 'var(--orange-deep)' }}><i className="bi bi-shield-fill-check" style={{ fontSize: '24px' }}></i></div>
        <div className="article-body"><span className="article-cat" style={{ color: 'var(--orange-deep)' }}>Kesiapsiagaan Bencana</span><p className="article-title">Langkah Siaga Menghadapi Banjir di Musim Hujan</p></div>
      </div>
    </div>
  );
}
