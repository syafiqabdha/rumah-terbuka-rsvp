import { join } from 'path';
import Database from 'better-sqlite3';

interface Rsvp {
  id: number;
  name: string;
  attendance: 'Hadir' | 'Tidak Hadir';
  pax: number;
  message: string | null;
  created_at: string;
}

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;
  const dbPath = join(process.cwd(), 'data', 'rsvp.db');
  db = new Database(dbPath);
  // Ensure table exists
  db.exec(`
    CREATE TABLE IF NOT EXISTS rsvps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      attendance TEXT NOT NULL CHECK (attendance IN ('Hadir','Tidak Hadir')),
      pax INTEGER DEFAULT 0,
      message TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  return db;
}