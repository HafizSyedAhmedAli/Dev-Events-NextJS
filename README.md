# Event Booking Platform

A modern web application for browsing, creating, and booking events seamlessly. Experience real-time event exploration, instant booking confirmation, and user-friendly event management.

## Features

### For Users
- Browse available events with detailed descriptions
- Real-time event booking and reservations
- Secure authentication with NextAuth
- View booking history
- Search and filter events
- Mobile responsive design
- Explore new events easily

### For Event Creators
- Create and manage events
- Track event bookings and attendees
- Monitor event statistics
- Easy event scheduling

## Tech Stack

### Frontend
- Next.js (React framework)
- TypeScript for type safety
- Tailwind CSS for styling
- NextAuth for authentication
- PostHog for analytics

### Backend
- Next.js API Routes
- MongoDB with Mongoose
- NextAuth for secure authentication
- Server-side rendering and API integration

### Database
- MongoDB for data persistence
- Mongoose for schema management

## Project Structure

```
app/                          # Next.js app directory
├── api/                      # API routes
│   ├── auth/                # Authentication routes
│   └── events/              # Event endpoints
├── events/                   # Event pages
│   ├── create/              # Create event page
│   └── [slug]/              # Event details page
├── layout.tsx               # Root layout
└── page.tsx                 # Home page

components/                   # React components
├── BookEvent.tsx            # Event booking component
├── CreateEventForm.tsx       # Event creation form
├── EventCard.tsx            # Event card display
├── EventDetails.tsx         # Event details view
├── Navbar.tsx               # Navigation bar
└── ...                      # Other components

database/                     # Database models
├── event.model.ts           # Event schema
└── booking.model.ts         # Booking schema

lib/                          # Utility functions
├── actions/                 # Server actions
│   ├── event.actions.ts     # Event operations
│   └── booking.actions.ts   # Booking operations
├── mongodb.ts               # MongoDB connection
└── constants.ts             # App constants
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Authentication Providers
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

# Other Services
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
```sh
git clone <repository-url>
cd nextjs-crash-course
```

2. Install dependencies:
```sh
npm install
```

3. Set up environment variables:
```sh
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```sh
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Events
- `GET /api/events` - Get all events
- `GET /api/events/[slug]` - Get event details
- `POST /api/events` - Create new event

### Bookings
- `POST /api/events/[slug]/book` - Book an event
- `GET /api/bookings` - Get user bookings

### Authentication
- `GET /api/auth/[...nextauth]` - NextAuth routes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

Steps to contribute:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email your-email@example.com or create an issue in the repository.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js](https://next-auth.js.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
