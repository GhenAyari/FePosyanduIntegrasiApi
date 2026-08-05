import React from 'react';

export default function ProfilView() {
  return (
    <>
      <div className="grid grid-2">
        <div className="card">
          <div className="section-head"><h3>Profil Posyandu</h3><span className="badge badge-violet">Terakhir diperbarui: 2 Jul 2026</span></div>
          <div className="form-grid">
            <div className="form-field"><label>Strata Posyandu</label><select><option>Purnama</option><option>Mandiri</option><option>Madya</option><option>Pratama</option></select></div>
            <div className="form-field"><label>Program Terintegrasi</label><input defaultValue="PAUD, BKB" /></div>
            <div className="form-field"><label>Penanggung Jawab Umum</label><input defaultValue="Ibu Siti Aminah" /></div>
            <div className="form-field"><label>Penanggung Jawab Operasional</label><input defaultValue="Ibu Wulandari" /></div>
            <div className="form-field"><label>Ketua Pelaksana</label><input defaultValue="Ibu Siti Aminah" /></div>
            <div className="form-field"><label>Sekretaris</label><input defaultValue="Ibu Ratna Sari" /></div>
            <div className="form-field"><label>Bendahara</label><input defaultValue="Ibu Yuni Lestari" /></div>
            <div className="form-field"><label>Jumlah Kader Aktif</label><input defaultValue="5" type="number" /></div>
            <div className="form-field"><label>Jumlah Kader Tidak Aktif</label><input defaultValue="1" type="number" /></div>
            <div className="form-field"><label>Bidan Desa</label><input defaultValue="Bidan Anisa, S.Tr.Keb" /></div>
            <div className="form-field"><label>Petugas KB</label><input defaultValue="Pak Herman" /></div>
            <div className="form-field"><label>Kode Kecamatan</label><input defaultValue="64.72" disabled style={{ background: 'var(--surface-container)', color: 'var(--ink-faint)' }} /></div>
            <div className="form-field"><label>Kode Desa</label><input defaultValue="64.72.05" disabled style={{ background: 'var(--surface-container)', color: 'var(--ink-faint)' }} /></div>
          </div>
          <button className="btn btn-violet" style={{ marginTop: '16px' }}>Simpan Profil</button>
        </div>

        <div className="card">
          <div className="section-head"><h3>Data Sarana Posyandu</h3></div>
          <div className="form-grid">
            <div className="form-field"><label>Tempat Pelayanan</label><select><option>Gedung Sendiri</option><option>Menumpang</option><option>Sewa</option></select></div>
            <div className="form-field"><label>Timbangan Bayi/Balita</label><select><option>Tersedia</option><option>Tidak Tersedia</option></select></div>
            <div className="form-field"><label>Buku KIA</label><select><option>Tersedia</option><option>Tidak Tersedia</option></select></div>
            <div className="form-field"><label>Formulir SIP</label><select><option>Tersedia</option><option>Tidak Tersedia</option></select></div>
            <div className="form-field"><label>Blanko SKDN</label><select><option>Tersedia</option><option>Tidak Tersedia</option></select></div>
            <div className="form-field"><label>Alat Peraga Edukasi (APE)</label><select><option>Tersedia</option><option>Tidak Tersedia</option></select></div>
            <div className="form-field full"><label>Sarana Lain</label><input placeholder="mis. Ruang tunggu, dapur sehat" /></div>
          </div>
          <button className="btn btn-outline" style={{ marginTop: '16px' }}>Simpan Data Sarana</button>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginTop: '16px' }}>
        <div className="card">
          <div className="section-head"><h3>Lokasi Posyandu (Peta Interaktif)</h3><span className="badge badge-violet">Tap/geser pin</span></div>
          <p style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 500, marginBottom: '12px' }}>Tentukan titik lokasi Posyandu di peta. Koordinat otomatis tersimpan dari posisi pin, untuk ditampilkan pada Profil Posyandu publik & Kontak Darurat terdekat.</p>
          <div style={{ position: 'relative', height: '200px', borderRadius: '14px', overflow: 'hidden', background: 'repeating-linear-gradient(0deg,var(--surface-container-low),var(--surface-container-low) 24px,var(--surface-container) 25px), repeating-linear-gradient(90deg,transparent,transparent 24px,var(--line) 25px)', cursor: 'crosshair' }}>
            <div style={{ position: 'absolute', left: '50%', top: '45%', transform: 'translate(-50%,-100%)', color: 'var(--rose-deep)' }}>
              <svg className="ic ic-xl" style={{ width: '34px', height: '34px', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.25))' }}><use href="#i-mappin" /></svg>
            </div>
          </div>
          <div className="form-grid" style={{ marginTop: '12px' }}>
            <div className="form-field"><label>Latitude</label><input defaultValue="-0.515012" disabled style={{ background: 'var(--surface-container)', color: 'var(--ink-faint)' }} /></div>
            <div className="form-field"><label>Longitude</label><input defaultValue="117.112034" disabled style={{ background: 'var(--surface-container)', color: 'var(--ink-faint)' }} /></div>
          </div>
          <button className="btn btn-violet" style={{ marginTop: '12px' }}>Simpan Lokasi</button>
        </div>

        <div className="card">
          <div className="section-head"><h3>Foto Posyandu</h3></div>
          <p style={{ fontSize: '12px', color: 'var(--ink-soft)', fontWeight: 500, marginBottom: '12px' }}>Foto ini tampil pada halaman publik Profil 9 Posyandu.</p>
          <div className="upload-box"><svg className="ic ic-lg"><use href="#i-camera" /></svg><span><b>Tap untuk unggah</b> foto tampak depan Posyandu</span>Maks. 2 MB · JPG/PNG</div>
          <div className="card pad-sm" style={{ marginTop: '14px', background: 'var(--bg)', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: 700 }}>Kontak Darurat Posyandu</span>
            <input defaultValue="0812-5000-1001" style={{ maxWidth: '150px', textAlign: 'right', border: 'none', background: 'transparent', fontWeight: 800 }} />
          </div>
        </div>
      </div>
    </>
  );
}
