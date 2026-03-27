import { getDb } from '@/lib/db';
import { adminLogin } from '@/app/actions/admin';

export const runtime = 'nodejs';

interface Rsvp {
  id: number;
  name: string;
  attendance: 'Hadir' | 'Tidak Hadir';
  pax: number;
  message: string | null;
  created_at: string;
}

export default async function AdminPage() {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin')?.value === '1';

  if (!isAdmin) {
    return (
      <form action={adminLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gold" style={{ fontFamily: 'Inter' }}>
          Admin Login
        </h2>
        <input
          name="username"
          type="text"
          placeholder="Nama Pengguna"
          required
          className="bg-transparent border-b border-gold text-white placeholder-white/50 focus:outline-none"
        />
        <input
          name="password"
          type="password"
          placeholder="Kata Laluan"
          required
          className="bg-transparent border-b border-gold text-white placeholder-white/50 focus:outline-none"
        />
        <button type="submit" className="bg-gold text-navy py-2 rounded font-semibold hover:bg-gold/90">
          Masuk
        </button>
      </form>
    );
  }

  const db = getDb();
  const rows = db.prepare('SELECT * FROM rsvps ORDER BY created_at DESC').all() as Rsvp[];
  
  const hadirCount = rows.filter((r) => r.attendance === 'Hadir').length;
  const totalPax = rows.reduce((sum, r) => sum + r.pax, 0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gold mb-4" style={{ fontFamily: 'Inter' }}>
        Panel Pengawal RSVP
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gold/20 p-4 rounded">
          <p className="text-white text-sm">Jumlah Hadir</p>
          <p className="text-2xl font-bold text-gold">{hadirCount}</p>
        </div>
        <div className="bg-gold/20 p-4 rounded">
          <p className="text-white text-sm">Jumlah Pax</p>
          <p className="text-2xl font-bold text-gold">{totalPax}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-white border border-gold text-sm">
          <thead>
            <tr className="bg-gold text-navy">
              <th className="p-2">Nama</th>
              <th className="p-2">Kehadiran</th>
              <th className="p-2">Pax</th>
              <th className="p-2">Mesej</th>
              <th className="p-2">Dihantar Pada</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-white/50">
                  Tiada rekod RSVP ditemui.
                </td>
              </tr>
            ) : (
              rows.map((row: Rsvp, idx: number) => (
                <tr key={row.id} className="border-t border-gold">
                  <td className="p-2">{row.name}</td>
                  <td className="p-2">{row.attendance}</td>
                  <td className="p-2">{row.pax}</td>
                  <td className="p-2">{row.message || '-'}</td>
                  <td className="p-2 text-xs">{new Date(row.created_at).toLocaleString('ms-MY')}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}