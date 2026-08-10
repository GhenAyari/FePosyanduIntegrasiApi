import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function KelolaMakananView() {
  const [foods, setFoods] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nama_makanan: '', kalori_per_porsi: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/makanan');
      setFoods(response.data.data);
    } catch (err) {
      console.error("Gagal memuat data makanan", err);
    }
  };

  const showForm = (id) => {
    setMessage({ type: '', text: '' });
    if (id) {
      const food = foods.find(f => f.id === id);
      setEditingId(id);
      setFormData({ nama_makanan: food.nama_makanan, kalori_per_porsi: food.kalori_per_porsi });
    } else {
      setEditingId('new');
      setFormData({ nama_makanan: '', kalori_per_porsi: '' });
    }
  };

  const hideForm = () => setEditingId(null);

  const handleSave = async () => {
    if (!formData.nama_makanan || !formData.kalori_per_porsi) {
      return alert('Nama makanan dan kalori wajib diisi.');
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });
    const token = localStorage.getItem('auth_token');

    try {
      if (editingId && editingId !== 'new') {
        // Edit Makanan
        await axios.put(`http://127.0.0.1:8000/api/makanan/${editingId}`, formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMessage({ type: 'success', text: 'Makanan berhasil diperbarui.' });
      } else {
        // Tambah Makanan Baru
        await axios.post('http://127.0.0.1:8000/api/makanan', formData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setMessage({ type: 'success', text: 'Makanan baru berhasil ditambahkan.' });
      }
      hideForm();
      fetchFoods(); // Segarkan tabel
    } catch (err) {
      setMessage({ type: 'error', text: 'Gagal menyimpan data makanan.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Hapus makanan ini dari daftar Kalkulator Kalori?')) {
      try {
        const token = localStorage.getItem('auth_token');
        await axios.delete(`http://127.0.0.1:8000/api/makanan/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setFoods(foods.filter(f => f.id !== id));
        setMessage({ type: 'success', text: 'Data makanan dihapus.' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (err) {
        setMessage({ type: 'error', text: 'Gagal menghapus data makanan.' });
      }
    }
  };

  return (
    <>
      <div className="callout" style={{ marginBottom: '16px' }}>
        <svg className="ic"><use href="#i-alert" /></svg>
        <span>Data ini menjadi pilihan makanan pada fitur Kalkulator Kalori (publik & akun Warga). Tambahkan jenis makanan lokal yang belum tersedia di daftar.</span>
      </div>

      {message.text && (
        <div style={{ padding: '12px', marginBottom: '16px', borderRadius: '6px', fontSize: '14px', backgroundColor: message.type === 'error' ? '#fde8e8' : '#e1fce8', color: message.type === 'error' ? '#c81e1e' : '#036c2a' }}>
          <b>Info Sistem:</b> {message.text}
        </div>
      )}

      <div className="card">
        <div className="section-head">
          <h3>Daftar Makanan & Kalori</h3>
          <button className="btn btn-violet btn-sm" onClick={() => showForm()}><svg className="ic ic-sm"><use href="#i-plus" /></svg>Tambah Makanan</button>
        </div>

        {editingId && (
          <div className="card pad-sm" style={{ background: 'var(--cyan-bg)', border: 'none', marginBottom: '16px' }}>
            <div className="form-grid">
              <div className="form-field">
                <label>Nama Makanan (+ takaran porsi)</label>
                <input type="text" value={formData.nama_makanan} onChange={(e) => setFormData({ ...formData, nama_makanan: e.target.value })} placeholder="mis. Soto Ayam (1 mangkuk)" />
              </div>
              <div className="form-field">
                <label>Kalori per Porsi (kkal)</label>
                <input type="number" value={formData.kalori_per_porsi} onChange={(e) => setFormData({ ...formData, kalori_per_porsi: e.target.value })} placeholder="mis. 220" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button className="btn btn-violet" onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Menyimpan...' : (editingId === 'new' ? 'Simpan Makanan Baru' : 'Simpan Perubahan')}
              </button>
              <button className="btn btn-outline" onClick={hideForm}>Batal</button>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>Nama Makanan</th><th>Kalori / Porsi</th><th style={{ width: '160px' }}>Aksi</th></tr></thead>
            <tbody>
              {foods.length === 0 ? (
                <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px' }}>Memuat data makanan...</td></tr>
              ) : (
                foods.map(f => (
                  <tr key={f.id}>
                    <td>{f.nama_makanan}</td>
                    <td>{f.kalori_per_porsi} kkal</td>
                    <td style={{ display: 'flex', gap: '6px' }}>
                      <button className="btn btn-sm btn-outline" onClick={() => showForm(f.id)}><svg className="ic ic-sm"><use href="#i-edit" /></svg>Edit</button>
                      <button className="btn btn-sm btn-outline" style={{ color: 'var(--rose-deep)' }} onClick={() => handleDelete(f.id)}>Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}