'use client';

import { useState, useRef } from 'react';
import { submitRsvp } from '@/app/actions/rsvp';

export default function RSVPForm() {
  const [state, setState] = useState<{
    success: boolean;
    error: string | null;
    id: string;
    isPending: boolean;
  }>({
    success: false,
    error: null,
    id: '',
    isPending: false
  });
  
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setState(prev => ({ ...prev, isPending: true, error: null }));
    try {
      const result = await submitRsvp(formData);
      setState({
        success: !!result.success,
        error: result.error ?? null,
        id: result.id ?? '',
        isPending: false
      });
    } catch (error) {
      setState({
        success: false,
        error: 'Terjadi kesalahan. Sila cuba lagi.',
        id: '',
        isPending: false
      });
    }
  };

  return (
    <form 
      className="space-y-4" 
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
      ref={formRef}
    >
      <div>
        <label className="block mb-1 text-white" htmlFor="name">
          Nama
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="w-full bg-transparent border-b border-gold text-white placeholder-white/50 focus:outline-none focus:border-gold/80"
          placeholder="Nama Anda"
        />
      </div>

      <div>
        <label className="block mb-1 text-white" htmlFor="attendance">
          Kehadiran
        </label>
        <select
          name="attendance"
          id="attendance"
          required
          className="w-full bg-transparent border-b border-gold text-white focus:outline-none"
        >
          <option value="Hadir">Hadir</option>
          <option value="Tidak Hadir">Tidak Hadir</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-white" htmlFor="pax">
          Bilangan Pax
        </label>
        <input
          type="number"
          name="pax"
          id="pax"
          min="0"
          max="10"
          defaultValue="0"
          className="w-full bg-transparent border-b border-gold text-white focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-1 text-white" htmlFor="message">
          Ucapan Hari Raya (Optional)
        </label>
        <textarea
          name="message"
          id="message"
          rows={3}
          className="w-full bg-transparent border-b border-gold text-white placeholder-white/50 focus:outline-none"
          placeholder="Selamat Hari Raya..."
        />
      </div>

      {state.error && (
        <p className="text-red-500 mt-2 text-xs">
          {state.error}
        </p>
      )}

      {state.success && (
        <p className="text-green-500 mt-2 text-xs">
          Terima kasih! RSVP anda telah berjaya dihantar.
        </p>
      )}

      <button
        type="submit"
        disabled={state.isPending}
        className={`w-full bg-gold text-navy font-semibold py-2 rounded 
          ${state.isPending ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold/90 transition-colors'}`}
      >
        {state.isPending ? 'Sedang memproses...' : 'Hantar RSVP'}
      </button>
    </form>
  );
}