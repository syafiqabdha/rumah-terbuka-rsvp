import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Countdown from './components/Countdown';
import RSVPForm from './components/RSVPForm';

export default function HomePage() {
  return (
    <main className="flex flex-col gap-6">
      {/* Header with background pattern */}
      <section className="relative text-center py-8">
        {/* SVG pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          {/* Simple monochrome gold arabesque */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#d4af37"
              d="M40 60c30-20 70 20 100 0s70 20 100 0v80c-30 20-70-20-100 0s-70-20-100 0z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: '"Great Vibes", cursive', color: '#d4af37' }}>
          Selamat Hari Raya Aidilfitri
        </h1>
        <h2 className="text-xl" style={{ fontFamily: '"Great Vibes", cursive', color: '#d4af37' }}>
          Muhammad Firdaus &amp; Nor Faizah
        </h2>
        <p className="mt-4 text-white">
          4 April 2026 (Sabtu) • 8:00 PM – 11:00 PM<br />
          Pusat Konvensyen Bangi (BCC), Seksyen 14, Bandar Baru Bangi.
        </p>
        <Link
          href="https://maps.google.com/?q=Pusat+Konvensyen+Bangi+BCC"
          target="_blank"
          className="inline-block mt-4 px-4 py-2 bg-gold text-navy font-semibold rounded"
        >
          Lihat Peta
        </Link>
      </section>

      {/* Countdown */}
      <section className="text-center">
        <Countdown targetDate="2026-04-04T20:00:00+08:00" />
      </section>

      {/* RSVP Form */}
      <section className="p-4 bg-navy/30 rounded">
        <RSVPForm />
      </section>
    </main>
  );
}
