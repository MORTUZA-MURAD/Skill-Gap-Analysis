<div align="center">
  <img width="1200" height="475" alt="Skill Gap Analysis" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Skill Gap Analysis

Skill Gap Analysis is a premier coaching institute platform at Daffodil Smart City (DSC), Birulia, Savar, Dhaka-1216. This repository contains the full-stack web application for course management, demo bookings, skill assessment chatbot, and admin operations.

## Architecture

This project follows a clean separation of concerns within a single Next.js repository:

```
src/
├── app/
│   ├── (public)/          # Frontend pages (Home, Courses, About, Contact, Enroll)
│   ├── (auth)/            # Authentication pages (Login, Register)
│   ├── api/               # Backend API routes
│   │   ├── auth/          # Authentication API
│   │   ├── admin/         # Admin API (bookings, contacts)
│   │   ├── bookings/      # Demo booking API
│   │   ├── chat/          # Gemini AI chatbot API
│   │   └── contact/       # Contact form API
│   ├── dashboard/         # User dashboard
│   └── chat/              # Chatbot page
├── components/            # Reusable React components
├── data/                  # Static data (courses, teachers, testimonials)
├── lib/                   # Backend utilities (database, auth)
```

- **Frontend:** Next.js App Router pages and React components
- **Backend:** Next.js API Route Handlers
- **Database:** Neon PostgreSQL via serverless driver

## Tech Stack

- **Framework:** Next.js 15
- **Frontend:** React, Tailwind CSS, Lucide Icons
- **Backend:** Next.js API Routes
- **Database:** Neon PostgreSQL
- **Authentication:** JWT with HTTP-only cookies
- **AI:** Google Gemini API
- **Deployment:** Vercel

## Environment Variables

Create a `.env.local` file with the following variables:

```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require&channel_binding=require
SESSION_SECRET=your-secret-key-here
GEMINI_API_KEY=your-gemini-api-key-here
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set environment variables in `.env.local`

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build

```bash
npm run build
npm start
```

## License

This project is private and proprietary.
