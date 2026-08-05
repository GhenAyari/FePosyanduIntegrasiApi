import React from 'react';

export default function DaftarView() {
  return (
    <div className="card">
      <div className="section-head">
        <h3>Daftar 9 Posyandu — Desa Loa Duri Ulu</h3>
        <span className="badge badge-violet">Baris Anda dapat diedit</span>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr><th>Nama Posyandu</th><th>Alamat</th><th>Jadwal Rutin</th><th></th></tr>
          </thead>
          <tbody>
            <tr className="row-highlight">
              <td><input defaultValue="Melati" /></td>
              <td><input defaultValue="Jl. Mawar RT 02" /></td>
              <td><input defaultValue="Tanggal 3" /></td>
              <td><button className="btn btn-sm btn-violet">Simpan</button></td>
            </tr>
            <tr><td>Rukun Lestari</td><td>Jl. Anggrek RT 01</td><td>Tanggal 4</td><td style={{ color: 'var(--ink-faint)', fontSize: '11px' }}>Hanya-lihat</td></tr>
            <tr><td>Mawar</td><td>Jl. Kenanga RT 05</td><td>Tanggal 6</td><td style={{ color: 'var(--ink-faint)', fontSize: '11px' }}>Hanya-lihat</td></tr>
            <tr><td>Bina Putra</td><td>Jl. Merpati RT 03</td><td>Tanggal 9</td><td style={{ color: 'var(--ink-faint)', fontSize: '11px' }}>Hanya-lihat</td></tr>
            <tr><td>Nusa Indah</td><td>Jl. Cendana RT 04</td><td>Tanggal 10</td><td style={{ color: 'var(--ink-faint)', fontSize: '11px' }}>Hanya-lihat</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
