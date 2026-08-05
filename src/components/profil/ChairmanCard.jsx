import React from 'react';
import kasnahImg from '../../assets/images/profil/kasnah-ketua.png';

export default function ChairmanCard() {
  return (
    <div className="chairman-card">
      <div className="chairman-avatar-wrapper">
        <div className="avatar-ring">
          <img src={kasnahImg} alt="Kasnah - Ketua Posyandu" className="chairman-img" />
        </div>
      </div>
      <h3 className="chairman-name">Kasnah</h3>
      <div className="chairman-role">Ketua Posyandu</div>
      <p className="chairman-subtext">Desa Loa Duri Ulu, Kec. Loa Janan</p>
      
      <div className="chairman-actions">
        <button className="action-circle-btn" aria-label="Telepon Ketua" title="Telepon">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M16.95 18C14.8667 18 12.8083 17.5458 10.775 16.6375 8.7417 15.7292 6.8917 14.4417 5.225 12.775 3.5583 11.1083 2.2708 9.2583 1.3625 7.225 0.4542 5.1917 0 3.1333 0 1.05 0 0.75 0.1 0.5 0.3 0.3 0.5 0.1 0.75 0 1.05 0H5.1C5.3333 0 5.5417 0.0792 5.725 0.2375 5.9083 0.3958 6.0167 0.5833 6.05 0.8L6.7 4.3C6.7333 4.5667 6.725 4.7917 6.675 4.975 6.625 5.1583 6.5333 5.3167 6.4 5.45L3.975 7.9C4.3083 8.5167 4.7042 9.1125 5.1625 9.6875 5.6208 10.2625 6.125 10.8167 6.675 11.35 7.1917 11.8667 7.7333 12.3458 8.3 12.7875 8.8667 13.2292 9.4667 13.6333 10.1 14L12.45 11.65C12.6 11.5 12.7958 11.3875 13.0375 11.3125 13.2792 11.2375 13.5167 11.2167 13.75 11.25L17.2 11.95C17.4333 12.0167 17.625 12.1375 17.775 12.3125 17.925 12.4875 18 12.6833 18 12.9V16.95C18 17.25 17.9 17.5 17.7 17.7 17.5 17.9 17.25 18 16.95 18Z" fill="currentColor"/>
          </svg>
        </button>
        <button className="action-circle-btn" aria-label="Kirim Email Ketua" title="Kirim Email">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <path d="M2 16C1.45 16 0.9792 15.8042 0.5875 15.4125 0.1958 15.0208 0 14.55 0 14V2C0 1.45 0.1958 0.9792 0.5875 0.5875 0.9792 0.1958 1.45 0 2 0H18C18.55 0 19.0208 0.1958 19.4125 0.5875 19.8042 0.9792 20 1.45 20 2V14C20 14.55 19.8042 15.0208 19.4125 15.4125 19.0208 15.8042 18.55 16 18 16H2ZM10 9L2 4V14H18V4L10 9ZM10 7L18 2H2L10 7Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
