import React from 'react';
import kasnahImg from '../../assets/images/profil/kader-1.png';
import dewaImg from '../../assets/images/profil/kader-2.png';
import rinawatieImg from '../../assets/images/profil/kader-3.png';
import baganStrukturImg from '../../assets/images/profil/bagan-struktur.png';

export default function StrukturKepengurusanSection() {
  const members = [
    { id: 1, name: 'Kasnah', role: 'Ketua TP Posyandu Desa', image: kasnahImg },
    { id: 2, name: 'Dewa Tri Arinda, M.A.P', role: 'Sekretaris', image: dewaImg },
    { id: 3, name: 'Rinawatie, S.Pd', role: 'Bendahara', image: rinawatieImg },
  ];

  return (
    <div className="struktur-card">
      <div className="struktur-header-row">
        <h2 className="section-title">Struktur Kepengurusan</h2>
        <button type="button" className="btn-outline-sm">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 13.3333L5.83333 9.16667L7.05 7.9L9.16667 10.0167V0H10.8333V10.0167L12.95 7.9L14.1667 9.16667L10 13.3333ZM3.33333 16.6667C2.875 16.6667 2.48278 16.5031 2.15667 16.1758C1.83056 15.8486 1.6672 15.4564 1.66667 15V12.5H3.33333V15H16.6667V12.5H18.3333V15C18.3333 15.4583 18.17 15.8508 17.8433 16.1775C17.5167 16.5042 17.1242 16.6672 16.6667 16.6667H3.33333Z"
              fill="currentColor"
            />
          </svg>
          Unduh Struktur (PDF)
        </button>
      </div>

      <div className="struktur-members-row">
        {members.map((m) => (
          <div className="struktur-member" key={m.id}>
            <div className="struktur-avatar-wrapper">
              <img src={m.image} alt={m.name} className="struktur-avatar" />
            </div>
            <div className="struktur-member-name">{m.name}</div>
            <div className="struktur-member-role">{m.role}</div>
          </div>
        ))}
      </div>

      <div className="struktur-chart-placeholder" style={{ padding: '0', overflow: 'hidden', background: 'transparent', border: 'none', display: 'flex', justifyContent: 'center' }}>
        <img src={baganStrukturImg} alt="Bagan Struktur Organisasi" style={{ width: '100%', maxWidth: '800px', height: 'auto', borderRadius: '16px' }} />
      </div>
    </div>
  );
}
