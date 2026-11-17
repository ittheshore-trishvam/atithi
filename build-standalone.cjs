const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'server', 'data', 'store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

console.log(`Loaded store with ${store.menu.length} items and ${store.buffets.length} buffet spreads.`);

const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='46' fill='%230B192C' stroke='%23C5A059' stroke-width='4'/%3E%3Cpath d='M50 18 L55 35 L73 35 L58 46 L64 63 L50 52 L36 63 L42 46 L27 35 L45 35 Z' fill='%23D4AF37'/%3E%3Ctext x='50' y='82' font-family='serif' font-size='16' font-weight='bold' fill='%23FDFBF7' text-anchor='middle' letter-spacing='2'%3ELB%3C/text%3E%3C/svg%3E" />
  <title>Le Boulevard | A Premium Dining Experience by the Sea | Hotel Atithi - TGI Grand, Puducherry</title>
  <meta name="description" content="Discover Le Boulevard at Hotel Atithi - TGI Grand, Puducherry. Signature multi-cuisine and coastal luxury dining with French colonial flair, fresh local seafood, and traditional South Indian flavours." />
  <meta property="og:title" content="Le Boulevard - Hotel Atithi - TGI Grand, Puducherry" />
  <meta property="og:description" content="A Premium Dining Experience by the Sea. View our complete breakfast, lunch, and dinner digital menu." />
  <meta property="og:type" content="restaurant.menu" />
  <meta property="og:url" content="https://menu.atithipondicherry.com/" />
  
  <!-- Google Fonts for Coastal Luxury -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            ivory: '#FAF8F5',
            milk: '#FFFFFF',
            gold: '#C5A059',
            'gold-light': '#E6C280',
            'gold-dark': '#9A7730',
            ocean: '#0B192C',
            'ocean-light': '#152A4A',
            sand: '#EFE9DF',
            charcoal: '#1E2022'
          },
          fontFamily: {
            serif: ['Playfair Display', 'Georgia', 'serif'],
            cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
            sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif']
          }
        }
      }
    }
  </script>

  <style>
    body {
      background-color: #FAF8F5;
      color: #1E2022;
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }
    h1, h2, h3, .font-serif {
      font-family: 'Playfair Display', Georgia, serif;
    }
    .luxury-shadow {
      box-shadow: 0 4px 20px -2px rgba(11, 25, 44, 0.05), 0 2px 6px -1px rgba(197, 160, 89, 0.08);
    }
    .luxury-card-hover {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .luxury-card-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 24px -4px rgba(11, 25, 44, 0.08), 0 4px 10px -2px rgba(197, 160, 89, 0.12);
      border-color: #C5A059;
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .sticky-glass {
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(197, 160, 89, 0.25);
    }
    @media print {
      .no-print { display: none !important; }
      body { background: white !important; }
    }
  </style>
</head>
<body class="min-h-screen flex flex-col antialiased selection:bg-[#C5A059]/20 selection:text-[#0B192C]">

  <!-- Top Resort Header Bar -->
  <div class="bg-[#0B192C] text-[#FAF8F5] text-xs py-1.5 px-4 border-b border-[#C5A059]/30">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-3 truncate">
        <span class="flex items-center gap-1 text-[#E6C280] font-medium tracking-wider uppercase text-[10px]">
          <svg class="w-3 h-3 text-[#C5A059] inline" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6.4-4.8-6.4 4.8 2.4-7.2-6-4.8h7.6z"/></svg>
          Hotel Atithi — TGI Grand
        </span>
        <span class="hidden sm:inline text-slate-400">•</span>
        <span class="hidden sm:inline text-slate-300 text-[11px] truncate">126, S.V. Patel Salai, Puducherry</span>
      </div>

      <div class="flex items-center gap-4 shrink-0 text-[11px]">
        <div id="serviceStatusPill" class="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium bg-emerald-50 text-emerald-800 border-emerald-200">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          <span id="serviceStatusText">Dining Service Active</span>
        </div>

        <a href="tel:+914132211111" class="flex items-center gap-1 text-[#E6C280] hover:text-white transition-colors">
          <svg class="w-3 h-3 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
          <span class="hidden sm:inline">Concierge:</span> +91 413 2211111
        </a>

        <button onclick="openAdmin()" class="flex items-center gap-1 text-slate-400 hover:text-[#E6C280] transition-colors pl-2 border-l border-slate-700 cursor-pointer">
          <svg class="w-3.5 h-3.5 inline" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span class="hidden md:inline">Admin</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Main Navigation Header -->
  <nav class="sticky top-0 z-40 w-full sticky-glass px-4 py-3 shadow-xs">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      
      <!-- Brand Crest & Logo -->
      <a href="#hero" class="flex items-center gap-3 select-none cursor-pointer">
        <div class="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-gradient-to-br from-[#0B192C] via-[#152A4A] to-[#070F1A] border-2 border-[#C5A059] shadow-md">
          <svg viewBox="0 0 100 100" class="w-full h-full p-1" fill="none">
            <circle cx="50" cy="50" r="44" stroke="#C5A059" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.6"/>
            <path d="M22 65 C35 55, 65 75, 78 65" stroke="#E6C280" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M50 18 L53 32 L67 32 L56 41 L60 55 L50 46 L40 55 L44 41 L33 32 L47 32 Z" fill="#C5A059"/>
            <text x="50" y="80" text-anchor="middle" fill="#FAF8F5" font-family="serif" font-size="18" font-weight="bold" letter-spacing="1.5">LB</text>
          </svg>
        </div>
        <div class="flex flex-col">
          <div class="flex items-center gap-1.5">
            <span class="font-serif tracking-wide font-bold text-2xl text-[#0B192C]">Le Boulevard</span>
            <span class="text-[#C5A059] text-xs">★</span>
          </div>
          <span class="font-medium tracking-[0.18em] uppercase text-[11px] text-[#C5A059]">Hotel Atithi — TGI Grand</span>
          <span class="text-[9px] tracking-wider italic text-slate-500">Puducherry • By The Sea</span>
        </div>
      </a>

      <!-- Desktop Links -->
      <div class="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1E2022]">
        <button onclick="setMealFilter('all')" class="meal-nav-link active text-[#0B192C] font-bold border-b-2 border-[#C5A059] py-1 cursor-pointer">Full Menu</button>
        <button onclick="setMealFilter('breakfast')" class="meal-nav-link text-slate-600 hover:text-[#C5A059] py-1 cursor-pointer">Breakfast</button>
        <button onclick="setMealFilter('lunch')" class="meal-nav-link text-slate-600 hover:text-[#C5A059] py-1 cursor-pointer">Lunch</button>
        <button onclick="setMealFilter('dinner')" class="meal-nav-link text-slate-600 hover:text-[#C5A059] py-1 cursor-pointer">Dinner</button>
        <button onclick="setMealFilter('buffet')" class="meal-nav-link text-slate-600 hover:text-[#C5A059] py-1 cursor-pointer">Buffet Spread</button>
        <a href="#about" class="text-slate-600 hover:text-[#C5A059] py-1">Our Story</a>
        <a href="#contact" class="text-slate-600 hover:text-[#C5A059] py-1">Contact</a>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2 sm:gap-3">
        <a id="navWhatsappBtn" href="https://wa.me/919360000000?text=Hello%20Le%20Boulevard%20dining%20desk,%20I%20would%20like%20to%20reserve%20a%20table%20or%20enquire%20about%20the%20menu." target="_blank" class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-all cursor-pointer shadow-xs">
          <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.16-1.31C8.6 21.52 10.26 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>
          <span>WhatsApp Concierge</span>
        </a>

        <button onclick="toggleMobileMenu()" class="lg:hidden p-2 rounded-lg text-[#0B192C] hover:bg-slate-100 cursor-pointer">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobileMenu" class="hidden lg:hidden mt-3 pt-3 border-t border-[#C5A059]/20 flex flex-col gap-2 pb-2">
      <div class="grid grid-cols-2 gap-2 text-sm font-medium">
        <button onclick="setMealFilter('all'); toggleMobileMenu();" class="p-2.5 rounded-lg text-left bg-slate-50 text-[#1E2022] hover:bg-[#FAF6EE]">🍽️ Full Menu</button>
        <button onclick="setMealFilter('breakfast'); toggleMobileMenu();" class="p-2.5 rounded-lg text-left bg-slate-50 text-[#1E2022] hover:bg-[#FAF6EE]">☕ Breakfast</button>
        <button onclick="setMealFilter('lunch'); toggleMobileMenu();" class="p-2.5 rounded-lg text-left bg-slate-50 text-[#1E2022] hover:bg-[#FAF6EE]">🍲 Lunch</button>
        <button onclick="setMealFilter('dinner'); toggleMobileMenu();" class="p-2.5 rounded-lg text-left bg-slate-50 text-[#1E2022] hover:bg-[#FAF6EE]">🌙 Dinner</button>
        <button onclick="setMealFilter('buffet'); toggleMobileMenu();" class="p-2.5 rounded-lg text-left bg-slate-50 text-[#1E2022] hover:bg-[#FAF6EE]">🥞 Buffet Spread</button>
        <a href="#contact" onclick="toggleMobileMenu();" class="p-2.5 rounded-lg text-left bg-slate-50 text-[#1E2022] hover:bg-[#FAF6EE]">📍 Location & Contact</a>
      </div>
      <div class="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
        <a href="tel:+914132211111" class="text-[#0B192C] font-semibold py-1">Call Desk: +91 413 2211111</a>
        <button onclick="openAdmin(); toggleMobileMenu();" class="text-slate-500 py-1">Staff Portal</button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="hero" class="relative w-full overflow-hidden bg-[#0B192C] text-white">
    <div class="absolute inset-0 z-0">
      <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85" alt="Le Boulevard Fine Coastal Dining" class="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105" />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/85 to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24 flex flex-col items-center text-center">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C5A059]/40 text-[#E6C280] text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
        <span>★ Hotel Atithi — TGI Grand, Puducherry ★</span>
      </div>

      <div class="flex flex-col items-center mb-6">
        <h1 class="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-3">
          Le Boulevard
        </h1>
        <div class="flex items-center justify-center gap-3 my-2">
          <div class="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A059]"></div>
          <p id="heroSubtitle" class="font-serif italic text-lg sm:text-2xl text-[#E6C280] tracking-wide font-normal">
            A Premium Dining Experience by the Sea
          </p>
          <div class="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A059]"></div>
        </div>
        <p class="max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed mt-3 font-light">
          Indulge in French colonial elegance and rich Bay of Bengal coastal culinary treasures. From freshly roasted tandoori grills and Seeraga Samba Thokku biryani to artisanal sandwiches and delicate French pastries.
        </p>
      </div>

      <!-- Quick Action Buttons -->
      <div class="w-full max-w-3xl mt-4 mb-8">
        <p class="text-xs uppercase tracking-widest text-[#C5A059] font-semibold mb-3">Select Your Dining Service</p>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          <button onclick="setMealFilter('all')" class="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B192C] border border-[#C5A059]/40 transition-all cursor-pointer shadow-sm group">
            <span class="text-base mb-1">🍽️</span>
            <span class="text-xs font-bold">View Menu</span>
            <span class="text-[10px] text-slate-300 group-hover:text-[#0B192C]">Full Selection</span>
          </button>
          <button onclick="setMealFilter('breakfast')" class="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B192C] border border-[#C5A059]/40 transition-all cursor-pointer shadow-sm group">
            <span class="text-base mb-1">☕</span>
            <span class="text-xs font-bold">Breakfast</span>
            <span class="text-[10px] text-slate-300 group-hover:text-[#0B192C]">7 AM – 10:30 AM</span>
          </button>
          <button onclick="setMealFilter('lunch')" class="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B192C] border border-[#C5A059]/40 transition-all cursor-pointer shadow-sm group">
            <span class="text-base mb-1">🍲</span>
            <span class="text-xs font-bold">Lunch</span>
            <span class="text-[10px] text-slate-300 group-hover:text-[#0B192C]">12:30 – 3:00 PM</span>
          </button>
          <button onclick="setMealFilter('dinner')" class="flex flex-col items-center justify-center p-3 rounded-xl bg-white/10 hover:bg-[#C5A059] text-white hover:text-[#0B192C] border border-[#C5A059]/40 transition-all cursor-pointer shadow-sm group">
            <span class="text-base mb-1">🌙</span>
            <span class="text-xs font-bold">Dinner</span>
            <span class="text-[10px] text-slate-300 group-hover:text-[#0B192C]">7:30 – 11:00 PM</span>
          </button>
        </div>
      </div>

      <!-- Quick Location Strip -->
      <div class="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300 py-3 px-6 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
        <span>📍 126, S.V. Patel Salai, Puducherry</span>
        <span class="hidden sm:inline text-white/20">•</span>
        <span>🕒 Dining: 7:00 AM – 11:00 PM</span>
        <span class="hidden sm:inline text-white/20">•</span>
        <a id="heroWhatsapp" href="https://wa.me/919360000000?text=Hello%20Le%20Boulevard%20dining%20desk,%20I%20would%20like%20to%20reserve%20a%20table%20or%20enquire%20about%20the%20menu." target="_blank" class="text-emerald-400 font-semibold hover:underline">💬 WhatsApp Concierge</a>
      </div>

      <!-- Announcement Banner -->
      <div id="announcementBanner" class="mt-6 max-w-xl mx-auto px-4 py-2 rounded-lg bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#FAF8F5] text-xs flex items-center gap-2">
        <span class="px-1.5 py-0.5 rounded bg-[#C5A059] text-[#0B192C] font-bold text-[9px] uppercase tracking-wider shrink-0">Special</span>
        <span id="announcementText" class="truncate">Chef’s Coastal Special: Fresh Bay of Bengal Era Manga Thokku & Creole Spice Grilled Prawns available today.</span>
      </div>
    </div>
    <div class="w-full h-8 bg-[#FAF8F5] [clip-path:polygon(0_100%,100%_100%,100%_0,0_100%)]"></div>
  </section>

  <!-- Digital Menu Main Area -->
  <main id="menu" class="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
    <div class="text-center max-w-2xl mx-auto mb-4">
      <span class="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-1">Gourmet Selection</span>
      <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C]">Digital Restaurant Menu</h2>
      <div class="h-0.5 w-16 bg-[#C5A059] mx-auto mt-2 mb-3"></div>
      <p class="text-xs sm:text-sm text-slate-500 font-light">
        Crafted for guests of <strong>Hotel Atithi — TGI Grand</strong>. Select your preferred meal timing or explore our complete coastal à la carte menu.
      </p>
    </div>

    <!-- Statutory Tax Notice Banner -->
    <div class="w-full my-6 p-4 rounded-xl bg-gradient-to-r from-[#FAF6EE] via-white to-[#FAF6EE] border border-[#C5A059]/40 shadow-xs">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#1E2022]">
        <div class="flex items-center gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-[#0B192C] flex items-center justify-center text-[#C5A059] shrink-0 font-serif font-bold">₹</div>
          <div>
            <p id="taxNoticeText" class="font-semibold text-[#0B192C] text-sm">Government Tax Notice: All prices are subject to 18% GST.</p>
            <p class="text-[#6B7280] text-[11px]">Listed menu prices are pre-GST (18% GST is computed on your dining bill / room folio upon billing).</p>
          </div>
        </div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#9A7730] font-semibold text-[11px]">
          <span>HSN/SAC 9963 • Hotel Atithi F&B</span>
        </div>
      </div>
    </div>

    <!-- Meal Timing Filter Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1 mb-6">
      <button onclick="setMealFilter('all')" class="meal-pill active px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-[#0B192C] text-white border border-[#C5A059] shadow-md cursor-pointer">🍽️ All Day Menu</button>
      <button onclick="setMealFilter('breakfast')" class="meal-pill px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white text-slate-700 border border-[#E2D7C3] hover:border-[#C5A059] cursor-pointer">☕ Breakfast (7:00 – 10:30 AM)</button>
      <button onclick="setMealFilter('lunch')" class="meal-pill px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white text-slate-700 border border-[#E2D7C3] hover:border-[#C5A059] cursor-pointer">🍲 Lunch (12:30 – 3:00 PM)</button>
      <button onclick="setMealFilter('dinner')" class="meal-pill px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white text-slate-700 border border-[#E2D7C3] hover:border-[#C5A059] cursor-pointer">🌙 Dinner (7:30 – 11:00 PM)</button>
      <button onclick="setMealFilter('buffet')" class="meal-pill px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap bg-white text-slate-700 border border-[#E2D7C3] hover:border-[#C5A059] cursor-pointer">🥞 Buffet Spreads</button>
    </div>

    <!-- Buffet View Container (hidden by default) -->
    <div id="buffetContainer" class="hidden mb-12">
      <!-- Injected by JavaScript -->
    </div>

    <!-- Ala Carte Menu View Container -->
    <div id="alaCarteContainer">
      <!-- Search & Filters Sticky Bar -->
      <div id="categoryNavSection" class="sticky top-[73px] z-30 w-full py-2.5 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#C5A059]/25 shadow-xs mb-6">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 mb-2.5">
          <!-- Search Box -->
          <div class="relative flex-1 max-w-md">
            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input type="text" id="searchInput" placeholder="Search dish name (e.g., Thokku Biryani, Prawns, Dosa)..." oninput="handleSearch(this.value)" class="w-full pl-9 pr-8 py-2 rounded-xl text-xs sm:text-sm bg-white border border-[#E2D7C3] focus:border-[#C5A059] focus:outline-none" />
            <button id="searchClearBtn" onclick="clearSearch()" class="hidden absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer">✕</button>
          </div>

          <!-- Dietary Filter Chips -->
          <div class="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
            <button id="vegFilterBtn" onclick="toggleVegFilter()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50 cursor-pointer">
              <span class="w-3.5 h-3.5 border border-emerald-600 rounded-xs flex items-center justify-center p-0.5 bg-white"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span></span>
              <span>Pure Veg</span>
            </button>
            <button id="nonVegFilterBtn" onclick="toggleNonVegFilter()" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-white text-rose-800 border-rose-300 hover:bg-rose-50 cursor-pointer">
              <span class="w-3.5 h-3.5 border border-rose-700 rounded-xs flex items-center justify-center p-0.5 bg-white"><span class="w-1.5 h-1.5 rounded-full bg-rose-700"></span></span>
              <span>Non-Veg</span>
            </button>
            <button id="chefSpecialBtn" onclick="toggleChefSpecialFilter()" class="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border bg-white text-[#9A7730] border-[#C5A059]/40 hover:bg-[#FAF6EE] cursor-pointer">
              <span>★ Chef's Specials</span>
            </button>
          </div>
        </div>

        <!-- Full Multi-Row Responsive Category Tabs Grid -->
        <div id="categoryTabsBar" class="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 pb-1">
          <!-- Injected by JavaScript: All 8 Categories + All Categories guaranteed visible -->
        </div>
      </div>

      <!-- Menu Items Sections Container -->
      <div id="menuSectionsContainer" class="space-y-12">
        <!-- Injected by JavaScript -->
      </div>
    </div>
  </main>

  <!-- About Section -->
  <section id="about" class="w-full py-16 sm:py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-[#EFE9DF]">
    <div class="max-w-7xl mx-auto px-4 relative z-10">
      <div class="text-center max-w-2xl mx-auto mb-14">
        <span class="text-xs uppercase font-bold tracking-widest text-[#C5A059] block mb-2">Heritage & Philosophy</span>
        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B192C] mb-4">A French-Colonial Coastal Haven</h2>
        <div class="h-0.5 w-20 bg-[#C5A059] mx-auto mb-4"></div>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
          Welcome to <strong class="text-[#0B192C]">Le Boulevard</strong>, the signature multi-cuisine dining destination at <strong class="text-[#0B192C]">Hotel Atithi — TGI Grand</strong>, Puducherry.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div class="grid grid-cols-2 gap-4">
          <div class="p-5 rounded-3xl bg-[#0B192C] text-white shadow-lg border border-[#C5A059]/40 flex flex-col justify-center">
            <span class="font-serif text-3xl font-bold text-[#E6C280] block mb-1">100%</span>
            <p class="text-xs text-slate-300">Sea-fresh catches sourced daily from local Coromandel coast fishermen.</p>
          </div>
          <div class="p-5 rounded-3xl bg-white text-[#0B192C] shadow-lg border border-[#E2D7C3] flex flex-col justify-center">
            <span class="font-serif text-xl font-bold block mb-1">Five-Star Standard</span>
            <p class="text-xs text-slate-500">Hygienic culinary kitchens supervised by veteran master chefs.</p>
          </div>
          <div class="col-span-2 p-6 rounded-3xl bg-[#FAF8F5] border border-[#C5A059]/40 text-center">
            <span class="font-serif italic text-lg text-[#0B192C] font-semibold block mb-1">A Culinary Symphony by the Coromandel Coast</span>
            <p class="text-xs text-slate-600">Celebrating Tamil Chettinad spices, French Creole recipes, and global multi-cuisine gastronomy.</p>
          </div>
        </div>

        <div class="space-y-4 text-sm text-slate-700 leading-relaxed font-light">
          <p>Nestled in the historic heart of Puducherry on S.V. Patel Salai, Le Boulevard at Hotel Atithi - TGI Grand is a culinary sanctuary where French colonial elegance meets the vibrant, spice-scented heritage of coastal Coromandel.</p>
          <p>Our master chefs craft each dish with respect for coastal traditions—bringing you sea-fresh Bay of Bengal catches, aromatic Seeraga Samba Thokku biryanis, authentic Chettinad pepper delicacies, and delicate French pastries.</p>
          <p>Whether you are waking up to our sunrise breakfast buffet, enjoying an intimate candlelit dinner with live grills, or having an express dining experience with family, every dining moment at Le Boulevard is steeped in genuine South Indian warmth and five-star luxury.</p>
        </div>
      </div>

      <!-- Service Hours Overview -->
      <div class="p-6 sm:p-8 rounded-3xl bg-white border border-[#C5A059]/40 shadow-xl">
        <h3 class="font-serif font-bold text-xl text-[#0B192C] mb-4">Official Service Timings & Outlets</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE9DF]">
            <div class="flex justify-between items-center mb-1"><strong class="font-serif text-[#0B192C]">Breakfast Buffet</strong><span class="font-bold text-[#9A7730]">7:00 – 10:30 AM</span></div>
            <p class="text-slate-500">Live dosas, eggs, South Indian classics & fresh bakery basket.</p>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE9DF]">
            <div class="flex justify-between items-center mb-1"><strong class="font-serif text-[#0B192C]">All-Day Snacks</strong><span class="font-bold text-[#9A7730]">11:00 AM – 11:00 PM</span></div>
            <p class="text-slate-500">Artisanal sandwiches, fries, nuggets, shakes, tea & coffee.</p>
          </div>
          <div class="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EFE9DF]">
            <div class="flex justify-between items-center mb-1"><strong class="font-serif text-[#0B192C]">Lunch & Dinner</strong><span class="font-bold text-[#9A7730]">12:30–3:00 & 7:30–11:00</span></div>
            <p class="text-slate-500">Full coastal à la carte, tandoori grills, Thokku biryani & buffet.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Location & Contact Section -->
  <section id="contact" class="w-full py-16 sm:py-20 bg-white border-t border-[#EFE9DF]">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center max-w-xl mx-auto mb-12">
        <span class="text-xs uppercase font-bold tracking-widest text-[#C5A059] block mb-2">Visit & Connect</span>
        <h2 class="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C] mb-3">Location & Concierge</h2>
        <div class="h-0.5 w-16 bg-[#C5A059] mx-auto mb-3"></div>
        <p class="text-xs sm:text-sm text-slate-500">Conveniently situated in the French Heritage precinct of Puducherry, just minutes from the Bay of Bengal coastline.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E2D7C3] flex flex-col justify-between">
          <div>
            <h3 class="font-serif font-bold text-lg text-[#0B192C] mb-2">Resort Address</h3>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              <strong>Hotel Atithi — TGI Grand</strong><br />126, S.V. Patel Salai, Heritage Town,<br />Puducherry — 605001, India
            </p>
            <div class="pt-3 border-t border-[#E2D7C3] text-xs text-slate-600 space-y-1">
              <p>• Walking distance from Promenade Beach & Rock Beach</p>
              <p>• Near Sri Aurobindo Ashram & French Quarter</p>
              <p>• Valet parking available for all restaurant guests</p>
            </div>
          </div>
          <a href="https://maps.google.com/?q=Hotel+Atithi+Puducherry" target="_blank" class="mt-6 text-xs font-bold text-[#0B192C] hover:text-[#C5A059]">Open in Google Maps →</a>
        </div>

        <div class="p-6 rounded-3xl bg-[#0B192C] text-white flex flex-col justify-between shadow-xl border border-[#C5A059]/40">
          <div>
            <h3 class="font-serif font-bold text-lg text-white mb-2">Dining Desk & Enquiries</h3>
            <p class="text-xs text-slate-300 leading-relaxed mb-6">Connect directly with our Food & Beverage manager for table reservations, banquet bookings, or culinary queries.</p>
            <div class="space-y-3 text-xs">
              <a href="tel:+914132211111" class="block p-3 rounded-xl bg-white/10 hover:bg-white/15">
                <span class="text-[10px] text-slate-400 block">Telephone Hotline</span>
                <strong class="text-white text-sm">+91 413 2211111</strong>
              </a>
              <a href="https://wa.me/919360000000?text=Hello%20Le%20Boulevard%20dining%20desk,%20I%20would%20like%20to%20reserve%20a%20table%20or%20enquire%20about%20the%20menu." target="_blank" class="block p-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-500/30">
                <span class="text-[10px] text-emerald-300 block">Instant WhatsApp Concierge</span>
                <strong class="text-emerald-200 text-sm">+91 93600 00000</strong>
              </a>
            </div>
          </div>
        </div>

        <div class="rounded-3xl overflow-hidden border border-[#E2D7C3] flex flex-col">
          <iframe title="Hotel Atithi Puducherry Location" src="https://maps.google.com/maps?q=Hotel+Atithi+Puducherry+SV+Patel+Salai&t=&z=15&ie=UTF8&iwloc=&output=embed" class="w-full h-full min-h-[220px] border-0" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="w-full bg-[#070F1A] text-slate-300 pt-16 pb-12 border-t-2 border-[#C5A059]">
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <div class="md:col-span-2 space-y-4">
          <span class="font-serif font-bold text-2xl text-white">Le Boulevard</span>
          <p class="text-xs text-[#C5A059] tracking-widest uppercase font-semibold">Hotel Atithi — TGI Grand, Puducherry</p>
          <p class="text-xs text-slate-400 max-w-md leading-relaxed font-light">Celebrating the intersection of French culinary refinement and rich coastal Coromandel heritage. Dedicated to exemplary hospitality and hygienic preparation.</p>
          <div class="inline-flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-[#C5A059]/30 text-xs text-[#E6C280]">
            <span>All prices are subject to 18% GST (Pre-GST listed prices)</span>
          </div>
        </div>

        <div class="space-y-3 text-xs text-slate-400">
          <h4 class="font-serif font-bold text-sm text-white uppercase tracking-wider">Dining Schedule</h4>
          <p class="flex justify-between pb-1 border-b border-white/5"><span>Breakfast:</span> <span class="text-white font-medium">7:00 – 10:30 AM</span></p>
          <p class="flex justify-between pb-1 border-b border-white/5"><span>Lunch:</span> <span class="text-white font-medium">12:30 – 3:00 PM</span></p>
          <p class="flex justify-between pb-1 border-b border-white/5"><span>Dinner:</span> <span class="text-white font-medium">7:30 – 11:00 PM</span></p>
          <p class="flex justify-between"><span>All-Day Snacks:</span> <span class="text-white font-medium">11:00 AM – 11:00 PM</span></p>
        </div>

        <div class="space-y-3 text-xs text-slate-400">
          <h4 class="font-serif font-bold text-sm text-white uppercase tracking-wider">Quick Links</h4>
          <p><button onclick="scrollToCategories()" class="hover:text-[#E6C280] cursor-pointer">Menu Categories</button></p>
          <p><button onclick="openPrivacyModal()" class="hover:text-[#E6C280] cursor-pointer">Guest Privacy Policy</button></p>
          <p><button onclick="openAdmin()" class="hover:text-[#E6C280] cursor-pointer">Hotel Staff Admin Portal</button></p>
          <p><a href="https://wa.me/919360000000?text=Hello%20Le%20Boulevard%20dining%20desk,%20I%20would%20like%20to%20reserve%20a%20table%20or%20enquire%20about%20the%20menu." target="_blank" class="hover:text-emerald-400">WhatsApp Concierge</a></p>
        </div>
      </div>

      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>© 2026 <strong>Le Boulevard</strong> — Hotel Atithi - TGI Grand. All rights reserved.</div>
        <div class="flex items-center gap-4">
          <button onclick="openPrivacyModal()" class="hover:text-slate-300 underline cursor-pointer">Privacy Policy</button>
          <span>•</span>
          <button onclick="openAdmin()" class="hover:text-[#E6C280] cursor-pointer">Admin Login</button>
          <span>•</span>
          <button onclick="window.scrollTo({top:0, behavior:'smooth'})" class="w-8 h-8 rounded-full bg-white/10 hover:bg-[#C5A059] hover:text-[#0B192C] text-white flex items-center justify-center transition-colors cursor-pointer">↑</button>
        </div>
      </div>
    </div>
  </footer>

  <!-- Dish Detail Modal -->
  <div id="dishModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div class="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 flex flex-col overflow-hidden">
      <button onclick="closeDishModal()" class="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer">✕</button>
      <div id="dishModalContent"></div>
    </div>
  </div>

  <!-- Admin Login Modal -->
  <div id="adminLoginModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
    <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 overflow-hidden">
      <div class="p-6 bg-gradient-to-br from-[#0B192C] to-[#152A4A] text-white text-center">
        <h3 class="font-serif font-bold text-2xl text-white">Staff & F&B Portal</h3>
        <p class="text-xs text-[#E6C280] tracking-wider uppercase font-medium mt-1">Hotel Atithi — TGI Grand</p>
      </div>
      <form onsubmit="handleAdminLogin(event)" class="p-6 space-y-4 text-xs">
        <div>
          <label class="font-bold uppercase tracking-wider text-slate-600 block mb-1">Staff Username</label>
          <input type="text" id="adminUserInput" value="" placeholder="Enter staff username" required class="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]" />
        </div>
        <div>
          <label class="font-bold uppercase tracking-wider text-slate-600 block mb-1">Secure Password / PIN</label>
          <input type="password" id="adminPassInput" value="" placeholder="Enter password or PIN" required class="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-[#C5A059]" />
        </div>
        <div id="adminLoginError" class="hidden p-2.5 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold"></div>
        <div class="flex gap-2 pt-2">
          <button type="button" onclick="closeAdminLogin()" class="flex-1 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Cancel</button>
          <button type="submit" class="flex-1 py-2.5 rounded-xl bg-[#0B192C] text-white border border-[#C5A059] font-bold hover:bg-[#152A4A] cursor-pointer shadow-sm">Sign In</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Admin Dashboard Modal -->
  <div id="adminDashboardModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs">
    <div class="relative w-full max-w-6xl h-[95vh] bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#C5A059]/40 flex flex-col overflow-hidden">
      <div class="p-4 bg-gradient-to-r from-[#0B192C] to-[#152A4A] text-white flex items-center justify-between border-b border-[#C5A059]/30 shrink-0">
        <div>
          <h2 class="font-serif font-bold text-lg text-white">F&B Management Portal</h2>
          <p class="text-[10px] text-[#E6C280] tracking-wider uppercase">Hotel Atithi — TGI Grand</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="handleAdminSignOut()" class="py-1 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-slate-300 cursor-pointer">Sign Out</button>
          <button onclick="closeAdminDashboard()" class="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer">✕</button>
        </div>
      </div>

      <!-- Quick Metrics Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-white border-b border-slate-200 text-xs shrink-0">
        <div class="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#C5A059]/30">
          <span class="text-[10px] text-slate-500 block uppercase font-bold">Total Dishes</span>
          <strong id="metricTotalDishes" class="text-sm font-bold text-[#0B192C]">77 Items</strong>
        </div>
        <div class="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
          <span class="text-[10px] text-emerald-700 block uppercase font-bold">In Stock</span>
          <strong id="metricInStock" class="text-sm font-bold text-emerald-800">77 Available</strong>
        </div>
        <div class="p-2.5 rounded-xl bg-rose-50 border border-rose-200">
          <span class="text-[10px] text-rose-700 block uppercase font-bold">Sold Out</span>
          <strong id="metricSoldOut" class="text-sm font-bold text-rose-800">0 Paused</strong>
        </div>
      </div>

      <!-- Admin Tab Switcher -->
      <div class="flex items-center gap-2 px-4 pt-3 bg-[#FAF8F5] border-b border-slate-200 overflow-x-auto no-scrollbar shrink-0 text-xs font-bold">
        <button onclick="setAdminTab('menu')" class="admin-tab-btn active bg-white text-[#0B192C] px-4 py-2 rounded-t-xl border-t border-x border-slate-200 cursor-pointer">Menu Items</button>
        <button onclick="setAdminTab('buffets')" class="admin-tab-btn text-slate-600 px-4 py-2 rounded-t-xl cursor-pointer">Buffet Schedules</button>
        <button onclick="setAdminTab('settings')" class="admin-tab-btn text-slate-600 px-4 py-2 rounded-t-xl cursor-pointer">Tax Notice & Settings</button>
      </div>

      <!-- Admin Tab Body Container -->
      <div id="adminTabBody" class="flex-1 overflow-y-auto p-4 sm:p-6">
        <!-- Injected by JavaScript -->
      </div>
    </div>
  </div>

  <!-- Privacy Policy Modal -->
  <div id="privacyModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
    <div class="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#C5A059]/40 p-6 max-h-[85vh] overflow-y-auto text-xs sm:text-sm text-slate-700 space-y-3 font-light">
      <div class="flex justify-between items-center pb-2 border-b border-slate-200">
        <h3 class="font-serif font-bold text-lg text-[#0B192C]">Guest Privacy & Data Policy</h3>
        <button onclick="closePrivacyModal()" class="text-slate-400 hover:text-black font-bold cursor-pointer">✕</button>
      </div>
      <p>At <strong>Le Boulevard (Hotel Atithi — TGI Grand, Puducherry)</strong>, we deeply respect the privacy of all our dining and resident guests.</p>
      <h4 class="font-bold text-[#0B192C]">Statutory Compliance</h4>
      <p>All restaurant transactions comply with hospitality tax regulations (HSN/SAC 9963). We never sell or share guest data with third-party advertisers.</p>
      <div class="pt-3 border-t border-slate-200 flex justify-end">
        <button onclick="closePrivacyModal()" class="px-5 py-2 rounded-xl bg-[#0B192C] text-white font-bold text-xs cursor-pointer">Understood</button>
      </div>
    </div>
  </div>

  <!-- INLINE DATA & CONTROLLER -->
  <script>
    // Embedded initial data
    const INITIAL_STORE = ${JSON.stringify(store, null, 2)};

    const CATEGORIES = [
      { id: 'snacks', name: 'Snacks & Quick Bites', serviceTime: '11:00 AM – 11:00 PM', icon: '☕', desc: 'Freshly grilled artisanal sandwiches, crunchy fritters, comforting shakes, and all-day refreshments.' },
      { id: 'soups-salads', name: 'Soups & Salads', serviceTime: '12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM', icon: '🍲', desc: 'Velvety cream soups, fragrant oriental broths, and crisp coastal tossed garden greens.' },
      { id: 'starters', name: 'Starters & Appetizers', serviceTime: '12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM', icon: '🔥', desc: 'Crisp Asian wraps, tandoor-charred kebabs, fiery coastal seafood, and chef’s signature grills.' },
      { id: 'main-course', name: 'Main Course Specialties', serviceTime: '12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM', icon: '🍽️', desc: 'Rich Indian curries, aromatic gravies, French creole specialties, and continental entrees.' },
      { id: 'rice-noodles-pasta', name: 'Rice, Noodles & Pasta', serviceTime: '12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM', icon: '🌾', desc: 'Fragrant coastal Thokku biryanis, wok-tossed noodles, seasoned pulaos, and Italian pastas.' },
      { id: 'indian-bread', name: 'Indian Breads & Dosas', serviceTime: '12:30 PM – 3:00 PM & 7:30 PM – 11:00 PM', icon: '🫓', desc: 'Tandoor-baked buttery naans, flaky parathas, hot phulkas, and golden crisp dosas.' },
      { id: 'desserts', name: 'Gourmet Desserts', serviceTime: '11:00 AM – 11:00 PM', icon: '🍰', desc: 'Silky caramel custards, royal Indian sweets, rich chocolate pastries, and seasonal treats.' },
      { id: 'tea-coffee', name: 'Tea & Artisanal Coffee', serviceTime: '7:00 AM – 11:00 PM', icon: '🍵', desc: 'Authentic South Indian filter coffee brew, heritage teas, and refreshing infusions.' }
    ];

    // State
    let menuItems = JSON.parse(localStorage.getItem('lb_menu') || 'null') || INITIAL_STORE.menu;
    let settings = JSON.parse(localStorage.getItem('lb_settings') || 'null') || INITIAL_STORE.settings;
    let buffets = JSON.parse(localStorage.getItem('lb_buffets') || 'null') || INITIAL_STORE.buffets;

    let currentMealFilter = 'all';
    let currentCategoryFilter = 'all';
    let currentSearch = '';
    let isVegOnly = false;
    let isNonVegOnly = false;
    let isChefSpecialOnly = false;
    let currentAdminTab = 'menu';

    function persistData() {
      localStorage.setItem('lb_menu', JSON.stringify(menuItems));
      localStorage.setItem('lb_settings', JSON.stringify(settings));
      localStorage.setItem('lb_buffets', JSON.stringify(buffets));
    }

    async function syncWithBackend() {
      try {
        const res = await fetch('/api/menu');
        if (res.ok) {
          const remoteMenu = await res.json();
          if (remoteMenu && remoteMenu.length > 0) {
            menuItems = remoteMenu;
            renderMenu();
          }
        }
      } catch (e) {}
    }

    // Active Service Time Detector
    function updateServiceClock() {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const ist = new Date(utc + (3600000 * 5.5));
      const mins = ist.getHours() * 60 + ist.getMinutes();

      let text = 'All-Day Snacks (11:00 AM – 11:00 PM)';
      if (mins >= 420 && mins < 630) {
        text = 'Breakfast Buffet (7:00 – 10:30 AM)';
      } else if (mins >= 750 && mins < 900) {
        text = 'Lunch Service (12:30 – 3:00 PM)';
      } else if (mins >= 1170 && mins < 1380) {
        text = 'Dinner Service (7:30 – 11:00 PM)';
      }
      const el = document.getElementById('serviceStatusText');
      if (el) el.innerText = text;
    }

    function scrollToCategories() {
      const el = document.getElementById('categoryNavSection');
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

    // Filter controls
    function setMealFilter(meal) {
      currentMealFilter = meal;
      document.querySelectorAll('.meal-pill').forEach(btn => {
        const isMatch = (meal === 'all' && btn.textContent.includes('All')) ||
                        btn.textContent.toLowerCase().includes(meal.toLowerCase());
        btn.classList.toggle('bg-[#0B192C]', isMatch);
        btn.classList.toggle('text-white', isMatch);
        btn.classList.toggle('bg-white', !isMatch);
        btn.classList.toggle('text-slate-700', !isMatch);
      });

      if (meal === 'buffet') {
        document.getElementById('buffetContainer').classList.remove('hidden');
        document.getElementById('alaCarteContainer').classList.add('hidden');
        renderBuffets();
      } else {
        document.getElementById('buffetContainer').classList.add('hidden');
        document.getElementById('alaCarteContainer').classList.remove('hidden');
        renderMenu();
      }
    }

    function setCategoryFilter(catId) {
      currentCategoryFilter = catId;
      renderCategoryTabs();
      renderMenu();
      if (catId !== 'all') {
        const el = document.getElementById('category-sec-' + catId);
        if (el) {
          const yOffset = -150;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    }

    function handleSearch(val) {
      currentSearch = val.trim().toLowerCase();
      document.getElementById('searchClearBtn').classList.toggle('hidden', !currentSearch);
      renderMenu();
    }

    function clearSearch() {
      document.getElementById('searchInput').value = '';
      currentSearch = '';
      document.getElementById('searchClearBtn').classList.add('hidden');
      renderMenu();
    }

    function toggleVegFilter() {
      isVegOnly = !isVegOnly;
      if (isVegOnly) isNonVegOnly = false;
      document.getElementById('vegFilterBtn').classList.toggle('bg-emerald-700', isVegOnly);
      document.getElementById('vegFilterBtn').classList.toggle('text-white', isVegOnly);
      document.getElementById('nonVegFilterBtn').classList.remove('bg-rose-800', 'text-white');
      renderMenu();
    }

    function toggleNonVegFilter() {
      isNonVegOnly = !isNonVegOnly;
      if (isNonVegOnly) isVegOnly = false;
      document.getElementById('nonVegFilterBtn').classList.toggle('bg-rose-800', isNonVegOnly);
      document.getElementById('nonVegFilterBtn').classList.toggle('text-white', isNonVegOnly);
      document.getElementById('vegFilterBtn').classList.remove('bg-emerald-700', 'text-white');
      renderMenu();
    }

    function toggleChefSpecialFilter() {
      isChefSpecialOnly = !isChefSpecialOnly;
      document.getElementById('chefSpecialBtn').classList.toggle('bg-[#C5A059]', isChefSpecialOnly);
      document.getElementById('chefSpecialBtn').classList.toggle('text-[#0B192C]', isChefSpecialOnly);
      renderMenu();
    }

    // Render All 8 Category Tabs - Fully responsive wrap
    function renderCategoryTabs() {
      const container = document.getElementById('categoryTabsBar');
      if (!container) return;

      let html = '<button onclick="setCategoryFilter(\\'all\\')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ' + 
        (currentCategoryFilter === 'all' ? 'bg-[#0B192C] text-white border-[#C5A059] shadow-xs' : 'bg-white text-slate-700 border-[#E2D7C3] hover:border-[#C5A059]') + '">All (' + menuItems.length + ')</button>';

      CATEGORIES.forEach(cat => {
        const count = menuItems.filter(m => m.category === cat.id).length;
        const isSelected = currentCategoryFilter === cat.id;
        html += '<button onclick="setCategoryFilter(\\'' + cat.id + '\\')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ' + 
          (isSelected ? 'bg-[#0B192C] text-white border-[#C5A059] shadow-xs font-bold' : 'bg-white text-slate-700 border-[#E2D7C3] hover:border-[#C5A059]') + '"><span>' + cat.icon + '</span> <span>' + cat.name + '</span> <span class="text-[10px] px-1.5 py-0.2 rounded-full ' + (isSelected ? 'bg-[#C5A059] text-[#0B192C]' : 'bg-slate-100 text-slate-600') + '">' + count + '</span></button>';
      });

      container.innerHTML = html;
    }

    // Render Menu Items - Pure Elegant Physical-Menu Typography Without Images
    function renderMenu() {
      const container = document.getElementById('menuSectionsContainer');
      if (!container) return;

      const filtered = menuItems.filter(item => {
        if (currentMealFilter !== 'all') {
          if (currentMealFilter === 'breakfast' && !item.mealTypes.includes('breakfast')) return false;
          if (currentMealFilter === 'lunch' && !item.mealTypes.includes('lunch') && !item.mealTypes.includes('all-day')) return false;
          if (currentMealFilter === 'dinner' && !item.mealTypes.includes('dinner') && !item.mealTypes.includes('all-day')) return false;
        }
        if (currentCategoryFilter !== 'all' && item.category !== currentCategoryFilter) return false;
        if (currentSearch) {
          const matchName = item.name.toLowerCase().includes(currentSearch);
          const matchDesc = item.description.toLowerCase().includes(currentSearch);
          if (!matchName && !matchDesc) return false;
        }
        if (isVegOnly && !item.isVeg) return false;
        if (isNonVegOnly && item.isVeg) return false;
        if (isChefSpecialOnly && !item.isChefSpecial && !item.isBestseller) return false;
        return true;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<div class="p-12 text-center rounded-3xl bg-white border border-[#E2D7C3]"><h4 class="font-serif text-lg font-bold text-[#0B192C] mb-2">No Matching Dishes</h4><p class="text-xs text-slate-500">Please try another filter or clear your search.</p></div>';
        return;
      }

      let html = '';
      CATEGORIES.forEach(cat => {
        const catItems = filtered.filter(i => i.category === cat.id);
        if (catItems.length === 0) return;

        html += '<section id="category-sec-' + cat.id + '" class="scroll-mt-48">';
        
        // Category Header
        html += '<div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 mb-6 border-b-2 border-[#C5A059]/40">';
        html += '<div><h3 class="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C] flex items-center gap-2">' + cat.icon + ' ' + cat.name + ' <span class="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-[#9A7730] border border-[#C5A059]/30 font-sans font-bold">' + catItems.length + ' Dishes</span></h3><p class="text-xs text-slate-500 font-light mt-0.5">' + cat.desc + '</p></div>';
        html += '<div class="text-xs text-[#9A7730] font-medium shrink-0 mt-1 sm:mt-0">🕒 ' + cat.serviceTime + '</div>';
        html += '</div>';

        // Elegant Image-Free Card Grid
        html += '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">';
        catItems.forEach(item => {
          const vegBadge = item.isVeg 
            ? '<span class="w-4 h-4 border-[1.5px] border-emerald-600 rounded-xs flex items-center justify-center p-0.5 bg-white shrink-0 shadow-2xs" title="Vegetarian"><span class="w-2 h-2 rounded-full bg-emerald-600"></span></span>'
            : '<span class="w-4 h-4 border-[1.5px] border-rose-700 rounded-xs flex items-center justify-center p-0.5 bg-white shrink-0 shadow-2xs" title="Non-Vegetarian"><span class="w-2 h-2 rounded-full bg-rose-700"></span></span>';

          const specialBadge = item.isChefSpecial 
            ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF6EE] text-[#9A7730] border border-[#C5A059]/40">★ Chef Special</span>'
            : (item.isBestseller ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">Bestseller</span>' : '');

          const spicyBadge = (item.isSpicy && item.isSpicy !== 'none') 
            ? '<span class="text-[10px] text-rose-600 font-bold uppercase ml-1">🌶️ ' + item.isSpicy + '</span>' 
            : '';

          html += '<div class="relative p-5 rounded-2xl bg-white border border-[#EFE9DF] luxury-shadow luxury-card-hover flex flex-col justify-between cursor-pointer ' + (!item.isAvailable ? 'opacity-65' : '') + '" onclick="openDishDetail(\\'' + item.id + '\\')">';
          
          html += '<div>';
          // Card Title & Price Header
          html += '<div class="flex items-start justify-between gap-3 mb-2">';
          html += '<div class="flex items-center gap-2 flex-1"><span class="shrink-0">' + vegBadge + '</span><h4 class="font-serif font-bold text-base sm:text-lg text-[#0B192C] hover:text-[#9A7730] transition-colors leading-snug">' + item.name + '</h4></div>';
          
          html += '<div class="text-right shrink-0">';
          html += '<div class="font-serif text-xl sm:text-2xl font-bold text-[#0B192C] leading-none"><span class="text-xs text-[#9A7730] font-sans font-bold mr-0.5">₹</span>' + item.price + '</div>';
          html += '<span class="text-[9px] text-slate-400 block mt-0.5">Pre-GST</span>';
          html += '</div>';
          html += '</div>';

          // Badges row
          if (specialBadge || spicyBadge || !item.isAvailable) {
            html += '<div class="flex items-center gap-2 mb-2 flex-wrap">';
            if (specialBadge) html += specialBadge;
            if (spicyBadge) html += spicyBadge;
            if (!item.isAvailable) html += '<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">Sold Out</span>';
            html += '</div>';
          }

          // Description
          html += '<p class="text-xs text-slate-600 leading-relaxed font-light mb-3">' + item.description + '</p>';

          // Variant or choices chips
          if (item.variants && item.variants.length > 0) {
            html += '<div class="flex flex-wrap gap-1.5 mb-2">';
            item.variants.forEach(v => {
              html += '<span class="px-2 py-0.5 rounded-md bg-[#FAF8F5] border border-[#E2D7C3] text-[11px] text-slate-700"><strong>' + v.name + '</strong> <span class="text-[#C5A059] font-bold">₹' + v.price + '</span></span>';
            });
            html += '</div>';
          }

          if (item.choices && item.choices.length > 0) {
            html += '<div class="text-[10px] text-slate-500 mb-2"><strong class="text-slate-700">Options:</strong> ' + item.choices.join(' • ') + '</div>';
          }
          html += '</div>';

          // Service time footer
          html += '<div class="pt-3 border-t border-[#FAF6EE] flex items-center justify-between text-[10px] text-slate-400 mt-2">';
          html += '<span>🕒 ' + item.serviceTime + '</span>';
          html += '<span class="text-[#9A7730] font-semibold hover:underline">View Details →</span>';
          html += '</div>';

          html += '</div>';
        });
        html += '</div>';

        // Back to Menu Categories & Top Buttons in Each Category Section
        html += '<div class="mt-8 pt-4 border-t border-[#EFE9DF] flex items-center justify-between gap-3 text-xs">';
        html += '<button onclick="scrollToCategories()" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#C5A059] text-[#0B192C] hover:text-white font-bold border border-[#C5A059]/40 shadow-2xs transition-all cursor-pointer">';
        html += '<span>↑ Back to Menu Categories</span>';
        html += '</button>';
        html += '<button onclick="window.scrollTo({top: 0, behavior: \\'smooth\\'})" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 shadow-2xs transition-all cursor-pointer">';
        html += '<span>Top of Page ↑</span>';
        html += '</button>';
        html += '</div>';

        html += '</section>';
      });

      container.innerHTML = html;
    }

    // Render Buffet View
    function renderBuffets() {
      const container = document.getElementById('buffetContainer');
      if (!container) return;

      let html = '<div class="mb-6"><h3 class="font-serif text-2xl font-bold text-[#0B192C]">Grand Resort Buffet Spreads</h3><p class="text-xs text-slate-500">Live stations, royal gravies, and chef confectionery.</p></div>';
      html += '<div class="grid grid-cols-1 md:grid-cols-3 gap-6">';
      
      buffets.forEach(b => {
        html += '<div class="rounded-3xl bg-white border border-[#C5A059]/40 shadow-lg p-6 flex flex-col justify-between">';
        html += '<div>';
        html += '<span class="px-2.5 py-0.5 rounded-full bg-[#FAF6EE] text-[#9A7730] font-bold text-[10px] uppercase">' + b.mealType + ' Buffet</span>';
        html += '<h4 class="font-serif font-bold text-xl text-[#0B192C] mt-2 mb-1">' + b.title + '</h4>';
        html += '<p class="text-xs text-slate-500 mb-3">🕒 ' + b.timings + ' (' + b.serviceDate + ')</p>';
        html += '<div class="p-3 rounded-xl bg-[#FAF8F5] text-xs font-bold text-[#0B192C] mb-4">Adult: ₹' + b.priceAdult + ' | Child: ₹' + b.priceChild + ' <span class="text-[10px] text-slate-400 block font-normal">+18% GST</span></div>';

        html += '<div class="space-y-2 mb-4">';
        b.sections.forEach(sec => {
          html += '<div class="border-t border-slate-100 pt-1.5"><strong class="text-xs text-[#0B192C]">' + sec.title + '</strong><ul class="text-[11px] text-slate-600 pl-3 list-disc">';
          sec.items.slice(0, 3).forEach(it => {
            html += '<li>' + it.name + '</li>';
          });
          html += '</ul></div>';
        });
        html += '</div></div>';

        html += '<button onclick="openBuffetInquiry(\\'' + b.title + '\\')" class="w-full py-2.5 rounded-xl text-xs font-bold text-[#0B192C] bg-[#FAF6EE] border border-[#C5A059] hover:bg-[#C5A059] hover:text-white cursor-pointer transition-colors shadow-2xs">Inquire Buffet Booking via WhatsApp</button>';
        html += '</div>';
      });

      html += '</div>';

      // Back to Menu Categories in Buffet View
      html += '<div class="mt-8 pt-4 border-t border-[#EFE9DF] flex items-center justify-between gap-3 text-xs">';
      html += '<button onclick="setMealFilter(\\'all\\'); scrollToCategories();" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF6EE] hover:bg-[#C5A059] text-[#0B192C] hover:text-white font-bold border border-[#C5A059]/40 shadow-2xs transition-all cursor-pointer">';
      html += '<span>← Back to À La Carte Menu</span>';
      html += '</button>';
      html += '<button onclick="window.scrollTo({top: 0, behavior: \\'smooth\\'})" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 shadow-2xs transition-all cursor-pointer">';
      html += '<span>Top of Page ↑</span>';
      html += '</button>';
      html += '</div>';

      container.innerHTML = html;
    }

    // Dish Detail Modal (Image-Free, Clean Fine-Dining Card)
    function openDishDetail(id) {
      const item = menuItems.find(m => m.id === id);
      if (!item) return;

      const modal = document.getElementById('dishModal');
      const content = document.getElementById('dishModalContent');
      const gst = Math.round(item.price * 0.18);
      const total = item.price + gst;

      const vegBadge = item.isVeg 
        ? '<span class="w-4 h-4 border-[1.5px] border-emerald-600 rounded-xs flex items-center justify-center p-0.5 bg-white shrink-0"><span class="w-2 h-2 rounded-full bg-emerald-600"></span></span>'
        : '<span class="w-4 h-4 border-[1.5px] border-rose-700 rounded-xs flex items-center justify-center p-0.5 bg-white shrink-0"><span class="w-2 h-2 rounded-full bg-rose-700"></span></span>';

      let html = '<div class="p-6 bg-gradient-to-r from-[#0B192C] to-[#152A4A] text-white">';
      html += '<div class="flex items-center gap-2 mb-1.5">' + vegBadge + '<span class="text-xs text-[#E6C280] font-medium">' + item.categoryTitle + '</span></div>';
      html += '<h3 class="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">' + item.name + '</h3>';
      html += '<span class="text-xs text-slate-300 mt-1 block">Service Window: ' + item.serviceTime + '</span>';
      html += '</div>';

      html += '<div class="p-6 space-y-4 text-xs">';
      // Price Box
      html += '<div class="flex justify-between items-center p-4 rounded-2xl bg-[#FAF6EE] border border-[#C5A059]/30">';
      html += '<div><span class="text-[10px] uppercase text-slate-500 font-bold block">Pre-GST Listed Price</span><strong class="font-serif text-3xl text-[#0B192C]">₹' + item.price + '</strong></div>';
      html += '<div class="text-right text-slate-600"><span class="text-[11px] block">+18% Statutory GST (₹' + gst + ')</span><strong class="text-sm font-bold text-[#0B192C]">Total Bill Estimate: ₹' + total + '</strong></div>';
      html += '</div>';

      // Description
      html += '<div><span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Culinary Description</span><p class="text-sm text-slate-700 leading-relaxed font-light">' + item.description + '</p></div>';

      if (item.portionSize) {
        html += '<div class="text-xs text-slate-600"><strong class="text-slate-800">Portion Size:</strong> ' + item.portionSize + '</div>';
      }

      if (item.allergens && item.allergens.length > 0) {
        html += '<div class="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">⚠️ <strong>Allergen Notice:</strong> Contains ' + item.allergens.join(', ') + '. Please notify staff of any sensitivities.</div>';
      }

      if (item.choices && item.choices.length > 0) {
        html += '<div><label class="font-bold text-slate-700 block mb-1">Available Preparation Styles:</label><div class="flex flex-wrap gap-1.5">' + 
          item.choices.map(c => '<span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">' + c + '</span>').join('') + '</div></div>';
      }

      if (item.variants && item.variants.length > 0) {
        html += '<div><label class="font-bold text-slate-700 block mb-1">Protein / Variant Choices:</label><div class="grid grid-cols-2 gap-2">' + 
          item.variants.map(v => '<div class="p-2.5 rounded-xl bg-[#FAF8F5] border border-[#C5A059]/40 flex justify-between items-center"><span>' + v.name + '</span> <strong class="text-[#C5A059]">₹' + v.price + '</strong></div>').join('') + '</div></div>';
      }

      // Concierge WhatsApp action
      html += '<div class="pt-4 border-t border-slate-200 flex gap-2">';
      html += '<a href="https://wa.me/919360000000?text=' + encodeURIComponent('Hello Le Boulevard at Hotel Atithi, I am inquiring about ' + item.name + ' (₹' + item.price + ').') + '" target="_blank" class="flex-1 py-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-center flex items-center justify-center gap-1.5 hover:bg-emerald-100 cursor-pointer">💬 Inquire via WhatsApp</a>';
      html += '<button onclick="closeDishModal()" class="py-3 px-5 rounded-xl bg-[#0B192C] text-white font-bold cursor-pointer hover:bg-[#152A4A]">Close</button>';
      html += '</div>';
      html += '</div>';

      content.innerHTML = html;
      modal.classList.remove('hidden');
    }

    function closeDishModal() {
      document.getElementById('dishModal').classList.add('hidden');
    }

    // Admin Functions
    function openAdmin() {
      if (sessionStorage.getItem('lb_admin_logged')) {
        openAdminDashboard();
      } else {
        document.getElementById('adminUserInput').value = '';
        document.getElementById('adminPassInput').value = '';
        document.getElementById('adminLoginError').classList.add('hidden');
        document.getElementById('adminLoginModal').classList.remove('hidden');
      }
    }

    function closeAdminLogin() {
      document.getElementById('adminLoginModal').classList.add('hidden');
    }

    function handleAdminLogin(e) {
      e.preventDefault();
      const user = document.getElementById('adminUserInput').value.trim();
      const pass = document.getElementById('adminPassInput').value.trim();

      if ((user === 'admin' && (pass === 'Boulevard@2026' || pass === '122436')) || pass === 'Boulevard@2026') {
        sessionStorage.setItem('lb_admin_logged', 'true');
        closeAdminLogin();
        openAdminDashboard();
      } else {
        const err = document.getElementById('adminLoginError');
        err.innerText = 'Invalid username or credentials. Please contact management.';
        err.classList.remove('hidden');
      }
    }

    function openAdminDashboard() {
      updateAdminMetrics();
      renderAdminTabContent();
      document.getElementById('adminDashboardModal').classList.remove('hidden');
    }

    function closeAdminDashboard() {
      document.getElementById('adminDashboardModal').classList.add('hidden');
    }

    function handleAdminSignOut() {
      sessionStorage.removeItem('lb_admin_logged');
      closeAdminDashboard();
    }

    function updateAdminMetrics() {
      document.getElementById('metricTotalDishes').innerText = menuItems.length + ' Items';
      const inStock = menuItems.filter(m => m.isAvailable).length;
      document.getElementById('metricInStock').innerText = inStock + ' Available';
      document.getElementById('metricSoldOut').innerText = (menuItems.length - inStock) + ' Paused';
    }

    function setAdminTab(tab) {
      currentAdminTab = tab;
      document.querySelectorAll('.admin-tab-btn').forEach(btn => {
        const active = btn.textContent.toLowerCase().includes(tab.toLowerCase());
        btn.classList.toggle('bg-white', active);
        btn.classList.toggle('text-[#0B192C]', active);
        btn.classList.toggle('border-t', active);
        btn.classList.toggle('border-x', active);
        btn.classList.toggle('text-slate-600', !active);
      });
      renderAdminTabContent();
    }

    function renderAdminTabContent() {
      const container = document.getElementById('adminTabBody');
      if (!container) return;

      if (currentAdminTab === 'menu') {
        let html = '<div class="space-y-4">';
        html += '<div class="flex justify-between items-center"><input type="text" placeholder="Filter dishes..." oninput="filterAdminDishes(this.value)" class="px-3 py-1.5 rounded-xl border border-slate-300 text-xs w-64"/> <span class="text-xs text-slate-500 font-bold">' + menuItems.length + ' Total Dishes</span></div>';
        html += '<div class="rounded-2xl bg-white border border-slate-200 overflow-x-auto shadow-xs">';
        html += '<table class="w-full text-left text-xs border-collapse"><thead class="bg-slate-50 text-slate-500 border-b border-slate-200"><tr><th class="p-3">Dish</th><th class="p-3">Category</th><th class="p-3">Pre-GST Price</th><th class="p-3">Stock Status</th><th class="p-3 text-right">Actions</th></tr></thead><tbody class="divide-y divide-slate-100" id="adminTableBody">';
        
        menuItems.forEach(item => {
          html += '<tr>';
          html += '<td class="p-3"><strong>' + item.name + '</strong></td>';
          html += '<td class="p-3 text-slate-500">' + item.categoryTitle + '</td>';
          html += '<td class="p-3 font-bold text-[#0B192C]">₹' + item.price + '</td>';
          html += '<td class="p-3"><button onclick="toggleStockStatus(\\'' + item.id + '\\')" class="px-2.5 py-0.5 rounded-full text-[11px] font-bold cursor-pointer ' + (item.isAvailable ? 'bg-emerald-50 text-emerald-700 border border-emerald-300' : 'bg-rose-50 text-rose-700 border border-rose-300') + '">' + (item.isAvailable ? 'In Stock' : 'Sold Out') + '</button></td>';
          html += '<td class="p-3 text-right"><button onclick="promptEditPrice(\\'' + item.id + '\\')" class="text-xs text-[#0B192C] hover:text-[#C5A059] font-bold cursor-pointer">Edit Price</button></td>';
          html += '</tr>';
        });
        html += '</tbody></table></div></div>';
        container.innerHTML = html;
      } else if (currentAdminTab === 'buffets') {
        let html = '<div class="space-y-4">';
        html += '<div class="flex justify-between items-center"><h4 class="font-serif font-bold text-base text-[#0B192C]">Buffet Schedules</h4><span class="text-xs text-slate-500">Configure public spread menus</span></div>';
        html += '<div class="grid grid-cols-1 md:grid-cols-3 gap-4">';
        buffets.forEach(b => {
          html += '<div class="p-4 rounded-2xl bg-white border border-[#E2D7C3]"><span class="px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#9A7730] text-[10px] uppercase font-bold">' + b.mealType + '</span><h5 class="font-bold text-sm text-[#0B192C] mt-2">' + b.title + '</h5><p class="text-xs text-slate-500 mt-1 mb-2">Adult: ₹' + b.priceAdult + ' | Child: ₹' + b.priceChild + '</p><button onclick="toggleBuffetPublish(\\'' + b.id + '\\')" class="w-full py-1.5 rounded-lg text-xs font-bold border ' + (b.isPublished ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-600') + '">' + (b.isPublished ? 'Published' : 'Hidden') + '</button></div>';
        });
        html += '</div></div>';
        container.innerHTML = html;
      } else if (currentAdminTab === 'settings') {
        let html = '<form onsubmit="handleSaveSettings(event)" class="max-w-xl space-y-4 text-xs bg-white p-6 rounded-2xl border border-slate-200">';
        html += '<h4 class="font-serif font-bold text-base text-[#0B192C] pb-2 border-b border-slate-100">Statutory Tax & Property Settings</h4>';
        html += '<div><label class="font-bold text-slate-600 block mb-1">Government Tax Notice Text *</label><input type="text" id="settingTaxNotice" value="' + settings.taxNotice + '" required class="w-full px-3 py-2 rounded-xl border border-slate-300"/></div>';
        html += '<div><label class="font-bold text-slate-600 block mb-1">GST Percentage (%) *</label><input type="number" id="settingGst" value="' + settings.gstPercentage + '" required class="w-full px-3 py-2 rounded-xl border border-slate-300"/></div>';
        html += '<button type="submit" class="py-2.5 px-6 rounded-xl bg-[#0B192C] text-white font-bold cursor-pointer">Save Settings</button>';
        html += '</form>';
        container.innerHTML = html;
      }
    }

    function toggleStockStatus(id) {
      const it = menuItems.find(m => m.id === id);
      if (it) {
        it.isAvailable = !it.isAvailable;
        persistData();
        updateAdminMetrics();
        renderAdminTabContent();
        renderMenu();
      }
    }

    function promptEditPrice(id) {
      const it = menuItems.find(m => m.id === id);
      if (!it) return;
      const newPrice = prompt('Enter new pre-GST price for ' + it.name + ' in INR:', it.price);
      if (newPrice && !isNaN(newPrice)) {
        it.price = Number(newPrice);
        persistData();
        renderAdminTabContent();
        renderMenu();
      }
    }

    function toggleBuffetPublish(id) {
      const b = buffets.find(x => x.id === id);
      if (b) {
        b.isPublished = !b.isPublished;
        persistData();
        renderAdminTabContent();
      }
    }

    function handleSaveSettings(e) {
      e.preventDefault();
      settings.taxNotice = document.getElementById('settingTaxNotice').value;
      settings.gstPercentage = Number(document.getElementById('settingGst').value);
      persistData();
      document.getElementById('taxNoticeText').innerText = 'Government Tax Notice: ' + settings.taxNotice;
      alert('Settings updated successfully!');
    }

    function openBuffetInquiry(title) {
      window.open('https://wa.me/919360000000?text=' + encodeURIComponent('Hello Le Boulevard at Hotel Atithi, I would like to reserve seats for the ' + title + '.'), '_blank');
    }

    function openPrivacyModal() {
      document.getElementById('privacyModal').classList.remove('hidden');
    }
    function closePrivacyModal() {
      document.getElementById('privacyModal').classList.add('hidden');
    }
    function toggleMobileMenu() {
      document.getElementById('mobileMenu').classList.toggle('hidden');
    }

    // Initialize application
    window.addEventListener('DOMContentLoaded', () => {
      updateServiceClock();
      setInterval(updateServiceClock, 60000);
      renderCategoryTabs();
      renderMenu();
      syncWithBackend();

      if (window.location.hash === '#admin') {
        openAdmin();
      }
    });
  </script>
</body>
</html>
`;

const targetHtmlPath = path.join(__dirname, 'index.html');
fs.writeFileSync(targetHtmlPath, html, 'utf8');
console.log('Successfully written updated index.html (' + html.length + ' bytes)!');
