import React from 'react';
import '../../styles/footer.css';
import logoFooter from '../../assets/images/common/logo-footer.jpeg';

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-top">
          {/* Brand & Description */}
          <div className="footer-brand">
            <div className="footer-brand-title">
              <img src={logoFooter} alt="Posyandu Loa Duri Ulu" className="footer-logo" />
              <span>Posyandu Loa Duri Ulu</span>
            </div>
            <p className="footer-desc">
              Mewujudkan masyarakat Loa Duri Ulu yang sehat, cerdas, dan sejahtera melalui layanan kesehatan terpadu.
            </p>
          </div>

          {/* Links Columns */}
          <div className="footer-links-group">
            <div className="footer-col">
              <div className="footer-col-title">Layanan</div>
              <a href="#tumbuh-kembang" className="footer-link">Tumbuh Kembang</a>
              <a href="#imunisasi" className="footer-link">Imunisasi</a>
              <a href="#ibu-hamil" className="footer-link">Ibu Hamil</a>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">Informasi</div>
              <a href="#artikel" className="footer-link">Artikel Kesehatan</a>
              <a href="#jadwal" className="footer-link">Jadwal Kegiatan</a>
              <a href="#kontak" className="footer-link">Kontak Kami</a>
            </div>

            <div className="footer-col">
              <div className="footer-col-title">Internal</div>
              <a href="#ketentuan" className="footer-link">Ketentuan Layanan</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="copyright">
            © 2026 Posyandu Loa Duri Ulu.
          </div>

          {/* Social Icons */}
          <div className="social-icons">
            <button className="social-icon-btn" aria-label="Website">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path
                  d="M7.5 15C6.4625 15 5.4875 14.8031 4.575 14.4094 3.6625 14.0156 2.8687 13.4812 2.1937 12.8062 1.5187 12.1312 0.9844 11.3375 0.5906 10.425 0.1969 9.5125 0 8.5375 0 6.4625 0.1969 5.4875 0.5906 4.575 0.9844 3.6625 1.5187 2.8687 2.1937 2.1937 2.8687 1.5187 3.6625 0.9844 4.575 0.5906 5.4875 0.1969 6.4625 0 7.5 0 8.5375 0 9.5125 0.1969 10.425 0.5906 11.3375 0.9844 12.1312 1.5187 12.8062 2.1937 13.4812 2.8687 14.0156 3.6625 14.4094 4.575 14.8031 5.4875 15 6.4625 15 7.5 15 V 15 M 6.75 13.4625 V 12C6.3375 12 5.9844 11.8531 5.6906 11.5594 5.3969 11.2656 5.25 10.9125 5.25 10.5V9.75L1.65 6.15C1.6125 6.375 1.5781 6.6 1.5469 6.825 1.5156 7.05 1.5 7.275 1.5 7.5 1.5 9.0125 1.9969 10.3375 2.9906 11.475 3.9844 12.6125 5.2375 13.275 6.75 13.4625 V 13.4625 M 11.925 11.55C12.4375 10.9875 12.8281 10.3594 13.0969 9.6656 13.3656 8.9719 13.5 8.25 13.5 7.5 13.5 6.275 13.1594 5.1563 12.4781 4.1438 11.7969 3.1313 10.8875 2.4 9.75 1.95V2.25C9.75 2.6625 9.6031 3.0156 9.3094 3.3094 9.0156 3.6031 8.6625 3.75 8.25 3.75H6.75V5.25C6.75 5.4625 6.6781 5.6406 6.5344 5.7844 6.3906 5.9281 6.2125 6 6 6H4.5V7.5H9C9.2125 7.5 9.3906 7.5719 9.5344 7.7156 9.6781 7.8594 9.75 8.0375 9.75 8.25V10.5H10.5C10.825 10.5 11.1188 10.5969 11.3813 10.7906 11.6438 10.9844 11.825 11.2375 11.925 11.55 V 11.55"
                  fill="currentColor"
                />
              </svg>
            </button>
            <button className="social-icon-btn" aria-label="Share">
              <svg width="14" height="15" viewBox="0 0 14 15" fill="none">
                <path
                  d="M11.25 15C10.625 15 10.0938 14.7813 9.6563 14.3438 9.2188 13.9063 9 13.375 9 12.75 9 12.675 9.0187 12.5 9.0562 12.225L3.7875 9.15C3.5875 9.3375 3.3562 9.4844 3.0938 9.5906 2.8313 9.6969 2.55 9.75 2.25 9.75 1.625 9.75 1.0938 9.5313 0.6563 9.0938 0.2188 8.6563 0 8.125 0 7.5 0 6.875 0.2188 6.3438 0.6563 5.9063 1.0938 5.4688 1.625 5.25 2.25 5.25 2.55 5.25 2.8313 5.3031 3.0938 5.4094 3.3562 5.5156 3.5875 5.6625 3.7875 5.85L9.0562 2.775C9.0312 2.6875 9.0156 2.6031 9.0094 2.5219 9.0031 2.4406 9 2.35 9 2.25 9 1.625 9.2188 1.0938 9.6563 0.6563 10.0938 0.2188 10.625 0 11.25 0 11.875 0 12.4063 0.2188 12.8438 0.6563 13.2813 1.0938 13.5 1.625 13.5 2.25 13.5 2.875 13.2813 3.4063 12.8438 3.8438 12.4063 4.2813 11.875 4.5 11.25 4.5 10.95 4.5 10.6687 4.4469 10.4063 4.3406 10.1438 4.2344 9.9125 4.0875 9.7125 3.9L4.4437 6.975C4.4687 7.0625 4.4844 7.1469 4.4906 7.2281 4.4969 7.3094 4.5 7.4 4.5 7.5 4.5 7.6 4.4969 7.6906 4.4906 7.7719 4.4844 7.8531 4.4687 7.9375 4.4437 8.025L9.7125 11.1C9.9125 10.9125 10.1438 10.7656 10.4063 10.6594 10.6687 10.5531 10.95 10.5 11.25 10.5 11.875 10.5 12.4063 10.7188 12.8438 11.1563 13.2813 11.5938 13.5 12.125 13.5 12.75 13.5 13.375 13.2813 13.9063 12.8438 14.3438 12.4063 14.7813 11.875 15 11.25 15"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
