import React, { useState } from 'react';
import { USER_DB, WARGA_DB } from '../utils/mockData';
import logo from '../assets/images/common/logo-header.jpeg';

export default function Login({ onNavigate, onLogin }) {
  const [loginType, setLoginType] = useState('pengelola');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleTypeChange = (type) => {
    setLoginType(type);
    setError('');
    setUsername('');
    setPassword('');
  };

  const handleLogin = () => {
    const un = username.trim().toLowerCase();

    if (loginType === 'warga') {
      const match = WARGA_DB[un] || {
        nama: username.trim() || 'Pak Herman',
        posyandu: 'Melati',
        password: '3172041234560001',
        nik: '3172041234560001',
        rt: '03',
        hp: '0812-3456-7890'
      };
      onLogin({ ...match, role: 'warga', username: un || 'herman' });
    } else {
      let match = USER_DB[un];
      if (!match) {
        if (un.includes('superadmin') || un.includes('admin')) match = USER_DB['superadmin'];
        else if (un.includes('ketua')) match = USER_DB['ketua'];
        else if (un.includes('puskesmas')) match = USER_DB['puskesmas'];
        else match = USER_DB['kader.melati'];
      }
      onLogin({ ...match, username: un || match.username || 'kader.melati' });
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
          />
        </div>
        <div className="field">
          <label id="passwordLabel">{loginType === 'warga' ? 'Kata Sandi (default: NIK)' : 'Kata Sandi'}</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="••••••••" 
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
        
        <button className="btn-primary" onClick={handleLogin}>Masuk</button>
        
        <p className="login-foot" id="loginFootNote">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="10" rx="2"/><path d="M7 10V7a5 5 0 0 1 10 0v3"/>
          </svg>
          Sistem mengenali Posyandu & peran Anda otomatis dari username.
        </p>
        
        <button className="public-link" onClick={() => onNavigate && onNavigate('beranda')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s7-6.7 7-12a7 7 0 0 0-14 0c0 5.3 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/>
          </svg>
          Lihat Halaman Publik (Tanpa Login)
        </button>
      </div>
    </div>
  );
}
