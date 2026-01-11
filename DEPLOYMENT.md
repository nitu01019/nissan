# Nissan Jammu - Deployment Guide

## Overview

This guide covers deploying:
- **Frontend**: Next.js app → Netlify (static hosting)
- **Backend**: Node.js/Express API → Railway/Render (with your laptop as database)

---

## 🌐 FRONTEND DEPLOYMENT (Netlify)

### Step 1: Prepare for Deployment

```bash
cd Desktop/jamkash/frontend

# Install dependencies
npm install

# Build to verify everything works
npm run build
```

### Step 2: Deploy to Netlify

#### Option A: Netlify CLI (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# For production deployment
netlify deploy --prod
```

#### Option B: Netlify Dashboard (Manual)

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your GitHub/GitLab or drag & drop the `frontend` folder
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Click **"Deploy site"**

### Step 3: Configure Environment Variables

In Netlify Dashboard → Site Settings → Environment Variables:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
NEXT_PUBLIC_SITE_NAME=Nissan Jammu
```

### Step 4: Custom Domain (Optional)

1. Go to **Domain settings** in Netlify
2. Add your custom domain (e.g., `nissanjammu.com`)
3. Configure DNS as instructed
4. Enable HTTPS (automatic)

---

## 🖥️ BACKEND DEPLOYMENT OPTIONS

### Option 1: Railway (Recommended - Free Tier Available)

#### Step 1: Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to backend
cd Desktop/jamkash/backend

# Initialize project
railway init

# Deploy
railway up
```

#### Step 2: Configure Environment Variables in Railway

Go to Railway Dashboard → Your Project → Variables:

```
NODE_ENV=production
PORT=5001
DB_TYPE=sqlite
SQLITE_PATH=./data/nissan.db
JWT_SECRET=your-super-secret-random-string-here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
FRONTEND_URL=https://your-site.netlify.app
```

---

### Option 2: Render (Alternative)

1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your repo or upload code
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables (same as Railway)

---

## 💻 USING YOUR LAPTOP AS DATABASE (Offline-First Architecture)

Since you want to use your laptop as the database server, here's how the system works:

### How It Works

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│   Netlify   │────▶│  Railway/   │
│   (User)    │◀────│  (Frontend) │◀────│   Render    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                    When your laptop           │
                    is ONLINE:                 ▼
                                        ┌─────────────┐
                                        │ Your Laptop │
                                        │  (SQLite)   │
                                        └─────────────┘
```

### When Laptop is OFFLINE:

1. **User submits form** → Request goes to Railway/Render
2. **Railway stores request** in its own temporary database
3. **When laptop comes online** → Syncs data to your laptop
4. **OR** User's browser caches the request locally (IndexedDB)
5. **When user is back online** → Browser syncs cached requests

### Setup Tunnel to Your Laptop (For Direct Database Access)

#### Using ngrok:

```bash
# Install ngrok
brew install ngrok  # macOS
# or download from ngrok.com

# Start your backend locally
cd Desktop/jamkash/backend
npm start

# In another terminal, expose it
ngrok http 5001

# Copy the https URL (e.g., https://abc123.ngrok.io)
# Use this as your NEXT_PUBLIC_API_URL
```

#### Using Cloudflare Tunnel (More Stable):

```bash
# Install cloudflared
brew install cloudflared

# Login
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create nissan-backend

# Run tunnel
cloudflared tunnel --url http://localhost:5001
```

### Automatic Sync When Laptop Comes Online

The frontend is already configured to:

1. **Cache requests offline** using IndexedDB
2. **Show offline indicator** when disconnected
3. **Auto-sync** when connection is restored
4. **Notify user** when sync is complete

---

## 📱 PWA SUPPORT (Works Offline)

The app is already a PWA with:

- ✅ Service Worker for offline caching
- ✅ Manifest for install prompts
- ✅ Offline page fallback
- ✅ Background sync for forms

---

## 🔒 SECURITY CHECKLIST

Before going live:

- [ ] Change `JWT_SECRET` to a strong random string (32+ characters)
- [ ] Update CORS origins with your actual domain
- [ ] Enable HTTPS on all endpoints
- [ ] Set up rate limiting (already configured)
- [ ] Review and update contact information

---

## 📋 QUICK DEPLOYMENT CHECKLIST

### Frontend (Netlify)
- [ ] Run `npm run build` successfully
- [ ] Deploy to Netlify
- [ ] Set environment variables
- [ ] Test all pages load
- [ ] Verify API calls work

### Backend
- [ ] Choose deployment platform (Railway/Render)
- [ ] Deploy backend
- [ ] Set environment variables
- [ ] Update CORS with Netlify URL
- [ ] Test API endpoints

### Final Testing
- [ ] Test contact form submission
- [ ] Test offline mode (disable network)
- [ ] Verify data syncs when back online
- [ ] Test on mobile devices

---

## 🆘 TROUBLESHOOTING

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your Netlify URL
- Check browser console for blocked origins

### API Not Connecting
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check if backend is running (visit the URL directly)

### Offline Sync Not Working
- Check browser console for service worker errors
- Ensure IndexedDB is enabled in browser
- Try clearing site data and refreshing

---

## 📞 Support

For issues, check:
1. Browser Console (F12 → Console)
2. Network tab for failed requests
3. Backend logs in Railway/Render dashboard

---

*Nissan Jammu - Authorized Dealer, Channi Himmat*
