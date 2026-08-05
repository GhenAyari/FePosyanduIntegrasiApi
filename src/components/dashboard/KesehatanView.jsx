import React, { useState } from 'react';

const KELOMPOK_CALC = {
  balita: { title: 'Kalkulator Status Gizi', label: 'Status Gizi (BB/TB) — bukan pengganti penilaian ahli gizi' },
  remaja: { title: 'Kalkulator IMT', label: 'IMT — bukan pengganti penilaian ahli gizi' },
  hamil: { title: 'Kalkulator IMT', label: 'IMT Ibu Hamil — bukan pengganti penilaian ahli gizi' },
  lansia: { title: 'Kalkulator IMT', label: 'IMT — bukan pengganti penilaian ahli gizi' }
};

export default function KesehatanView() {
  const [target, setTarget] = useState('balita');

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

      <div className="grid grid-2">
        <div className="card">
          <div className="section-head">
            <h3>Form Pemeriksaan — {target === 'balita' ? 'Bayi & Balita' : target === 'remaja' ? 'Remaja' : target === 'hamil' ? 'Ibu Hamil' : 'Orang Tua & Lansia'}</h3>
          </div>

          {target === 'balita' && (
            <div className="form-grid kel-subform">
              <div className="form-field full"><label>Nama Anak</label><input type="text" placeholder="mis. Ananda Fitri" /></div>
              <div className="form-field"><label>Jenis Kelamin</label><select><option>Perempuan</option><option>Laki-laki</option></select></div>
              <div className="form-field"><label>Umur (bulan)</label><input type="number" placeholder="18" defaultValue="18" /></div>
              <div className="form-field"><label>Berat Badan (kg)</label><input type="number" placeholder="10.2" defaultValue="10.2" /></div>
              <div className="form-field"><label>Tinggi Badan (cm)</label><input type="number" placeholder="78" defaultValue="78" /></div>
              <div className="form-field"><label>Lingkar Kepala (cm)</label><input type="number" placeholder="46" /></div>
              <div className="form-field"><label>Lingkar Lengan (cm)</label><input type="number" placeholder="14.5" /></div>
              <div className="form-field full"><label>Catatan Perkembangan Anak</label><textarea rows="2" placeholder="Hasil wawancara perkembangan..."></textarea></div>

              <div className="form-field full">
                <label>Status Imunisasi</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-green"><svg className="ic ic-sm"><use href="#i-check" /></svg>BCG</span>
                  <span className="badge badge-green"><svg className="ic ic-sm"><use href="#i-check" /></svg>Polio I</span>
                  <span className="badge badge-orange">Polio II — hari ini</span>
                  <span className="badge badge-rose">DPT-HB II — stok kosong, dirujuk ke Puskesmas</span>
                </div>
              </div>
            </div>
          )}

          {target === 'remaja' && (
            <div className="form-grid kel-subform">
              <div className="form-field full"><label>Nama</label><input type="text" placeholder="mis. Dimas Aditya" /></div>
              <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
              <div className="form-field"><label>Umur (tahun)</label><input type="number" placeholder="15" /></div>
              <div className="form-field"><label>Berat Badan (kg)</label><input type="number" placeholder="48" /></div>
              <div className="form-field"><label>Tinggi Badan (cm)</label><input type="number" placeholder="155" /></div>
              <div className="form-field"><label>Tekanan Darah (mmHg)</label><input placeholder="mis. 110/70" /></div>
            </div>
          )}

          {target === 'hamil' && (
            <div className="form-grid kel-subform">
              <div className="form-field full"><label>Nama Ibu</label><input type="text" placeholder="mis. Siti Aminah" /></div>
              <div className="form-field"><label>Usia Kehamilan (minggu)</label><input type="number" placeholder="24" /></div>
              <div className="form-field"><label>Berat Badan (kg)</label><input type="number" placeholder="58" /></div>
              <div className="form-field"><label>Tinggi Badan (cm)</label><input type="number" placeholder="156" /></div>
              <div className="form-field"><label>Tensi (Tekanan Darah)</label><input placeholder="mis. 110/80" /></div>
              <div className="form-field"><label>Lingkar Perut/Pinggang (cm)</label><input type="number" placeholder="88" /></div>
              <div className="form-field"><label>Lingkar Lengan / LILA (cm)</label><input type="number" placeholder="24.5" /></div>
              <div className="form-field"><label>Status KEK</label><select><option>Tidak</option><option>Ya</option></select></div>
              <div className="form-field"><label>Anemia</label><select><option>Tidak</option><option>Ya</option></select></div>
            </div>
          )}

          {target === 'lansia' && (
            <div className="form-grid kel-subform">
              <div className="form-field full"><label>Nama</label><input type="text" placeholder="mis. Bapak Slamet" /></div>
              <div className="form-field"><label>Jenis Kelamin</label><select><option>Laki-laki</option><option>Perempuan</option></select></div>
              <div className="form-field"><label>Gula Darah (mg/dL)</label><input type="number" placeholder="110" /></div>
              <div className="form-field"><label>Tekanan Darah (mmHg)</label><input placeholder="mis. 130/85" /></div>
              <div className="form-field"><label>Tensi</label><select><option>Normal</option><option>Tinggi</option><option>Rendah</option></select></div>
              <div className="form-field"><label>Nadi (per menit)</label><input type="number" placeholder="78" /></div>
              <div className="form-field"><label>Berat Badan (kg)</label><input type="number" placeholder="60" /></div>
              <div className="form-field"><label>Tinggi Badan (cm)</label><input type="number" placeholder="160" /></div>
              <div className="form-field"><label>Lingkar Pinggang (cm)</label><input type="number" placeholder="85" /></div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
            <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Simpan Draf</button>
            <button className="btn btn-violet" style={{ flex: 1, justifyContent: 'center' }}>Simpan Data</button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ background: 'var(--cyan-bg)', border: 'none' }}>
            <div className="section-head"><h3 style={{ color: 'var(--cyan-deep)' }}><svg className="ic"><use href="#i-calculator" /></svg><span>{KELOMPOK_CALC[target].title}</span></h3></div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--cyan-deep)', opacity: .85, marginBottom: '12px' }}>
              Terhitung otomatis dari berat, tinggi & umur yang diisi di form.
            </p>
            <div className="result-box">
              <div>
                <div className="r-num">Normal</div>
                <div className="r-label">{KELOMPOK_CALC[target].label}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="section-head"><h3>Dokumentasi Foto</h3></div>
            <div className="upload-box">
              <svg className="ic ic-lg"><use href="#i-camera" /></svg>
              <span><b>Tap untuk unggah</b> foto kegiatan</span>
              Maks. 5 foto · 2MB/foto · JPG/PNG
            </div>
          </div>

          {target === 'balita' && (
            <div className="callout">
              <svg className="ic"><use href="#i-alert" /></svg>
              <span>Vaksin DPT-HB II sedang tidak tersedia. Anak otomatis ditandai untuk dirujuk ke Puskesmas terdekat.</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
