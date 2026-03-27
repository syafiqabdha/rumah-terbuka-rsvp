import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Rumah Terbuka RSVP',
  description: 'Selamat Hari Raya Aidilfitri RSVP',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms">
      <body className="bg-navy text-white flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full mx-auto min-h-screen shadow-2xl overflow-hidden relative p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
