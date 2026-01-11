# Nissan Jammu - Authorized Car Dealership Website

![Nissan Jammu](https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800)

A modern, full-stack car dealership website for **Nissan Jammu** - Authorized Dealer at Channi Himmat, Jammu.

## ✨ Features

- 🚗 **Car Catalog** - Browse Nissan vehicles with detailed specs
- 📱 **PWA Support** - Works offline, installable on mobile
- 🔄 **Offline Sync** - Forms cache when offline, sync when online
- 🔐 **Secure Authentication** - JWT-based auth with refresh tokens
- 📧 **Contact Forms** - Test drive booking, price quotes, inquiries
- 🗺️ **Directions** - Integrated Google Maps
- ⚡ **Fast Performance** - Optimized images, lazy loading
- 📊 **SEO Optimized** - Meta tags, structured data, sitemap

## 🏗️ Project Structure

```
nissan-jammu/
├── frontend/               # Next.js 14 frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # Utilities & offline queue
│   │   ├── services/      # API services
│   │   └── context/       # React context
│   ├── public/            # Static assets & PWA files
│   └── netlify.toml       # Netlify configuration
│
├── backend/               # Express.js API
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Data models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & security
│   │   ├── database/      # DB adapters (SQLite/MongoDB)
│   │   └── services/      # Business logic
│   └── data/              # SQLite database
│
└── DEPLOYMENT.md          # Deployment guide
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

API runs at [http://localhost:5001](http://localhost:5001)

## 🌐 Environment Variables

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Nissan Jammu
```

### Backend (.env)

```env
NODE_ENV=development
PORT=5001
DB_TYPE=sqlite
SQLITE_PATH=./data/nissan.db
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
```

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

**Frontend → Netlify:**
```bash
cd frontend
npm run build
netlify deploy --prod
```

**Backend → Railway:**
```bash
cd backend
railway up
```

## 🔄 Offline Support

The app automatically:
- Caches pages for offline viewing
- Queues form submissions when offline
- Syncs data when back online
- Shows offline indicator to users

## 🛡️ Security Features

- XSS Protection
- SQL Injection Prevention
- Rate Limiting
- CORS Configuration
- JWT Authentication
- Input Sanitization
- Security Headers

## 📱 PWA Features

- Installable on mobile/desktop
- Offline page support
- Background sync
- Push notifications ready

## 🧪 Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form

**Backend:**
- Node.js / Express
- SQLite / MongoDB
- JWT Authentication
- Helmet.js

## 📄 License

Private - Nissan Jammu

---

**Nissan Jammu** - Authorized Dealer, Channi Himmat, Jammu  
Built with ❤️
