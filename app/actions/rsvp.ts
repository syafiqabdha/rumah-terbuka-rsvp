'use server';
import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitRsvp(formData: FormData) {
  const name = formData.get('name')?.toString().trim() ?? '';
  const attendance = formData.get('attendance')?.toString() ?? '';
  const pax = Number(formData.get('pax')) || 0;
  const message = formData.get('message')?.toString().trim() ?? '';

  // Validation
  if (!name || !attendance) {
    return { error: 'Nama dan Kehadiran diperlukan.', success: false };
  }

  if (attendance === 'Hadir' && (pax < 1 || pax > 10)) {
    return { 
      error: 'Jika Hadir, bilangan pax harus antara 1 dan 10.', 
      success: false 
    };
  }

  if (attendance === 'Tidak Hadir' && pax !== 0) {
    return { 
      error: 'Jika Tidak Hadir, bilangan pax harus 0.', 
      success: false 
    };
  }

  const db = getDb();
  const stmt = db.prepare(
    `INSERT INTO rsvps (name, attendance, pax, message) VALUES (?, ?, ?, ?)`
  );
  const info = stmt.run(name, attendance, pax, message);

  revalidatePath('/');

  return { 
    success: true, 
    error: null, 
    id: info.lastInsertRowid.toString() 
  };
}