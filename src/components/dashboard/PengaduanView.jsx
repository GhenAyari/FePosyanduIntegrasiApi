import React, { useState } from 'react';

export default function PengaduanView() {
  const [tab, setTab] = useState(0);

  return (
    <>
      <div className="tabs">
        <button className={`tab-btn ${tab === 0 ? 'active' : ''}`} onClick={() => setTab(0)}><svg className="ic ic-sm"><use href="#i-book" /></svg>Pendidikan</button>
        <button className={`tab-btn ${tab === 1 ? 'active' : ''}`} onClick={() => setTab(1)}><svg className="ic ic-sm"><use href="#i-droplet" /></svg>Pekerjaan Umum</button>
        <button className={`tab-btn ${tab === 2 ? 'active' : ''}`} onClick={() => setTab(2)}><svg className="ic ic-sm"><use href="#i-home" /></svg>Perumahan Rakyat</button>
        <button className={`tab-btn ${tab === 3 ? 'active' : ''}`} onClick={() => setTab(3)}><svg className="ic ic-sm"><use href="#i-shield" /></svg>Trantibumlinmas</button>
        <button className={`tab-btn ${tab === 4 ? 'active' : ''}`} onClick={() => setTab(4)}><svg className="ic ic-sm"><use href="#i-heart" /></svg>Sosial</button>
      </div>

      {tab === 0 && (
        <div id="bidang-0">
          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: 'var(--orange-deep)' }}><use href="#i-book" /></svg>Formulir Identifikasi — Pendidikan</h3></div>
              <div className="tabs" style={{ marginBottom: '16px' }}>
                <div className="form-chip active">Anak Usia Dini (0–6 th)</div>
                <div className="form-chip">Perpustakaan / Pojok Baca</div>
                <div className="form-chip">Literasi Digital Ortu</div>
                <div className="form-chip">Inventaris APE</div>
              </div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Anak</label><input placeholder="Nama anak" /></div>
                <div className="form-field"><label>Usia (tahun)</label><input type="number" placeholder="4" /></div>
                <div className="form-field"><label>Nama Orang Tua</label><input placeholder="Nama orang tua/wali" /></div>
                <div className="form-field"><label>Status Pendidikan Anak</label><select><option>Belum Sekolah</option><option>PAUD/TK</option><option>Tidak Bersekolah</option></select></div>
                <div className="form-field full"><label>Catatan Tumbuh Kembang</label><textarea rows="2" placeholder="Catatan kader..."></textarea></div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: '16px' }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: 'var(--magenta-deep)' }}><use href="#i-megaphone" /></svg>Pengaduan Masyarakat — Pendidikan</h3></div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><svg className="ic ic-sm"><use href="#i-lock" /></svg>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
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

      {tab === 1 && (<div id="bidang-1">
          <div className="grid grid-2" style={{ marginBottom: "16px" }}>
            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: "var(--cyan-deep)" }}><use href="#i-droplet" /></svg>Formulir Identifikasi — Pekerjaan Umum</h3></div>
              <div className="tabs" style={{ marginBottom: "16px" }} data-target="pu">
                <div className="form-chip active" data-idx="0">Edukasi Air Bersih &amp; Limbah</div>
                <div className="form-chip" data-idx="1">Identifikasi Embung Air Baku</div>
                <div className="form-chip" data-idx="2">Jaringan Air Perdesaan</div>
                <div className="form-chip" data-idx="3">Sumur Air Tanah</div>
                <div className="form-chip" data-idx="4">Pembangunan Jalan Desa</div>
              </div>
              <div className="form-grid subform" data-subform="pu-0">
                <div className="form-field"><label>Nama Kegiatan Edukasi</label><input placeholder="mis. Sosialisasi SPAL Sehat" /></div>
                <div className="form-field"><label>Lokasi / RT</label><input placeholder="RT 02" /></div>
                <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="25" /></div>
                <div className="form-field"><label>Kondisi Sarana Limbah</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                <div className="form-field full"><label>Materi yang Disampaikan</label><textarea rows="2" placeholder="Ringkasan materi edukasi..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="pu-1" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Embung / Lokasi</label><input placeholder="mis. Embung RT 04" /></div>
                <div className="form-field"><label>Kapasitas Tampung (m³)</label><input type="number" placeholder="150" /></div>
                <div className="form-field"><label>Kondisi Embung</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                <div className="form-field"><label>Sumber Air</label><input placeholder="mis. Mata air, sungai" /></div>
                <div className="form-field"><label>Pemanfaatan</label><select><option>Air Baku Warga</option><option>Irigasi</option><option>Air Baku &amp; Irigasi</option></select></div>
                <div className="form-field full"><label>Catatan</label><textarea rows="2" placeholder="Catatan kondisi/kebutuhan embung..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="pu-2" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Jaringan / Lokasi</label><input placeholder="mis. Jaringan RT 01–03" /></div>
                <div className="form-field"><label>Jumlah KK Terlayani</label><input type="number" placeholder="40" /></div>
                <div className="form-field"><label>Kondisi Jaringan Pipa</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option></select></div>
                <div className="form-field"><label>Jenis Kerusakan</label><input placeholder="mis. Pipa bocor, sambungan lepas" /></div>
                <div className="form-field full"><label>Tindakan Pemeliharaan</label><textarea rows="2" placeholder="Tindakan yang dilakukan/diperlukan..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="pu-3" style={{ display: "none" }}>
                <div className="form-field"><label>Lokasi Sumur</label><input placeholder="mis. RT 06" /></div>
                <div className="form-field"><label>Jenis Sumur</label><select><option>Sumur Bor</option><option>Sumur Gali</option></select></div>
                <div className="form-field"><label>Kondisi Air</label><select><option>Jernih</option><option>Keruh</option><option>Kering</option></select></div>
                <div className="form-field"><label>Jumlah KK Pengguna</label><input type="number" placeholder="6" /></div>
                <div className="form-field full"><label>Kebutuhan Rehabilitasi</label><textarea rows="2" placeholder="mis. Perlu pengurasan, penggantian pompa..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="pu-4" style={{ display: "none" }}>
                <div className="form-field"><label>Lokasi Ruas Jalan</label><input placeholder="mis. Jalan RT 05–07" /></div>
                <div className="form-field"><label>Panjang Ruas (meter)</label><input type="number" placeholder="300" /></div>
                <div className="form-field"><label>Kondisi Jalan Saat Ini</label><select><option>Baik</option><option>Rusak Ringan</option><option>Rusak Berat</option><option>Belum Ada</option></select></div>
                <div className="form-field"><label>Jenis Kebutuhan</label><select><option>Pengerasan</option><option>Aspal</option><option>Betonisasi</option><option>Drainase</option></select></div>
                <div className="form-field"><label>Prioritas</label><select><option>Sedang</option><option>Tinggi</option><option>Rendah</option></select></div>
                <div className="form-field full"><label>Catatan Tambahan</label><textarea rows="2" placeholder="Catatan pendukung usulan..."></textarea></div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: "16px" }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: "var(--magenta-deep)" }}><use href="#i-megaphone" /></svg>Pengaduan Masyarakat — Pekerjaan Umum</h3></div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><svg className="ic ic-sm"><use href="#i-lock" /></svg>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="mis. Jalan rusak, sumur kering..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. Jalan RT 05" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>Simpan Pengaduan</button>
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

