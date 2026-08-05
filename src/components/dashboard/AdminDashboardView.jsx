import React from 'react';

export default function AdminDashboardView() {
  return (
    <>
      <div className="grid grid-4" style={{ marginBottom: '18px' }}>
        <div className="stat-card" style={{ background: 'var(--cyan-bg)' }}><div className="ico" style={{ background: 'var(--cyan-deep)' }}><svg className="ic"><use href="#i-home" /></svg></div><div className="num">9</div><div className="label">Total Posyandu</div></div>
        <div className="stat-card" style={{ background: 'var(--green-bg)' }}><div className="ico" style={{ background: 'var(--green-deep)' }}><svg className="ic"><use href="#i-check" /></svg></div><div className="num">6/9</div><div className="label">Laporan Bulanan Tepat Waktu</div></div>
        <div className="stat-card" style={{ background: 'var(--orange-bg)' }}><div className="ico" style={{ background: 'var(--orange-deep)' }}><svg className="ic"><use href="#i-calendar" /></svg></div><div className="num">2/9</div><div className="label">Terlambat</div></div>
        <div className="stat-card" style={{ background: 'var(--magenta-bg)' }}><div className="ico" style={{ background: 'var(--magenta-deep)' }}><svg className="ic"><use href="#i-file" /></svg></div><div className="num">4/9</div><div className="label">Laporan 3 Bulanan Direkap</div></div>
      </div>
      <div className="card">
        <div className="section-head"><h3>Status Laporan 9 Posyandu</h3></div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr><th>Nama Posyandu</th><th>Jadwal Rutin</th><th>Status Bulanan Kesehatan</th><th>Status 3 Bulanan 6 Bidang</th><th>Terakhir Diperbarui</th><th></th></tr>
            </thead>
            <tbody>
              <tr><td>Melati</td><td>Tgl. 3</td><td><span className="badge badge-green">Tepat Waktu</span></td><td><span className="badge badge-orange">Belum</span></td><td>28 Jul 2026</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
              <tr><td>Rukun Lestari</td><td>Tgl. 4</td><td><span className="badge badge-green">Tepat Waktu</span></td><td><span className="badge badge-green">Sudah</span></td><td>29 Jul 2026</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
              <tr><td>Mawar</td><td>Tgl. 6</td><td><span className="badge badge-rose">Terlambat</span></td><td><span className="badge badge-orange">Belum</span></td><td>25 Jun 2026</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
              <tr><td>Bina Putra</td><td>Tgl. 9</td><td><span className="badge badge-green">Tepat Waktu</span></td><td><span className="badge badge-green">Sudah</span></td><td>9 Jul 2026</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
              <tr><td>Nusa Indah</td><td>Tgl. 10</td><td><span className="badge badge-green">Tepat Waktu</span></td><td><span className="badge badge-orange">Belum</span></td><td>10 Jul 2026</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
              <tr><td>Cempaka</td><td>Tgl. 12</td><td><span className="badge badge-rose">Terlambat</span></td><td><span className="badge badge-orange">Belum</span></td><td>2 Jun 2026</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
              <tr><td>Tunas Mulya</td><td>Tgl. 14</td><td><span className="badge badge-green">Tepat Waktu</span></td><td><span className="badge badge-green">Sudah</span></td><td>14 Jul 2026</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
              <tr><td>Surya</td><td>Tgl. 16</td><td><span className="badge badge-green">Tepat Waktu</span></td><td><span className="badge badge-green">Sudah</span></td><td>16 Jul 2026</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
              <tr><td>Terkini</td><td>Tgl. 19</td><td><span className="badge badge-orange">Menunggu</span></td><td><span className="badge badge-orange">Belum</span></td><td>—</td><td><button className="btn btn-sm btn-outline">Detail</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
