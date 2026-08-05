import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/kalkulator.css';


import heroImg from '../assets/images/kalkulator/af631a2dbbede787c45511441c34f3d12887b4df.jpeg';

// --- BMI CALCULATION ---
function calcBMI(weight, height) {
  if (!weight || !height || height === 0) return null;
  const bmi = weight / Math.pow(height / 100, 2);
  let category, color;
  if (bmi < 18.5) { category = 'Berat Badan Kurang'; color = '#37618b'; }
  else if (bmi < 25) { category = 'Normal (Sehat)'; color = '#2e7d4f'; }
  else if (bmi < 30) { category = 'Kelebihan Berat Badan'; color = '#d97706'; }
  else { category = 'Obesitas'; color = '#ba1a1a'; }
  return { value: bmi.toFixed(1), category, color };
}

// --- HPL CALCULATION (Naegele's Rule) ---
function calcHPL(hphtStr) {
  if (!hphtStr) return null;
  const date = new Date(hphtStr);
  if (isNaN(date)) return null;
  // Naegele: HPHT + 7 days, - 3 months, + 1 year
  const hpl = new Date(date);
  hpl.setDate(hpl.getDate() + 7);
  hpl.setMonth(hpl.getMonth() - 3);
  hpl.setFullYear(hpl.getFullYear() + 1);
  return hpl.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// --- Z-SCORE (simplified approximation) ---
function calcZScore(age, gender, headCirc) {
  if (!age || !headCirc) return null;
  // WHO median reference (approximate for demo)
  const medians = {
    male: [34, 35.5, 36.5, 37.5, 38.2, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43, 43.5, 44, 44.2, 44.5, 44.8, 45, 45.2, 45.5, 45.8, 46, 46.2],
    female: [33.5, 35, 36, 36.8, 37.5, 38.2, 38.8, 39.3, 39.8, 40.2, 40.7, 41.2, 41.6, 42, 42.4, 42.8, 43.1, 43.4, 43.7, 44, 44.2, 44.5, 44.7, 45, 45.2],
  };
  const ref = medians[gender] || medians['male'];
  const ageIdx = Math.min(parseInt(age), ref.length - 1);
  const median = ref[ageIdx];
  const sd = 1.0; // simplified SD
  const z = ((parseFloat(headCirc) - median) / sd).toFixed(2);
  let status;
  if (z < -3) status = 'Mikrosefali Berat';
  else if (z < -2) status = 'Di Bawah Normal';
  else if (z <= 2) status = 'Normal';
  else if (z <= 3) status = 'Di Atas Normal';
  else status = 'Makrosefali';
  return { z, status, barHeight: Math.max(20, Math.min(96, (parseFloat(z) + 3) * 16)) };
}

export default function KalkulatorKesehatan({ activePage, onNavigate, onDarurat }) {

  // BMI state
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // Cek Pertumbuhan (Z-score) state
  const [zsAge, setZsAge] = useState('');
  const [zsGender, setZsGender] = useState('male');
  const [zsHead, setZsHead] = useState('');
  const [zsResult, setZsResult] = useState(null);

  // HPL state
  const [hpht, setHpht] = useState('');
  const [hplResult, setHplResult] = useState(null);

  // History
  const [history, setHistory] = useState([]);

  // Feedback poll
  const [feedbackChoice, setFeedbackChoice] = useState(null);
  const [voteCount, setVoteCount] = useState(12);
  const feedbackOptions = ['Sangat Membantu', 'Cukup Membantu'];

  const handleFeedbackVote = (idx) => {
    if (feedbackChoice === null) setVoteCount((v) => v + 1);
    setFeedbackChoice(idx);
  };

  const addHistory = (type, result) => {
    const now = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    setHistory((prev) => [{ type, result, date: now }, ...prev].slice(0, 6));
  };

  const handleCalcBMI = () => {
    const res = calcBMI(parseFloat(bmiWeight), parseFloat(bmiHeight));
    setBmiResult(res);
    if (res) addHistory('BMI', `${res.value} kg/m² — ${res.category}`);
  };

  const handleCalcZScore = () => {
    const res = calcZScore(zsAge, zsGender, zsHead);
    setZsResult(res);
    if (res) addHistory('Z-Score', `${res.z} — ${res.status}`);
  };

  const handleCalcHPL = () => {
    const res = calcHPL(hpht);
    setHplResult(res);
    if (res) addHistory('HPL', res);
  };

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
                Penghitungan yang dilakukan warga hari ini secara kolektif.
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
              <h1 className="kalkulator-hero-title">Selamat Datang di Alat Kesehatan Anda</h1>
              <p className="kalkulator-hero-subtitle">
                Pantau pertumbuhan, hitung risiko, dan persiapkan masa depan keluarga Anda dengan alat
                medis bersertifikat komunitas kami.
              </p>
              <div className="kalkulator-hero-actions">
                <button className="kalkulator-btn-primary" onClick={() => document.getElementById('bmi-card')?.scrollIntoView({ behavior: 'smooth' })}>
                  Cek Pertumbuhan
                </button>
                <button className="kalkulator-btn-secondary" onClick={() => document.getElementById('hpl-card')?.scrollIntoView({ behavior: 'smooth' })}>
                  HPL Cepat
                </button>
              </div>
            </div>
            <img src={heroImg} alt="Ilustrasi Kesehatan" className="kalkulator-hero-img" />
          </div>
        </div>

        {/* Section Title */}
        <div className="kalkulator-section-title">Kalkulator Utama</div>

        {/* Calculator Cards */}
        <div className="kalkulator-cards-grid">
          {/* === BMI CARD === */}
          <div id="bmi-card" className="kalkulator-card bmi">
            <div className="kalkulator-card-header">
              <div className="kalkulator-card-icon bmi">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path d="M2 16H14V6L12.57 6H3.43L2 16ZM8 4C8.28 4 8.52 3.9 8.71 3.71 8.9 3.52 9 3.28 9 3 9 2.72 8.9 2.48 8.71 2.29 8.52 2.1 8.28 2 8 2 7.72 2 7.48 2.1 7.28 2.29 7.08 2.48 7 2.72 7 3 7 3.28 7.08 3.52 7.28 3.71 7.48 3.9 7.72 4 8 4ZM10.82 4H12.57C13.07 4 13.51 4.17 13.87 4.5 14.24 4.83 14.46 5.24 14.55 5.73L16 15.73C16.06 16.33 15.9 16.85 15.51 17.31 15.12 17.77 14.61 18 14 18H2C1.38 18 0.88 17.77 0.48 17.31 0.09 16.85-0.06 16.33 0.02 15.73L1.45 5.73C1.53 5.24 1.76 4.83 2.12 4.5 2.49 4.17 2.92 4 3.42 4H5.17C5.12 3.83 5.08 3.67 5.05 3.51 5.01 3.35 5 3.18 5 3 5 2.17 5.29 1.46 5.87 0.88 6.46 0.29 7.16 0 8 0 8.83 0 9.54 0.29 10.12 0.88 10.71 1.46 11 2.17 11 3 11 3.18 10.98 3.35 10.95 3.51 10.91 3.67 10.87 3.83 10.82 4Z" fill="#37618b" />
                </svg>
              </div>
              <div className="kalkulator-card-title">Kalkulator BMI</div>
            </div>

            <div className="kalkulator-form">
              <div className="kalkulator-field">
                <label className="kalkulator-label">Berat Badan (kg)</label>
                <input
                  type="number"
                  className="kalkulator-input"
                  placeholder="misal: 65"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                  min="1" max="300"
                />
              </div>
              <div className="kalkulator-field">
                <label className="kalkulator-label">Tinggi Badan (cm)</label>
                <input
                  type="number"
                  className="kalkulator-input"
                  placeholder="misal: 170"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                  min="30" max="250"
                />
              </div>
              <button className="kalkulator-btn-calc bmi" onClick={handleCalcBMI}>Hitung BMI (IMT)</button>
            </div>

            <div className="kalkulator-result">
              {bmiResult ? (
                <>
                  <div className="kalkulator-result-value" style={{ color: bmiResult.color }}>{bmiResult.value}</div>
                  <div className="kalkulator-result-category">{bmiResult.category}</div>
                  <div className="kalkulator-result-desc">Indeks Massa Tubuh (kg/m²)</div>
                </>
              ) : (
                <p className="kalkulator-result-placeholder">
                  Hasil penghitungan akan ditampilkan di sini setelah Anda mengisi data.
                </p>
              )}
            </div>
          </div>

          {/* === CEK PERTUMBUHAN (Z-SCORE) CARD === */}
          <div className="kalkulator-card zscore">
            <div className="kalkulator-card-header">
              <div className="kalkulator-card-icon zscore">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 14C8 14 7.1 13.73 6.29 13.18 5.48 12.63 4.88 11.9 4.5 11H13.5C13.12 11.9 12.52 12.63 11.71 13.18 10.9 13.73 10 14 9 14ZM9 18C7.75 18 6.59 17.76 5.49 17.29 4.4 16.81 3.45 16.17 2.64 15.36 1.83 14.55 1.19 13.6 0.71 12.51 0.24 11.42 0 10.25 0 9 0 7.75 0.24 6.58 0.71 5.49 1.19 4.4 1.83 3.45 2.64 2.64 3.45 1.83 4.4 1.19 5.49 0.71 6.58 0.24 7.75 0 9 0 10.25 0 11.42 0.24 12.51 0.71 13.6 1.19 14.55 1.83 15.36 2.64 16.17 3.45 16.81 4.4 17.29 5.49 17.76 6.58 18 7.75 18 9 18ZM9 16C10.93 16 12.58 15.32 13.95 13.95 15.32 12.58 16 10.93 16 9 16 7.07 15.32 5.42 13.95 4.05 12.58 2.68 10.93 2 9 2 7.07 2 5.42 2.68 4.05 4.05 2.68 5.42 2 7.07 2 9 2 10.93 2.68 12.58 4.05 13.95 5.42 15.32 7.07 16 9 16Z" fill="#854d63" />
                </svg>
              </div>
              <div className="kalkulator-card-title">Cek Pertumbuhan</div>
            </div>

            <div className="kalkulator-form">
              <div className="kalkulator-field-row">
                <div className="kalkulator-field">
                  <label className="kalkulator-label">Usia (bulan)</label>
                  <input
                    type="number"
                    className="kalkulator-input"
                    placeholder="0–24"
                    value={zsAge}
                    onChange={(e) => setZsAge(e.target.value)}
                    min="0" max="24"
                  />
                </div>
                <div className="kalkulator-field">
                  <label className="kalkulator-label">Jenis Kelamin</label>
                  <select className="kalkulator-select" value={zsGender} onChange={(e) => setZsGender(e.target.value)}>
                    <option value="male">Laki-laki</option>
                    <option value="female">Perempuan</option>
                  </select>
                </div>
              </div>
              <div className="kalkulator-field">
                <label className="kalkulator-label">Lingkar Kepala (cm)</label>
                <input
                  type="number"
                  className="kalkulator-input"
                  placeholder="misal: 42"
                  value={zsHead}
                  onChange={(e) => setZsHead(e.target.value)}
                  min="20" max="60"
                />
              </div>
              <button className="kalkulator-btn-calc zscore" onClick={handleCalcZScore}>Cek Z-Score</button>
            </div>

            <div className="kalkulator-zscore-chart">
              {zsResult ? (
                <>
                  <div className="kalkulator-zscore-bars">
                    {[-3, -2, -1, 0, 1].map((level, i) => {
                      const zVal = parseFloat(zsResult.z);
                      const isActive = Math.round(zVal) === level;
                      const height = [48, 64, 96, 72, 32][i];
                      return (
                        <div
                          key={level}
                          className={`kalkulator-bar ${isActive ? 'active' : 'inactive'}`}
                          style={{ height: `${height}px` }}
                        />
                      );
                    })}
                  </div>
                  <div className="kalkulator-zscore-label">Visualisasi Standar WHO — {zsResult.status}</div>
                </>
              ) : (
                <div className="kalkulator-result">
                  <p className="kalkulator-result-placeholder">Isi data untuk melihat visualisasi Z-Score WHO.</p>
                </div>
              )}
            </div>
          </div>

          {/* === HPL CARD === */}
          <div id="hpl-card" className="kalkulator-card hpl">
            <div className="kalkulator-card-header">
              <div className="kalkulator-card-icon hpl">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                  <path d="M2 20C1.45 20 0.98 19.8 0.59 19.41 0.2 19.02 0 18.55 0 18V4C0 3.45 0.2 2.98 0.59 2.59 0.98 2.2 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.02 2.2 17.41 2.59 17.8 2.98 18 3.45 18 4V18C18 18.55 17.8 19.02 17.41 19.41 17.02 19.8 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6Z" fill="#585f66" />
                </svg>
              </div>
              <div className="kalkulator-card-title">Perkiraan Lahir</div>
            </div>

            <div className="kalkulator-form">
              <div className="kalkulator-field">
                <label className="kalkulator-label">Hari Pertama Haid Terakhir (HPHT)</label>
                <input
                  type="date"
                  className="kalkulator-input"
                  value={hpht}
                  onChange={(e) => setHpht(e.target.value)}
                />
              </div>

              <div className="kalkulator-info-box">
                <div className="kalkulator-info-header">
                  <svg width="13" height="13" viewBox="0 0 13.33 13.33" fill="none">
                    <path d="M6 10H7.33V6H6V10ZM6.67 4.67C6.86 4.67 7.01 4.6 7.14 4.48 7.27 4.35 7.33 4.19 7.33 4 7.33 3.81 7.27 3.65 7.14 3.53 7.01 3.4 6.86 3.33 6.67 3.33 6.48 3.33 6.32 3.4 6.19 3.53 6.06 3.65 6 3.81 6 4 6 4.19 6.06 4.35 6.19 4.48 6.32 4.6 6.48 4.67 6.67 4.67ZM6.67 13.33C5.74 13.33 4.88 13.16 4.07 12.81 3.26 12.46 2.55 11.98 1.95 11.38 1.35 10.78 0.88 10.08 0.53 9.27 0.18 8.46 0 7.59 0 6.67 0 5.74 0.18 4.88 0.53 4.07 0.88 3.26 1.35 2.55 1.95 1.95 2.55 1.35 3.26 0.88 4.07 0.53 4.88 0.18 5.74 0 6.67 0 7.59 0 8.46 0.18 9.27 0.53 10.08 0.88 10.78 1.35 11.38 1.95 11.98 2.55 12.46 3.26 12.81 4.07 13.16 4.88 13.33 5.74 13.33 6.67 13.33ZM6.67 12C8.16 12 9.42 11.48 10.45 10.45 11.48 9.42 12 8.16 12 6.67 12 5.18 11.48 3.92 10.45 2.88 9.42 1.85 8.16 1.33 6.67 1.33 5.18 1.33 3.92 1.85 2.88 2.88 1.85 3.92 1.33 5.18 1.33 6.67 1.33 8.16 1.85 9.42 2.88 10.45 3.92 11.48 5.18 12 6.67 12Z" fill="#37618b" />
                  </svg>
                  <span className="kalkulator-info-title">Informasi Siklus</span>
                </div>
                <p className="kalkulator-info-text">
                  Perhitungan menggunakan rumus Naegele dengan siklus 28 hari. Hasil ini hanya perkiraan medis.
                </p>
              </div>

              <button className="kalkulator-btn-calc hpl" onClick={handleCalcHPL}>Prediksi HPL</button>
            </div>

            <div className="kalkulator-result">
              {hplResult ? (
                <>
                  <div className="kalkulator-result-value hpl" style={{ color: '#585f66', fontSize: '20px' }}>{hplResult}</div>
                  <div className="kalkulator-result-category">Perkiraan Tanggal Lahir</div>
                  <div className="kalkulator-result-desc">Berdasarkan Rumus Naegele (±2 minggu)</div>
                </>
              ) : (
                <p className="kalkulator-result-placeholder">
                  Hasil penghitungan akan ditampilkan di sini setelah Anda mengisi data.
                </p>
              )}
            </div>

            {hplResult && (
              <div className="kalkulator-nextstep-box">
                <div>
                  <svg width="18" height="20" viewBox="0 0 18 20" fill="none" style={{ display: 'inline', marginRight: '8px' }}>
                    <path d="M2 20C1.45 20 0.98 19.8 0.59 19.41 0.2 19.02 0 18.55 0 18V4C0 3.45 0.2 2.98 0.59 2.59 0.98 2.2 1.45 2 2 2H3V0H5V2H13V0H15V2H16C16.55 2 17.02 2.2 17.41 2.59 17.8 2.98 18 3.45 18 4V18C18 18.55 17.8 19.02 17.41 19.41 17.02 19.8 16.55 20 16 20H2ZM2 18H16V8H2V18ZM2 6H16V4H2V6Z" fill="#42474e" />
                  </svg>
                  <span className="kalkulator-nextstep-title">Langkah Berikutnya</span>
                </div>
                <button className="kalkulator-nextstep-link" onClick={() => onNavigate('jadwal')}>Jadwal</button>
              </div>
            )}
          </div>
        </div>

        {/* History Section */}
        <div className="kalkulator-history-card">
          <div className="kalkulator-history-header">
            <div className="kalkulator-history-title">Riwayat Terbaru</div>
            {history.length > 0 && (
              <button className="kalkulator-history-clear" onClick={() => setHistory([])}>Hapus Semua</button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="kalkulator-history-empty">Belum ada riwayat penghitungan.</div>
          ) : (
            history.map((h, i) => (
              <div key={i} className="kalkulator-history-row">
                <span className="kalkulator-history-type">{h.type}</span>
                <span className="kalkulator-history-result">{h.result}</span>
                <span className="kalkulator-history-date">{h.date}</span>
              </div>
            ))
          )}
        </div>

        {/* Feedback Poll */}
        <div className="kalkulator-feedback-card">
          <div className="kalkulator-feedback-header">
            <div className="kalkulator-feedback-title">Umpan Balik</div>
            <svg width="12" height="8" viewBox="0 0 12 7.4" fill="none">
              <path d="M1.4 7.4L0 6 6 0 12 6 10.6 7.4 6 2.8 1.4 7.4V7.4" fill="#42474e" />
            </svg>
          </div>
          <p className="kalkulator-feedback-question">
            Seberapa bermanfaat pelacak pertumbuhan digital untuk kunjungan terakhir Anda di
            Posyandu?
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
            +{voteCount} warga <span>lainnya telah memberikan suara</span>
          </p>
        </div>
      </main>

      <Footer />

    </div>
  );
}