{tab === 2 && (<div id="bidang-2">
          <div className="grid grid-2" style={{ marginBottom: "16px" }}>
            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: "var(--green-deep)" }}><use href="#i-home" /></svg>Formulir Identifikasi — Perumahan Rakyat</h3></div>
              <div className="tabs" style={{ marginBottom: "16px" }} data-target="rumah">
                <div className="form-chip active" data-idx="0">Rumah Tidak Layak Huni</div>
                <div className="form-chip" data-idx="1">KIE Lingkungan Bersih &amp; Sehat</div>
                <div className="form-chip" data-idx="2">Pemanfaatan Pekarangan</div>
                <div className="form-chip" data-idx="3">Biopori Rumah Tangga</div>
              </div>
              <div className="form-grid subform" data-subform="rumah-0">
                <div className="form-field"><label>Nama Kepala Keluarga</label><input placeholder="Nama KK" /></div>
                <div className="form-field"><label>Alamat Rumah</label><input placeholder="RT/RW, alamat" /></div>
                <div className="form-field"><label>Kondisi Rumah</label><select><option>Layak Huni</option><option>Tidak Layak Huni</option></select></div>
                <div className="form-field"><label>Rekomendasi Bantuan</label><select><option>BSPS</option><option>Lainnya</option><option>Tidak Diperlukan</option></select></div>
                <div className="form-field full"><label>Jenis Kerusakan</label><textarea rows="2" placeholder="mis. Atap bocor, dinding non-permanen..."></textarea></div>
                <div className="form-field full"><label>Foto Kondisi Rumah</label>
                  <div className="upload-box"><svg className="ic"><use href="#i-camera" /></svg><span><b>Tap untuk unggah</b> foto kondisi rumah</span></div>
                </div>
              </div>
              <div className="form-grid subform" data-subform="rumah-1" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Kegiatan KIE</label><input placeholder="mis. Penyuluhan Rumah Sehat" /></div>
                <div className="form-field"><label>Lokasi / RT</label><input placeholder="RT 03" /></div>
                <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="20" /></div>
                <div className="form-field"><label>Materi yang Disampaikan</label><input placeholder="mis. Sanitasi, ventilasi rumah" /></div>
                <div className="form-field full"><label>Catatan Evaluasi</label><textarea rows="2" placeholder="Hasil evaluasi kegiatan KIE..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="rumah-2" style={{ display: "none" }}>
                <div className="form-field"><label>Nama KK / Lokasi</label><input placeholder="Nama KK atau lokasi pekarangan" /></div>
                <div className="form-field"><label>Jenis Tanaman</label><input placeholder="mis. Sayur, TOGA, cabai" /></div>
                <div className="form-field"><label>Luas Pekarangan (m²)</label><input type="number" placeholder="15" /></div>
                <div className="form-field"><label>Status Pemanfaatan</label><select><option>Aktif Dimanfaatkan</option><option>Belum Dimanfaatkan</option></select></div>
                <div className="form-field full"><label>Catatan</label><textarea rows="2" placeholder="Catatan tambahan..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="rumah-3" style={{ display: "none" }}>
                <div className="form-field"><label>Nama KK / Lokasi</label><input placeholder="Nama KK atau lokasi" /></div>
                <div className="form-field"><label>Jumlah Titik Biopori</label><input type="number" placeholder="3" /></div>
                <div className="form-field"><label>Kondisi Biopori</label><select><option>Baik</option><option>Tersumbat</option><option>Rusak</option></select></div>
                <div className="form-field"><label>Tanggal Pembuatan</label><input type="date" /></div>
                <div className="form-field full"><label>Catatan</label><textarea rows="2" placeholder="Catatan tambahan..."></textarea></div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: "16px" }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: "var(--magenta-deep)" }}><use href="#i-megaphone" /></svg>Pengaduan Masyarakat — Perumahan Rakyat</h3></div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" value="Bu Sari" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Perempuan</option><option>Laki-laki</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><svg className="ic ic-sm"><use href="#i-lock" /></svg>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="mis. Usul perbaikan rumah tidak layak huni...">Rumah bocor parah tiap musim hujan, mengajukan bantuan BSPS.</textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. RT 03" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>Simpan Pengaduan</button>
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

