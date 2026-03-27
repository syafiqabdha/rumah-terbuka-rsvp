# Rumah Terbuka RSVP - Hari Raya Aidilfitri

A beautiful, mobile-first RSVP web application for "Rumah Terbuka Hari Raya Aidilfitri" (Eid Open House) built with Next.js 14, Tailwind CSS, and SQLite. Features a luxurious design system, live countdown, admin dashboard, and server-side form handling.

## ✨ Features

- **Luxury Modern Design**
  Deep navy background (#0a1128) with rich gold accents (#d4af37), elegant typography (Great Vibes & Inter), and subtle gold arabesque pattern overlay.

- **Mobile-First Responsive**
  Strictly enforces a mobile phone-sized container (max-w-md mx-auto) so it looks and feels like a native app even on desktop.

- **Live Countdown Timer**
  Dynamic countdown to April 4, 2026, 8:00 PM (local time) with days/hours/minutes/seconds.

- **Secure RSVP Form**
  - Name (required)
  - Attendance: Hadir / Tidak Hadir (required)
  - Pax: Number input (0-10, with validation)
  - Optional Hari Raya message
  - Transparent inputs with gold borders
  - Success/error feedback after submission

- **Admin Dashboard** (/admin)
  - Hardcoded login: firdaus / firdaus1234 (for prototype)
  - View all RSVPs in a clean table
  - Statistics: Total Hadir, Total Pax
  - Secure cookie-based session (HttpOnly, SameSite)

- **Server-Side Data Handling**
  - Uses better-sqlite3 for local SQLite storage
  - Automatic table initialization on first run
  - Server Actions for form submissions and admin login
  - No external dependencies (Firebase, Supabase, etc.)

- **Production Ready**
  - Dockerized with multi-stage build
  - Volume-persisted SQLite database
  - TypeScript with strict type safety
  - Proper validation and error handling

## 🛠️ Technology Stack

| Layer         | Technology                                  |
|---------------|---------------------------------------------|
| **Framework** | Next.js 14 (App Router)                   |
| **Styling**   | Tailwind CSS                                |
| **UI Fonts**  | Great Vibes (script), Inter (sans-serif)    |
| **Database**  | SQLite via better-sqlite3                    |
| **Language**  | TypeScript                                  |
| **Deployment**| Docker                                      |
| **State**     | Server Actions (Next.js 13.4+)              |

## 📦 Installation & Setup

### Prerequisites
- Node.js (>=18 LTS)
- Git
- Docker (optional, for containerized deployment)

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/syafiqabdha/rumah-terbuka-rsvp.git
cd rumah-terbuka-rsvp

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

# 4. Open in browser
# Visit: http://localhost:3000
# Admin: http://localhost:3000/admin (login: firdaus / firdaus1234)
```

### Docker Deployment

```bash
# 1. Build and start the container
docker compose up --build

# 2. The app will be available at:
# http://localhost:3000
# Admin: http://localhost:3000/admin (login: firdaus / firdaus1234)

# 3. Data persistence
# The SQLite database is stored in ./data/ and persists across container restarts
```

## 🗂️ Project Structure

```
rumah-terbuka-rsvp/
├── app/
│   ├── actions/
│   │   ├── admin.ts     # Admin login server action
│   │   └── rsvp.ts      # RSVP submission server action
│   ├── admin/page.tsx   # Protected admin dashboard
│   ├── components/
│   │   ├── Countdown.tsx     # Live countdown to Hari Raya
│   │   └── RSVPForm.tsx      # Form with validation & feedback
│   ├── not-found.tsx         # Custom 404 page (luxury theme)
│   ├── page.tsx              # Main RSVP page
│   └── layout.tsx            # Mobile-only container layout
├── lib/
│   └── db.ts                 # SQLite helper with type safety (auto-creates table)
├── data/
│   └── .gitkeep              # Ensures data directory is tracked by git
├ .gitignore                  # Ignores node_modules, .next, env, data/*.db
├── AGENTS.md                 # Guidance for coding agents (tooling, linting, testing)
├── Dockerfile                # Multi-stage production build
├__docker-compose.yml        # Deployment configuration (volume persistence)
├── next.config.js            # Next.js configuration
├── package.json              # Dependencies & scripts
├── tailwind.config.js        # Navy (#0a1128) + Gold (#d4af37) theme + custom fonts
└── tsconfig.js               # TypeScript configuration
```

## 🎨 Design System ("Modern Luxury")

### Color Palette
- Background: #0a1128 (Deep navy blue)
- Accent: #d4af37 (Rich gold - buttons, highlights, text)
- Text: #ffffff (Pure white - maximum contrast)

### Typography
- Host Names: Great Vibes (Script, Gold) - Large names (Firdaus/Faizah)
- Headings/Text: Inter (Sans-serif, White) - Body, labels, descriptions
- Countdown: Inter (monospace) - Mono, Gold - Numbers in timer

### Background
- Subtle monochrome gold arabesque/floral SVG pattern
- Opacity: 5-10% (elegant, non-distracting)
- Implemented as inline SVG in header section

## 📅 Event Details (Displayed in Malay)

- **Title**: Selamat Hari Raya Aidilfitri
- **Hosts**: Muhammad Firdaus & Nor Faizah
- **Full Names**: Muhammad Firdaus Shah bin Safaudin & Nor Faizah binti Zabil
- **Date**: 4 April 2026 (Sabtu)
- **Time**: 8:00 PM – 11:00 PM
- **Location**: Pusat Konvensyen Bangi (BCC), Seksyen 14, Bandar Baru Bangi
- **Map Button**: Links to [Google Maps](https://maps.google.com/?q=Pusat+Konvensyen+Bangi+BCC)

## 🔐 Admin Access (Prototype Only)

- **URL**: `/admin`
- **Username**: `firdaus`
- **Password**: `firdaus1234`
- **Note**: For production, replace with environment variables and secure auth (e.g., NextAuth.js, JWT).

## 📱 Mobile-Only View

The entire application is wrapped in a container that enforces a mobile phone viewport:
```tsx
<div className="max-w-md w-full mx-auto min-h-screen shadow-2xl overflow-hidden relative p-4">
```
This ensures consistent UX across devices—always appears as a luxury "card" centered on the screen.

## ⏳ Countdown Timer

- **Target**: 2026-04-04T20:00:00+08:00 (April 4, 2026, 8:00 PM SGT/MYT)
- **Live Updates**: Updates every second
- **Display**: Days, Hours, Minutes, Seconds in gold monospace boxes
- **Fallback**: Shows "Acara telah bermula" after event starts

## 📝 RSVP Form Validation

**Server Validation** (app/actions/rsvp.ts):
- Name and attendance are required
- If Hadir: pax must be between 1 and 10
- If Tidak Hadir: pax must be exactly 0
- Optional message (no validation)

**UI Feedback**:
- Loading state on submit
- Error messages in red (if invalid)
- Success message in green (on success)
- Form disables during submission

## 💾 Data Storage

- **Database**: SQLite (via better-sqlite3)
- **Table**: rsvps
  - id (PK, autoincrement)
  - name (TEXT, NOT NULL)
  - attendance (TEXT, NOT NULL, CHECK: 'Hadir'|'Tidak Hadir')
  - pax (INTEGER, DEFAULT 0)
  - message (TEXT, NULL)
  - created_at (DATETIME, DEFAULT CURRENT_TIMESTAMP)
- **Persistence**:
  - Local: ./data/rsvp.db
  - Docker: Volume mount ./data:/app/data

## 🐳 Docker Deployment

### Dockerfile (Multi-Stage)

```dockerfile
# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/postcss.config.js ./
COPY --from=builder /app/lib ./lib
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "./node_modules/next/dist/bin/next", "start"]
```

### docker-compose.yml

```yaml
version: '3.9'
services:
  web:
    build: .
    container_name: rsvp-aidilfitri
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data  # Persists SQLite DB
    restart: unless-stopped
```

## 🛡️ Security Notes (Prototype)

⚠️ **This is a prototype**. For production use:
1. Replace hardcoded admin credentials with environment variables
2. Implement proper authentication (e.g., NextAuth.js)
3. Add rate limiting on login and form submission
4. Use HTTPS in production
5. Consider encrypting sensitive data at rest
6. Add CSP headers and XSS protection

## 🧪 Testing

The application includes:
- TypeScript type safety across the codebase
- Form validation (client and server)
- Build-time error checking (Next.js + TypeScript)
- Manual verification workflow

> 💡 Tip: To add formal testing later, consider:
> - Vitest for unit tests
> - Playwright or Cypress for E2E
> - Test server actions with mocked better-sqlite3

## 📜 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by the tradition of Rumah Terbuka during Hari Raya Aidilfitri
- Design inspired by modern luxury invitation aesthetics
- Built with ❤️ for community and celebration

## 📬 Contact

For questions or feedback, open an issue on GitHub: https://github.com/syafiqabdha/rumah-terbuka-rsvp/issues
