import React, { useState } from 'react';
import { FOOD_DB as initialFood } from '../../utils/mockData';

export default function KelolaMakananView() {
  const [foods, setFoods] = useState(initialFood);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nama: '', kalori: '' });

  const showForm = (id) => {
    if (id) {
      const food = foods.find(f => f.id === id);
      setEditingId(id);
      setFormData({ nama: food.nama, kalori: food.kalori });
    } else {
      setEditingId('new');
      setFormData({ nama: '', kalori: '' });
    }
  };

  const hideForm = () => setEditingId(null);

  const handleSave = () => {
    if (!formData.nama || !formData.kalori) return alert('Nama makanan dan kalori wajib diisi.');
    if (editingId && editingId !== 'new') {
      setFoods(foods.map(f => f.id === editingId ? { ...f, ...formData } : f));
    } else {
      setFoods([...foods, { id: 'f' + Date.now(), ...formData }]);
    }
    hideForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus makanan ini dari daftar Kalkulator Kalori?')) {
      setFoods(foods.filter(f => f.id !== id));
    }
  };

  return (
    <>
      <div className="callout" style={{ marginBottom: '16px' }}>
        <svg className="ic"><use href="#i-alert" /></svg>
        <span>Data ini menjadi pilihan makanan pada fitur Kalkulator Kalori (publik & akun Warga). Tambahkan jenis makanan lokal yang belum tersedia di daftar.</span>
      </div>
      <div className="card">
        <div className="section-head">
          <h3>Daftar Makanan & Kalori</h3>
          <button className="btn btn-violet btn-sm" onClick={() => showForm()}><svg className="ic ic-sm"><use href="#i-plus" /></svg>Tambah Makanan</button>
        </div>
        
        {editingId && (
          <div className="card pad-sm" style={{ background: 'var(--cyan-bg)', border: 'none', marginBottom: '16px' }}>
            <div className="form-grid">
              <div className="form-field"><label>Nama Makanan (+ takaran porsi)</label><input type="text" value={formData.nama} onChange={(e) => setFormData({ ...formData, nama: e.target.value })} placeholder="mis. Soto Ayam (1 mangkuk)" /></div>
              <div className="form-field"><label>Kalori per Porsi (kkal)</label><input type="number" value={formData.kalori} onChange={(e) => setFormData({ ...formData, kalori: e.target.value })} placeholder="mis. 220" /></div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
              <button className="btn btn-violet" onClick={handleSave}>{editingId === 'new' ? 'Simpan Makanan Baru' : 'Simpan Perubahan'}</button>
              <button className="btn btn-outline" onClick={hideForm}>Batal</button>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table">
            <thead><tr><th>Nama Makanan</th><th>Kalori / Porsi</th><th style={{ width: '160px' }}></th></tr></thead>
            <tbody>
              {foods.map(f => (
                <tr key={f.id}>
                  <td>{f.nama}</td>
                  <td>{f.kalori} kkal</td>
                  <td style={{ display: 'flex', gap: '6px' }}>
                    <button className="btn btn-sm btn-outline" onClick={() => showForm(f.id)}><svg className="ic ic-sm"><use href="#i-edit" /></svg>Edit</button>
                    <button className="btn btn-sm btn-outline" style={{ color: 'var(--rose-deep)' }} onClick={() => handleDelete(f.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
