# ![Dev Events Logo](public/icons/logo.png) Dev Events — The Hub for Every Dev Event You Mustn't Miss

Dev Events is a modern Next.js application for discovering, creating, and booking developer focused events  meetups, workshops, and conferences with a simple UI and server-side API routes.

Live Demo: [https://devevents-roan.vercel.app/](https://devevents-roan.vercel.app/)

---

## Features

### For Users
- Browse available events with full details (title, description, date/time, venue)
- Real-time event booking via API endpoints
- Secure authentication using NextAuth
- Mobile responsive layout
- Create events
- Create Event Form created with Warp for streamlined form handling and validation
- Event statistics and monitoring using posthog

---

## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS for styling
- NextAuth.js for authentication
- PostHog for analytics
- Warp 

### Backend
- Next.js API Routes
- MongoDB with Mongoose
- Warp 

---

## Project Structure

```
app/                      # Next.js app directory (pages / routes / layout)
  ├─ api/                 # API routes (auth, events, bookings)
  ├─ events/              # event pages (create, [slug], etc.)
  ├─ layout.tsx
  └─ page.tsx

components/               # React components (BookEvent, EventCard, Navbar...)
database/                 # Mongoose models (event.model.ts, booking.model.ts)
lib/                      # Utilities (mongodb.ts, actions, constants)
public/                   # Static assets (icons/logo.png)
```

---

## Environment Variables

Create a `.env.local` in the project root and add the following:

```env
# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# OAuth providers 
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
```

---

## API Endpoints

### Events
- `GET /api/events` — Get all events  
- `GET /api/events/[slug]` — Get event details by slug  
- `POST /api/events` — Create a new event  

### Bookings
- `POST /api/events/[slug]/book` — Book an event  
- `GET /api/bookings` — Get bookings for the current user  

### Authentication
- `GET /api/auth/[...nextauth]` — NextAuth authentication routes  

---

## Getting Started

### Prerequisites
- Node.js 18+  
- npm or yarn  
- MongoDB instance (local or Atlas)

### Quick Start
1. Clone the repo:
```bash
git clone https://github.com/HafizSyedAhmedAli/Dev-Events-NextJS.git
cd Dev-Events-NextJS
```

2. Install dependencies:
```bash
npm install
# or
# yarn
```

3. Create `.env.local` using the Environment Variables section above.

4. Start the dev server:
```bash
npm run dev
```

5. Open `http://localhost:3000` in your browser.

---

## Available NPM Scripts
- `npm run dev` — start development server  
- `npm run build` — build for production  
- `npm start` — run production server  
- `npm run lint` — run ESLint

---

## Contributing
Contributions are welcome — fork the repo, create a feature branch, then open a Pull Request. Please follow the existing code style (TypeScript + Tailwind) and ensure linting passes.

---

## License
This project uses the MIT License — see the `LICENSE` file in the repository.

---

## Acknowledgments
- Next.js docs and examples  
- NextAuth for authentication  
- PostHog for analytics  
- MongoDB & Mongoose for data modeling
