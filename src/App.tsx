import React, { useState, useEffect, useMemo } from 'react';
import { 
  MenuItem, 
  BuffetMenu, 
  RestaurantSettings, 
  OrderRecord, 
  CartItem, 
  MealFilter, 
  CategoryId, 
  DishVariant 
} from './types/index.ts';
import { CATEGORIES, INITIAL_MENU_ITEMS, INITIAL_SETTINGS } from './data/initialMenu';
import { INITIAL_BUFFET_MENUS } from './data/buffetData';
import { 
  initLocalStorage, 
  fetchMenuItems, 
  fetchSettings, 
  fetchBuffets, 
  fetchOrders, 
  isAdminAuthenticated 
} from './services/api';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MealNav } from './components/MealNav';
import { CategoryNav } from './components/CategoryNav';
import { MenuCard } from './components/MenuCard';
import { DishDetailModal } from './components/DishDetailModal';
import { BuffetView } from './components/BuffetView';
import { RoomServiceTray } from './components/RoomServiceTray';
import { QrCodeModal } from './components/QrCodeModal';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { TaxNotice } from './components/TaxNotice';
import { Footer } from './components/Footer';
import { PrivacyModal } from './components/PrivacyModal';
import { AdminLogin } from './components/Admin/AdminLogin';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { 
  Sparkles, 
  ShoppingBag, 
  QrCode, 
  MessageCircle, 
  ArrowUp,
  Clock,
  Layers,
  Utensils
} from 'lucide-react';

