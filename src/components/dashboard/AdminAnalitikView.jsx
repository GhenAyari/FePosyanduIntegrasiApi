import React from 'react';

export default function AdminAnalitikView() {
  return (
    <>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="section-head"><h3>Tren Kehadiran Bulanan — Bidang Kesehatan (Lintas 9 Posyandu)</h3><span className="badge badge-violet">Feb–Jul 2026</span></div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px', height: '150px', padding: '10px 4px' }}>
          <div style={{ flex: 1, textAlign: 'center' }}><div style={{ height: '70px', background: 'linear-gradient(180deg,var(--cyan),var(--cyan-deep))', borderRadius: '8px 8px 0 0' }}></div><span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--ink-soft)' }}>Feb</span></div>
          <div style={{ flex: 1, textAlign: 'center' }}><div style={{ height: '88px', background: 'linear-gradient(180deg,var(--cyan),var(--cyan-deep))', borderRadius: '8px 8px 0 0' }}></div><span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--ink-soft)' }}>Mar</span></div>
          <div style={{ flex: 1, textAlign: 'center' }}><div style={{ height: '76px', background: 'linear-gradient(180deg,var(--cyan),var(--cyan-deep))', borderRadius: '8px 8px 0 0' }}></div><span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--ink-soft)' }}>Apr</span></div>
          <div style={{ flex: 1, textAlign: 'center' }}><div style={{ height: '104px', background: 'linear-gradient(180deg,var(--cyan),var(--cyan-deep))', borderRadius: '8px 8px 0 0' }}></div><span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--ink-soft)' }}>Mei</span></div>
          <div style={{ flex: 1, textAlign: 'center' }}><div style={{ height: '120px', background: 'linear-gradient(180deg,var(--cyan),var(--cyan-deep))', borderRadius: '8px 8px 0 0' }}></div><span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--ink-soft)' }}>Jun</span></div>
          <div style={{ flex: 1, textAlign: 'center' }}><div style={{ height: '132px', background: 'linear-gradient(180deg,var(--cyan),var(--cyan-deep))', borderRadius: '8px 8px 0 0' }}></div><span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--ink-soft)' }}>Jul</span></div>
        </div>
      </div>
      <div className="grid grid-2">
        <div className="card">
          <div className="section-head"><h3>Capaian per Bidang (Triwulan II)</h3></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '12.5px', fontWeight: 600 }}>Kesehatan</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}><div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '92%' }}></div></div><span style={{ fontSize: '11px', fontWeight: 700 }}>92%</span></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '12.5px', fontWeight: 600 }}>Pendidikan</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}><div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '78%', background: 'linear-gradient(90deg,var(--orange-deep),var(--orange))' }}></div></div><span style={{ fontSize: '11px', fontWeight: 700 }}>78%</span></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '12.5px', fontWeight: 600 }}>Pekerjaan Umum</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}><div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '60%', background: 'linear-gradient(90deg,var(--magenta-deep),var(--magenta))' }}></div></div><span style={{ fontSize: '11px', fontWeight: 700 }}>60%</span></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '12.5px', fontWeight: 600 }}>Perumahan Rakyat</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}><div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '55%', background: 'linear-gradient(90deg,var(--green-deep),var(--green))' }}></div></div><span style={{ fontSize: '11px', fontWeight: 700 }}>55%</span></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '12.5px', fontWeight: 600 }}>Trantibumlinmas</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}><div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '40%', background: 'linear-gradient(90deg,var(--violet-deep),var(--cyan))' }}></div></div><span style={{ fontSize: '11px', fontWeight: 700 }}>40%</span></div></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: '12.5px', fontWeight: 600 }}>Sosial</span><div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '55%' }}><div className="progress-track" style={{ flex: 1 }}><div className="progress-fill" style={{ width: '48%', background: 'linear-gradient(90deg,var(--rose-deep),var(--rose))' }}></div></div><span style={{ fontSize: '11px', fontWeight: 700 }}>48%</span></div></div>
          </div>
        </div>
        <div className="card">
          <div className="section-head"><h3>Keaktifan Kehadiran Warga per Posyandu</h3></div>
          <div className="table-responsive">
            <table className="table">
              <tbody>
                <tr><th>Posyandu</th><th>Kehadiran</th></tr>
                <tr><td>Melati</td><td style={{ fontWeight: 800, color: 'var(--green-deep)' }}>88%</td></tr>
                <tr><td>Rukun Lestari</td><td style={{ fontWeight: 800, color: 'var(--green-deep)' }}>91%</td></tr>
                <tr><td>Mawar</td><td style={{ fontWeight: 800, color: 'var(--orange-deep)' }}>67%</td></tr>
                <tr><td>Bina Putra</td><td style={{ fontWeight: 800, color: 'var(--green-deep)' }}>85%</td></tr>
                <tr><td>Nusa Indah</td><td style={{ fontWeight: 800, color: 'var(--orange-deep)' }}>73%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
