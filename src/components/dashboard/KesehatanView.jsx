import React, { useState } from 'react';
import axios from 'axios';

const KELOMPOK_CALC = {
  balita: { title: 'Kalkulator Status Gizi', label: 'Status Gizi (BB/TB) — bukan pengganti penilaian ahli gizi' },
  remaja: { title: 'Kalkulator IMT', label: 'IMT — bukan pengganti penilaian ahli gizi' },
  hamil: { title: 'Kalkulator IMT', label: 'IMT Ibu Hamil — bukan pengganti penilaian ahli gizi' },
  lansia: { title: 'Kalkulator IMT', label: 'IMT — bukan pengganti penilaian ahli gizi' }
};

export default function KesehatanView() {
  const [target, setTarget] = useState('balita');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // === STATE KHUSUS UNTUK FORM BALITA ===
  const [balitaData, setBalitaData] = useState({
    anak_id: '1', // Sementara di-hardcode ke 1 untuk testing. Di real app, ini pakai dropdown pilih anak.
    tanggal_periksa: new Date().toISOString().split('T')[0], // Tanggal hari ini
    umur_bulan: '',
    berat_badan: '',
    tinggi_badan: '',
    lingkar_kepala: '',
    lingkar_lengan: '',
    catatan_perkembangan: '',
    status_gizi: 'Normal' // Contoh default
  });

  const [imunisasi, setImunisasi] = useState([]);
  const [fotoFiles, setFotoFiles] = useState(null);

  // Fungsi untuk handle perubahan input teks/angka
  const handleInputChange = (e) => {
    setBalitaData({ ...balitaData, [e.target.name]: e.target.value });
  };

  // Fungsi untuk toggle pilihan imunisasi (bisa pilih lebih dari 1)
  const toggleImunisasi = (namaVaksin) => {
    if (imunisasi.includes(namaVaksin)) {
      setImunisasi(imunisasi.filter(item => item !== namaVaksin));
    } else {
      setImunisasi([...imunisasi, namaVaksin]);
    }
  };

  // Fungsi untuk menangkap file foto
  const handleFileChange = (e) => {
    setFotoFiles(e.target.files);
  };

  // Fungsi Submit API
  const handleSubmit = async (statusForm) => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    // Gunakan FormData karena kita mengirim File Gambar
    const formData = new FormData();
    formData.append('anak_id', balitaData.anak_id);
    formData.append('tanggal_periksa', balitaData.tanggal_periksa);
    formData.append('umur_bulan', balitaData.umur_bulan);
    formData.append('berat_badan', balitaData.berat_badan);
    formData.append('tinggi_badan', balitaData.tinggi_badan);
    formData.append('lingkar_kepala', balitaData.lingkar_kepala);
    formData.append('lingkar_lengan', balitaData.lingkar_lengan);
    formData.append('catatan_perkembangan', balitaData.catatan_perkembangan);
    formData.append('status_gizi', balitaData.status_gizi);
    formData.append('status_form', statusForm); // 'draft' atau 'final'

    // Append array imunisasi satu per satu
    imunisasi.forEach((item, index) => {
      formData.append(`imunisasi[${index}]`, item);
    });

    // Append file foto jika ada (maksimal 5 sesuai validasi Laravel)
    if (fotoFiles) {
      for (let i = 0; i < fotoFiles.length; i++) {
        formData.append('dokumentasi_foto[]', fotoFiles[i]);
      }
    }

    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.post('http://127.0.0.1:8000/api/pemeriksaan-balita', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Wajib untuk upload file!
        }
      });

      setMessage({ type: 'success', text: response.data.pesan });

      // Kosongkan form setelah sukses
      if (statusForm === 'final') {
        setBalitaData({ ...balitaData, umur_bulan: '', berat_badan: '', tinggi_badan: '', lingkar_kepala: '', lingkar_lengan: '', catatan_perkembangan: '' });
        setImunisasi([]);
        setFotoFiles(null);
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Gagal menyimpan data. Pastikan semua kolom terisi dengan benar.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="section-head">
          <h3>Pilih Kelompok Sasaran</h3>
          <span className="badge badge-violet">Jadwal rutin: 3 Agustus 2026</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div className={`target-chip cyan ${target === 'balita' ? 'active' : ''}`} onClick={() => setTarget('balita')}><span className="dot"></span>Bayi & Balita</div>
          <div className={`target-chip orange ${target === 'remaja' ? 'active' : ''}`} onClick={() => setTarget('remaja')}><span className="dot"></span>Remaja</div>
          <div className={`target-chip magenta ${target === 'hamil' ? 'active' : ''}`} onClick={() => setTarget('hamil')}><span className="dot"></span>Ibu Hamil</div>
          <div className={`target-chip green ${target === 'lansia' ? 'active' : ''}`} onClick={() => setTarget('lansia')}><span className="dot"></span>Orang Tua & Lansia</div>
        </div>
      </div>

      {message.text && (
        <div style={{ padding: '12px', marginBottom: '16px', borderRadius: '6px', backgroundColor: message.type === 'error' ? '#fde8e8' : '#e1fce8', color: message.type === 'error' ? '#c81e1e' : '#036c2a' }}>
          {message.text}
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="section-head">
            <h3>Form Pemeriksaan — {target === 'balita' ? 'Bayi & Balita' : target === 'remaja' ? 'Remaja' : target === 'hamil' ? 'Ibu Hamil' : 'Orang Tua & Lansia'}</h3>
          </div>

          {target === 'balita' && (
            <div className="form-grid kel-subform">
              {/* Note: Dummy Nama Anak (Di real app pakai select option ID anak) */}
              <div className="form-field full"><label>ID / Nama Anak (Testing)</label><input type="text" name="anak_id" value={balitaData.anak_id} onChange={handleInputChange} /></div>

              <div className="form-field"><label>Umur (bulan)</label><input type="number" name="umur_bulan" value={balitaData.umur_bulan} onChange={handleInputChange} placeholder="mis. 18" /></div>
              <div className="form-field"><label>Berat Badan (kg)</label><input type="number" step="0.1" name="berat_badan" value={balitaData.berat_badan} onChange={handleInputChange} placeholder="mis. 10.2" /></div>
              <div className="form-field"><label>Tinggi Badan (cm)</label><input type="number" step="0.1" name="tinggi_badan" value={balitaData.tinggi_badan} onChange={handleInputChange} placeholder="mis. 78" /></div>
              <div className="form-field"><label>Lingkar Kepala (cm)</label><input type="number" step="0.1" name="lingkar_kepala" value={balitaData.lingkar_kepala} onChange={handleInputChange} placeholder="opsional" /></div>
              <div className="form-field"><label>Lingkar Lengan (cm)</label><input type="number" step="0.1" name="lingkar_lengan" value={balitaData.lingkar_lengan} onChange={handleInputChange} placeholder="opsional" /></div>

              <div className="form-field full"><label>Catatan Perkembangan Anak</label><textarea rows="2" name="catatan_perkembangan" value={balitaData.catatan_perkembangan} onChange={handleInputChange} placeholder="Hasil wawancara perkembangan..."></textarea></div>

              <div className="form-field full">
                <label>Status Imunisasi</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {/* Contoh Imunisasi Dinamis */}
                  {['BCG', 'Polio I', 'Polio II', 'DPT-HB II'].map(vaksin => (
                    <span
                      key={vaksin}
                      onClick={() => toggleImunisasi(vaksin)}
                      className={`badge ${imunisasi.includes(vaksin) ? 'badge-green' : 'badge-outline'}`}
                      style={{ cursor: 'pointer' }}
                    >
                      {imunisasi.includes(vaksin) && <svg className="ic ic-sm"><use href="#i-check" /></svg>}
                      {vaksin}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Form statis kelompok lainnya disembunyikan sementara untuk fokus */}
          {target === 'remaja' && (<div className="form-grid kel-subform"><p>Form Remaja belum terhubung API</p></div>)}
          {target === 'hamil' && (<div className="form-grid kel-subform"><p>Form Ibu Hamil belum terhubung API</p></div>)}
          {target === 'lansia' && (<div className="form-grid kel-subform"><p>Form Lansia belum terhubung API</p></div>)}

          {target === 'balita' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              <button onClick={() => handleSubmit('draft')} disabled={isLoading} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                {isLoading ? 'Menyimpan...' : 'Simpan Draf'}
              </button>
              <button onClick={() => handleSubmit('final')} disabled={isLoading} className="btn btn-violet" style={{ flex: 1, justifyContent: 'center' }}>
                {isLoading ? 'Menyimpan...' : 'Simpan Data'}
              </button>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ background: 'var(--cyan-bg)', border: 'none' }}>
            <div className="section-head"><h3 style={{ color: 'var(--cyan-deep)' }}><svg className="ic"><use href="#i-calculator" /></svg><span>{KELOMPOK_CALC[target].title}</span></h3></div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cyan-deep)', opacity: .85, marginBottom: '12px' }}>
              Terhitung otomatis dari berat, tinggi & umur yang diisi di form.
            </p>
            <div className="result-box">
              <div>
                <div className="r-num">{balitaData.status_gizi}</div>
                <div className="r-label">{KELOMPOK_CALC[target].label}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-head"><h3>Dokumentasi Foto</h3></div>
            <div className="upload-box" style={{ position: 'relative', overflow: 'hidden' }}>
              <input
                type="file"
                multiple
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              />
              <svg className="ic ic-lg"><use href="#i-camera" /></svg>
              <span><b>Tap untuk unggah</b> foto kegiatan</span>
              {fotoFiles ? <span style={{ color: 'var(--cyan-deep)' }}>{fotoFiles.length} foto terpilih</span> : <span>Maks. 5 foto · 2MB/foto · JPG/PNG</span>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}