import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/kalkulator.css';
import { FOOD_DB } from '../utils/mockData';
import heroImg from '../assets/images/kalkulator/af631a2dbbede787c45511441c34f3d12887b4df.jpeg';

// Activity factors for TDEE calculation
const ACTIVITY_FACTOR = {
  sangat_ringan: { label: 'Sangat Ringan (jarang olahraga, kerja duduk)', factor: 1.2 },
  ringan: { label: 'Ringan (olahraga 1–3 hari/minggu)', factor: 1.375 },
  sedang: { label: 'Sedang (olahraga 3–5 hari/minggu)', factor: 1.55 },
  berat: { label: 'Berat (olahraga 6–7 hari/minggu)', factor: 1.725 },
  sangat_berat: { label: 'Sangat Berat (aktivitas fisik/kerja fisik berat)', factor: 1.9 },
};

export default function KalkulatorKesehatan({ activePage, onNavigate, onDarurat }) {
  // === CALCULATOR 1: IMT & BERAT BADAN IDEAL STATE ===
  const [imiGender, setImiGender] = useState('Perempuan');
  const [imiUmur, setImiUmur] = useState('');
  const [imiBerat, setImiBerat] = useState('');
  const [imiTinggi, setImiTinggi] = useState('');
  const [imiResult, setImiResult] = useState(null);

  // === CALCULATOR 2: KALORI & LOG MAKANAN STATE ===
  const [kalGender, setKalGender] = useState('Perempuan');
  const [kalUmur, setKalUmur] = useState('');
  const [kalBerat, setKalBerat] = useState('');
  const [kalTinggi, setKalTinggi] = useState('');
  const [kalAktivitas, setKalAktivitas] = useState('sedang');
  const [foodPick, setFoodPick] = useState(FOOD_DB[0]?.id || 'f01');
  const [foodQty, setFoodQty] = useState(1);
  const [foodLog, setFoodLog] = useState([]);
  const [kalResult, setKalResult] = useState(null);

  // Feedback poll
  const [feedbackChoice, setFeedbackChoice] = useState(null);
  const [voteCount, setVoteCount] = useState(12);
  const feedbackOptions = ['Sangat Membantu', 'Cukup Membantu'];

  const handleFeedbackVote = (idx) => {
    if (feedbackChoice === null) setVoteCount((v) => v + 1);
    setFeedbackChoice(idx);
  };

  // --- CALC 1: HITUNG IMT & BB IDEAL ---
  const handleCalcIMT = () => {
    const bb = parseFloat(imiBerat);
    const tb = parseFloat(imiTinggi);
    if (!bb || !tb || tb <= 0) return;

    const imt = bb / Math.pow(tb / 100, 2);
    let status = 'Normal';
    let badgeBg = 'var(--green-bg)';
    let badgeColor = 'var(--green-deep)';

    if (imt < 17.0) {
      status = 'Sangat Kurus';
      badgeBg = '#fef2f2';
      badgeColor = '#b91c1c';
    } else if (imt < 18.5) {
      status = 'Kurus';
      badgeBg = '#fffbeb';
      badgeColor = '#b45309';
    } else if (imt <= 25.0) {
      status = 'Normal';
      badgeBg = 'var(--green-bg)';
      badgeColor = 'var(--green-deep)';
    } else if (imt <= 27.0) {
      status = 'Gemuk (Kelebihan BB)';
      badgeBg = '#fffbeb';
      badgeColor = '#b45309';
    } else {
      status = 'Obesitas';
      badgeBg = '#fef2f2';
      badgeColor = '#b91c1c';
    }

    // Rentang BB Ideal (Broca modification / WHO standard)
    const bbIdealMin = Math.round((tb - 100) * 0.85);
    const bbIdealMax = Math.round((tb - 100) * 0.95);

    setImiResult({
      imt: imt.toFixed(1),
      status,
      badgeBg,
      badgeColor,
      bbIdealMin: Math.max(10, bbIdealMin),
      bbIdealMax: Math.max(15, bbIdealMax),
    });
  };

  // --- CALC 2: HITUNG KALORI HARIAN ---
  const handleCalcKalori = () => {
    const bb = parseFloat(kalBerat);
    const tb = parseFloat(kalTinggi);
    const umur = parseFloat(kalUmur);
    if (!bb || !tb || !umur) return;

    // Mifflin-St Jeor Formula
    const bmr = kalGender === 'Perempuan'
      ? (10 * bb) + (6.25 * tb) - (5 * umur) - 161
      : (10 * bb) + (6.25 * tb) - (5 * umur) + 5;

    const factor = ACTIVITY_FACTOR[kalAktivitas]?.factor || 1.55;
    const tdee = Math.round(bmr * factor);

    setKalResult({
      bmr: Math.round(bmr),
      tdee,
      turun: Math.max(1200, tdee - 500),
      naik: tdee + 500,
    });
  };

  // Food logger actions
  const handleAddFood = () => {
    const selectedItem = FOOD_DB.find((f) => f.id === foodPick);
    if (!selectedItem || foodQty <= 0) return;

    const totalKcal = selectedItem.kalori * foodQty;
    const newItem = {
      id: Date.now(),
      nama: selectedItem.nama,
      porsi: foodQty,
      kaloriUnit: selectedItem.kalori,
      totalKalori: totalKcal,
    };
    setFoodLog((prev) => [...prev, newItem]);
  };

  const handleRemoveFood = (id) => {
    setFoodLog((prev) => prev.filter((item) => item.id !== id));
  };

  const totalFoodKcal = foodLog.reduce((acc, cur) => acc + cur.totalKalori, 0);

  return (
    <div className="kalkulator-page">
      <Header activePage={activePage} onNavigate={onNavigate} onDarurat={onDarurat} />

      <main className="kalkulator-main">
        {/* Hero Grid */}
        <div className="kalkulator-hero-grid">
          {/* Stats Card */}
          <div className="kalkulator-stats-card">
            <div>
              <div className="kalkulator-stats-label">AKTIVITAS HARI INI</div>
              <div className="kalkulator-stats-number">1.001</div>
              <div className="kalkulator-stats-desc">
                Penghitungan mandiri yang dilakukan warga hari ini secara kolektif.
              </div>
            </div>
            <div className="kalkulator-stats-progress">
              <div className="kalkulator-progress-row">
                <span className="kalkulator-progress-label">Target Komunitas</span>
                <span className="kalkulator-progress-val">85%</span>
              </div>
              <div className="kalkulator-progress-bg">
                <div className="kalkulator-progress-fill" style={{ width: '85%' }} />
              </div>
            </div>
          </div>

          {/* Welcome Card */}
          <div className="kalkulator-hero-welcome">
            <div className="kalkulator-hero-blur-circle" />
            <div className="kalkulator-hero-text">
              <h1 className="kalkulator-hero-title">Kalkulator Kesehatan Mandiri Warga</h1>
              <p className="kalkulator-hero-subtitle">
                Hitung Status Gizi (IMT), Berat Badan Ideal, Kebutuhan Kalori Harian, dan Log Makanan Anda secara mudah dan akurat.
              </p>
              <div className="kalkulator-hero-actions">
                <button className="kalkulator-btn-primary" onClick={() => document.getElementById('calc-imt-card')?.scrollIntoView({ behavior: 'smooth' })}>
                  Kalkulator IMT &amp; BB Ideal
                </button>
                <button className="kalkulator-btn-secondary" onClick={() => document.getElementById('calc-kalori-card')?.scrollIntoView({ behavior: 'smooth' })}>
                  Kalkulator Kalori &amp; Log Makanan
                </button>
              </div>
            </div>
            <img src={heroImg} alt="Ilustrasi Kesehatan" className="kalkulator-hero-img" />
          </div>
        </div>

        {/* Section Title */}
        <div className="kalkulator-section-title">Kalkulator Utama</div>

        {/* Calculator Cards Grid (2 Calculators) */}
        <div className="kalkulator-calc-grid">
          {/* === CALCULATOR 1: IMT & BERAT BADAN IDEAL === */}
          <div id="calc-imt-card" className="card">
            <div className="section-head">
              <h3>
                <i className="bi bi-activity me-2" style={{ color: 'var(--violet-deep)' }}></i>
                1. Kalkulator IMT &amp; Berat Badan Ideal
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '16px', fontWeight: 500 }}>
              Hitung Indeks Massa Tubuh (IMT) serta rentang berat badan ideal untuk dewasa berdasarkan kriteria WHO.
            </p>

            <div className="form-grid">
              <div className="form-field">
                <label>Jenis Kelamin</label>
                <select value={imiGender} onChange={(e) => setImiGender(e.target.value)}>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              </div>
              <div className="form-field">
                <label>Usia (tahun)</label>
                <input
                  type="number"
                  placeholder="mis. 30"
                  value={imiUmur}
                  onChange={(e) => setImiUmur(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Berat Badan (kg)</label>
                <input
                  type="number"
                  placeholder="mis. 55"
                  value={imiBerat}
                  onChange={(e) => setImiBerat(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Tinggi Badan (cm)</label>
                <input
                  type="number"
                  placeholder="mis. 160"
                  value={imiTinggi}
                  onChange={(e) => setImiTinggi(e.target.value)}
                />
              </div>
            </div>

            <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }} onClick={handleCalcIMT}>
              <i className="bi bi-calculator me-2"></i>Hitung IMT &amp; BB Ideal
            </button>

            {imiResult && (
              <div style={{ marginTop: '16px', padding: '16px', borderRadius: '12px', background: 'var(--surface-container-low)', border: '1px solid var(--surface-container-high)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-soft)' }}>Hasil Indeks Massa Tubuh (IMT):</span>
                  <span className="badge" style={{ background: imiResult.badgeBg, color: imiResult.badgeColor, fontWeight: 700 }}>
                    {imiResult.status}
                  </span>
                </div>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--violet-deep)', marginBottom: '8px' }}>
                  {imiResult.imt} <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink-soft)' }}>kg/m²</span>
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--ink)', fontWeight: 600 }}>
                  <i className="bi bi-check-circle-fill me-1" style={{ color: 'var(--green-deep)' }}></i>
                  Rentang Berat Badan Ideal Anda: <b>{imiResult.bbIdealMin} – {imiResult.bbIdealMax} kg</b>
                </div>
              </div>
            )}
          </div>

          {/* === CALCULATOR 2: KALORI & LOG MAKANAN === */}
          <div id="calc-kalori-card" className="card">
            <div className="section-head">
              <h3>
                <i className="bi bi-egg-fried me-2" style={{ color: 'var(--orange-deep)' }}></i>
                2. Kalkulator Kalori &amp; Log Makanan
              </h3>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginBottom: '16px', fontWeight: 500 }}>
              Hitung kebutuhan kalori harian (TDEE) Anda dan catat menu makanan harian untuk menjaga pola makan seimbang.
            </p>

            <div className="form-grid">
              <div className="form-field">
                <label>Jenis Kelamin</label>
                <select value={kalGender} onChange={(e) => setKalGender(e.target.value)}>
                  <option value="Perempuan">Perempuan</option>
                  <option value="Laki-laki">Laki-laki</option>
                </select>
              </div>
              <div className="form-field">
                <label>Usia (tahun)</label>
                <input
                  type="number"
                  placeholder="mis. 25"
                  value={kalUmur}
                  onChange={(e) => setKalUmur(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Berat Badan (kg)</label>
                <input
                  type="number"
                  placeholder="mis. 60"
                  value={kalBerat}
                  onChange={(e) => setKalBerat(e.target.value)}
                />
              </div>
              <div className="form-field">
                <label>Tinggi Badan (cm)</label>
                <input
                  type="number"
                  placeholder="mis. 165"
                  value={kalTinggi}
                  onChange={(e) => setKalTinggi(e.target.value)}
                />
              </div>
              <div className="form-field full">
                <label>Tingkat Aktivitas Fisik</label>
                <select value={kalAktivitas} onChange={(e) => setKalAktivitas(e.target.value)}>
                  {Object.entries(ACTIVITY_FACTOR).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button className="btn btn-violet" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }} onClick={handleCalcKalori}>
              <i className="bi bi-fire me-2"></i>Hitung Kebutuhan Kalori
            </button>

            {kalResult && (
              <div style={{ marginTop: '16px', padding: '16px', borderRadius: '12px', background: 'var(--surface-container-low)', border: '1px solid var(--surface-container-high)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600 }}>BMR (Metabolisme Dasar):</span>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--ink)', margin: 0 }}>{kalResult.bmr} kcal</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: 'var(--ink-soft)', fontWeight: 600 }}>Kebutuhan Kalori Harian (TDEE):</span>
                    <p style={{ fontSize: '16px', fontWeight: 800, color: 'var(--violet-deep)', margin: 0 }}>{kalResult.tdee} kcal</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '11.5px', fontWeight: 600 }}>
                  <span className="badge badge-green">Menjaga BB: {kalResult.tdee} kcal</span>
                  <span className="badge badge-cyan">Turun BB: {kalResult.turun} kcal</span>
                  <span className="badge badge-orange">Naik BB: {kalResult.naik} kcal</span>
                </div>
              </div>
            )}

            {/* Food Logger Section */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px', color: 'var(--ink)' }}>
                <i className="bi bi-journal-plus me-1" style={{ color: 'var(--orange-deep)' }}></i>
                Pencatat Log Makanan Harian
              </div>

              <div className="food-log-input-group">
                <select
                  className="food-select"
                  value={foodPick}
                  onChange={(e) => setFoodPick(e.target.value)}
                >
                  {FOOD_DB.map((f) => (
                    <option key={f.id} value={f.id}>{f.nama} ({f.kalori} kcal)</option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1" max="10"
                  className="food-qty-input"
                  value={foodQty}
                  onChange={(e) => setFoodQty(parseInt(e.target.value) || 1)}
                />
                <button className="btn btn-sm btn-violet food-add-btn" onClick={handleAddFood}>
                  <i className="bi bi-plus-lg me-1"></i>Tambah
                </button>
              </div>

              {foodLog.length > 0 && (
                <div className="table-responsive">
                  <table className="table" style={{ fontSize: '12px' }}>
                    <thead>
                      <tr>
                        <th>Menu Makanan</th>
                        <th>Porsi</th>
                        <th>Kalori</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodLog.map((item) => (
                        <tr key={item.id}>
                          <td>{item.nama}</td>
                          <td>{item.porsi}x</td>
                          <td><b>{item.totalKalori} kcal</b></td>
                          <td>
                            <button
                              style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', padding: 0 }}
                              onClick={() => handleRemoveFood(item.id)}
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div style={{ marginTop: '12px', padding: '12px', background: 'var(--surface-container-low)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ink)' }}>Total Kalori Makanan:</span>
                    <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--orange-deep)' }}>{totalFoodKcal} kcal</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Feedback Poll */}
        <div className="kalkulator-feedback-card" style={{ marginTop: '32px' }}>
          <div className="kalkulator-feedback-header">
            <div className="kalkulator-feedback-title">Umpan Balik Warga</div>
            <i className="bi bi-chat-heart-fill" style={{ color: 'var(--violet-deep)' }}></i>
          </div>
          <p className="kalkulator-feedback-question">
            Seberapa bermanfaat kalkulator kesehatan mandiri ini untuk memantau kesehatan keluarga Anda?
          </p>
          <div className="kalkulator-feedback-options">
            {feedbackOptions.map((opt, idx) => (
              <button
                key={opt}
                type="button"
                className={`kalkulator-feedback-option ${feedbackChoice === idx ? 'selected' : ''}`}
                onClick={() => handleFeedbackVote(idx)}
              >
                <span>{idx + 1}. {opt}</span>
                <span className="kalkulator-feedback-radio">
                  <span className="kalkulator-feedback-radio-dot" />
                </span>
              </button>
            ))}
          </div>
          <p className="kalkulator-feedback-votecount">
            +{voteCount} warga <span>lainnya telah memberikan umpan balik</span>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
