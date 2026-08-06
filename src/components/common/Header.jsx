import React, { useState } from 'react';
import logoHeader from '../../assets/images/common/logo-header.jpeg';
import userAvatar from '../../assets/images/common/kristin-cooper.jpeg';

export default function Header({ activePage = 'beranda', onNavigate, onDarurat }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleClick = (e, pageId) => {
    e.preventDefault();

    setSidebarOpen(false);

    if (onNavigate) {
      onNavigate(pageId);
    } else {
      window.location.hash = pageId;
    }
  };

  return (
    <>
      <header className="header-navbar">

        <div className="header-content">

          {/* LEFT */}
          <div className="header-left">

            <button
              className="hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Menu"
            >
              <i className="bi bi-list" style={{ fontSize: '20px' }}></i>
            </button>

            <div
              className="header-brand"
              onClick={(e)=>handleClick(e,"beranda")}
            >
              <img
                src={logoHeader}
                className="header-logo"
                alt=""
              />

              <div>
                <div className="brand-title">
                  Posyandu LDU
                </div>

                <div className="brand-subtitle">
                  Layanan Masyarakat
                </div>
              </div>

            </div>

          </div>

          {/* DESKTOP NAV */}
          <nav className="header-nav">

            <a
              href="#beranda"
              className={`nav-item ${activePage==="beranda"?"active":""}`}
              onClick={(e)=>handleClick(e,"beranda")}
            >
              Beranda
            </a>

            <a
              href="#profil"
              className={`nav-item ${activePage==="profil"?"active":""}`}
              onClick={(e)=>handleClick(e,"profil")}
            >
              Profil Posyandu
            </a>

            <a
              href="#artikel"
              className={`nav-item ${activePage==="artikel"?"active":""}`}
              onClick={(e)=>handleClick(e,"artikel")}
            >
              Artikel
            </a>

            <a
              href="#jadwal"
              className={`nav-item ${activePage==="jadwal"?"active":""}`}
              onClick={(e)=>handleClick(e,"jadwal")}
            >
              Jadwal
            </a>

            <a
              href="#kalkulator"
              className={`nav-item ${activePage==="kalkulator"?"active":""}`}
              onClick={(e)=>handleClick(e,"kalkulator")}
            >
              Kalkulator
            </a>

            <button
              className="darurat-btn-navbar"
              onClick={() => {
                if (onDarurat) onDarurat();
                else if (onNavigate) onNavigate('kontak');
              }}
              title="Kontak Darurat"
            >
              <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '6px' }}></i> Darurat
            </button>

          </nav>

          {/* RIGHT */}
          <div className="header-actions">

            <button
              className="signin-btn"
              onClick={()=>onNavigate("login")}
            >
              Masuk
            </button>

            <div className="user-profile">
              <img
                src={userAvatar}
                className="user-avatar"
                alt=""
              />
            </div>

          </div>

        </div>

      </header>

      {/* Overlay */}

      <div
        className={`sidebar-overlay ${sidebarOpen?"show":""}`}
        onClick={()=>setSidebarOpen(false)}
      />

      {/* Sidebar */}

      <aside
        className={`mobile-sidebar ${sidebarOpen?"show":""}`}
      >

        <div className="mobile-sidebar-header">

          <span>Menu</span>

          <button
            onClick={()=>setSidebarOpen(false)}
          >
            <i className="bi bi-x-lg"></i>
          </button>

        </div>

        <button onClick={(e)=>handleClick(e,"beranda")}>
          <i className="bi bi-house-door-fill" style={{ marginRight: '8px' }}></i> Beranda
        </button>

        <button onClick={(e)=>handleClick(e,"profil")}>
          <i className="bi bi-people-fill" style={{ marginRight: '8px' }}></i> Profil Posyandu
        </button>

        <button onClick={(e)=>handleClick(e,"artikel")}>
          <i className="bi bi-journal-text" style={{ marginRight: '8px' }}></i> Artikel
        </button>

        <button onClick={(e)=>handleClick(e,"jadwal")}>
          <i className="bi bi-calendar-event" style={{ marginRight: '8px' }}></i> Jadwal
        </button>

        <button onClick={(e)=>handleClick(e,"kalkulator")}>
          <i className="bi bi-calculator-fill" style={{ marginRight: '8px' }}></i> Kalkulator
        </button>

        <button
          onClick={()=>{
            setSidebarOpen(false);
            if (onDarurat) onDarurat();
            else if (onNavigate) onNavigate('kontak');
          }}
          className="darurat-btn-sidebar"
        >
          <i className="bi bi-exclamation-triangle-fill" style={{ marginRight: '8px' }}></i> Darurat
        </button>

      </aside>

    </>
  );
}