# Le Boulevard — Premium Digital Restaurant Menu Website
### Hotel Atithi — TGI Grand, Puducherry, India
**Production Target:** [https://menu.atithipondicherry.com/](https://menu.atithipondicherry.com/)

---

## 🌟 Overview

**Le Boulevard** is a production-ready, mobile-first digital restaurant menu and in-room dining web application built for the premier 4-star coastal luxury property **Hotel Atithi — TGI Grand**, located on S.V. Patel Salai in Puducherry, India.

The application blends **French colonial luxury** with **coastal Coromandel heritage**, featuring:
- **Warm ivory & milk-white backgrounds** with champagne-gold accents and deep ocean navy details.
- **100% accurate menu importation** (all 77 items across Snacks, Soups & Salads, Starters, Main Course, Rice/Noodles/Pasta, Indian Breads, Desserts, Tea & Coffee) with listed pre-GST INR (₹) prices and exact service timings.
- **Statutory Tax Compliance**: Clear government tax notice (*“All prices are subject to 18% GST”*) displayed on all relevant views without inflating listed prices.
- **Meal Service Management**: Automatic active service detector (IST-based) with filters for Breakfast (7:00 AM – 10:30 AM), Lunch (12:30 PM – 3:00 PM), Dinner (7:30 PM – 11:00 PM), All-Day Snacks (11:00 AM – 11:00 PM), and In-Room Dining (24/7).
- **Interactive Buffet Spread Views**: Support for breakfast, lunch, and dinner buffet spreads with soup, salad, live counters, veg, non-veg, and dessert stations.
- **Table & Tent Card QR Code Studio**: Instant vector SVG and high-resolution PNG generation encoded with production URL (`https://menu.atithipondicherry.com/`), printable 5-star tent card template, and guest Wi-Fi details (`Atithi_Guest`).
- **Room Service Order Tray**: Interactive cart, guest details (Room #, name, phone, chef notes), pre-tax subtotal + 18% GST calculation, 1-click WhatsApp concierge transmission, and REST API order submission.
- **F&B Staff Admin Portal**: Secure PIN/password authentication, live dish availability toggles (In Stock / Sold Out), price/item editor, buffet schedule publisher, live room service KOT printing, and tax notice updater.

---

## 🚀 Quick Start & Local Development

### 1. Requirements
- Node.js 18+ (tested on Node v24.12.0)
- npm or pnpm

### 2. Running the Production Server
The backend is a lightweight, zero-dependency Node.js HTTP server that serves both the REST API and the compiled React SPA:
```bash
# Start server (default port 3001)
node server/index.js
```
Open your browser at: `http://localhost:3001`

### 3. Running with Vite Dev Server (Hot Module Reload)
```bash
# Terminal 1: Run API backend
node server/index.js

# Terminal 2: Run Vite Dev Server with proxy to backend
npm run dev
```
Vite will start at `http://localhost:5173` with automatic API proxying to `http://localhost:3001/api`.

### 4. Rebuilding the Frontend
```bash
npm run build
```
Builds the optimized production bundles into `/dist`.

---

## 🔐 Staff & Admin Authentication

Access the admin portal by clicking the **Admin** button in the header or appending `#admin` to the URL:
- **URL:** `http://localhost:3001/#admin`
- **Default Username:** `admin`
- **Default Password:** `Boulevard@2026`
- **Alternative 6-digit PIN:** `122436`

### Admin Capabilities:
1. **Menu Items Management:**
   - Filter, search, and edit all 77 dishes.
   - 1-click stock availability toggle (`In Stock` / `Sold Out`).
   - Add new dishes and delete outdated items.
2. **Buffet Schedules & Daily Menus:**
   - Publish or unpublish breakfast, lunch, or dinner buffet spreads.
   - Configure per-head adult and child pricing.
   - Edit live station and buffet section dishes.
3. **Live In-Room Orders:**
   - Real-time queue for room service orders.
   - Lifecycle tracker: `Pending` ➔ `Confirmed` ➔ `Preparing` ➔ `Delivered` ➔ `Completed`.
   - Printable **Kitchen Order Ticket (KOT)**.
4. **Tax Notice & Hotel Settings:**
   - Update statutory tax notice text.
   - Update GST percentage (default 18%).
   - Update concierge telephone and WhatsApp numbers.
   - Configure QR code target base URL.

---

## 📋 Full Imported Menu Structure

| Category | Service Timings | Items Included |
| :--- | :--- | :--- |
| **A. Snacks & Quick Bites** | 11:00 AM – 11:00 PM | Grilled Sandwiches (Veg ₹350 / Chicken ₹400), Club Sandwich (₹450), Creole Chicken Nuggets (₹350), Cajun Fish Fingers (₹450), Chilly Cheese Toast (₹250), Paneer Pakoda (₹300), Onion Pakoda (₹250), French Fries (₹250), Masala Papad / Peanuts (₹250), Fresh Juices (₹200), Butter Milk (₹125), Lassi (₹125), Milk Shakes (₹200), Tea & Coffee (₹150) |
| **B. Soups & Salads** | 12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM | Cream Soup (Veg ₹200 / Non-Veg ₹250; choices: Chicken, Mushroom, Broccoli, Veg), Oriental Soup (Veg ₹200 / Non-Veg ₹250; choices: Sweet Corn, Manchow, Clear, Hot n Sour), Sprout & Peanut Chaat (₹250), Caesar Salad (Veg ₹300 / Chicken ₹350) |
| **C. Starters & Appetizers** | 12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM | Mini Asian Cigars (₹350), Salt N Peppered American Corn (₹350), Cauliflower Manchurian (₹350), BBQ Pineapple (₹350), Babycorn Bezule (₹350), Mushroom Milagu Pirattal (₹350), Chilly Soya Paneer (₹425), Makhmali Paneer Tikka (₹425), Schezwan Chilly Fish (₹450), Mangolian Fried Fish (₹450), Honey Chicken Wings (₹450), Chilly Garlic Chicken (₹450), Banjara Murgh Kebab (₹450), Chicken 65 (₹450), Mutton Milagu Pirattal (₹550), Tandoori Chicken Chooza (₹550), Jinga Ajwaini (₹600), Era Manga Thokku (₹600) |
| **D. Main Course Specialties** | 12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM | Dal Tadka (₹220), Aloo Jeera (₹300), Subji Shabnam (₹300), Multan Paneer Masala (₹400), Paneer Butter Masala (₹400), Mediterranean Veg Skewers (₹400), Manchurian Gravy (Mushroom ₹350 / Paneer ₹400), Korma (Mushroom ₹350 / Paneer ₹400), Butter Chicken Masala (₹450), Methi Murgh (₹450), Chilly Gravy (Chicken ₹400 / Fish ₹500 / Prawn ₹600), Creole Spice Grilled Prawns with Rice & Veg (₹650), Chicken Stroganoff with Saffron Rice (₹600) |
| **E. Rice, Noodles & Pasta** | 12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM | Steamed Rice (₹200), Pulao (₹350), Curd Rice (₹250), Pasta (Veg ₹400 / Chicken ₹500), Chinese Rice/Noodles (Veg ₹300 / Egg ₹320 / Chicken ₹350 / Mixed ₹400), Thokku Biryani (Paneer ₹450 / Chicken ₹500 / Mutton ₹600) |
| **F. Indian Breads & Dosas** | 12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM | Dosa Plain (₹200), Dosa Egg (₹300), Naan / Roti / Chapathi / Phulka (₹150), Lachha Paratha (₹175), Garlic Naan (₹175), Butter Naan (₹175) |
| **G. Gourmet Desserts** | 11:00 AM – 11:00 PM | Caramel Custard (₹300), Almond Truffle Chocolate Pastry (₹350), Walnut Brownie (₹300), Rasmalai (₹250), Gulab Jamun (₹200), Carrot Halwa (₹200), Choice of Ice Cream (₹200), Seasonal Fruit Cut (₹200) |
| **H. Tea & Coffee** | 7:00 AM – 11:00 PM | Heritage Tea (₹150), South Indian Filter Coffee (₹150) |

---

## 🌐 Production Deployment Steps

### Domain: `https://menu.atithipondicherry.com/`

#### Option A: Docker Deployment (Recommended)
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build
EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production
CMD ["node", "server/index.js"]
```

#### Option B: Standalone Node / PM2 Deployment
```bash
# 1. Clone repository to web server
git clone <repo-url> /var/www/le-boulevard-menu
cd /var/www/le-boulevard-menu

# 2. Build assets
npm run build

# 3. Start with PM2
pm2 start server/index.js --name "le-boulevard-menu"
pm2 save
pm2 startup
```

#### Option C: Nginx Reverse Proxy with SSL
```nginx
server {
    listen 80;
    server_name menu.atithipondicherry.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name menu.atithipondicherry.com;

    ssl_certificate /etc/letsencrypt/live/menu.atithipondicherry.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/menu.atithipondicherry.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🏛️ Resort & Restaurant Branding
- **Restaurant:** Le Boulevard
- **Parent Resort:** Hotel Atithi — TGI Grand
- **Subtitle:** *A Premium Dining Experience by the Sea*
- **Location:** 126, S.V. Patel Salai, Heritage Town, Puducherry - 605001, India
- **Contact:** +91 413 2211111 | WhatsApp: +91 93600 00000