{tab === 3 && (<div id="bidang-3">
          <div className="grid grid-2" style={{ marginBottom: "16px" }}>
            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: "var(--violet-deep)" }}><use href="#i-shield" /></svg>Formulir Identifikasi — Trantibumlinmas</h3></div>
              <div className="tabs" style={{ marginBottom: "16px" }} data-target="trantib">
                <div className="form-chip" data-idx="0">Korban Trauma &amp; Psikososial</div>
                <div className="form-chip" data-idx="1">Penyuluhan &amp; Evaluasi Trauma</div>
                <div className="form-chip" data-idx="2">KIE &amp; Simulasi Bencana</div>
                <div className="form-chip active" data-idx="3">Insiden Kamtibmas</div>
                <div className="form-chip" data-idx="4">Sosialisasi Pencegahan</div>
                <div className="form-chip" data-idx="5">Patroli Keamanan</div>
              </div>
              <div className="form-grid subform" data-subform="trantib-0" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Korban</label><input placeholder="Nama korban" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>Usia</label><input type="number" placeholder="35" /></div>
                <div className="form-field"><label>Jenis Kejadian Traumatis</label><input placeholder="mis. Bencana, kekerasan" /></div>
                <div className="form-field full"><label>Kebutuhan Dukungan Psikososial</label><textarea rows="2" placeholder="Uraikan kebutuhan dukungan..."></textarea></div>
                <div className="form-field full"><label>Tindak Lanjut / Rujukan</label><textarea rows="2" placeholder="Rujukan atau tindakan yang dilakukan..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="trantib-1" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Kegiatan Penyuluhan</label><input placeholder="mis. Penyuluhan Pemulihan Trauma" /></div>
                <div className="form-field"><label>Tanggal</label><input type="date" /></div>
                <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="15" /></div>
                <div className="form-field full"><label>Materi Penyuluhan</label><textarea rows="2" placeholder="Ringkasan materi..."></textarea></div>
                <div className="form-field full"><label>Hasil Evaluasi Pemulihan</label><textarea rows="2" placeholder="Hasil evaluasi kondisi peserta..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="trantib-2" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Kegiatan</label><input placeholder="mis. Simulasi Tanggap Bencana" /></div>
                <div className="form-field"><label>Jenis Bencana Disimulasikan</label><input placeholder="mis. Kebakaran, banjir, gempa" /></div>
                <div className="form-field"><label>Tanggal</label><input type="date" /></div>
                <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="30" /></div>
                <div className="form-field full"><label>Hasil Kesiapsiagaan</label><textarea rows="2" placeholder="Catatan hasil simulasi..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="trantib-3">
                <div className="form-field"><label>Nama Pelapor/Saksi</label><input placeholder="Nama" /></div>
                <div className="form-field"><label>Tanggal Kejadian</label><input type="date" /></div>
                <div className="form-field full"><label>Jenis Kejadian</label><input placeholder="mis. Gangguan keamanan lingkungan" /></div>
                <div className="form-field full"><label>Lokasi Kejadian</label><input placeholder="mis. RT 01" /></div>
                <div className="form-field full"><label>Uraian Kejadian</label><textarea rows="2" placeholder="Kronologi singkat kejadian..."></textarea></div>
                <div className="form-field full"><label>Tindak Lanjut Linmas</label><textarea rows="2" placeholder="Tindakan yang sudah/akan dilakukan..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="trantib-4" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Program Sosialisasi</label><input placeholder="mis. Sosialisasi Anti Tawuran" /></div>
                <div className="form-field"><label>Tanggal</label><input type="date" /></div>
                <div className="form-field"><label>Lokasi</label><input placeholder="mis. Balai Desa" /></div>
                <div className="form-field"><label>Jumlah Peserta</label><input type="number" placeholder="25" /></div>
                <div className="form-field full"><label>Materi Sosialisasi</label><textarea rows="2" placeholder="Ringkasan materi..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="trantib-5" style={{ display: "none" }}>
                <div className="form-field"><label>Tanggal Patroli</label><input type="date" /></div>
                <div className="form-field"><label>Wilayah / RT</label><input placeholder="mis. RT 02–04" /></div>
                <div className="form-field"><label>Petugas Piket</label><input placeholder="Nama petugas Linmas" /></div>
                <div className="form-field full"><label>Temuan Selama Patroli</label><textarea rows="2" placeholder="Temuan/kejadian selama patroli..."></textarea></div>
                <div className="form-field full"><label>Tindak Lanjut</label><textarea rows="2" placeholder="Tindak lanjut yang dilakukan..."></textarea></div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: "16px" }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: "var(--magenta-deep)" }}><use href="#i-megaphone" /></svg>Pengaduan Masyarakat — Trantibumlinmas</h3></div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><svg className="ic ic-sm"><use href="#i-lock" /></svg>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="Uraikan keluhan, masalah, atau usulan warga..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. Pos Ronda RT 02" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>Simpan Pengaduan</button>
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

