import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ProfilView() {
  // PERUBAHAN: latitude dan longitude dihapus, diganti menjadi link_gmaps
  const [formData, setFormData] = useState({
    strata: 'Purnama', program_terintegrasi: '', pj_umum: '', pj_operasional: '',
    ketua_pelaksana: '', sekretaris: '', bendahara: '', jml_kader_aktif: 0,
    jml_kader_tidak_aktif: 0, bidan_desa: '', petugas_kb: '', tempat_pelayanan: 'Gedung Sendiri',
    timbangan: 'Tersedia', buku_kia: 'Tersedia', formulir_sip: 'Tersedia', blanko_skdn: 'Tersedia',
    ape: 'Tersedia', sarana_lain: '', link_gmaps: '', kontak_darurat: '', alamat: ''
  });

  const [foto, setFoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfil = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('http://127.0.0.1:8000/api/posyandu/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.data.data) {
          // Memastikan data yang tidak null langsung terisi ke form
          const dataDariDb = response.data.data;
          setFormData(prev => ({ ...prev, ...dataDariDb }));
        }
      } catch (err) {
        console.error("Gagal memuat profil posyandu", err);
      }
    };
    fetchProfil();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('auth_token');
      const submitData = new FormData();

      // Memasukkan semua isi form ke paket pengiriman
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key] === null ? '' : formData[key]);
      });
      if (foto) submitData.append('foto', foto);

      await axios.post('http://127.0.0.1:8000/api/posyandu/me/update', submitData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      setMessage({ type: 'success', text: 'Seluruh data Profil, Sarana, dan Lokasi berhasil disimpan!' });
      window.scrollTo(0, 0);
    } catch (err) {
      // Menangkap pesan error asli dari backend Laravel jika kolom DB tidak cocok
      const errMsg = err.response?.data?.message || err.message;
      setMessage({ type: 'error', text: `Gagal menyimpan. Pesan sistem: ${errMsg} (Pastikan kolom database sudah sesuai)` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave}>
      {message.text && (
        <div style={{ padding: '12px', marginBottom: '16px', borderRadius: '6px', fontSize: '14px', backgroundColor: message.type === 'error' ? '#fde8e8' : '#e1fce8', color: message.type === 'error' ? '#c81e1e' : '#036c2a' }}>
          <b>Info Sistem:</b> {message.text}
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="section-head"><h3>Profil Posyandu</h3><span className="badge badge-violet">Data Publik</span></div>
          <div className="form-grid">
            <div className="form-field"><label>Strata Posyandu</label>
              <select name="strata" value={formData.strata || ''} onChange={handleChange}>
                <option value="Purnama">Purnama</option><option value="Mandiri">Mandiri</option><option value="Madya">Madya</option><option value="Pratama">Pratama</option>
              </select>
            </div>
            <div className="form-field"><label>Program Terintegrasi</label><input name="program_terintegrasi" value={formData.program_terintegrasi || ''} onChange={handleChange} placeholder="mis. PAUD, BKB" /></div>
            <div className="form-field"><label>Alamat Lengkap</label><input name="alamat" value={formData.alamat || ''} onChange={handleChange} placeholder="Jl. Contoh RT 01" /></div>
            <div className="form-field"><label>Penanggung Jawab Umum</label><input name="pj_umum" value={formData.pj_umum || ''} onChange={handleChange} /></div>
            <div className="form-field"><label>Penanggung Jawab Operasional</label><input name="pj_operasional" value={formData.pj_operasional || ''} onChange={handleChange} /></div>
            <div className="form-field"><label>Ketua Pelaksana</label><input name="ketua_pelaksana" value={formData.ketua_pelaksana || ''} onChange={handleChange} /></div>
            <div className="form-field"><label>Sekretaris</label><input name="sekretaris" value={formData.sekretaris || ''} onChange={handleChange} /></div>
            <div className="form-field"><label>Bendahara</label><input name="bendahara" value={formData.bendahara || ''} onChange={handleChange} /></div>
            <div className="form-field"><label>Jumlah Kader Aktif</label><input type="number" name="jml_kader_aktif" value={formData.jml_kader_aktif || ''} onChange={handleChange} /></div>
            <div className="form-field"><label>Jumlah Kader Tidak Aktif</label><input type="number" name="jml_kader_tidak_aktif" value={formData.jml_kader_tidak_aktif || ''} onChange={handleChange} /></div>
            <div className="form-field"><label>Bidan Desa</label><input name="bidan_desa" value={formData.bidan_desa || ''} onChange={handleChange} /></div>
            <div className="form-field"><label>Petugas KB</label><input name="petugas_kb" value={formData.petugas_kb || ''} onChange={handleChange} /></div>
          </div>
        </div>

        <div className="card">
          <div className="section-head"><h3>Data Sarana Posyandu</h3></div>
          <div className="form-grid">
            <div className="form-field"><label>Tempat Pelayanan</label>
              <select name="tempat_pelayanan" value={formData.tempat_pelayanan || ''} onChange={handleChange}>
                <option value="Gedung Sendiri">Gedung Sendiri</option><option value="Menumpang">Menumpang</option><option value="Sewa">Sewa</option>
              </select>
            </div>
            <div className="form-field"><label>Timbangan Bayi/Balita</label>
              <select name="timbangan" value={formData.timbangan || ''} onChange={handleChange}>
                <option value="Tersedia">Tersedia</option><option value="Tidak Tersedia">Tidak Tersedia</option>
              </select>
            </div>
            <div className="form-field"><label>Buku KIA</label>
              <select name="buku_kia" value={formData.buku_kia || ''} onChange={handleChange}>
                <option value="Tersedia">Tersedia</option><option value="Tidak Tersedia">Tidak Tersedia</option>
              </select>
            </div>
            <div className="form-field"><label>Formulir SIP</label>
              <select name="formulir_sip" value={formData.formulir_sip || ''} onChange={handleChange}>
                <option value="Tersedia">Tersedia</option><option value="Tidak Tersedia">Tidak Tersedia</option>
              </select>
            </div>
            <div className="form-field"><label>Blanko SKDN</label>
              <select name="blanko_skdn" value={formData.blanko_skdn || ''} onChange={handleChange}>
                <option value="Tersedia">Tersedia</option><option value="Tidak Tersedia">Tidak Tersedia</option>
              </select>
            </div>
            <div className="form-field"><label>Alat Peraga Edukasi (APE)</label>
              <select name="ape" value={formData.ape || ''} onChange={handleChange}>
                <option value="Tersedia">Tersedia</option><option value="Tidak Tersedia">Tidak Tersedia</option>
              </select>
            </div>
            <div className="form-field full"><label>Sarana Lain</label><input name="sarana_lain" value={formData.sarana_lain || ''} onChange={handleChange} placeholder="mis. Ruang tunggu, dapur sehat" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginTop: '16px' }}>
        <div className="card">
          <div className="section-head"><h3>Lokasi Geografis (G-Maps)</h3></div>
          <p style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 500, marginBottom: '12px' }}>Salin dan tempel (copy-paste) link tautan dari Google Maps lokasi Posyandu Anda.</p>

          {/* PERUBAHAN: Input link gmaps penuh */}
          <div className="form-grid" style={{ marginTop: '12px' }}>
            <div className="form-field full">
              <label>Tautan (Link) Google Maps</label>
              <input
                name="link_gmaps"
                value={formData.link_gmaps || ''}
                onChange={handleChange}
                placeholder="misal: https://maps.app.goo.gl/xxxxx"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="section-head"><h3>Foto & Kontak Darurat</h3></div>
          <p style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 500, marginBottom: '12px' }}>Foto bangunan ini akan tampil di Beranda 9 Posyandu.</p>
          <div className="form-field">
            <input type="file" onChange={handleFileChange} accept="image/*" style={{ padding: '8px', border: '1px dashed #ccc', width: '100%' }} />
          </div>
          <div className="form-field" style={{ marginTop: '16px' }}>
            <label>Nomor Kontak Darurat Posyandu</label>
            <input name="kontak_darurat" value={formData.kontak_darurat || ''} onChange={handleChange} placeholder="0812-5000-1001" />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'right' }}>
        <button type="submit" className="btn btn-violet" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan Seluruh Perubahan Data'}
        </button>
      </div>
    </form>
  );
}