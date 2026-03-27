import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Halaman Tidak Dijumpai | Rumah Terbuka RSVP',
};

export default function NotFound() {
  notFound();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy text-white p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gold mb-4" style={{ fontFamily: '"Great Vibes", cursive' }}>
          404
        </h1>
        <h2 className="text-2xl mb-4" style={{ fontFamily: '"Great Vibes", cursive' }}>
          Halaman Tidak Dijumpai
        </h2>
        <p className="text-white/70 max-w-md">
          Maaf, halaman yang anda cari tidak wujud atau telah dipindahkan.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-gold text-navy font-semibold py-3 px-8 rounded hover:bg-gold/90 transition-colors"
        >
          Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}