{tab === 4 && (<div id="bidang-4">
          <div className="grid grid-2" style={{ marginBottom: "16px" }}>
            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: "var(--rose-deep)" }}><use href="#i-heart" /></svg>Formulir Identifikasi — Sosial</h3></div>
              <div className="tabs" style={{ marginBottom: "16px" }} data-target="sosial">
                <div className="form-chip" data-idx="0">KIE Gender &amp; Inklusi Sosial</div>
                <div className="form-chip active" data-idx="1">Pendataan Fakir Miskin</div>
                <div className="form-chip" data-idx="2">Verifikasi Sosial-Ekonomi</div>
                <div className="form-chip" data-idx="3">Penyaluran Bantuan Sosial</div>
              </div>
              <div className="form-grid subform" data-subform="sosial-0" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Kegiatan</label><input placeholder="mis. KIE Kesetaraan Gender" /></div>
                <div className="form-field"><label>Tanggal</label><input type="date" /></div>
                <div className="form-field"><label>Jumlah Peserta Laki-laki</label><input type="number" placeholder="10" /></div>
                <div className="form-field"><label>Jumlah Peserta Perempuan</label><input type="number" placeholder="15" /></div>
                <div className="form-field full"><label>Materi Disampaikan</label><textarea rows="2" placeholder="Ringkasan materi..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="sosial-1">
                <div className="form-field"><label>Nama Kepala Keluarga</label><input placeholder="Nama KK" /></div>
                <div className="form-field"><label>Jumlah Anggota Keluarga</label><input type="number" placeholder="4" /></div>
                <div className="form-field"><label>Pekerjaan</label><input placeholder="mis. Buruh harian" /></div>
                <div className="form-field"><label>Penghasilan per Bulan</label><input placeholder="mis. Rp1.000.000" /></div>
                <div className="form-field"><label>Status DTKS</label><select><option>Terdaftar</option><option>Belum Terdaftar</option></select></div>
                <div className="form-field"><label>Rekomendasi</label><select><option>Perlu Bantuan</option><option>Cukup</option></select></div>
                <div className="form-field full"><label>Catatan Verifikasi</label><textarea rows="2" placeholder="Catatan hasil kunjungan/verifikasi..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="sosial-2" style={{ display: "none" }}>
                <div className="form-field"><label>Nama Kepala Keluarga</label><input placeholder="Nama KK" /></div>
                <div className="form-field"><label>Alamat</label><input placeholder="RT/RW, alamat" /></div>
                <div className="form-field"><label>Kondisi Rumah</label><select><option>Layak</option><option>Kurang Layak</option><option>Tidak Layak</option></select></div>
                <div className="form-field"><label>Kepemilikan Aset</label><input placeholder="mis. Tidak ada, motor, tanah" /></div>
                <div className="form-field"><label>Sumber Penghasilan</label><input placeholder="mis. Buruh tani, dagang kecil" /></div>
                <div className="form-field full"><label>Hasil Verifikasi</label><textarea rows="2" placeholder="Catatan hasil verifikasi lapangan..."></textarea></div>
              </div>
              <div className="form-grid subform" data-subform="sosial-3" style={{ display: "none" }}>
                <div className="form-field"><label>Jenis Bantuan</label><input placeholder="mis. Sembako, BLT, PKH" /></div>
                <div className="form-field"><label>Nama Penerima</label><input placeholder="Nama penerima bantuan" /></div>
                <div className="form-field"><label>Jumlah / Nilai Bantuan</label><input placeholder="mis. Rp200.000 atau 10 paket" /></div>
                <div className="form-field"><label>Tanggal Penyaluran</label><input type="date" /></div>
                <div className="form-field full"><label>Foto Dokumentasi Serah Terima</label>
                  <div className="upload-box"><svg className="ic"><use href="#i-camera" /></svg><span><b>Tap untuk unggah</b> foto serah terima bantuan</span></div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: "16px" }}>Simpan Formulir</button>
            </div>

            <div className="card">
              <div className="section-head"><h3><svg className="ic" style={{ color: "var(--magenta-deep)" }}><use href="#i-megaphone" /></svg>Pengaduan Masyarakat — Sosial</h3></div>
              <div className="form-grid">
                <div className="form-field"><label>Nama Pelapor</label><input placeholder="Nama warga" /></div>
                <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
                <div className="form-field"><label>No. KTP</label><input placeholder="16 digit" /><span className="field-note"><svg className="ic ic-sm"><use href="#i-lock" /></svg>Hanya terlihat oleh Kader/Ketua Posyandu</span></div>
                <div className="form-field"><label>No. HP</label><input placeholder="08xx-xxxx-xxxx" /></div>
                <div className="form-field full"><label>Alamat</label><input placeholder="Alamat lengkap pelapor" /></div>
                <div className="form-field full"><label>Isi Keluhan / Usulan</label><textarea rows="3" placeholder="Uraikan keluhan, masalah, atau usulan warga..."></textarea></div>
                <div className="form-field full"><label>Lokasi Masalah/Usulan</label><input placeholder="mis. RT 06" /></div>
                <div className="form-field full"><label>Jenis Lampiran</label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <span className="badge badge-violet">Foto Kegiatan</span>
                    <span className="badge badge-violet">Berita Acara</span>
                    <span className="badge badge-violet">Daftar Hadir</span>
                  </div>
                </div>
              </div>
              <button className="btn btn-violet" style={{ marginTop: "16px", width: "100%", justifyContent: "center" }}>Simpan Pengaduan</button>
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
