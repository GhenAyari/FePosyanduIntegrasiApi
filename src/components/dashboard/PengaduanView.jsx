import React, { useState } from 'react';
import axios from 'axios';

export default function PengaduanView() {
  const [tab, setTab] = useState(0);

  // Sub-chip active index states
  const [subTab0, setSubTab0] = useState(0);
  const [subTab1, setSubTab1] = useState(0);
  const [subTab2, setSubTab2] = useState(0);
  const [subTab3, setSubTab3] = useState(0);
  const [subTab4, setSubTab4] = useState(0);

  // === STATE UNTUK API ===
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // State Dinamis untuk Formulir Identifikasi (Kiri)
  const [formIden, setFormIden] = useState({});
  const [fotoIden, setFotoIden] = useState(null);

  // State untuk Pengaduan Masyarakat (Kanan)
  const [formPengaduan, setFormPengaduan] = useState({
    nama_pelapor: '', jenis_kelamin: 'L', nik: '', no_hp: '', alamat: '', isi_keluhan: '', lokasi_masalah: ''
  });
  const [lampiranPengaduan, setLampiranPengaduan] = useState(null);

  // 🔽🔽🔽 BAGIAN REKAP DIPINDAHKAN KE SINI 🔽🔽🔽
  const [rekapPengaduan, setRekapPengaduan] = useState([]);
  const [rekapFormulir, setRekapFormulir] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);

  const fetchRekap = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      // Panggil pengaduan
      const resPengaduan = await axios.get('http://127.0.0.1:8000/api/pengaduan-masyarakat', { headers: { 'Authorization': `Bearer ${token}` } });
      setRekapPengaduan(resPengaduan.data.data);

      // Panggil formulir
      const resFormulir = await axios.get('http://127.0.0.1:8000/api/formulir-identifikasi', { headers: { 'Authorization': `Bearer ${token}` } });
      setRekapFormulir(resFormulir.data.data);
    } catch (err) {
      console.error('Gagal mengambil data rekap:', err);
    }
  };

  React.useEffect(() => {
    fetchRekap();
  }, []);
  // 🔼🔼🔼 SAMPAI SINI 🔼🔼🔼

  // === HANDLER INPUT ===
  const handleIdenChange = (e) => {
    setFormIden({ ...formIden, [e.target.name]: e.target.value });
  };

  const handlePengaduanChange = (e) => {
    setFormPengaduan({ ...formPengaduan, [e.target.name]: e.target.value });
  };

  // Reset form saat ganti sub-tab atau tab
  const resetFormIden = () => {
    setFormIden({});
    setFotoIden(null);
    setMessage({ type: '', text: '' });
  };

  // === MAP NAMA BIDANG & SUB-BIDANG UNTUK BACKEND ===
  const BIDANG_MAP = ['pendidikan', 'pekerjaan_umum', 'perumahan_rakyat', 'trantibumlinmas', 'sosial'];

  const getSubBidangName = () => {
    if (tab === 0) return ['Anak Usia Dini (0-6 th)', 'Perpustakaan / Pojok Baca', 'Literasi Digital Ortu', 'Inventaris APE'][subTab0];
    if (tab === 1) return ['Edukasi Air Bersih & Limbah', 'Identifikasi Embung Air Baku', 'Jaringan Air Perdesaan', 'Sumur Air Tanah', 'Pembangunan Jalan Desa'][subTab1];
    if (tab === 2) return ['Rumah Tidak Layak Huni', 'KIE Lingkungan Bersih & Sehat', 'Pemanfaatan Pekarangan', 'Biopori Rumah Tangga'][subTab2];
    if (tab === 3) return ['Korban Trauma & Psikososial', 'Penyuluhan & Evaluasi Trauma', 'KIE & Simulasi Bencana', 'Insiden Kamtibmas', 'Sosialisasi Pencegahan', 'Patroli Keamanan'][subTab3];
    if (tab === 4) return ['KIE Gender & Inklusi Sosial', 'Pendataan Fakir Miskin', 'Verifikasi Sosial-Ekonomi', 'Penyaluran Bantuan Sosial'][subTab4];
    return 'Lainnya';
  };

  // === SUBMIT FORMULIR IDENTIFIKASI ===
  const submitIdentifikasi = async () => {
    setIsLoading(true); setMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('auth_token');
      const formData = new FormData();

      formData.append('bidang', BIDANG_MAP[tab]);
      formData.append('sub_bidang', getSubBidangName());
      formData.append('data_formulir', JSON.stringify(formIden));

      if (fotoIden) {
        for (let i = 0; i < fotoIden.length; i++) formData.append(`dokumentasi_foto[${i}]`, fotoIden[i]);
      }

      const response = await axios.post('http://127.0.0.1:8000/api/formulir-identifikasi', formData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      // --- PERBAIKANNYA DI SINI ---
      // 1. Reset/kosongkan isi form dulu
      resetFormIden();
      // 2. BARU tampilkan pesan suksesnya!
      setMessage({ type: 'success', text: response.data.pesan });
      fetchRekap();


    } catch (err) {
      const pesanAsli = err.response?.data?.pesan || err.response?.data?.message || err.message;
      setMessage({ type: 'error', text: `Gagal menyimpan formulir: ${pesanAsli}` });
    } finally {
      setIsLoading(false);
    }
  };

  // === SUBMIT PENGADUAN MASYARAKAT ===
  const submitPengaduan = async () => {
    if (formPengaduan.nik.length !== 16) {
      setMessage({ type: 'error', text: 'Gagal: NIK Pelapor harus 16 digit!' });
      return;
    }

    setIsLoading(true); setMessage({ type: '', text: '' });
    try {
      const token = localStorage.getItem('auth_token');
      const formData = new FormData();

      formData.append('bidang', BIDANG_MAP[tab]);
      Object.keys(formPengaduan).forEach(key => {
        formData.append(key, formPengaduan[key]);
      });

      if (lampiranPengaduan) {
        for (let i = 0; i < lampiranPengaduan.length; i++) formData.append(`lampiran[${i}]`, lampiranPengaduan[i]);
      }

      const response = await axios.post('http://127.0.0.1:8000/api/pengaduan-masyarakat', formData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });

      setMessage({ type: 'success', text: response.data.pesan });
      setFormPengaduan({ nama_pelapor: '', jenis_kelamin: 'L', nik: '', no_hp: '', alamat: '', isi_keluhan: '', lokasi_masalah: '' });
      setLampiranPengaduan(null);
      fetchRekap();
    } catch (err) {
      const pesanAsli = err.response?.data?.pesan || err.response?.data?.message || err.message;
      setMessage({ type: 'error', text: `Gagal mengirim pengaduan: ${pesanAsli}` });
    } finally {
      setIsLoading(false);
    }
  };
  const fetchRekapPengaduan = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://127.0.0.1:8000/api/pengaduan-masyarakat', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRekapPengaduan(response.data.data);
      const resFormulir = await axios.get('http://127.0.0.1:8000/api/formulir-identifikasi', { headers: { 'Authorization': `Bearer ${token}` } });
      setRekapFormulir(resFormulir.data.data);
    } catch (err) {
      console.error('Gagal mengambil data rekap:', err);
    }
  };

  // Panggil data rekap saat halaman pertama kali dibuka
  React.useEffect(() => {
    fetchRekap();
  }, []);

  return (
    <>
      {/* Bidang Main Tabs */}
      <div className="tabs" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '16px' }}>
        <button className={`tab-btn ${tab === 0 ? 'active' : ''}`} onClick={() => { setTab(0); resetFormIden(); }}>
          <i className="bi bi-book-fill me-1"></i>Pendidikan
        </button>
        <button className={`tab-btn ${tab === 1 ? 'active' : ''}`} onClick={() => { setTab(1); resetFormIden(); }}>
          <i className="bi bi-droplet-fill me-1"></i>Pekerjaan Umum
        </button>
        <button className={`tab-btn ${tab === 2 ? 'active' : ''}`} onClick={() => { setTab(2); resetFormIden(); }}>
          <i className="bi bi-house-door-fill me-1"></i>Perumahan Rakyat
        </button>
        <button className={`tab-btn ${tab === 3 ? 'active' : ''}`} onClick={() => { setTab(3); resetFormIden(); }}>
          <i className="bi bi-shield-fill-check me-1"></i>Trantibumlinmas
        </button>
        <button className={`tab-btn ${tab === 4 ? 'active' : ''}`} onClick={() => { setTab(4); resetFormIden(); }}>
          <i className="bi bi-heart-fill me-1"></i>Sosial
        </button>
      </div>

      {message.text && (
        <div style={{ padding: '12px', marginBottom: '16px', borderRadius: '6px', fontSize: '14px', backgroundColor: message.type === 'error' ? '#fde8e8' : '#e1fce8', color: message.type === 'error' ? '#c81e1e' : '#036c2a' }}>
          <b>Info Sistem:</b> {message.text}
        </div>
      )}

      {/* ===== 0. PENDIDIKAN ===== */}
      {tab === 0 && (
        <div id="bidang-0">
          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-book-fill me-2" style={{ color: 'var(--orange-deep)' }}></i>Formulir Identifikasi — Pendidikan</h3>
              </div>
              <div className="tabs" style={{ marginBottom: '16px', display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'wrap' }}>
                <div className={`form-chip ${subTab0 === 0 ? 'active' : ''}`} onClick={() => { setSubTab0(0); resetFormIden(); }}>Anak Usia Dini (0–6 th)</div>
                <div className={`form-chip ${subTab0 === 1 ? 'active' : ''}`} onClick={() => { setSubTab0(1); resetFormIden(); }}>Perpustakaan / Pojok Baca</div>
                <div className={`form-chip ${subTab0 === 2 ? 'active' : ''}`} onClick={() => { setSubTab0(2); resetFormIden(); }}>Literasi Digital Ortu</div>
                <div className={`form-chip ${subTab0 === 3 ? 'active' : ''}`} onClick={() => { setSubTab0(3); resetFormIden(); }}>Inventaris APE</div>
              </div>


              {subTab0 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Anak</label><input name="nama_anak" value={formIden.nama_anak || ''} onChange={handleIdenChange} placeholder="Nama anak" /></div>
                  <div className="form-field"><label>Usia (tahun)</label><input type="number" name="usia" value={formIden.usia || ''} onChange={handleIdenChange} placeholder="4" /></div>
                  <div className="form-field"><label>Nama Orang Tua</label><input name="nama_ortu" value={formIden.nama_ortu || ''} onChange={handleIdenChange} placeholder="Nama orang tua/wali" /></div>
                  <div className="form-field"><label>Status Pendidikan Anak</label><select name="status_pendidikan" value={formIden.status_pendidikan || 'Belum Sekolah'} onChange={handleIdenChange}><option>Belum Sekolah</option><option>PAUD/TK</option><option>Tidak Bersekolah</option></select></div>
                  <div className="form-field full"><label>Catatan Tumbuh Kembang</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="Catatan kader..."></textarea></div>
                </div>
              )}
              {subTab0 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Fasilitas</label><input name="nama_fasilitas" value={formIden.nama_fasilitas || ''} onChange={handleIdenChange} placeholder="mis. Pojok Baca Posyandu" /></div>
                  <div className="form-field"><label>Ketersediaan</label><select name="ketersediaan" value={formIden.ketersediaan || 'Ada'} onChange={handleIdenChange}><option>Ada</option><option>Tidak Ada</option></select></div>
                  <div className="form-field"><label>Jumlah Buku</label><input type="number" name="jumlah_buku" value={formIden.jumlah_buku || ''} onChange={handleIdenChange} placeholder="120" /></div>
                  <div className="form-field"><label>Kondisi</label><select name="kondisi" value={formIden.kondisi || 'Baik'} onChange={handleIdenChange}><option>Baik</option><option>Cukup</option><option>Kurang</option></select></div>
                  <div className="form-field"><label>Akses Masyarakat</label><select name="akses" value={formIden.akses || 'Mudah'} onChange={handleIdenChange}><option>Mudah</option><option>Sulit</option></select></div>
                  <div className="form-field"><label>Petugas Pengelola</label><input name="pengelola" value={formIden.pengelola || ''} onChange={handleIdenChange} placeholder="mis. Kader" /></div>
                  <div className="form-field full"><label>Catatan / Kebutuhan</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="mis. Butuh rak baru..."></textarea></div>
                </div>
              )}
              {subTab0 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Orang Tua</label><input name="nama_ortu" value={formIden.nama_ortu || ''} onChange={handleIdenChange} placeholder="Nama orang tua/wali" /></div>
                  <div className="form-field"><label>Nama Anak</label><input name="nama_anak" value={formIden.nama_anak || ''} onChange={handleIdenChange} placeholder="Nama anak" /></div>
                  <div className="form-field"><label>Tingkat Literasi Digital</label><select name="tingkat_literasi" value={formIden.tingkat_literasi || 'Rendah'} onChange={handleIdenChange}><option>Rendah</option><option>Sedang</option><option>Tinggi</option></select></div>
                  <div className="form-field"><label>Fasilitas HP/Gawai</label><select name="fasilitas_hp" value={formIden.fasilitas_hp || 'Ya'} onChange={handleIdenChange}><option>Ya</option><option>Tidak</option></select></div>
                  <div className="form-field"><label>Kebutuhan Aplikasi Edukasi</label><input name="kebutuhan_aplikasi" value={formIden.kebutuhan_aplikasi || ''} onChange={handleIdenChange} placeholder="mis. video edukasi" /></div>
                  <div className="form-field"><label>Materi Pelatihan Diterima</label><input name="materi_pelatihan" value={formIden.materi_pelatihan || ''} onChange={handleIdenChange} placeholder="mis. Cara mencari video" /></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="Hambatan sinyal, dll..."></textarea></div>
                </div>
              )}
              {subTab0 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Jenis APE</label><input name="jenis_ape" value={formIden.jenis_ape || ''} onChange={handleIdenChange} placeholder="mis. Puzzle Huruf" /></div>
                  <div className="form-field"><label>Jumlah</label><input name="jumlah" value={formIden.jumlah || ''} onChange={handleIdenChange} placeholder="mis. 3 set" /></div>
                  <div className="form-field"><label>Kondisi</label><select name="kondisi" value={formIden.kondisi || 'Baik'} onChange={handleIdenChange}><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                  <div className="form-field"><label>Kebutuhan Tambahan</label><input name="kebutuhan" value={formIden.kebutuhan || ''} onChange={handleIdenChange} placeholder="mis. Butuh 2 set baru" /></div>
                  <div className="form-field"><label>Prioritas</label><select name="prioritas" value={formIden.prioritas || 'Tinggi'} onChange={handleIdenChange}><option>Tinggi</option><option>Sedang</option><option>Rendah</option></select></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="mis. jarang dipakai..."></textarea></div>
                </div>
              )}
              <button onClick={submitIdentifikasi} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px' }}>{isLoading ? 'Menyimpan...' : 'Simpan Formulir'}</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Pendidikan</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input name="nama_pelapor" value={formPengaduan.nama_pelapor} onChange={handlePengaduanChange} placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select name="jenis_kelamin" value={formPengaduan.jenis_kelamin} onChange={handlePengaduanChange}><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input name="nik" value={formPengaduan.nik} onChange={handlePengaduanChange} placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat Kader</span></div>
                <div className="form-field"><label>No. HP</label><input name="no_hp" value={formPengaduan.no_hp} onChange={handlePengaduanChange} placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input name="alamat" value={formPengaduan.alamat} onChange={handlePengaduanChange} placeholder="Alamat lengkap" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea name="isi_keluhan" value={formPengaduan.isi_keluhan} onChange={handlePengaduanChange} rows="3" placeholder="Uraikan keluhan..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input name="lokasi_masalah" value={formPengaduan.lokasi_masalah} onChange={handlePengaduanChange} placeholder="mis. RT 03" /></div>
                <div className="form-field full"><label>Unggah Lampiran (Opsional)</label><input type="file" multiple accept=".jpg,.png,.pdf,.doc,.docx" onChange={(e) => setLampiranPengaduan(e.target.files)} /></div>
              </div>
              <button onClick={submitPengaduan} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>{isLoading ? 'Mengirim...' : 'Simpan Pengaduan'}</button>
            </div>
          </div>
          {/* TABEL REKAP DINAMIS */}
          {/* ================= REKAP TABEL DINAMIS (KIRI: FORMULIR, KANAN: PENGADUAN) ================= */}
          {(() => {
            const bidangSaatIni = BIDANG_MAP[tab];
            const namaBidang = ['Pendidikan', 'Pekerjaan Umum', 'Perumahan Rakyat', 'Trantibumlinmas', 'Sosial'][tab];

            // Filter data
            const dataPengaduanFilter = rekapPengaduan.filter(item => item.bidang === bidangSaatIni);
            const dataFormulirFilter = rekapFormulir.filter(item => item.bidang === bidangSaatIni);
            const belumSelesai = dataPengaduanFilter.filter(item => item.status !== 'selesai').length;

            return (
              <div className="grid grid-2" style={{ marginTop: '16px' }}>

                {/* --- KIRI: REKAP FORMULIR --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Formulir {namaBidang}</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Tanggal</th><th>Sub-Bidang</th><th>Ringkasan Data</th></tr>
                      </thead>
                      <tbody>
                        {dataFormulirFilter.length > 0 ? (
                          dataFormulirFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                              <td><span style={{ fontWeight: '600', color: '#333' }}>{item.sub_bidang}</span></td>
                              <td>
                                {/* TOMBOL POP-UP */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedForm(item)}
                                >
                                  <i className="bi bi-eye me-1"></i>Lihat Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada formulir tersimpan.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* --- KANAN: REKAP PENGADUAN --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Pengaduan {namaBidang}</h3>
                    {belumSelesai > 0 && <span className="badge badge-orange">{belumSelesai} belum ditindaklanjuti</span>}
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th><th>Aksi</th></tr>
                      </thead>
                      <tbody>
                        {dataPengaduanFilter.length > 0 ? (
                          dataPengaduanFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.nama_pelapor}</td>
                              <td>{item.isi_keluhan.substring(0, 30)}{item.isi_keluhan.length > 30 ? '...' : ''}</td>
                              <td>
                                <span className={`badge ${item.status === 'menunggu' ? 'badge-rose' : item.status === 'diproses' ? 'badge-orange' : 'badge-green'}`}>
                                  {item.status === 'menunggu' ? 'Baru' : item.status === 'diproses' ? 'Diproses' : 'Selesai'}
                                </span>
                              </td>
                              <td>
                                {/* TOMBOL POP-UP PENGADUAN */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedPengaduan(item)}
                                >
                                  <i className="bi bi-eye"></i> Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada pengaduan di bidang ini.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      )}

      {/* ===== 1. PEKERJAAN UMUM ===== */}
      {tab === 1 && (
        <div id="bidang-1">
          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-droplet-fill me-2" style={{ color: 'var(--cyan-deep)' }}></i>Formulir Identifikasi — Pekerjaan Umum</h3>
              </div>
              <div className="tabs" style={{ marginBottom: '16px', display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'wrap' }}>
                <div className={`form-chip ${subTab1 === 0 ? 'active' : ''}`} onClick={() => { setSubTab1(0); resetFormIden(); }}>Edukasi Air Bersih &amp; Limbah</div>
                <div className={`form-chip ${subTab1 === 1 ? 'active' : ''}`} onClick={() => { setSubTab1(1); resetFormIden(); }}>Identifikasi Embung Air Baku</div>
                <div className={`form-chip ${subTab1 === 2 ? 'active' : ''}`} onClick={() => { setSubTab1(2); resetFormIden(); }}>Jaringan Air Perdesaan</div>
                <div className={`form-chip ${subTab1 === 3 ? 'active' : ''}`} onClick={() => { setSubTab1(3); resetFormIden(); }}>Sumur Air Tanah</div>
                <div className={`form-chip ${subTab1 === 4 ? 'active' : ''}`} onClick={() => { setSubTab1(4); resetFormIden(); }}>Pembangunan Jalan Desa</div>
              </div>

              {subTab1 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan Edukasi</label><input name="nama_kegiatan" value={formIden.nama_kegiatan || ''} onChange={handleIdenChange} placeholder="mis. Sosialisasi SPAL Sehat" /></div>
                  <div className="form-field"><label>Lokasi / RT</label><input name="lokasi" value={formIden.lokasi || ''} onChange={handleIdenChange} placeholder="RT 02" /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" name="jumlah_peserta" value={formIden.jumlah_peserta || ''} onChange={handleIdenChange} placeholder="25" /></div>
                  <div className="form-field"><label>Kondisi Sarana Limbah</label><select name="kondisi_sarana" value={formIden.kondisi_sarana || 'Baik'} onChange={handleIdenChange}><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                  <div className="form-field full"><label>Materi yang Disampaikan</label><textarea rows="2" name="materi" value={formIden.materi || ''} onChange={handleIdenChange} placeholder="Ringkasan materi edukasi..."></textarea></div>
                </div>
              )}
              {subTab1 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Embung / Lokasi</label><input name="nama_embung" value={formIden.nama_embung || ''} onChange={handleIdenChange} placeholder="mis. Embung RT 04" /></div>
                  <div className="form-field"><label>Kapasitas Tampung (m³)</label><input type="number" name="kapasitas" value={formIden.kapasitas || ''} onChange={handleIdenChange} placeholder="150" /></div>
                  <div className="form-field"><label>Kondisi Embung</label><select name="kondisi" value={formIden.kondisi || 'Baik'} onChange={handleIdenChange}><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                  <div className="form-field"><label>Sumber Air</label><input name="sumber_air" value={formIden.sumber_air || ''} onChange={handleIdenChange} placeholder="mis. Mata air, sungai" /></div>
                  <div className="form-field"><label>Pemanfaatan</label><select name="pemanfaatan" value={formIden.pemanfaatan || 'Air Baku Warga'} onChange={handleIdenChange}><option>Air Baku Warga</option><option>Irigasi</option><option>Air Baku &amp; Irigasi</option></select></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="Catatan kondisi/kebutuhan embung..."></textarea></div>
                </div>
              )}
              {subTab1 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Jaringan / Lokasi</label><input name="nama_jaringan" value={formIden.nama_jaringan || ''} onChange={handleIdenChange} placeholder="mis. Jaringan RT 01–03" /></div>
                  <div className="form-field"><label>Jumlah KK Terlayani</label><input type="number" name="jumlah_kk" value={formIden.jumlah_kk || ''} onChange={handleIdenChange} placeholder="40" /></div>
                  <div className="form-field"><label>Kondisi Jaringan Pipa</label><select name="kondisi" value={formIden.kondisi || 'Baik'} onChange={handleIdenChange}><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                  <div className="form-field"><label>Jenis Kerusakan</label><input name="jenis_kerusakan" value={formIden.jenis_kerusakan || ''} onChange={handleIdenChange} placeholder="mis. Pipa bocor" /></div>
                  <div className="form-field full"><label>Tindakan Pemeliharaan</label><textarea rows="2" name="tindakan" value={formIden.tindakan || ''} onChange={handleIdenChange} placeholder="Tindakan yang dilakukan/diperlukan..."></textarea></div>
                </div>
              )}
              {subTab1 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Lokasi Sumur</label><input name="lokasi_sumur" value={formIden.lokasi_sumur || ''} onChange={handleIdenChange} placeholder="mis. RT 06" /></div>
                  <div className="form-field"><label>Jenis Sumur</label><select name="jenis_sumur" value={formIden.jenis_sumur || 'Sumur Bor'} onChange={handleIdenChange}><option>Sumur Bor</option><option>Sumur Gali</option></select></div>
                  <div className="form-field"><label>Kondisi Air</label><select name="kondisi_air" value={formIden.kondisi_air || 'Jernih'} onChange={handleIdenChange}><option>Jernih</option><option>Keruh</option><option>Kering</option></select></div>
                  <div className="form-field"><label>Jumlah KK Pengguna</label><input type="number" name="jumlah_kk" value={formIden.jumlah_kk || ''} onChange={handleIdenChange} placeholder="6" /></div>
                  <div className="form-field full"><label>Kebutuhan Rehabilitasi</label><textarea rows="2" name="kebutuhan" value={formIden.kebutuhan || ''} onChange={handleIdenChange} placeholder="mis. Perlu pengurasan..."></textarea></div>
                </div>
              )}
              {subTab1 === 4 && (
                <div className="form-grid">
                  <div className="form-field"><label>Lokasi Ruas Jalan</label><input name="lokasi_jalan" value={formIden.lokasi_jalan || ''} onChange={handleIdenChange} placeholder="mis. Jalan RT 05–07" /></div>
                  <div className="form-field"><label>Panjang Ruas (meter)</label><input type="number" name="panjang_ruas" value={formIden.panjang_ruas || ''} onChange={handleIdenChange} placeholder="300" /></div>
                  <div className="form-field"><label>Kondisi Jalan Saat Ini</label><select name="kondisi_jalan" value={formIden.kondisi_jalan || 'Baik'} onChange={handleIdenChange}><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option><option>Belum Ada</option></select></div>
                  <div className="form-field"><label>Jenis Kebutuhan</label><select name="kebutuhan" value={formIden.kebutuhan || 'Pengerasan'} onChange={handleIdenChange}><option>Pengerasan</option><option>Aspal</option><option>Betonisasi</option><option>Drainase</option></select></div>
                  <div className="form-field"><label>Prioritas</label><select name="prioritas" value={formIden.prioritas || 'Sedang'} onChange={handleIdenChange}><option>Sedang</option><option>Tinggi</option><option>Rendah</option></select></div>
                  <div className="form-field full"><label>Catatan Tambahan</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="Catatan pendukung usulan..."></textarea></div>
                </div>
              )}
              <button onClick={submitIdentifikasi} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px' }}>{isLoading ? 'Menyimpan...' : 'Simpan Formulir'}</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Pekerjaan Umum</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input name="nama_pelapor" value={formPengaduan.nama_pelapor} onChange={handlePengaduanChange} placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select name="jenis_kelamin" value={formPengaduan.jenis_kelamin} onChange={handlePengaduanChange}><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input name="nik" value={formPengaduan.nik} onChange={handlePengaduanChange} placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat Kader</span></div>
                <div className="form-field"><label>No. HP</label><input name="no_hp" value={formPengaduan.no_hp} onChange={handlePengaduanChange} placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input name="alamat" value={formPengaduan.alamat} onChange={handlePengaduanChange} placeholder="Alamat lengkap" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea name="isi_keluhan" value={formPengaduan.isi_keluhan} onChange={handlePengaduanChange} rows="3" placeholder="mis. Jalan rusak, sumur kering..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input name="lokasi_masalah" value={formPengaduan.lokasi_masalah} onChange={handlePengaduanChange} placeholder="mis. Jalan RT 05" /></div>
                <div className="form-field full"><label>Unggah Lampiran (Opsional)</label><input type="file" multiple accept=".jpg,.png,.pdf,.doc,.docx" onChange={(e) => setLampiranPengaduan(e.target.files)} /></div>
              </div>
              <button onClick={submitPengaduan} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>{isLoading ? 'Mengirim...' : 'Simpan Pengaduan'}</button>
            </div>
          </div>
          {/* ================= REKAP TABEL DINAMIS (KIRI: FORMULIR, KANAN: PENGADUAN) ================= */}
          {(() => {
            const bidangSaatIni = BIDANG_MAP[tab];
            const namaBidang = ['Pendidikan', 'Pekerjaan Umum', 'Perumahan Rakyat', 'Trantibumlinmas', 'Sosial'][tab];

            // Filter data
            const dataPengaduanFilter = rekapPengaduan.filter(item => item.bidang === bidangSaatIni);
            const dataFormulirFilter = rekapFormulir.filter(item => item.bidang === bidangSaatIni);
            const belumSelesai = dataPengaduanFilter.filter(item => item.status !== 'selesai').length;

            return (
              <div className="grid grid-2" style={{ marginTop: '16px' }}>

                {/* --- KIRI: REKAP FORMULIR --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Formulir {namaBidang}</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Tanggal</th><th>Sub-Bidang</th><th>Ringkasan Data</th></tr>
                      </thead>
                      <tbody>
                        {dataFormulirFilter.length > 0 ? (
                          dataFormulirFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                              <td><span style={{ fontWeight: '600', color: '#333' }}>{item.sub_bidang}</span></td>
                              <td>
                                {/* TOMBOL POP-UP */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedForm(item)}
                                >
                                  <i className="bi bi-eye me-1"></i>Lihat Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada formulir tersimpan.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* --- KANAN: REKAP PENGADUAN --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Pengaduan {namaBidang}</h3>
                    {belumSelesai > 0 && <span className="badge badge-orange">{belumSelesai} belum ditindaklanjuti</span>}
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th><th>Aksi</th></tr>
                      </thead>
                      <tbody>
                        {dataPengaduanFilter.length > 0 ? (
                          dataPengaduanFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.nama_pelapor}</td>
                              <td>{item.isi_keluhan.substring(0, 30)}{item.isi_keluhan.length > 30 ? '...' : ''}</td>
                              <td>
                                <span className={`badge ${item.status === 'menunggu' ? 'badge-rose' : item.status === 'diproses' ? 'badge-orange' : 'badge-green'}`}>
                                  {item.status === 'menunggu' ? 'Baru' : item.status === 'diproses' ? 'Diproses' : 'Selesai'}
                                </span>
                              </td>
                              <td>
                                {/* TOMBOL POP-UP PENGADUAN */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedPengaduan(item)}
                                >
                                  <i className="bi bi-eye"></i> Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada pengaduan di bidang ini.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      )}

      {/* ===== 2. PERUMAHAN RAKYAT ===== */}
      {tab === 2 && (
        <div id="bidang-2">
          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-house-door-fill me-2" style={{ color: 'var(--green-deep)' }}></i>Formulir Identifikasi — Perumahan Rakyat</h3>
              </div>
              <div className="tabs" style={{ marginBottom: '16px', display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'wrap' }}>
                <div className={`form-chip ${subTab2 === 0 ? 'active' : ''}`} onClick={() => { setSubTab2(0); resetFormIden(); }}>Rumah Tidak Layak Huni</div>
                <div className={`form-chip ${subTab2 === 1 ? 'active' : ''}`} onClick={() => { setSubTab2(1); resetFormIden(); }}>KIE Lingkungan Bersih &amp; Sehat</div>
                <div className={`form-chip ${subTab2 === 2 ? 'active' : ''}`} onClick={() => { setSubTab2(2); resetFormIden(); }}>Pemanfaatan Pekarangan</div>
                <div className={`form-chip ${subTab2 === 3 ? 'active' : ''}`} onClick={() => { setSubTab2(3); resetFormIden(); }}>Biopori Rumah Tangga</div>
              </div>

              {subTab2 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kepala Keluarga</label><input name="nama_kk" value={formIden.nama_kk || ''} onChange={handleIdenChange} placeholder="Nama KK" /></div>
                  <div className="form-field"><label>Alamat Rumah</label><input name="alamat" value={formIden.alamat || ''} onChange={handleIdenChange} placeholder="RT/RW, alamat" /></div>
                  <div className="form-field"><label>Kondisi Rumah</label><select name="kondisi_rumah" value={formIden.kondisi_rumah || 'Layak Huni'} onChange={handleIdenChange}><option>Layak Huni</option><option>Tidak Layak Huni</option></select></div>
                  <div className="form-field"><label>Rekomendasi Bantuan</label><select name="rekomendasi" value={formIden.rekomendasi || 'BSPS'} onChange={handleIdenChange}><option>BSPS</option><option>Lainnya</option><option>Tidak Diperlukan</option></select></div>
                  <div className="form-field full"><label>Jenis Kerusakan</label><textarea rows="2" name="jenis_kerusakan" value={formIden.jenis_kerusakan || ''} onChange={handleIdenChange} placeholder="mis. Atap bocor..."></textarea></div>
                  <div className="form-field full"><label>Foto Kondisi Rumah</label>
                    <input type="file" multiple accept="image/*" onChange={(e) => setFotoIden(e.target.files)} style={{ border: '1px solid #ddd', padding: '8px', borderRadius: '6px', width: '100%' }} />
                  </div>
                </div>
              )}
              {subTab2 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan KIE</label><input name="nama_kegiatan" value={formIden.nama_kegiatan || ''} onChange={handleIdenChange} placeholder="mis. Penyuluhan Rumah Sehat" /></div>
                  <div className="form-field"><label>Lokasi / RT</label><input name="lokasi" value={formIden.lokasi || ''} onChange={handleIdenChange} placeholder="RT 03" /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" name="jumlah_peserta" value={formIden.jumlah_peserta || ''} onChange={handleIdenChange} placeholder="20" /></div>
                  <div className="form-field"><label>Materi yang Disampaikan</label><input name="materi" value={formIden.materi || ''} onChange={handleIdenChange} placeholder="mis. Sanitasi, ventilasi rumah" /></div>
                  <div className="form-field full"><label>Catatan Evaluasi</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="Hasil evaluasi kegiatan KIE..."></textarea></div>
                </div>
              )}
              {subTab2 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama KK / Lokasi</label><input name="nama_lokasi" value={formIden.nama_lokasi || ''} onChange={handleIdenChange} placeholder="Nama KK atau lokasi pekarangan" /></div>
                  <div className="form-field"><label>Jenis Tanaman</label><input name="jenis_tanaman" value={formIden.jenis_tanaman || ''} onChange={handleIdenChange} placeholder="mis. Sayur, TOGA, cabai" /></div>
                  <div className="form-field"><label>Luas Pekarangan (m²)</label><input type="number" name="luas" value={formIden.luas || ''} onChange={handleIdenChange} placeholder="15" /></div>
                  <div className="form-field"><label>Status Pemanfaatan</label><select name="status_manfaat" value={formIden.status_manfaat || 'Aktif Dimanfaatkan'} onChange={handleIdenChange}><option>Aktif Dimanfaatkan</option><option>Belum Dimanfaatkan</option></select></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="Catatan tambahan..."></textarea></div>
                </div>
              )}
              {subTab2 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama KK / Lokasi</label><input name="nama_lokasi" value={formIden.nama_lokasi || ''} onChange={handleIdenChange} placeholder="Nama KK atau lokasi" /></div>
                  <div className="form-field"><label>Jumlah Titik Biopori</label><input type="number" name="jumlah_titik" value={formIden.jumlah_titik || ''} onChange={handleIdenChange} placeholder="3" /></div>
                  <div className="form-field"><label>Kondisi Biopori</label><select name="kondisi" value={formIden.kondisi || 'Baik'} onChange={handleIdenChange}><option>Baik</option><option>Tersumbat</option><option>Rusak</option></select></div>
                  <div className="form-field"><label>Tanggal Pembuatan</label><input type="date" name="tanggal" value={formIden.tanggal || ''} onChange={handleIdenChange} /></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="Catatan tambahan..."></textarea></div>
                </div>
              )}
              <button onClick={submitIdentifikasi} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px' }}>{isLoading ? 'Menyimpan...' : 'Simpan Formulir'}</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Perumahan Rakyat</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input name="nama_pelapor" value={formPengaduan.nama_pelapor} onChange={handlePengaduanChange} placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select name="jenis_kelamin" value={formPengaduan.jenis_kelamin} onChange={handlePengaduanChange}><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input name="nik" value={formPengaduan.nik} onChange={handlePengaduanChange} placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat Kader</span></div>
                <div className="form-field"><label>No. HP</label><input name="no_hp" value={formPengaduan.no_hp} onChange={handlePengaduanChange} placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input name="alamat" value={formPengaduan.alamat} onChange={handlePengaduanChange} placeholder="Alamat lengkap" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea name="isi_keluhan" value={formPengaduan.isi_keluhan} onChange={handlePengaduanChange} rows="3" placeholder="mis. Usul perbaikan rumah..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input name="lokasi_masalah" value={formPengaduan.lokasi_masalah} onChange={handlePengaduanChange} placeholder="mis. RT 03" /></div>
                <div className="form-field full"><label>Unggah Lampiran (Opsional)</label><input type="file" multiple accept=".jpg,.png,.pdf,.doc,.docx" onChange={(e) => setLampiranPengaduan(e.target.files)} /></div>
              </div>
              <button onClick={submitPengaduan} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>{isLoading ? 'Mengirim...' : 'Simpan Pengaduan'}</button>
            </div>
          </div>
          {/* TABEL REKAP DINAMIS */}
          {/* ================= REKAP TABEL DINAMIS (KIRI: FORMULIR, KANAN: PENGADUAN) ================= */}
          {(() => {
            const bidangSaatIni = BIDANG_MAP[tab];
            const namaBidang = ['Pendidikan', 'Pekerjaan Umum', 'Perumahan Rakyat', 'Trantibumlinmas', 'Sosial'][tab];

            // Filter data
            const dataPengaduanFilter = rekapPengaduan.filter(item => item.bidang === bidangSaatIni);
            const dataFormulirFilter = rekapFormulir.filter(item => item.bidang === bidangSaatIni);
            const belumSelesai = dataPengaduanFilter.filter(item => item.status !== 'selesai').length;

            return (
              <div className="grid grid-2" style={{ marginTop: '16px' }}>

                {/* --- KIRI: REKAP FORMULIR --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Formulir {namaBidang}</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Tanggal</th><th>Sub-Bidang</th><th>Ringkasan Data</th></tr>
                      </thead>
                      <tbody>
                        {dataFormulirFilter.length > 0 ? (
                          dataFormulirFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                              <td><span style={{ fontWeight: '600', color: '#333' }}>{item.sub_bidang}</span></td>
                              <td>
                                {/* TOMBOL POP-UP */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedForm(item)}
                                >
                                  <i className="bi bi-eye me-1"></i>Lihat Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada formulir tersimpan.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* --- KANAN: REKAP PENGADUAN --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Pengaduan {namaBidang}</h3>
                    {belumSelesai > 0 && <span className="badge badge-orange">{belumSelesai} belum ditindaklanjuti</span>}
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th><th>Aksi</th></tr>
                      </thead>
                      <tbody>
                        {dataPengaduanFilter.length > 0 ? (
                          dataPengaduanFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.nama_pelapor}</td>
                              <td>{item.isi_keluhan.substring(0, 30)}{item.isi_keluhan.length > 30 ? '...' : ''}</td>
                              <td>
                                <span className={`badge ${item.status === 'menunggu' ? 'badge-rose' : item.status === 'diproses' ? 'badge-orange' : 'badge-green'}`}>
                                  {item.status === 'menunggu' ? 'Baru' : item.status === 'diproses' ? 'Diproses' : 'Selesai'}
                                </span>
                              </td>
                              <td>
                                {/* TOMBOL POP-UP PENGADUAN */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedPengaduan(item)}
                                >
                                  <i className="bi bi-eye"></i> Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada pengaduan di bidang ini.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      )}

      {/* ===== 3. TRANTIBUMLINMAS ===== */}
      {tab === 3 && (
        <div id="bidang-3">
          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-shield-fill-check me-2" style={{ color: 'var(--violet-deep)' }}></i>Formulir Identifikasi — Trantibumlinmas</h3>
              </div>
              <div className="tabs" style={{ marginBottom: '16px', display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'wrap' }}>
                <div className={`form-chip ${subTab3 === 0 ? 'active' : ''}`} onClick={() => { setSubTab3(0); resetFormIden(); }}>Korban Trauma &amp; Psikososial</div>
                <div className={`form-chip ${subTab3 === 1 ? 'active' : ''}`} onClick={() => { setSubTab3(1); resetFormIden(); }}>Penyuluhan &amp; Evaluasi Trauma</div>
                <div className={`form-chip ${subTab3 === 2 ? 'active' : ''}`} onClick={() => { setSubTab3(2); resetFormIden(); }}>KIE &amp; Simulasi Bencana</div>
                <div className={`form-chip ${subTab3 === 3 ? 'active' : ''}`} onClick={() => { setSubTab3(3); resetFormIden(); }}>Insiden Kamtibmas</div>
                <div className={`form-chip ${subTab3 === 4 ? 'active' : ''}`} onClick={() => { setSubTab3(4); resetFormIden(); }}>Sosialisasi Pencegahan</div>
                <div className={`form-chip ${subTab3 === 5 ? 'active' : ''}`} onClick={() => { setSubTab3(5); resetFormIden(); }}>Patroli Keamanan</div>
              </div>

              {subTab3 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Korban</label><input name="nama_korban" value={formIden.nama_korban || ''} onChange={handleIdenChange} placeholder="Nama korban" /></div>
                  <div className="form-field"><label>Jenis Kelamin</label><select name="jenis_kelamin" value={formIden.jenis_kelamin || 'Laki-laki'} onChange={handleIdenChange}><option>Laki-laki</option><option>Perempuan</option></select></div>
                  <div className="form-field"><label>Usia</label><input type="number" name="usia" value={formIden.usia || ''} onChange={handleIdenChange} placeholder="35" /></div>
                  <div className="form-field"><label>Jenis Kejadian</label><input name="jenis_kejadian" value={formIden.jenis_kejadian || ''} onChange={handleIdenChange} placeholder="mis. Bencana, kekerasan" /></div>
                  <div className="form-field full"><label>Kebutuhan Psikososial</label><textarea rows="2" name="kebutuhan" value={formIden.kebutuhan || ''} onChange={handleIdenChange} placeholder="Uraikan kebutuhan..."></textarea></div>
                  <div className="form-field full"><label>Tindak Lanjut / Rujukan</label><textarea rows="2" name="tindak_lanjut" value={formIden.tindak_lanjut || ''} onChange={handleIdenChange} placeholder="Rujukan/tindakan..."></textarea></div>
                </div>
              )}
              {subTab3 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan Penyuluhan</label><input name="nama_kegiatan" value={formIden.nama_kegiatan || ''} onChange={handleIdenChange} placeholder="mis. Penyuluhan Trauma" /></div>
                  <div className="form-field"><label>Tanggal</label><input type="date" name="tanggal" value={formIden.tanggal || ''} onChange={handleIdenChange} /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" name="jumlah_peserta" value={formIden.jumlah_peserta || ''} onChange={handleIdenChange} placeholder="15" /></div>
                  <div className="form-field full"><label>Materi Penyuluhan</label><textarea rows="2" name="materi" value={formIden.materi || ''} onChange={handleIdenChange} placeholder="Ringkasan materi..."></textarea></div>
                  <div className="form-field full"><label>Hasil Evaluasi</label><textarea rows="2" name="hasil_evaluasi" value={formIden.hasil_evaluasi || ''} onChange={handleIdenChange} placeholder="Hasil evaluasi kondisi peserta..."></textarea></div>
                </div>
              )}
              {subTab3 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan</label><input name="nama_kegiatan" value={formIden.nama_kegiatan || ''} onChange={handleIdenChange} placeholder="mis. Simulasi Bencana" /></div>
                  <div className="form-field"><label>Jenis Bencana</label><input name="jenis_bencana" value={formIden.jenis_bencana || ''} onChange={handleIdenChange} placeholder="mis. Kebakaran, banjir" /></div>
                  <div className="form-field"><label>Tanggal</label><input type="date" name="tanggal" value={formIden.tanggal || ''} onChange={handleIdenChange} /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" name="jumlah_peserta" value={formIden.jumlah_peserta || ''} onChange={handleIdenChange} placeholder="30" /></div>
                  <div className="form-field full"><label>Hasil Kesiapsiagaan</label><textarea rows="2" name="hasil" value={formIden.hasil || ''} onChange={handleIdenChange} placeholder="Catatan hasil simulasi..."></textarea></div>
                </div>
              )}
              {subTab3 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Pelapor/Saksi</label><input name="nama_saksi" value={formIden.nama_saksi || ''} onChange={handleIdenChange} placeholder="Nama" /></div>
                  <div className="form-field"><label>Tanggal Kejadian</label><input type="date" name="tanggal" value={formIden.tanggal || ''} onChange={handleIdenChange} /></div>
                  <div className="form-field full"><label>Jenis Kejadian</label><input name="jenis_kejadian" value={formIden.jenis_kejadian || ''} onChange={handleIdenChange} placeholder="mis. Gangguan keamanan" /></div>
                  <div className="form-field full"><label>Lokasi Kejadian</label><input name="lokasi" value={formIden.lokasi || ''} onChange={handleIdenChange} placeholder="mis. RT 01" /></div>
                  <div className="form-field full"><label>Uraian Kejadian</label><textarea rows="2" name="uraian" value={formIden.uraian || ''} onChange={handleIdenChange} placeholder="Kronologi singkat..."></textarea></div>
                  <div className="form-field full"><label>Tindak Lanjut Linmas</label><textarea rows="2" name="tindak_lanjut" value={formIden.tindak_lanjut || ''} onChange={handleIdenChange} placeholder="Tindakan yg dilakukan..."></textarea></div>
                </div>
              )}
              {subTab3 === 4 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Program</label><input name="nama_program" value={formIden.nama_program || ''} onChange={handleIdenChange} placeholder="mis. Sosialisasi Anti Tawuran" /></div>
                  <div className="form-field"><label>Tanggal</label><input type="date" name="tanggal" value={formIden.tanggal || ''} onChange={handleIdenChange} /></div>
                  <div className="form-field"><label>Lokasi</label><input name="lokasi" value={formIden.lokasi || ''} onChange={handleIdenChange} placeholder="mis. Balai Desa" /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" name="jumlah_peserta" value={formIden.jumlah_peserta || ''} onChange={handleIdenChange} placeholder="25" /></div>
                  <div className="form-field full"><label>Materi Sosialisasi</label><textarea rows="2" name="materi" value={formIden.materi || ''} onChange={handleIdenChange} placeholder="Ringkasan materi..."></textarea></div>
                </div>
              )}
              {subTab3 === 5 && (
                <div className="form-grid">
                  <div className="form-field"><label>Tanggal Patroli</label><input type="date" name="tanggal" value={formIden.tanggal || ''} onChange={handleIdenChange} /></div>
                  <div className="form-field"><label>Wilayah / RT</label><input name="wilayah" value={formIden.wilayah || ''} onChange={handleIdenChange} placeholder="mis. RT 02–04" /></div>
                  <div className="form-field"><label>Petugas Piket</label><input name="petugas" value={formIden.petugas || ''} onChange={handleIdenChange} placeholder="Nama petugas Linmas" /></div>
                  <div className="form-field full"><label>Temuan Selama Patroli</label><textarea rows="2" name="temuan" value={formIden.temuan || ''} onChange={handleIdenChange} placeholder="Temuan/kejadian..."></textarea></div>
                  <div className="form-field full"><label>Tindak Lanjut</label><textarea rows="2" name="tindak_lanjut" value={formIden.tindak_lanjut || ''} onChange={handleIdenChange} placeholder="Tindak lanjut..."></textarea></div>
                </div>
              )}
              <button onClick={submitIdentifikasi} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px' }}>{isLoading ? 'Menyimpan...' : 'Simpan Formulir'}</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Trantibumlinmas</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input name="nama_pelapor" value={formPengaduan.nama_pelapor} onChange={handlePengaduanChange} placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select name="jenis_kelamin" value={formPengaduan.jenis_kelamin} onChange={handlePengaduanChange}><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input name="nik" value={formPengaduan.nik} onChange={handlePengaduanChange} placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat Kader</span></div>
                <div className="form-field"><label>No. HP</label><input name="no_hp" value={formPengaduan.no_hp} onChange={handlePengaduanChange} placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input name="alamat" value={formPengaduan.alamat} onChange={handlePengaduanChange} placeholder="Alamat lengkap" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea name="isi_keluhan" value={formPengaduan.isi_keluhan} onChange={handlePengaduanChange} rows="3" placeholder="Uraikan keluhan..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input name="lokasi_masalah" value={formPengaduan.lokasi_masalah} onChange={handlePengaduanChange} placeholder="mis. Pos Ronda RT 02" /></div>
                <div className="form-field full"><label>Unggah Lampiran (Opsional)</label><input type="file" multiple accept=".jpg,.png,.pdf,.doc,.docx" onChange={(e) => setLampiranPengaduan(e.target.files)} /></div>
              </div>
              <button onClick={submitPengaduan} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>{isLoading ? 'Mengirim...' : 'Simpan Pengaduan'}</button>
            </div>
          </div>
          {/* TABEL REKAP DINAMIS */}
          {/* ================= REKAP TABEL DINAMIS (KIRI: FORMULIR, KANAN: PENGADUAN) ================= */}
          {(() => {
            const bidangSaatIni = BIDANG_MAP[tab];
            const namaBidang = ['Pendidikan', 'Pekerjaan Umum', 'Perumahan Rakyat', 'Trantibumlinmas', 'Sosial'][tab];

            // Filter data
            const dataPengaduanFilter = rekapPengaduan.filter(item => item.bidang === bidangSaatIni);
            const dataFormulirFilter = rekapFormulir.filter(item => item.bidang === bidangSaatIni);
            const belumSelesai = dataPengaduanFilter.filter(item => item.status !== 'selesai').length;

            return (
              <div className="grid grid-2" style={{ marginTop: '16px' }}>

                {/* --- KIRI: REKAP FORMULIR --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Formulir {namaBidang}</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Tanggal</th><th>Sub-Bidang</th><th>Ringkasan Data</th></tr>
                      </thead>
                      <tbody>
                        {dataFormulirFilter.length > 0 ? (
                          dataFormulirFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                              <td><span style={{ fontWeight: '600', color: '#333' }}>{item.sub_bidang}</span></td>
                              <td>
                                {/* TOMBOL POP-UP */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedForm(item)}
                                >
                                  <i className="bi bi-eye me-1"></i>Lihat Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada formulir tersimpan.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* --- KANAN: REKAP PENGADUAN --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Pengaduan {namaBidang}</h3>
                    {belumSelesai > 0 && <span className="badge badge-orange">{belumSelesai} belum ditindaklanjuti</span>}
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th><th>Aksi</th></tr>
                      </thead>
                      <tbody>
                        {dataPengaduanFilter.length > 0 ? (
                          dataPengaduanFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.nama_pelapor}</td>
                              <td>{item.isi_keluhan.substring(0, 30)}{item.isi_keluhan.length > 30 ? '...' : ''}</td>
                              <td>
                                <span className={`badge ${item.status === 'menunggu' ? 'badge-rose' : item.status === 'diproses' ? 'badge-orange' : 'badge-green'}`}>
                                  {item.status === 'menunggu' ? 'Baru' : item.status === 'diproses' ? 'Diproses' : 'Selesai'}
                                </span>
                              </td>
                              <td>
                                {/* TOMBOL POP-UP PENGADUAN */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedPengaduan(item)}
                                >
                                  <i className="bi bi-eye"></i> Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada pengaduan di bidang ini.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      )}

      {/* ===== 4. SOSIAL ===== */}
      {tab === 4 && (
        <div id="bidang-4">
          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-heart-fill me-2" style={{ color: 'var(--rose-deep)' }}></i>Formulir Identifikasi — Sosial</h3>
              </div>
              <div className="tabs" style={{ marginBottom: '16px', display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'wrap' }}>
                <div className={`form-chip ${subTab4 === 0 ? 'active' : ''}`} onClick={() => { setSubTab4(0); resetFormIden(); }}>KIE Gender &amp; Inklusi Sosial</div>
                <div className={`form-chip ${subTab4 === 1 ? 'active' : ''}`} onClick={() => { setSubTab4(1); resetFormIden(); }}>Pendataan Fakir Miskin</div>
                <div className={`form-chip ${subTab4 === 2 ? 'active' : ''}`} onClick={() => { setSubTab4(2); resetFormIden(); }}>Verifikasi Sosial-Ekonomi</div>
                <div className={`form-chip ${subTab4 === 3 ? 'active' : ''}`} onClick={() => { setSubTab4(3); resetFormIden(); }}>Penyaluran Bantuan Sosial</div>
              </div>

              {subTab4 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan</label><input name="nama_kegiatan" value={formIden.nama_kegiatan || ''} onChange={handleIdenChange} placeholder="mis. KIE Kesetaraan Gender" /></div>
                  <div className="form-field"><label>Tanggal</label><input type="date" name="tanggal" value={formIden.tanggal || ''} onChange={handleIdenChange} /></div>
                  <div className="form-field"><label>Jml Peserta Laki-laki</label><input type="number" name="peserta_L" value={formIden.peserta_L || ''} onChange={handleIdenChange} placeholder="10" /></div>
                  <div className="form-field"><label>Jml Peserta Perempuan</label><input type="number" name="peserta_P" value={formIden.peserta_P || ''} onChange={handleIdenChange} placeholder="15" /></div>
                  <div className="form-field full"><label>Materi Disampaikan</label><textarea rows="2" name="materi" value={formIden.materi || ''} onChange={handleIdenChange} placeholder="Ringkasan materi..."></textarea></div>
                </div>
              )}
              {subTab4 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kepala Keluarga</label><input name="nama_kk" value={formIden.nama_kk || ''} onChange={handleIdenChange} placeholder="Nama KK" /></div>
                  <div className="form-field"><label>Jumlah Anggota</label><input type="number" name="jml_anggota" value={formIden.jml_anggota || ''} onChange={handleIdenChange} placeholder="4" /></div>
                  <div className="form-field"><label>Pekerjaan</label><input name="pekerjaan" value={formIden.pekerjaan || ''} onChange={handleIdenChange} placeholder="mis. Buruh harian" /></div>
                  <div className="form-field"><label>Penghasilan per Bulan</label><input name="penghasilan" value={formIden.penghasilan || ''} onChange={handleIdenChange} placeholder="mis. Rp1.000.000" /></div>
                  <div className="form-field"><label>Status DTKS</label><select name="status_dtks" value={formIden.status_dtks || 'Terdaftar'} onChange={handleIdenChange}><option>Terdaftar</option><option>Belum Terdaftar</option></select></div>
                  <div className="form-field"><label>Rekomendasi</label><select name="rekomendasi" value={formIden.rekomendasi || 'Perlu Bantuan'} onChange={handleIdenChange}><option>Perlu Bantuan</option><option>Cukup</option></select></div>
                  <div className="form-field full"><label>Catatan Verifikasi</label><textarea rows="2" name="catatan" value={formIden.catatan || ''} onChange={handleIdenChange} placeholder="Catatan hasil kunjungan..."></textarea></div>
                </div>
              )}
              {subTab4 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kepala Keluarga</label><input name="nama_kk" value={formIden.nama_kk || ''} onChange={handleIdenChange} placeholder="Nama KK" /></div>
                  <div className="form-field"><label>Alamat</label><input name="alamat" value={formIden.alamat || ''} onChange={handleIdenChange} placeholder="RT/RW, alamat" /></div>
                  <div className="form-field"><label>Kondisi Rumah</label><select name="kondisi_rumah" value={formIden.kondisi_rumah || 'Layak'} onChange={handleIdenChange}><option>Layak</option><option>Kurang Layak</option><option>Tidak Layak</option></select></div>
                  <div className="form-field"><label>Kepemilikan Aset</label><input name="aset" value={formIden.aset || ''} onChange={handleIdenChange} placeholder="mis. motor, tanah" /></div>
                  <div className="form-field"><label>Sumber Penghasilan</label><input name="penghasilan" value={formIden.penghasilan || ''} onChange={handleIdenChange} placeholder="mis. Buruh tani" /></div>
                  <div className="form-field full"><label>Hasil Verifikasi</label><textarea rows="2" name="hasil_verifikasi" value={formIden.hasil_verifikasi || ''} onChange={handleIdenChange} placeholder="Catatan hasil lapangan..."></textarea></div>
                </div>
              )}
              {subTab4 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Jenis Bantuan</label><input name="jenis_bantuan" value={formIden.jenis_bantuan || ''} onChange={handleIdenChange} placeholder="mis. Sembako, BLT" /></div>
                  <div className="form-field"><label>Nama Penerima</label><input name="penerima" value={formIden.penerima || ''} onChange={handleIdenChange} placeholder="Nama penerima bantuan" /></div>
                  <div className="form-field"><label>Jumlah / Nilai Bantuan</label><input name="jumlah_bantuan" value={formIden.jumlah_bantuan || ''} onChange={handleIdenChange} placeholder="mis. Rp200.000" /></div>
                  <div className="form-field"><label>Tanggal Penyaluran</label><input type="date" name="tanggal" value={formIden.tanggal || ''} onChange={handleIdenChange} /></div>
                  <div className="form-field full"><label>Foto Dokumentasi Serah Terima</label>
                    <input type="file" multiple accept="image/*" onChange={(e) => setFotoIden(e.target.files)} style={{ border: '1px solid #ddd', padding: '8px', borderRadius: '6px', width: '100%' }} />
                  </div>
                </div>
              )}
              <button onClick={submitIdentifikasi} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px' }}>{isLoading ? 'Menyimpan...' : 'Simpan Formulir'}</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Sosial</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input name="nama_pelapor" value={formPengaduan.nama_pelapor} onChange={handlePengaduanChange} placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select name="jenis_kelamin" value={formPengaduan.jenis_kelamin} onChange={handlePengaduanChange}><option value="L">Laki-laki</option><option value="P">Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input name="nik" value={formPengaduan.nik} onChange={handlePengaduanChange} placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat Kader</span></div>
                <div className="form-field"><label>No. HP</label><input name="no_hp" value={formPengaduan.no_hp} onChange={handlePengaduanChange} placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input name="alamat" value={formPengaduan.alamat} onChange={handlePengaduanChange} placeholder="Alamat lengkap" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea name="isi_keluhan" value={formPengaduan.isi_keluhan} onChange={handlePengaduanChange} rows="3" placeholder="Uraikan keluhan..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input name="lokasi_masalah" value={formPengaduan.lokasi_masalah} onChange={handlePengaduanChange} placeholder="mis. RT 06" /></div>
                <div className="form-field full"><label>Unggah Lampiran (Opsional)</label><input type="file" multiple accept=".jpg,.png,.pdf,.doc,.docx" onChange={(e) => setLampiranPengaduan(e.target.files)} /></div>
              </div>
              <button onClick={submitPengaduan} disabled={isLoading} className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>{isLoading ? 'Mengirim...' : 'Simpan Pengaduan'}</button>
            </div>
          </div>
          {/* ================= REKAP TABEL DINAMIS (KIRI: FORMULIR, KANAN: PENGADUAN) ================= */}
          {(() => {
            const bidangSaatIni = BIDANG_MAP[tab];
            const namaBidang = ['Pendidikan', 'Pekerjaan Umum', 'Perumahan Rakyat', 'Trantibumlinmas', 'Sosial'][tab];

            // Filter data
            const dataPengaduanFilter = rekapPengaduan.filter(item => item.bidang === bidangSaatIni);
            const dataFormulirFilter = rekapFormulir.filter(item => item.bidang === bidangSaatIni);
            const belumSelesai = dataPengaduanFilter.filter(item => item.status !== 'selesai').length;

            return (
              <div className="grid grid-2" style={{ marginTop: '16px' }}>

                {/* --- KIRI: REKAP FORMULIR --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Formulir {namaBidang}</h3>
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Tanggal</th><th>Sub-Bidang</th><th>Ringkasan Data</th></tr>
                      </thead>
                      <tbody>
                        {dataFormulirFilter.length > 0 ? (
                          dataFormulirFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                              <td><span style={{ fontWeight: '600', color: '#333' }}>{item.sub_bidang}</span></td>
                              <td>
                                {/* TOMBOL POP-UP */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedForm(item)}
                                >
                                  <i className="bi bi-eye me-1"></i>Lihat Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="3" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada formulir tersimpan.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* --- KANAN: REKAP PENGADUAN --- */}
                <div className="card">
                  <div className="section-head">
                    <h3>Rekap Pengaduan {namaBidang}</h3>
                    {belumSelesai > 0 && <span className="badge badge-orange">{belumSelesai} belum ditindaklanjuti</span>}
                  </div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th><th>Aksi</th></tr>
                      </thead>
                      <tbody>
                        {dataPengaduanFilter.length > 0 ? (
                          dataPengaduanFilter.map((item, idx) => (
                            <tr key={idx}>
                              <td>{item.nama_pelapor}</td>
                              <td>{item.isi_keluhan.substring(0, 30)}{item.isi_keluhan.length > 30 ? '...' : ''}</td>
                              <td>
                                <span className={`badge ${item.status === 'menunggu' ? 'badge-rose' : item.status === 'diproses' ? 'badge-orange' : 'badge-green'}`}>
                                  {item.status === 'menunggu' ? 'Baru' : item.status === 'diproses' ? 'Diproses' : 'Selesai'}
                                </span>
                              </td>
                              <td>
                                {/* TOMBOL POP-UP PENGADUAN */}
                                <button
                                  className="btn btn-sm btn-outline"
                                  onClick={() => setSelectedPengaduan(item)}
                                >
                                  <i className="bi bi-eye"></i> Detail
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>Belum ada pengaduan di bidang ini.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      )}
      {/* =========================================
          MODAL POP-UP DETAIL FORMULIR
          ========================================= */}
      {selectedForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="card" style={{
            width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
            position: 'relative', backgroundColor: '#fff', borderRadius: '12px', padding: '24px'
          }}>
            {/* Tombol Close (X) di pojok kanan atas */}
            <button
              onClick={() => setSelectedForm(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}
            >
              &times;
            </button>

            <div className="section-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ color: 'var(--violet-deep)' }}>Detail Formulir</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{selectedForm.sub_bidang}</p>
            </div>

            {/* Tabel Rincian Data Dinamis */}
            <table className="table">
              <tbody>
                <tr>
                  <td style={{ width: '40%', color: '#666', fontSize: '13px' }}>Tanggal Kirim</td>
                  <td><b>{new Date(selectedForm.created_at).toLocaleString('id-ID')}</b></td>
                </tr>
                {Object.entries(selectedForm.data_formulir).map(([key, value], idx) => (
                  <tr key={idx}>
                    <td style={{ color: '#666', textTransform: 'capitalize', fontSize: '13px' }}>
                      {key.replace(/_/g, ' ')}
                    </td>
                    <td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><b>{value || '-'}</b></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button className="btn btn-violet" onClick={() => setSelectedForm(null)}>Tutup Rincian</button>
            </div>
          </div>
        </div>
      )}
      {/* =========================================
          MODAL POP-UP DETAIL PENGADUAN
          ========================================= */}
      {selectedPengaduan && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="card" style={{
            width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
            position: 'relative', backgroundColor: '#fff', borderRadius: '12px', padding: '24px'
          }}>
            <button
              onClick={() => setSelectedPengaduan(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}
            >
              &times;
            </button>

            <div className="section-head" style={{ borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ color: 'var(--magenta-deep)' }}>Detail Pengaduan</h3>
              <p style={{ margin: 0, color: '#666', fontSize: '14px', textTransform: 'capitalize' }}>Bidang: {selectedPengaduan.bidang.replace(/_/g, ' ')}</p>
            </div>

            <table className="table">
              <tbody>
                <tr>
                  <td style={{ width: '35%', color: '#666', fontSize: '13px' }}>Tanggal Lapor</td>
                  <td><b>{new Date(selectedPengaduan.created_at).toLocaleString('id-ID')}</b></td>
                </tr>
                <tr><td style={{ color: '#666', fontSize: '13px' }}>Nama Pelapor</td><td><b>{selectedPengaduan.nama_pelapor} ({selectedPengaduan.jenis_kelamin})</b></td></tr>
                <tr><td style={{ color: '#666', fontSize: '13px' }}>NIK</td><td><b>{selectedPengaduan.nik}</b></td></tr>
                <tr><td style={{ color: '#666', fontSize: '13px' }}>No. HP</td><td><b>{selectedPengaduan.no_hp || '-'}</b></td></tr>
                <tr><td style={{ color: '#666', fontSize: '13px' }}>Alamat</td><td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><b>{selectedPengaduan.alamat || '-'}</b></td></tr>
                <tr><td style={{ color: '#666', fontSize: '13px' }}>Lokasi Masalah</td><td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><b>{selectedPengaduan.lokasi_masalah || '-'}</b></td></tr>
                <tr><td style={{ color: '#666', fontSize: '13px' }}>Isi Keluhan</td><td style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}><b>{selectedPengaduan.isi_keluhan}</b></td></tr>
                <tr>
                  <td style={{ color: '#666', fontSize: '13px' }}>Status Saat Ini</td>
                  <td>
                    <span className={`badge ${selectedPengaduan.status === 'menunggu' ? 'badge-rose' : selectedPengaduan.status === 'diproses' ? 'badge-orange' : 'badge-green'}`}>
                      {selectedPengaduan.status === 'menunggu' ? 'Baru (Menunggu)' : selectedPengaduan.status === 'diproses' ? 'Sedang Diproses' : 'Selesai Ditindak'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* AREA LAMPIRAN FOTO/DOKUMEN */}
            {selectedPengaduan.lampiran && selectedPengaduan.lampiran.length > 0 && (
              <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                <div style={{ color: '#666', fontSize: '13px', marginBottom: '8px' }}><b>Bukti Lampiran:</b></div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedPengaduan.lampiran.map((file_path, idx) => (
                    <a
                      key={idx}
                      href={`http://127.0.0.1:8000/storage/${file_path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-outline"
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                    >
                      <i className="bi bi-image me-1"></i>Lihat File {idx + 1}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button className="btn btn-violet" onClick={() => setSelectedPengaduan(null)}>Tutup Rincian</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}