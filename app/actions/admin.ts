'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function adminLogin(formData: FormData) {
  const user = formData.get('username')?.toString() ?? '';
  const pass = formData.get('password')?.toString() ?? '';

  // Simple validation
  if (!user || !pass) {
    return { error: 'Nama pengguna dan kata laluan diperlukan.' };
  }

  if (user === 'firdaus' && pass === 'firdaus1234') {
    // Set secure cookie
    const headers = new Headers();
    headers.append('Set-Cookie', 'admin=1; Path=/admin; HttpOnly; SameSite=Strict');
    revalidatePath('/admin');
    redirect('/admin');
    return { headers };
  }
  return { error: 'Nama pengguna atau kata laluan salah.' };
}