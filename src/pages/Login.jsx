import React, { useState } from 'react';
import axios from 'axios'; // Tambahkan import axios
import logo from '../assets/images/common/logo-header.jpeg';

export default function Login({ onNavigate, onLogin }) {
  const [loginType, setLoginType] = useState('pengelola');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State baru untuk efek loading

  const handleTypeChange = (type) => {
    setLoginType(type);
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleLogin = async () => {
    // 1. Validasi kosong
    if (!username || !password) {
      setError('Username dan kata sandi tidak boleh kosong.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // 2. Tembak API Login Laravel
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        username: username,
        password: password
      });

      // 3. Ekstrak data dari JSON
      const token = response.data.data.token;
      const user = response.data.data.user;

      // ==========================================
      // 4. CEK SILANG TIPE LOGIN VS JABATAN ASLI
      // ==========================================
      if (loginType === 'warga' && user.role !== 'warga') {
        // Jika tab Warga tapi jabatannya pengelola (kader/ketua/dll)
        throw new Error('Gagal: Anda menggunakan akun Pengelola. Silakan pindah ke tab "Akun Pengelola".');
      }

      if (loginType === 'pengelola' && user.role === 'warga') {
        // Jika tab Pengelola tapi jabatannya hanya warga biasa
        throw new Error('Gagal: Anda menggunakan akun Warga. Silakan pindah ke tab "Akun Warga".');
      }
      // ==========================================

      // 5. Jika lolos cek silang, simpan Token ke brankas
      localStorage.setItem('auth_token', token);

      // 6. Kirim data user aslinya ke App.jsx agar halaman berpindah
      onLogin(user);

    } catch (err) {
      console.error("Gagal Login:", err);

      // Tangkap pesan error kustom kita sendiri, atau error dari Laravel
      if (err.message && err.message.startsWith('Gagal:')) {
        setError(err.message); // Tampilkan error cek silang
      } else if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Error dari Laravel (sandi salah)
      } else {
        setError('Koneksi ke server gagal atau Username/Sandi salah.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-screen">
      <div className="login-card">
        <div className="brand-mark">
          <img src={logo} alt="Logo Posyandu" />
        </div>
        <h1 style={{ fontSize: '21px', marginBottom: '4px', fontWeight: 700, color: 'var(--ink)' }}>Posyandu LDU</h1>
        <p className="login-sub">Masuk untuk mencatat & melaporkan kegiatan Posyandu</p>

        <div className="role-toggle">
          <button
            className={`role-btn ${loginType === 'pengelola' ? 'active' : ''}`}
            onClick={() => handleTypeChange('pengelola')}
            style={{ flex: '1 1 45%' }}
          >
            Akun Pengelola
          </button>
          <button
            className={`role-btn ${loginType === 'warga' ? 'active' : ''}`}
            onClick={() => handleTypeChange('warga')}
            style={{ flex: '1 1 45%' }}
          >
            Akun Warga
          </button>
        </div>

        <div className="field">
          <label id="usernameLabel">{loginType === 'warga' ? 'Nama Lengkap / Username' : 'Username'}</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={loginType === 'warga' ? 'mis. Herman' : 'mis. kader.melati'}
            disabled={isLoading} // Kunci input saat loading
          />
        </div>
        <div className="field">
          <label id="passwordLabel">{loginType === 'warga' ? 'Kata Sandi (default: NIK)' : 'Kata Sandi'}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading} // Kunci input saat loading
          />
        </div>

        {error && (
          <p className="login-error" style={{ display: 'flex' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M12 3 L2 20h20Z" /><path d="M12 10v4" /><circle cx="12" cy="17" r=".5" fill="currentColor" stroke="none" />
            </svg>
            {error}
          </p>
        )}

        {/* Tombol otomatis berubah teks saat sedang loading */}
        <button className="btn-primary" onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'Mencocokkan Data... ⏳' : 'Masuk'}
        </button>

        <p className="login-foot" id="loginFootNote">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="10" rx="2" /><path d="M7 10V7a5 5 0 0 1 10 0v3" />
          </svg>
          Sistem mengenali Posyandu & peran Anda otomatis dari username.
        </p>

        <button className="public-link" onClick={() => onNavigate && onNavigate('beranda')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s7-6.7 7-12a7 7 0 0 0-14 0c0 5.3 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" />
          </svg>
          Lihat Halaman Publik (Tanpa Login)
        </button>
      </div>
    </div>
  );
}