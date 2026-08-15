import React, { useState, useRef, useEffect } from 'react';

export default function PencatatanKegiatanView() {
  // === STATE DATA 13 POIN SESUAI KERTAS ===
  const [formData, setFormData] = useState({
    nama_posyandu: '',
    ketua_pelaksana: '',
    
    // 1. Ibu Hamil
    ibu_hamil: '', ibu_hamil_periksa: '', ibu_hamil_fe: '',
    // 2. Ibu Menyusui
    ibu_menyusui: '',
    // 3. KB
    kb_kondom: '', kb_pil: '', kb_suntik: '',
    // 4. Penimbangan (SKDN)
    skdn_s: '', skdn_k: '', skdn_d: '', skdn_n: '', skdn_bgm: '', bgm_l: '', bgm_p: '',
    // 5. Jumlah Balita
    vit_a: '', kms_keluar: '', fe_1: '', fe_2: '', pmt: '',
    // 6. Imunisasi
    hep_0_7: '', dpt_hb: '', 
    polio_1: '', polio_2: '', polio_3: '', polio_4: '', 
    campak: '', 
    hep_1: '', hep_2: '', hep_3: '', 
    tt_1: '', tt_2: '',
    // 7. Diare
    diare_jml: '', diare_oralit: '',
    // 8 - 13. Layanan Lain
    layanan_kesehatan: '', sosialisasi: '', bayi_kms: '', balita_imunisasi: '', balita_kurang_gizi: '', kematian_balita: ''
  });

  const [isPrinting, setIsPrinting] = useState(false);

  // === LOGIKA KANVAS TANDA TANGAN DIGITAL ===
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureData, setSignatureData] = useState(null);

  // Mengatur ukuran kanvas secara dinamis
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000080'; // Tinta biru pulpen
    }
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault(); // Mencegah scrolling layar di HP saat tanda tangan
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    // Simpan hasil coretan ke state berupa Base64 Image
    const canvas = canvasRef.current;
    setSignatureData(canvas.toDataURL('image/png'));
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(null);
  };

  // === HANDLER INPUT ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Filter angka saja untuk input numerik
    if (name !== 'nama_posyandu' && name !== 'ketua_pelaksana') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [name]: onlyNums });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setIsPrinting(false), 500);
    }, 150);
  };

  return (
    <>
      <style>{`
        #dokumen-cetak-vertikal { display: none; }

        @media print {
          @page { size: portrait; margin: 15mm 20mm; }
          body * { visibility: hidden; }
          .no-print { display: none !important; }
          
          #dokumen-cetak-vertikal, #dokumen-cetak-vertikal * { visibility: visible; }
          #dokumen-cetak-vertikal { 
            display: block !important; 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 100%; 
            font-family: Arial, sans-serif;
            font-size: 13px;
          }

          .tabel-laporan { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
          .tabel-laporan th, .tabel-laporan td { border: 1px solid #000; padding: 4px 8px; vertical-align: middle; }
          
          .titik-titik {
            border-bottom: 1px dotted #000;
            display: inline-block;
            min-width: 30px;
            text-align: center;
          }

          .garis-bawah {
            border-bottom: 1px dotted #000;
            flex-grow: 1;
            margin: 0 8px;
          }

          .item-baris { display: flex; align-items: flex-end; margin-bottom: 8px; }
        }
      `}</style>

      <div className="no-print">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ color: 'var(--violet-deep)', margin: '0 0 8px 0' }}>Form Pencatatan Kegiatan</h2>
            <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>Format 13 Poin Laporan Vertikal dengan Tanda Tangan Digital.</p>
          </div>
          <button className="btn btn-outline" onClick={handlePrint} style={{ color: 'var(--violet-deep)', borderColor: 'var(--violet-deep)' }}>
            <i className="bi bi-printer me-2"></i> Ekspor PDF Kertas
          </button>
        </div>

        <div className="grid grid-2" style={{ marginBottom: '16px' }}>
          {/* KIRI */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card">
              <div className="section-head"><h3>Identitas & Poin 1 - 3</h3></div>
              <div className="form-grid">
                <div className="form-field full"><label>Nama Posyandu</label><input name="nama_posyandu" value={formData.nama_posyandu} onChange={handleChange} /></div>
                
                <div className="form-field full" style={{ borderBottom: '1px solid #eee', paddingBottom: '4px' }}><b>1. Ibu Hamil</b></div>
                <div className="form-field"><label>Jml. Ibu Hamil</label><input name="ibu_hamil" value={formData.ibu_hamil} onChange={handleChange} /></div>
                <div className="form-field"><label>Jml. Memeriksakan Diri</label><input name="ibu_hamil_periksa" value={formData.ibu_hamil_periksa} onChange={handleChange} /></div>
                <div className="form-field"><label>Jml. Mendapat Fe</label><input name="ibu_hamil_fe" value={formData.ibu_hamil_fe} onChange={handleChange} /></div>
                
                <div className="form-field full" style={{ borderBottom: '1px solid #eee', paddingBottom: '4px' }}><b>2. Ibu Menyusui</b></div>
                <div className="form-field full"><label>Jumlah Yang Menyusui</label><input name="ibu_menyusui" value={formData.ibu_menyusui} onChange={handleChange} /></div>
                
                <div className="form-field full" style={{ borderBottom: '1px solid #eee', paddingBottom: '4px' }}><b>3. Peserta KB (Pelayanan Ulang)</b></div>
                <div className="form-field"><label>Kondom</label><input name="kb_kondom" value={formData.kb_kondom} onChange={handleChange} /></div>
                <div className="form-field"><label>Pil</label><input name="kb_pil" value={formData.kb_pil} onChange={handleChange} /></div>
                <div className="form-field"><label>Suntik</label><input name="kb_suntik" value={formData.kb_suntik} onChange={handleChange} /></div>
              </div>
            </div>

            <div className="card">
              <div className="section-head"><h3>4. Penimbangan Balita (SKDN)</h3></div>
              <div className="form-grid">
                <div className="form-field"><label>Jml Balita (S) Sasaran</label><input name="skdn_s" value={formData.skdn_s} onChange={handleChange} /></div>
                <div className="form-field"><label>Jml Balita Punya (K)MS</label><input name="skdn_k" value={formData.skdn_k} onChange={handleChange} /></div>
                <div className="form-field"><label>Jml Balita (D)itimbang</label><input name="skdn_d" value={formData.skdn_d} onChange={handleChange} /></div>
                <div className="form-field"><label>Jml Balita (Naik) BB</label><input name="skdn_n" value={formData.skdn_n} onChange={handleChange} /></div>
                <div className="form-field"><label>Jml Balita (BGM)</label><input name="skdn_bgm" value={formData.skdn_bgm} onChange={handleChange} /></div>
                <div className="form-field"><label>Jml Balita BGM Laki-laki</label><input name="bgm_l" value={formData.bgm_l} onChange={handleChange} /></div>
                <div className="form-field full"><label>Jml Balita BGM Perempuan</label><input name="bgm_p" value={formData.bgm_p} onChange={handleChange} /></div>
              </div>
            </div>

            <div className="card">
              <div className="section-head"><h3>5. Jumlah Balita</h3></div>
              <div className="form-grid">
                <div className="form-field"><label>Dapat Vitamin A</label><input name="vit_a" value={formData.vit_a} onChange={handleChange} /></div>
                <div className="form-field"><label>KMS Yang Keluar</label><input name="kms_keluar" value={formData.kms_keluar} onChange={handleChange} /></div>
                <div className="form-field"><label>Dapat Fe-1</label><input name="fe_1" value={formData.fe_1} onChange={handleChange} /></div>
                <div className="form-field"><label>Dapat Fe-2</label><input name="fe_2" value={formData.fe_2} onChange={handleChange} /></div>
                <div className="form-field full"><label>Balita Dapat PMT</label><input name="pmt" value={formData.pmt} onChange={handleChange} /></div>
              </div>
            </div>
          </div>

          {/* KANAN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card">
              <div className="section-head"><h3>6. Jumlah Balita Diimunisasi</h3></div>
              <div className="form-grid">
                <div className="form-field full"><label>Hepatitis 0-7 Hari</label><input name="hep_0_7" value={formData.hep_0_7} onChange={handleChange} /></div>
                <div className="form-field full"><label>DPT-HB</label><input name="dpt_hb" value={formData.dpt_hb} onChange={handleChange} /></div>
                
                <div className="form-field full" style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1 }}><label>Polio I</label><input name="polio_1" value={formData.polio_1} onChange={handleChange} /></div>
                  <div style={{ flex: 1 }}><label>Polio II</label><input name="polio_2" value={formData.polio_2} onChange={handleChange} /></div>
                  <div style={{ flex: 1 }}><label>Polio III</label><input name="polio_3" value={formData.polio_3} onChange={handleChange} /></div>
                  <div style={{ flex: 1 }}><label>Polio IV</label><input name="polio_4" value={formData.polio_4} onChange={handleChange} /></div>
                </div>

                <div className="form-field full"><label>Campak</label><input name="campak" value={formData.campak} onChange={handleChange} /></div>

                <div className="form-field full" style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1 }}><label>Hepatitis I</label><input name="hep_1" value={formData.hep_1} onChange={handleChange} /></div>
                  <div style={{ flex: 1 }}><label>Hepatitis II</label><input name="hep_2" value={formData.hep_2} onChange={handleChange} /></div>
                  <div style={{ flex: 1 }}><label>Hepatitis III</label><input name="hep_3" value={formData.hep_3} onChange={handleChange} /></div>
                </div>

                <div className="form-field full" style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ flex: 1 }}><label>TT I</label><input name="tt_1" value={formData.tt_1} onChange={handleChange} /></div>
                  <div style={{ flex: 1 }}><label>TT II</label><input name="tt_2" value={formData.tt_2} onChange={handleChange} /></div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="section-head"><h3>Poin 7 - 13</h3></div>
              <div className="form-grid">
                <div className="form-field"><label>7. Jml Balita Diare</label><input name="diare_jml" value={formData.diare_jml} onChange={handleChange} /></div>
                <div className="form-field"><label>Diare Dapat Oralit</label><input name="diare_oralit" value={formData.diare_oralit} onChange={handleChange} /></div>
                <div className="form-field"><label>8. Layanan Kesehatan (Kali)</label><input name="layanan_kesehatan" value={formData.layanan_kesehatan} onChange={handleChange} /></div>
                <div className="form-field"><label>9. Sosialisasi (Kali)</label><input name="sosialisasi" value={formData.sosialisasi} onChange={handleChange} /></div>
                <div className="form-field"><label>10. Bayi Terima KMS</label><input name="bayi_kms" value={formData.bayi_kms} onChange={handleChange} /></div>
                <div className="form-field"><label>11. Bayi Dpt Imunisasi</label><input name="balita_imunisasi" value={formData.balita_imunisasi} onChange={handleChange} /></div>
                <div className="form-field"><label>12. Bayi Kurang Gizi</label><input name="balita_kurang_gizi" value={formData.balita_kurang_gizi} onChange={handleChange} /></div>
                <div className="form-field"><label>13. Kematian Balita</label><input name="kematian_balita" value={formData.kematian_balita} onChange={handleChange} /></div>
              </div>
            </div>

            {/* === KARTU KANVAS TANDA TANGAN === */}
            <div className="card" style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}>
              <div className="section-head" style={{ marginBottom: '12px' }}>
                <h3 style={{ color: '#334155' }}><i className="bi bi-pen me-2"></i>Tanda Tangan Digital</h3>
                <button className="btn btn-sm btn-outline" onClick={clearSignature} style={{ color: '#ef4444', borderColor: '#ef4444' }}>Hapus</button>
              </div>
              <div className="form-field full"><label>Nama Ketua Pelaksana</label><input name="ketua_pelaksana" value={formData.ketua_pelaksana} onChange={handleChange} placeholder="Ketik nama lengkap untuk di bawah TTD" /></div>
              
              <div style={{ background: '#fff', border: '2px dashed #94a3b8', borderRadius: '8px', height: '180px', position: 'relative', marginTop: '12px', touchAction: 'none' }}>
                {/* Teks bantuan di latar belakang */}
                {!signatureData && !isDrawing && (
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#cbd5e1', pointerEvents: 'none', fontWeight: 'bold' }}>
                    Goreskan Tanda Tangan Di Sini
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  style={{ width: '100%', height: '100%', cursor: 'crosshair', display: 'block' }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseOut={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          DOKUMEN RAHASIA CETAK PDF (HANYA MUNCUL DI KERTAS)
          ========================================================= */}
      {isPrinting && (
        <div id="dokumen-cetak-vertikal">
          <h3 style={{ marginBottom: '16px' }}>III.&nbsp;&nbsp;PENCATATAN " KEGIATAN POSYANDU "</h3>
          
          {/* Poin 1 */}
          <b>1 Ibu Hamil</b>
          <table className="tabel-laporan">
            <tbody>
              <tr><td style={{ width: '60%' }}>Jml. Ibu Hamil</td><td><span className="titik-titik">{formData.ibu_hamil}</span> Orang</td></tr>
              <tr><td>Jml. Ibu Hamil yang memeriksakan diri</td><td><span className="titik-titik">{formData.ibu_hamil_periksa}</span> Orang</td></tr>
              <tr><td>Jml. Yang mendapat Fe</td><td><span className="titik-titik">{formData.ibu_hamil_fe}</span> Orang</td></tr>
            </tbody>
          </table>

          {/* Poin 2 */}
          <div className="item-baris"><b>2 Jumlah Yang menyusui</b><div className="garis-bawah"></div><span>{formData.ibu_menyusui}</span></div>

          {/* Poin 3 */}
          <b>3 Jumlah Peserta KB Yang Mendapat Pelayanan Ulang</b>
          <table className="tabel-laporan">
            <tbody>
              <tr><td style={{ width: '60%' }}>KONDOM</td><td><span className="titik-titik">{formData.kb_kondom}</span> Orang</td></tr>
              <tr><td>PIL</td><td><span className="titik-titik">{formData.kb_pil}</span> Orang</td></tr>
              <tr><td>SUNTIK</td><td><span className="titik-titik">{formData.kb_suntik}</span> Orang</td></tr>
            </tbody>
          </table>

          {/* Poin 4 */}
          <b>4 Penimbangan Balita</b>
          <table className="tabel-laporan">
            <tbody>
              <tr><td style={{ width: '60%' }}>Jml Balita (S)sasaran Posyandu</td><td><span className="titik-titik">{formData.skdn_s}</span> BALITA</td></tr>
              <tr><td>Jml Balita punya (K)MS</td><td><span className="titik-titik">{formData.skdn_k}</span> BALITA</td></tr>
              <tr><td>Jml Balita (D)itimbang</td><td><span className="titik-titik">{formData.skdn_d}</span> BALITA</td></tr>
              <tr><td>Jml Balita (Naik) BB</td><td><span className="titik-titik">{formData.skdn_n}</span> BALITA</td></tr>
              <tr><td>Jml Balita (BGM)</td><td><span className="titik-titik">{formData.skdn_bgm}</span> BALITA</td></tr>
              <tr><td>Jml Balita BGM laki-laki</td><td><span className="titik-titik">{formData.bgm_l}</span> BALITA</td></tr>
              <tr><td>Jml Balita BGM Perempuan</td><td><span className="titik-titik">{formData.bgm_p}</span> BALITA</td></tr>
            </tbody>
          </table>

          {/* Poin 5 */}
          <b>5 Jumlah BALITA</b>
          <table className="tabel-laporan">
            <tbody>
              <tr><td colSpan="2" style={{ width: '60%' }}>DAPAT VITAMIN A</td><td colSpan="2"><span className="titik-titik">{formData.vit_a}</span> BALITA</td></tr>
              <tr><td colSpan="2">KMS yang Keluar</td><td colSpan="2"><span className="titik-titik">{formData.kms_keluar}</span> BALITA</td></tr>
              <tr>
                <td rowSpan="2" style={{ width: '30%' }}>Dapat Fe</td>
                <td style={{ textAlign: 'center', width: '30%' }}>Fe-1</td>
                <td colSpan="2" style={{ textAlign: 'center' }}>Fe-2</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'center' }}><span className="titik-titik">{formData.fe_1}</span> BALITA</td>
                <td colSpan="2" style={{ textAlign: 'center' }}><span className="titik-titik">{formData.fe_2}</span> BALITA</td>
              </tr>
              <tr><td colSpan="2">Balita dapat PMT</td><td colSpan="2"><span className="titik-titik">{formData.pmt}</span> BALITA</td></tr>
            </tbody>
          </table>

          {/* Poin 6 */}
          <b>6 Jumlah Balita Yang Diimunisasi</b>
          <table className="tabel-laporan" style={{ textAlign: 'center' }}>
            <tbody>
              <tr><td style={{ textAlign: 'left', width: '35%' }}>HEPATITIS 0-7 HARI</td><td colSpan="4"><span className="titik-titik">{formData.hep_0_7}</span> BALITA</td></tr>
              <tr><td style={{ textAlign: 'left' }}>DPT-HB</td><td colSpan="4"><span className="titik-titik">{formData.dpt_hb}</span> BALITA</td></tr>
              <tr>
                <td rowSpan="2" style={{ textAlign: 'left' }}>POLIO</td>
                <td>I</td><td>II</td><td>III</td><td>IV</td>
              </tr>
              <tr>
                <td><span className="titik-titik">{formData.polio_1}</span> BALITA</td>
                <td><span className="titik-titik">{formData.polio_2}</span> BALITA</td>
                <td><span className="titik-titik">{formData.polio_3}</span> BALITA</td>
                <td><span className="titik-titik">{formData.polio_4}</span> BALITA</td>
              </tr>
              <tr><td style={{ textAlign: 'left' }}>CAMPAK</td><td colSpan="4"><span className="titik-titik">{formData.campak}</span> BALITA</td></tr>
              <tr>
                <td rowSpan="2" style={{ textAlign: 'left' }}>HEPATITIS</td>
                <td>I</td><td colSpan="2">II</td><td>III</td>
              </tr>
              <tr>
                <td></td><td colSpan="2"><span className="titik-titik">{formData.hep_2}</span> BALITA</td><td><span className="titik-titik">{formData.hep_3}</span> BALITA</td>
              </tr>
              <tr>
                <td rowSpan="2" style={{ textAlign: 'left' }}>TT</td>
                <td colSpan="2">I</td><td colSpan="2">II</td>
              </tr>
              <tr>
                <td colSpan="2"><span className="titik-titik">{formData.tt_1}</span> BALITA</td><td colSpan="2"><span className="titik-titik">{formData.tt_2}</span> BALITA</td>
              </tr>
            </tbody>
          </table>

          {/* Poin 7 */}
          <b>7 BALITA Yang Menderita DIARE</b>
          <table className="tabel-laporan">
            <tbody>
              <tr><td style={{ width: '60%' }}>Jumlah BALITA DIARE</td><td><span className="titik-titik">{formData.diare_jml}</span> BALITA</td></tr>
              <tr><td>Jumlah BALITA DIARE Dapat Oralit</td><td><span className="titik-titik">{formData.diare_oralit}</span> BALITA</td></tr>
            </tbody>
          </table>

          {/* Poin 8 - 13 */}
          <div className="item-baris"><b>8 Layanan Kesehatan</b><div className="garis-bawah"></div><span>{formData.layanan_kesehatan}</span> Kali</div>
          <div className="item-baris"><b>9 Sosialisasi Penyuluhan</b><div className="garis-bawah"></div><span>{formData.sosialisasi}</span> Kali</div>
          <div className="item-baris"><b>10 Jumlah Bayi Yang Menerima KMS</b><div className="garis-bawah"></div><span>{formData.bayi_kms}</span> Orang</div>
          <div className="item-baris"><b>11 Jumlah Bayi yang dapat Imunisasi</b><div className="garis-bawah"></div><span>{formData.balita_imunisasi}</span> Orang</div>
          <div className="item-baris"><b>12 Jumlah Bayi yang kurang gizi</b><div className="garis-bawah"></div><span>{formData.balita_kurang_gizi}</span> Orang</div>
          <div className="item-baris"><b>13 Jumlah kematian Balita</b><div className="garis-bawah"></div><span>{formData.kematian_balita}</span> Orang</div>

          {/* BAGIAN TANDA TANGAN */}
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '250px', textAlign: 'center' }}>
              <div>Posyandu <span className="titik-titik">{formData.nama_posyandu}</span></div>
              <div style={{ marginBottom: '10px' }}>Ketua Pelaksanaan :</div>
              {/* Tampilkan gambar TTD jika sudah digambar */}
              {signatureData ? (
                <img src={signatureData} alt="Tanda Tangan" style={{ height: '80px', objectFit: 'contain', margin: '0 auto', display: 'block' }} />
              ) : (
                <div style={{ height: '80px' }}></div> /* Jarak kosong jika tidak ada ttd */
              )}
              <div style={{ borderBottom: '1px dotted #000', marginTop: '10px', minHeight: '20px' }}>
                {formData.ketua_pelaksana}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}