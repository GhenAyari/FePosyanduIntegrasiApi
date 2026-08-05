import React, { useState } from 'react';
import { ARTIKEL_DB } from '../../utils/mockData';

export default function ArtikelView() {
  const [articles, setArticles] = useState(ARTIKEL_DB);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ judul: '', kategori: 'Kesehatan', isi: '' });

  const ARTIKEL_ICON = { Kesehatan: ['i-activity', 'cyan'], Pendidikan: ['i-book', 'orange'], Sosial: ['i-leaf', 'green'], Lainnya: ['i-file', 'magenta'] };

  const handleEdit = (id) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      setEditingId(id);
      setFormData({ judul: article.judul, kategori: article.kategori, isi: article.isi });
    }
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({ judul: '', kategori: 'Kesehatan', isi: '' });
  };

  const handleSave = (status) => {
    if (!formData.judul || !formData.isi) return alert('Judul dan isi artikel wajib diisi.');
    if (editingId) {
      setArticles(articles.map(a => a.id === editingId ? { ...a, ...formData, status } : a));
    } else {
      setArticles([{ id: 'a' + Date.now(), ...formData, penulis: 'Kader Melati', status }, ...articles]);
    }
    handleNew();
  };

  const toggleStatus = (id) => {
    setArticles(articles.map(a => a.id === id ? { ...a, status: a.status === 'draf' ? 'publish' : 'draf' } : a));
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus artikel ini?')) {
      setArticles(articles.filter(a => a.id !== id));
      if (editingId === id) handleNew();
    }
  };

  return (
    <div className="grid grid-2" style={{ gridTemplateColumns: '1.1fr 1fr' }}>
      <div>
        <div className="section-head">
          <h3>Artikel & Berita Posyandu</h3>
          <button className="btn btn-violet btn-sm" onClick={handleNew}><svg className="ic ic-sm"><use href="#i-plus" /></svg>Tulis Artikel</button>
        </div>
        <div className="grid grid-2">
          {articles.length === 0 ? (
            <p style={{ gridColumn: '1/-1', color: 'var(--ink-soft)', fontWeight: 600, fontSize: '12.5px', padding: '8px 2px' }}>Belum ada artikel.</p>
          ) : (
            articles.map(a => {
              const [ico, color] = ARTIKEL_ICON[a.kategori] || ARTIKEL_ICON.Lainnya;
              const isDraf = a.status === 'draf';
              return (
                <div key={a.id} className={`article-card ${isDraf ? 'is-draft' : ''} ${editingId === a.id ? 'editing' : ''}`}>
                  <div className="article-thumb" style={{ background: `var(--${color}-bg)`, color: `var(--${color}-deep)` }}>
                    <svg className="ic ic-xl"><use href={`#${ico}`} /></svg>
                  </div>
                  <div className="article-body">
                    <span className="article-cat" style={{ color: `var(--${color}-deep)` }}>{a.kategori}</span>
                    <p className="article-title">{a.judul}</p>
                    <div className="article-status-row">
                      <p className="article-meta">{a.penulis}</p>
                      <span className={`badge ${isDraf ? 'badge-orange' : 'badge-green'}`}>{isDraf ? 'Draf' : 'Dipublikasikan'}</span>
                    </div>
                  </div>
                  <div className="article-actions">
                    <button onClick={() => handleEdit(a.id)}><svg className="ic ic-sm"><use href="#i-edit" /></svg>Edit</button>
                    <button onClick={() => toggleStatus(a.id)}><svg className="ic ic-sm"><use href={isDraf ? '#i-check' : '#i-eye-off'} /></svg>{isDraf ? 'Publikasikan' : 'Jadikan Draf'}</button>
                    <button className="act-danger" onClick={() => handleDelete(a.id)}><svg className="ic ic-sm"><use href="#i-trash" /></svg>Hapus</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="card">
        <div className="section-head"><h3>{editingId ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h3></div>
        {editingId && (
          <div className="article-form-hint active">
            <svg className="ic ic-sm"><use href="#i-edit" /></svg><span>Mengedit: {formData.judul}</span>
            <button type="button" onClick={handleNew}>Batal, tulis baru</button>
          </div>
        )}
        <div className="form-field" style={{ marginBottom: '12px' }}><label>Judul</label><input value={formData.judul} onChange={(e) => setFormData({ ...formData, judul: e.target.value })} placeholder="Judul artikel" /></div>
        <div className="form-field" style={{ marginBottom: '12px' }}>
          <label>Kategori</label>
          <select value={formData.kategori} onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}>
            <option>Kesehatan</option><option>Pendidikan</option><option>Sosial</option><option>Lainnya</option>
          </select>
        </div>
        <div className="form-field" style={{ marginBottom: '12px' }}><label>Isi Artikel</label><textarea rows="5" value={formData.isi} onChange={(e) => setFormData({ ...formData, isi: e.target.value })} placeholder="Tulis isi artikel di sini..."></textarea></div>
        <div className="upload-box" style={{ marginBottom: '14px' }}><svg className="ic"><use href="#i-image" /></svg><span><b>Tambah foto</b> pendukung (opsional)</span></div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => handleSave('draf')}>Simpan Draf</button>
          <button className="btn btn-violet" style={{ flex: 1, justifyContent: 'center' }} onClick={() => handleSave('publish')}>Publikasikan</button>
        </div>
      </div>
    </div>
  );
}