export const App: React.FC = () => {
  // State
  const [items, setItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [settings, setSettings] = useState<RestaurantSettings>(INITIAL_SETTINGS);
  const [buffetMenus, setBuffetMenus] = useState<BuffetMenu[]>(INITIAL_BUFFET_MENUS);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Navigation & Filtering
  const [activeMeal, setActiveMeal] = useState<MealFilter>('all');
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [nonVegOnly, setNonVegOnly] = useState(false);
  const [chefSpecialOnly, setChefSpecialOnly] = useState(false);

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedDishForDetail, setSelectedDishForDetail] = useState<MenuItem | null>(null);

  // Initialize and load data
  const loadData = async () => {
    initLocalStorage();
    const [fetchedItems, fetchedSettings, fetchedBuffets, fetchedOrders] = await Promise.all([
      fetchMenuItems(),
      fetchSettings(),
      fetchBuffets(),
      fetchOrders()
    ]);
    if (fetchedItems) setItems(fetchedItems);
    if (fetchedSettings) setSettings(fetchedSettings);
    if (fetchedBuffets) setBuffetMenus(fetchedBuffets);
    if (fetchedOrders) setOrders(fetchedOrders);
  };

  useEffect(() => {
    loadData();
    // Check if URL has #admin
    if (window.location.hash === '#admin') {
      if (isAdminAuthenticated()) {
        setIsAdminDashboardOpen(true);
      } else {
        setIsAdminLoginOpen(true);
      }
    }
  }, []);

  // Filter items logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // 1. Meal Type filter
      if (activeMeal !== 'all' && activeMeal !== 'buffet') {
        if (activeMeal === 'breakfast' && !item.mealTypes.includes('breakfast')) return false;
        if (activeMeal === 'lunch' && !item.mealTypes.includes('lunch') && !item.mealTypes.includes('all-day')) return false;
        if (activeMeal === 'dinner' && !item.mealTypes.includes('dinner') && !item.mealTypes.includes('all-day')) return false;
        if (activeMeal === 'snacks' && !item.mealTypes.includes('all-day')) return false;
        if (activeMeal === 'room-service' && !item.mealTypes.includes('room-service')) return false;
      }

      // 2. Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCat = item.categoryTitle.toLowerCase().includes(q);
        const matchesChoice = item.choices?.some(c => c.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesChoice) return false;
      }

      // 4. Veg / Non-Veg
      if (vegOnly && !item.isVeg) return false;
      if (nonVegOnly && item.isVeg) return false;

      // 5. Chef Special
      if (chefSpecialOnly && !item.isChefSpecial && !item.isBestseller) return false;

      return true;
    });
  }, [items, activeMeal, activeCategory, searchQuery, vegOnly, nonVegOnly, chefSpecialOnly]);

  // Compute category counts for pills
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    items.forEach(it => {
      // Respect meal filter if active
      let eligible = true;
      if (activeMeal !== 'all' && activeMeal !== 'buffet') {
        eligible = it.mealTypes.includes(activeMeal as any) || (activeMeal !== 'breakfast' && it.mealTypes.includes('all-day'));
      }
      if (eligible) {
        counts[it.category] = (counts[it.category] || 0) + 1;
        counts['all'] = (counts['all'] || 0) + 1;
      }
    });
    return counts;
  }, [items, activeMeal]);

  // Cart operations
  const handleAddToCart = (
    item: MenuItem, 
    variant?: DishVariant, 
    choice?: string, 
    notes?: string, 
    quantity = 1
  ) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(c => 
        c.item.id === item.id && 
        c.selectedVariant?.name === variant?.name && 
        c.selectedChoice === choice
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        if (notes) updated[existingIdx].notes = notes;
        return updated;
      } else {
        return [...prev, { item, quantity, selectedVariant: variant, selectedChoice: choice, notes }];
      }
    });
  };

  const handleUpdateQuantity = (
    item: MenuItem, 
    delta: number, 
    variant?: DishVariant, 
    choice?: string
  ) => {
    setCart(prev => {
      const idx = prev.findIndex(c => 
        c.item.id === item.id && 
        c.selectedVariant?.name === variant?.name && 
        c.selectedChoice === choice
      );

      if (idx === -1) {
        if (delta > 0) {
          return [...prev, { item, quantity: 1, selectedVariant: variant, selectedChoice: choice }];
        }
        return prev;
      }

      const updated = [...prev];
      const newQty = updated[idx].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== idx);
      } else {
        updated[idx].quantity = newQty;
        return updated;
      }
    });
  };

  const getItemQuantity = (item: MenuItem): number => {
    return cart
      .filter(c => c.item.id === item.id)
      .reduce((sum, c) => sum + c.quantity, 0);
  };

  const cartTotalItems = cart.reduce((sum, c) => sum + c.quantity, 0);

  // Smooth scroll
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Group filtered items by category for clean section display
  const groupedByCategory = useMemo(() => {
    const groups: { category: typeof CATEGORIES[0]; items: MenuItem[] }[] = [];
    CATEGORIES.forEach(cat => {
      const inCat = filteredItems.filter(it => it.category === cat.id);
      if (inCat.length > 0) {
        groups.push({ category: cat, items: inCat });
      }
    });
    return groups;
  }, [filteredItems]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E2022] font-sans">
      {/* Sticky Navigation */}
      <Navbar
        settings={settings}
        cartCount={cartTotalItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQr={() => setIsQrOpen(true)}
        activeMeal={activeMeal}
        onSelectMeal={(m) => {
          setActiveMeal(m);
          scrollToSection('menu');
        }}
        onNavigateSection={scrollToSection}
        onOpenAdmin={() => {
          if (isAdminAuthenticated()) {
            setIsAdminDashboardOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* Hero Section */}
      <Hero
        settings={settings}
        onSelectMeal={(m) => {
          setActiveMeal(m);
          scrollToSection('menu');
        }}
        onScrollToMenu={() => scrollToSection('menu')}
      />

      {/* Main Digital Menu Section */}
      <main id="menu" className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        
        {/* Meal Timings Navigation Bar */}
        <div className="text-center max-w-2xl mx-auto mb-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059] block mb-1">
            Gourmet Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B192C]">
            Digital Restaurant Menu
          </h2>
          <div className="h-0.5 w-16 bg-[#C5A059] mx-auto mt-2 mb-3"></div>
          <p className="text-xs sm:text-sm text-slate-500 font-light">
            Crafted for guests of <strong>Hotel Atithi — TGI Grand</strong>. Select your preferred meal timing or explore our complete coastal à la carte menu.
          </p>
        </div>

        <MealNav activeMeal={activeMeal} onSelectMeal={setActiveMeal} />

        {/* Prominent Statutory Tax Notice */}
        <TaxNotice taxNotice={settings.taxNotice} gstPercentage={settings.gstPercentage} />

        {/* If Buffet Tab is chosen, render Buffet View */}
        {activeMeal === 'buffet' ? (
          <BuffetView buffetMenus={buffetMenus} />
        ) : (
          <>
            {/* Category and Dietary Sticky Navigation */}
            <CategoryNav
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              vegOnly={vegOnly}
              onToggleVeg={() => {
                setVegOnly(!vegOnly);
                if (!vegOnly) setNonVegOnly(false);
              }}
              nonVegOnly={nonVegOnly}
              onToggleNonVeg={() => {
                setNonVegOnly(!nonVegOnly);
                if (!nonVegOnly) setVegOnly(false);
              }}
              chefSpecialOnly={chefSpecialOnly}
              onToggleChefSpecial={() => setChefSpecialOnly(!chefSpecialOnly)}
              categoryCounts={categoryCounts}
            />

            {/* Menu Items List */}
            {groupedByCategory.length === 0 ? (
              <div className="my-16 p-12 text-center rounded-3xl bg-white border border-[#E2D7C3] max-w-md mx-auto shadow-xs">
                <Utensils className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="font-serif text-xl font-bold text-[#0B192C] mb-2">
                  No Dishes Found
                </h4>
                <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                  No dishes matched your selected criteria: "{searchQuery || 'current filters'}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    setVegOnly(false);
                    setNonVegOnly(false);
                    setChefSpecialOnly(false);
                  }}
                  className="py-2.5 px-6 rounded-xl text-xs font-bold text-white bg-[#0B192C] hover:bg-[#152A4A] cursor-pointer transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-12 my-8">
                {groupedByCategory.map(({ category, items: catItems }) => (
                  <section key={category.id} id={category.id} className="scroll-mt-48">
                    {/* Category Title Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 mb-6 border-b-2 border-[#C5A059]/40">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B192C]">
                            {category.name}
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#FAF6EE] text-[#9A7730] border border-[#C5A059]/30 font-semibold font-sans">
                            {catItems.length} {catItems.length === 1 ? 'Dish' : 'Dishes'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 max-w-xl font-light">
                          {category.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-[#9A7730] font-medium shrink-0 mt-1 sm:mt-0">
                        <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Service: {category.serviceTime}</span>
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                      {catItems.map((item) => (
                        <MenuCard
                          key={item.id}
                          item={item}
                          onOpenDetail={setSelectedDishForDetail}
                          onAddToCart={handleAddToCart}
                          currentQuantity={getItemQuantity(item)}
                          onUpdateQuantity={handleUpdateQuantity}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* About Section */}
      <AboutSection />

      {/* Contact & Location Section */}
      <ContactSection settings={settings} />

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenAdmin={() => {
          if (isAdminAuthenticated()) {
            setIsAdminDashboardOpen(true);
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
        onOpenQr={() => setIsQrOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Floating Bottom Action Bar for Mobile Viewers */}
      <div className="fixed bottom-3 left-4 right-4 z-30 lg:hidden flex items-center justify-between gap-2 p-2 rounded-2xl bg-[#0B192C]/95 backdrop-blur-md border border-[#C5A059] shadow-2xl text-white">
        <button
          onClick={() => setIsQrOpen(true)}
          className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center gap-1.5 text-xs font-bold text-[#E6C280]"
        >
          <QrCode className="w-4 h-4 text-[#C5A059]" />
          <span>Table QR</span>
        </button>

        <a
          href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0"
          title="WhatsApp Concierge"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7730] text-[#0B192C] flex items-center justify-center gap-1.5 text-xs font-bold shadow-md"
        >
          <ShoppingBag className="w-4 h-4 text-[#0B192C]" />
          <span>Room Tray</span>
          {cartTotalItems > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#0B192C] text-white font-bold text-[10px] flex items-center justify-center">
              {cartTotalItems}
            </span>
          )}
        </button>
      </div>

      {/* Modals */}
      <DishDetailModal
        item={selectedDishForDetail}
        onClose={() => setSelectedDishForDetail(null)}
        onAddToCart={handleAddToCart}
      />

      <RoomServiceTray
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={(idx, delta) => {
          setCart(prev => {
            const updated = [...prev];
            const newQty = updated[idx].quantity + delta;
            if (newQty <= 0) return updated.filter((_, i) => i !== idx);
            updated[idx].quantity = newQty;
            return updated;
          });
        }}
        onRemoveItem={(idx) => {
          setCart(prev => prev.filter((_, i) => i !== idx));
        }}
        onClearCart={() => setCart([])}
        settings={settings}
      />

      <QrCodeModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        settings={settings}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <AdminLogin
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoginOpen(false);
          setIsAdminDashboardOpen(true);
        }}
      />

      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        items={items}
        buffetMenus={buffetMenus}
        settings={settings}
        orders={orders}
        onRefreshAll={loadData}
        onLogout={() => {
          setIsAdminDashboardOpen(false);
          loadData();
        }}
      />
    </div>
  );
};
