import React, { useState } from 'react';

export default function PengaduanView() {
  const [tab, setTab] = useState(0);

  // Sub-chip active index states for each bidang tab
  const [subTab0, setSubTab0] = useState(0); // 0: Pendidikan (0: Anak, 1: Perpus, 2: Literasi, 3: APE)
  const [subTab1, setSubTab1] = useState(0); // 1: Pekerjaan Umum (0: Air/Limbah, 1: Embung, 2: Jaringan, 3: Sumur, 4: Jalan)
  const [subTab2, setSubTab2] = useState(0); // 2: Perumahan Rakyat (0: RTLH, 1: KIE, 2: Pekarangan, 3: Biopori)
  const [subTab3, setSubTab3] = useState(3); // 3: Trantibumlinmas (0: Trauma, 1: Penyuluhan, 2: Bencana, 3: Kamtibmas, 4: Sosialisasi, 5: Patroli)
  const [subTab4, setSubTab4] = useState(1); // 4: Sosial (0: Gender, 1: Fakir Miskin, 2: Verifikasi, 3: Bansos)

  return (
    <>
      {/* Bidang Main Tabs */}
      <div className="tabs" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', marginBottom: '16px' }}>
        <button className={`tab-btn ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)}>
          <i className="bi bi-book-fill me-1"></i>Pendidikan
        </button>
        <button className={`tab-btn ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}>
          <i className="bi bi-droplet-fill me-1"></i>Pekerjaan Umum
        </button>
        <button className={`tab-btn ${tab === 2 ? 'active' : ''}`} onClick={() => setTab(2)}>
          <i className="bi bi-house-door-fill me-1"></i>Perumahan Rakyat
        </button>
        <button className={`tab-btn ${tab === 3 ? 'active' : ''}`} onClick={() => setTab(3)}>
          <i className="bi bi-shield-fill-check me-1"></i>Trantibumlinmas
        </button>
        <button className={`tab-btn ${tab === 4 ? 'active' : ''}`} onClick={() => setTab(4)}>
          <i className="bi bi-heart-fill me-1"></i>Sosial
        </button>
      </div>

      {/* ===== 0. PENDIDIKAN ===== */}
      {tab === 0 && (
        <div id="bidang-0">
          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-book-fill me-2" style={{ color: 'var(--orange-deep)' }}></i>Formulir Identifikasi — Pendidikan</h3>
              </div>
              <div className="tabs" style={{ marginBottom: '16px', display: 'flex', gap: '6px', overflowX: 'auto', flexWrap: 'wrap' }}>
                <div className={`form-chip ${subTab0 === 0 ? 'active' : ''}`} onClick={() => setSubTab0(0)}>Anak Usia Dini (0–6 th)</div>
                <div className={`form-chip ${subTab0 === 1 ? 'active' : ''}`} onClick={() => setSubTab0(1)}>Perpustakaan / Pojok Baca</div>
                <div className={`form-chip ${subTab0 === 2 ? 'active' : ''}`} onClick={() => setSubTab0(2)}>Literasi Digital Ortu</div>
                <div className={`form-chip ${subTab0 === 3 ? 'active' : ''}`} onClick={() => setSubTab0(3)}>Inventaris APE</div>
              </div>

              {subTab0 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Anak</label><input placeholder="Nama anak" /></div>
                  <div className="form-field"><label>Usia (tahun)</label><input type="number" placeholder="4" /></div>
                  <div className="form-field"><label>Nama Orang Tua</label><input placeholder="Nama orang tua/wali" /></div>
                  <div className="form-field"><label>Status Pendidikan Anak</label><select><option>Belum Sekolah</option><option>PAUD/TK</option><option>Tidak Bersekolah</option></select></div>
                  <div className="form-field full"><label>Catatan Tumbuh Kembang</label><textarea rows="2" placeholder="Catatan kader..."></textarea></div>
                </div>
              )}
              {subTab0 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Fasilitas</label><input placeholder="mis. Pojok Baca Posyandu Mawar" /></div>
                  <div className="form-field"><label>Ketersediaan</label><select><option>Ada</option><option>Tidak Ada</option></select></div>
                  <div className="form-field"><label>Jumlah Buku</label><input type="number" placeholder="120" /></div>
                  <div className="form-field"><label>Kondisi</label><select><option>Baik</option><option>Cukup</option><option>Kurang</option></select></div>
                  <div className="form-field"><label>Akses Masyarakat</label><select><option>Mudah</option><option>Sulit</option></select></div>
                  <div className="form-field"><label>Petugas Pengelola</label><input placeholder="mis. Kader, PKK, Karang Taruna" /></div>
                  <div className="form-field full"><label>Catatan / Kebutuhan</label><textarea rows="2" placeholder="mis. Butuh rak baru, butuh buku anak..."></textarea></div>
                </div>
              )}
              {subTab0 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Orang Tua</label><input placeholder="Nama orang tua/wali" /></div>
                  <div className="form-field"><label>Nama Anak</label><input placeholder="Nama anak" /></div>
                  <div className="form-field"><label>Tingkat Literasi Digital</label><select><option>Rendah</option><option>Sedang</option><option>Tinggi</option></select></div>
                  <div className="form-field"><label>Fasilitas HP/Gawai</label><select><option>Ya</option><option>Tidak</option></select></div>
                  <div className="form-field"><label>Kebutuhan Aplikasi Edukasi</label><input placeholder="mis. Aplikasi belajar huruf, video edukasi" /></div>
                  <div className="form-field"><label>Materi Pelatihan yang Diterima</label><input placeholder="mis. Cara mencari video edukasi" /></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" placeholder="Kesulitan orang tua, hambatan sinyal, dll..."></textarea></div>
                </div>
              )}
              {subTab0 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Jenis APE</label><input placeholder="mis. Puzzle Huruf, Balok Susun" /></div>
                  <div className="form-field"><label>Jumlah</label><input placeholder="mis. 3 set / 12 pcs" /></div>
                  <div className="form-field"><label>Kondisi</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                  <div className="form-field"><label>Kebutuhan Tambahan</label><input placeholder="mis. Butuh 2 set puzzle baru" /></div>
                  <div className="form-field"><label>Prioritas</label><select><option>Tinggi</option><option>Sedang</option><option>Rendah</option></select></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" placeholder="mis. APE jarang dipakai, perlu pelatihan penggunaan..."></textarea></div>
                </div>
              )}
              <button className="btn btn-violet" style={{ marginTop: '16px' }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Pendidikan</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="Uraikan keluhan, masalah, atau usulan warga..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. RT 03 / Pojok Baca Desa" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>Simpan Pengaduan</button>
            </div>
          </div>

          <div className="card">
            <div className="section-head"><h3>Rekap Pengaduan Bidang Pendidikan</h3><span className="badge badge-orange">3 belum ditindaklanjuti</span></div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>Bu Rahma</td><td>Pojok baca kurang buku bacaan anak</td><td><span className="badge badge-orange">Diproses</span></td></tr>
                  <tr><td>Pak Yanto</td><td>Usul kelas literasi digital ortu</td><td><span className="badge badge-rose">Baru</span></td></tr>
                  <tr><td>Bu Sinta</td><td>APE PAUD rusak, perlu diganti</td><td><span className="badge badge-green">Selesai</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
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
                <div className={`form-chip ${subTab1 === 0 ? 'active' : ''}`} onClick={() => setSubTab1(0)}>Edukasi Air Bersih &amp; Limbah</div>
                <div className={`form-chip ${subTab1 === 1 ? 'active' : ''}`} onClick={() => setSubTab1(1)}>Identifikasi Embung Air Baku</div>
                <div className={`form-chip ${subTab1 === 2 ? 'active' : ''}`} onClick={() => setSubTab1(2)}>Jaringan Air Perdesaan</div>
                <div className={`form-chip ${subTab1 === 3 ? 'active' : ''}`} onClick={() => setSubTab1(3)}>Sumur Air Tanah</div>
                <div className={`form-chip ${subTab1 === 4 ? 'active' : ''}`} onClick={() => setSubTab1(4)}>Pembangunan Jalan Desa</div>
              </div>

              {subTab1 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan Edukasi</label><input placeholder="mis. Sosialisasi SPAL Sehat" /></div>
                  <div className="form-field"><label>Lokasi / RT</label><input placeholder="RT 02" /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="25" /></div>
                  <div className="form-field"><label>Kondisi Sarana Limbah</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                  <div className="form-field full"><label>Materi yang Disampaikan</label><textarea rows="2" placeholder="Ringkasan materi edukasi..."></textarea></div>
                </div>
              )}
              {subTab1 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Embung / Lokasi</label><input placeholder="mis. Embung RT 04" /></div>
                  <div className="form-field"><label>Kapasitas Tampung (m³)</label><input type="number" placeholder="150" /></div>
                  <div className="form-field"><label>Kondisi Embung</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                  <div className="form-field"><label>Sumber Air</label><input placeholder="mis. Mata air, sungai" /></div>
                  <div className="form-field"><label>Pemanfaatan</label><select><option>Air Baku Warga</option><option>Irigasi</option><option>Air Baku &amp; Irigasi</option></select></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" placeholder="Catatan kondisi/kebutuhan embung..."></textarea></div>
                </div>
              )}
              {subTab1 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Jaringan / Lokasi</label><input placeholder="mis. Jaringan RT 01–03" /></div>
                  <div className="form-field"><label>Jumlah KK Terlayani</label><input type="number" placeholder="40" /></div>
                  <div className="form-field"><label>Kondisi Jaringan Pipa</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                  <div className="form-field"><label>Jenis Kerusakan</label><input placeholder="mis. Pipa bocor, sambungan lepas" /></div>
                  <div className="form-field full"><label>Tindakan Pemeliharaan</label><textarea rows="2" placeholder="Tindakan yang dilakukan/diperlukan..."></textarea></div>
                </div>
              )}
              {subTab1 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Lokasi Sumur</label><input placeholder="mis. RT 06" /></div>
                  <div className="form-field"><label>Jenis Sumur</label><select><option>Sumur Bor</option><option>Sumur Gali</option></select></div>
                  <div className="form-field"><label>Kondisi Air</label><select><option>Jernih</option><option>Keruh</option><option>Kering</option></select></div>
                  <div className="form-field"><label>Jumlah KK Pengguna</label><input type="number" placeholder="6" /></div>
                  <div className="form-field full"><label>Kebutuhan Rehabilitasi</label><textarea rows="2" placeholder="mis. Perlu pengurasan, penggantian pompa..."></textarea></div>
                </div>
              )}
              {subTab1 === 4 && (
                <div className="form-grid">
                  <div className="form-field"><label>Lokasi Ruas Jalan</label><input placeholder="mis. Jalan RT 05–07" /></div>
                  <div className="form-field"><label>Panjang Ruas (meter)</label><input type="number" placeholder="300" /></div>
                  <div className="form-field"><label>Kondisi Jalan Saat Ini</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option><option>Belum Ada</option></select></div>
                  <div className="form-field"><label>Jenis Kebutuhan</label><select><option>Pengerasan</option><option>Aspal</option><option>Betonisasi</option><option>Drainase</option></select></div>
                  <div className="form-field"><label>Prioritas</label><select><option>Sedang</option><option>Tinggi</option><option>Rendah</option></select></div>
                  <div className="form-field full"><label>Catatan Tambahan</label><textarea rows="2" placeholder="Catatan pendukung usulan..."></textarea></div>
                </div>
              )}
              <button className="btn btn-violet" style={{ marginTop: '16px' }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Pekerjaan Umum</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="mis. Jalan rusak, sumur kering..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. Jalan RT 05" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>Simpan Pengaduan</button>
            </div>
          </div>

          <div className="card">
            <div className="section-head"><h3>Rekap Pengaduan Bidang Pekerjaan Umum</h3><span className="badge badge-orange">2 belum ditindaklanjuti</span></div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>Pak Darto</td><td>Jalan RT 05 berlubang &amp; licin saat hujan</td><td><span className="badge badge-orange">Diproses</span></td></tr>
                  <tr><td>Bu Halimah</td><td>Sumur warga kering sejak kemarau</td><td><span className="badge badge-rose">Baru</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
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
                <div className={`form-chip ${subTab2 === 0 ? 'active' : ''}`} onClick={() => setSubTab2(0)}>Rumah Tidak Layak Huni</div>
                <div className={`form-chip ${subTab2 === 1 ? 'active' : ''}`} onClick={() => setSubTab2(1)}>KIE Lingkungan Bersih &amp; Sehat</div>
                <div className={`form-chip ${subTab2 === 2 ? 'active' : ''}`} onClick={() => setSubTab2(2)}>Pemanfaatan Pekarangan</div>
                <div className={`form-chip ${subTab2 === 3 ? 'active' : ''}`} onClick={() => setSubTab2(3)}>Biopori Rumah Tangga</div>
              </div>

              {subTab2 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kepala Keluarga</label><input placeholder="Nama KK" /></div>
                  <div className="form-field"><label>Alamat Rumah</label><input placeholder="RT/RW, alamat" /></div>
                  <div className="form-field"><label>Kondisi Rumah</label><select><option>Layak Huni</option><option>Tidak Layak Huni</option></select></div>
                  <div className="form-field"><label>Rekomendasi Bantuan</label><select><option>BSPS</option><option>Lainnya</option><option>Tidak Diperlukan</option></select></div>
                  <div className="form-field full"><label>Jenis Kerusakan</label><textarea rows="2" placeholder="mis. Atap bocor, dinding non-permanen..."></textarea></div>
                  <div className="form-field full"><label>Foto Kondisi Rumah</label>
                    <div className="upload-box"><i className="bi bi-camera-fill me-2"></i><span><b>Tap untuk unggah</b> foto kondisi rumah</span></div>
                  </div>
                </div>
              )}
              {subTab2 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan KIE</label><input placeholder="mis. Penyuluhan Rumah Sehat" /></div>
                  <div className="form-field"><label>Lokasi / RT</label><input placeholder="RT 03" /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="20" /></div>
                  <div className="form-field"><label>Materi yang Disampaikan</label><input placeholder="mis. Sanitasi, ventilasi rumah" /></div>
                  <div className="form-field full"><label>Catatan Evaluasi</label><textarea rows="2" placeholder="Hasil evaluasi kegiatan KIE..."></textarea></div>
                </div>
              )}
              {subTab2 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama KK / Lokasi</label><input placeholder="Nama KK atau lokasi pekarangan" /></div>
                  <div className="form-field"><label>Jenis Tanaman</label><input placeholder="mis. Sayur, TOGA, cabai" /></div>
                  <div className="form-field"><label>Luas Pekarangan (m²)</label><input type="number" placeholder="15" /></div>
                  <div className="form-field"><label>Status Pemanfaatan</label><select><option>Aktif Dimanfaatkan</option><option>Belum Dimanfaatkan</option></select></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" placeholder="Catatan tambahan..."></textarea></div>
                </div>
              )}
              {subTab2 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama KK / Lokasi</label><input placeholder="Nama KK atau lokasi" /></div>
                  <div className="form-field"><label>Jumlah Titik Biopori</label><input type="number" placeholder="3" /></div>
                  <div className="form-field"><label>Kondisi Biopori</label><select><option>Baik</option><option>Tersumbat</option><option>Rusak</option></select></div>
                  <div className="form-field"><label>Tanggal Pembuatan</label><input type="date" /></div>
                  <div className="form-field full"><label>Catatan</label><textarea rows="2" placeholder="Catatan tambahan..."></textarea></div>
                </div>
              )}
              <button className="btn btn-violet" style={{ marginTop: '16px' }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Perumahan Rakyat</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" defaultValue="Bu Sari" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Perempuan</option><option>Laki-laki</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="mis. Usul perbaikan rumah tidak layak huni..." defaultValue="Rumah bocor parah tiap musim hujan, mengajukan bantuan BSPS."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. RT 03" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>Simpan Pengaduan</button>
            </div>
          </div>

          <div className="card">
            <div className="section-head"><h3>Rekap Pengaduan Bidang Perumahan Rakyat</h3><span className="badge badge-orange">1 belum ditindaklanjuti</span></div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>Bu Sari</td><td>Usul bantuan BSPS untuk atap bocor</td><td><span className="badge badge-orange">Diproses</span></td></tr>
                  <tr><td>Pak Joko</td><td>Biopori RT 04 tersumbat</td><td><span className="badge badge-green">Selesai</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
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
                <div className={`form-chip ${subTab3 === 0 ? 'active' : ''}`} onClick={() => setSubTab3(0)}>Korban Trauma &amp; Psikososial</div>
                <div className={`form-chip ${subTab3 === 1 ? 'active' : ''}`} onClick={() => setSubTab3(1)}>Penyuluhan &amp; Evaluasi Trauma</div>
                <div className={`form-chip ${subTab3 === 2 ? 'active' : ''}`} onClick={() => setSubTab3(2)}>KIE &amp; Simulasi Bencana</div>
                <div className={`form-chip ${subTab3 === 3 ? 'active' : ''}`} onClick={() => setSubTab3(3)}>Insiden Kamtibmas</div>
                <div className={`form-chip ${subTab3 === 4 ? 'active' : ''}`} onClick={() => setSubTab3(4)}>Sosialisasi Pencegahan</div>
                <div className={`form-chip ${subTab3 === 5 ? 'active' : ''}`} onClick={() => setSubTab3(5)}>Patroli Keamanan</div>
              </div>

              {subTab3 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Korban</label><input placeholder="Nama korban" /></div>
                  <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                  <div className="form-field"><label>Usia</label><input type="number" placeholder="35" /></div>
                  <div className="form-field"><label>Jenis Kejadian Traumatis</label><input placeholder="mis. Bencana, kekerasan" /></div>
                  <div className="form-field full"><label>Kebutuhan Dukungan Psikososial</label><textarea rows="2" placeholder="Uraikan kebutuhan dukungan..."></textarea></div>
                  <div className="form-field full"><label>Tindak Lanjut / Rujukan</label><textarea rows="2" placeholder="Rujukan atau tindakan yang dilakukan..."></textarea></div>
                </div>
              )}
              {subTab3 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan Penyuluhan</label><input placeholder="mis. Penyuluhan Pemulihan Trauma" /></div>
                  <div className="form-field"><label>Tanggal</label><input type="date" /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="15" /></div>
                  <div className="form-field full"><label>Materi Penyuluhan</label><textarea rows="2" placeholder="Ringkasan materi..."></textarea></div>
                  <div className="form-field full"><label>Hasil Evaluasi Pemulihan</label><textarea rows="2" placeholder="Hasil evaluasi kondisi peserta..."></textarea></div>
                </div>
              )}
              {subTab3 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan</label><input placeholder="mis. Simulasi Tanggap Bencana" /></div>
                  <div className="form-field"><label>Jenis Bencana Disimulasikan</label><input placeholder="mis. Kebakaran, banjir, gempa" /></div>
                  <div className="form-field"><label>Tanggal</label><input type="date" /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="30" /></div>
                  <div className="form-field full"><label>Hasil Kesiapsiagaan</label><textarea rows="2" placeholder="Catatan hasil simulasi..."></textarea></div>
                </div>
              )}
              {subTab3 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Pelapor/Saksi</label><input placeholder="Nama" /></div>
                  <div className="form-field"><label>Tanggal Kejadian</label><input type="date" /></div>
                  <div className="form-field full"><label>Jenis Kejadian</label><input placeholder="mis. Gangguan keamanan lingkungan" /></div>
                  <div className="form-field full"><label>Lokasi Kejadian</label><input placeholder="mis. RT 01" /></div>
                  <div className="form-field full"><label>Uraian Kejadian</label><textarea rows="2" placeholder="Kronologi singkat kejadian..."></textarea></div>
                  <div className="form-field full"><label>Tindak Lanjut Linmas</label><textarea rows="2" placeholder="Tindakan yang sudah/akan dilakukan..."></textarea></div>
                </div>
              )}
              {subTab3 === 4 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Program Sosialisasi</label><input placeholder="mis. Sosialisasi Anti Tawuran" /></div>
                  <div className="form-field"><label>Tanggal</label><input type="date" /></div>
                  <div className="form-field"><label>Lokasi</label><input placeholder="mis. Balai Desa" /></div>
                  <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="25" /></div>
                  <div className="form-field full"><label>Materi Sosialisasi</label><textarea rows="2" placeholder="Ringkasan materi..."></textarea></div>
                </div>
              )}
              {subTab3 === 5 && (
                <div className="form-grid">
                  <div className="form-field"><label>Tanggal Patroli</label><input type="date" /></div>
                  <div className="form-field"><label>Wilayah / RT</label><input placeholder="mis. RT 02–04" /></div>
                  <div className="form-field"><label>Petugas Piket</label><input placeholder="Nama petugas Linmas" /></div>
                  <div className="form-field full"><label>Temuan Selama Patroli</label><textarea rows="2" placeholder="Temuan/kejadian selama patroli..."></textarea></div>
                  <div className="form-field full"><label>Tindak Lanjut</label><textarea rows="2" placeholder="Tindak lanjut yang dilakukan..."></textarea></div>
                </div>
              )}
              <button className="btn btn-violet" style={{ marginTop: '16px' }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Trantibumlinmas</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="Uraikan keluhan, masalah, atau usulan warga..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. Pos Ronda RT 02" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>Simpan Pengaduan</button>
            </div>
          </div>

          <div className="card">
            <div className="section-head"><h3>Rekap Pengaduan Bidang Trantibumlinmas</h3><span className="badge badge-rose">Belum ada tindak lanjut</span></div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>Pak Slamet</td><td>Usul jadwal patroli malam ditambah</td><td><span className="badge badge-rose">Baru</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
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
                <div className={`form-chip ${subTab4 === 0 ? 'active' : ''}`} onClick={() => setSubTab4(0)}>KIE Gender &amp; Inklusi Sosial</div>
                <div className={`form-chip ${subTab4 === 1 ? 'active' : ''}`} onClick={() => setSubTab4(1)}>Pendataan Fakir Miskin</div>
                <div className={`form-chip ${subTab4 === 2 ? 'active' : ''}`} onClick={() => setSubTab4(2)}>Verifikasi Sosial-Ekonomi</div>
                <div className={`form-chip ${subTab4 === 3 ? 'active' : ''}`} onClick={() => setSubTab4(3)}>Penyaluran Bantuan Sosial</div>
              </div>

              {subTab4 === 0 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kegiatan</label><input placeholder="mis. KIE Kesetaraan Gender" /></div>
                  <div className="form-field"><label>Tanggal</label><input type="date" /></div>
                  <div className="form-field"><label>Jumlah Peserta Laki-laki</label><input type="number" placeholder="10" /></div>
                  <div className="form-field"><label>Jumlah Peserta Perempuan</label><input type="number" placeholder="15" /></div>
                  <div className="form-field full"><label>Materi Disampaikan</label><textarea rows="2" placeholder="Ringkasan materi..."></textarea></div>
                </div>
              )}
              {subTab4 === 1 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kepala Keluarga</label><input placeholder="Nama KK" /></div>
                  <div className="form-field"><label>Jumlah Anggota Keluarga</label><input type="number" placeholder="4" /></div>
                  <div className="form-field"><label>Pekerjaan</label><input placeholder="mis. Buruh harian" /></div>
                  <div className="form-field"><label>Penghasilan per Bulan</label><input placeholder="mis. Rp1.000.000" /></div>
                  <div className="form-field"><label>Status DTKS</label><select><option>Terdaftar</option><option>Belum Terdaftar</option></select></div>
                  <div className="form-field"><label>Rekomendasi</label><select><option>Perlu Bantuan</option><option>Cukup</option></select></div>
                  <div className="form-field full"><label>Catatan Verifikasi</label><textarea rows="2" placeholder="Catatan hasil kunjungan/verifikasi..."></textarea></div>
                </div>
              )}
              {subTab4 === 2 && (
                <div className="form-grid">
                  <div className="form-field"><label>Nama Kepala Keluarga</label><input placeholder="Nama KK" /></div>
                  <div className="form-field"><label>Alamat</label><input placeholder="RT/RW, alamat" /></div>
                  <div className="form-field"><label>Kondisi Rumah</label><select><option>Layak</option><option>Kurang Layak</option><option>Tidak Layak</option></select></div>
                  <div className="form-field"><label>Kepemilikan Aset</label><input placeholder="mis. Tidak ada, motor, tanah" /></div>
                  <div className="form-field"><label>Sumber Penghasilan</label><input placeholder="mis. Buruh tani, dagang kecil" /></div>
                  <div className="form-field full"><label>Hasil Verifikasi</label><textarea rows="2" placeholder="Catatan hasil verifikasi lapangan..."></textarea></div>
                </div>
              )}
              {subTab4 === 3 && (
                <div className="form-grid">
                  <div className="form-field"><label>Jenis Bantuan</label><input placeholder="mis. Sembako, BLT, PKH" /></div>
                  <div className="form-field"><label>Nama Penerima</label><input placeholder="Nama penerima bantuan" /></div>
                  <div className="form-field"><label>Jumlah / Nilai Bantuan</label><input placeholder="mis. Rp200.000 atau 10 paket" /></div>
                  <div className="form-field"><label>Tanggal Penyaluran</label><input type="date" /></div>
                  <div className="form-field full"><label>Foto Dokumentasi Serah Terima</label>
                    <div className="upload-box"><i className="bi bi-camera-fill me-2"></i><span><b>Tap untuk unggah</b> foto serah terima bantuan</span></div>
                  </div>
                </div>
              )}
              <button className="btn btn-violet" style={{ marginTop: '16px' }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head">
                <h3><i className="bi bi-megaphone-fill me-2" style={{ color: 'var(--magenta-deep)' }}></i>Pengaduan Masyarakat — Sosial</h3>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><i className="bi bi-lock-fill me-1"></i>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="Uraikan keluhan, masalah, atau usulan warga..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. RT 06" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>Simpan Pengaduan</button>
            </div>
          </div>

          <div className="card">
            <div className="section-head"><h3>Rekap Pengaduan Bidang Sosial</h3><span className="badge badge-orange">1 belum ditindaklanjuti</span></div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr><th>Pelapor</th><th>Isi Singkat</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>Bu Warni</td><td>Usul keluarganya masuk pendataan DTKS</td><td><span className="badge badge-orange">Diproses</span></td></tr>
                  <tr><td>Pak Budi</td><td>Bantuan sembako triwulan lalu belum diterima</td><td><span className="badge badge-green">Selesai</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
